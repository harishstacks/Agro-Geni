export type AccountRole = "farmer" | "buyer" | "godown_owner";

export type VerificationStatus = "verified" | "limited";

export interface AccountSession {
  email: string;
  role: AccountRole;
  name: string;
  verificationStatus: VerificationStatus;
  verificationBatch: string | null;
  verifiedAt: string | null;
}

export interface VerificationRecord {
  email: string;
  role: AccountRole;
  isVerified: boolean;
  updatedAt: string;
}

const SESSION_KEY = "agri-genix-account-session";
const REGISTRY_KEY = "agri-genix-verification-registry";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function buildVerificationBatch(role: AccountRole) {
  if (role === "farmer") {
    return "Verified Farmer Batch";
  }

  if (role === "godown_owner") {
    return "Verified Warehouse Batch";
  }

  return null;
}

export function getVerificationRecord(email: string, role?: AccountRole) {
  const registry = readStorage<VerificationRecord[]>(REGISTRY_KEY, []);
  return registry.find((record) => {
    const matchesEmail = record.email.toLowerCase() === email.toLowerCase();
    const matchesRole = role ? record.role === role : true;
    return matchesEmail && matchesRole;
  }) || null;
}

export function setVerificationRecord(record: VerificationRecord) {
  const registry = readStorage<VerificationRecord[]>(REGISTRY_KEY, []);
  const nextRegistry = registry.filter((existing) => {
    return !(
      existing.email.toLowerCase() === record.email.toLowerCase() &&
      existing.role === record.role
    );
  });

  nextRegistry.unshift(record);
  writeStorage(REGISTRY_KEY, nextRegistry);
}

export function createAccountSession(input: {
  email: string;
  role: AccountRole;
  name?: string;
}) {
  const verificationRecord = getVerificationRecord(input.email, input.role);
  
  // Force verified status for all farmers and godown owners
  const isVerified = input.role === "buyer" || input.role === "farmer" || input.role === "godown_owner" ? true : Boolean(verificationRecord?.isVerified);

  return {
    email: input.email,
    role: input.role,
    name: input.name || input.email,
    verificationStatus: isVerified ? "verified" : "limited",
    verificationBatch: isVerified ? buildVerificationBatch(input.role) : null,
    verifiedAt: isVerified ? verificationRecord?.updatedAt || new Date().toISOString() : null,
  } satisfies AccountSession;
}

export function saveAccountSession(session: AccountSession) {
  writeStorage(SESSION_KEY, session);
}

export function getAccountSession() {
  const session = readStorage<AccountSession | null>(SESSION_KEY, null);
  if (session && (session.verificationStatus !== "verified")) {
    if (session.role === "farmer" || session.role === "godown_owner") {
      session.verificationStatus = "verified";
      session.verificationBatch = buildVerificationBatch(session.role);
    }
  }
  return session;
}

export function clearAccountSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

export function getBatchLabel(role: AccountRole) {
  return buildVerificationBatch(role);
}

export function completeVerification(session: AccountSession) {
  const verifiedSession: AccountSession = {
    ...session,
    verificationStatus: "verified",
    verificationBatch: buildVerificationBatch(session.role),
    verifiedAt: new Date().toISOString(),
  };

  setVerificationRecord({
    email: session.email,
    role: session.role,
    isVerified: true,
    updatedAt: verifiedSession.verifiedAt,
  });
  saveAccountSession(verifiedSession);

  return verifiedSession;
}

export function isTrustedCropListing(listing: { verificationBatch?: string | null; isVerifiedSeller?: boolean }) {
  if (typeof listing.isVerifiedSeller === "boolean") {
    return listing.isVerifiedSeller;
  }

  return listing.verificationBatch === "Verified Farmer Batch";
}
