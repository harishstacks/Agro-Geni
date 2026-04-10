// Robust voice command parser for Tamil/Tanglish/English
// Usage: import { parseVoiceCommand } from "./voice-intent";

// 1. Keyword dictionary (configurable)
export const KEYWORDS = {
  SELL: ["sell", "add", "upload", "podu", "விற்பனை", "சேர்", "போடு"],
  CROPS: ["crop", "crops", "veda", "payir", "nel", "rice", "wheat", "பயிர்", "நெல்", "அரிசி", "கோதுமை"],
  BOOK: ["book", "booking", "bookings", "reserve", "முன்பதிவு", "ரிசர்வ்"],
  GODOWN: ["godown", "warehouse", "storage", "கிடங்கு", "கொடௌன்"],
  VIEW: ["show", "kaami", "kaamunga", "view", "display", "see", "paaru", "paarunga", "paathu", "காண்பி", "காட்டு", "பார்"],
  MY: ["en", "my", "என்"],
  LOGIN: ["login", "signin", "enter", "உள்நுழைவு", "லாகின்"],
  ORDER: ["order", "orders", "ஆர்டர்", "ஆர்டர்கள்"],
  HOME: ["home", "main", "start", "முகப்பு"],
  PROFILE: ["profile", "சுயவிவரம்"],
  HELP: ["help", "udaavi", "assistance", "உதவி"],
  LOGOUT: ["logout", "signout", "exit", "veliye", "வெளியேறு"]
};

// 2. Filler words (for normalization)
const FILLERS = [
  "pannunga", "please", "anna", "bro", "seiyanum", "venum", "பண்ணுங்க", "தயவு", "செய்யவும்", "வேண்டும்"
];

// 3. Normalization
export function normalize(text: string): string {
  let t = text.toLowerCase();
  FILLERS.forEach(filler => {
    t = t.replace(new RegExp(`\\b${filler}\\b`, "gi"), "");
  });
  return t.replace(/[\p{P}\p{S}]/gu, "").replace(/\s+/g, " ").trim();
}

// 4. Keyword extraction (with partial matching)
export function extractKeywords(text: string): string[] {
  const found: string[] = [];
  Object.entries(KEYWORDS).forEach(([key, words]) => {
    for (const word of words) {
      if (text.includes(word)) {
        found.push(key);
        break;
      }
    }
  });
  return found;
}

// 5. Intent detection rules
const INTENT_RULES = [
  { action: "sell-crops", match: ["SELL", "CROPS"] },
  { action: "my-crops", match: [["MY", "CROPS"], ["EN", "CROPS"]] },
  { action: "book-godown", match: ["BOOK", "GODOWN"] },
  { action: "my-bookings", match: ["MY", "BOOK"] },
  { action: "show-crops", match: ["VIEW", "CROPS"] },
  { action: "show-orders", match: [["VIEW", "ORDER"], ["ORDER"]] },
  { action: "login", match: ["LOGIN"] },
  { action: "home", match: ["HOME"] },
  { action: "profile", match: ["PROFILE"] },
  { action: "help", match: ["HELP"] },
  { action: "logout", match: ["LOGOUT"] },
];

// 6. Main parsing function
export type VoiceIntent = { action: string; confidence: number; matchedKeywords: string[] };

export function parseVoiceCommand(rawText: string): VoiceIntent | null {
  const text = normalize(rawText);
  const foundKeywords = extractKeywords(text);

  let bestMatch: { action: string; score: number; matched: string[] } | null = null;

  for (const rule of INTENT_RULES) {
    let score = 0;
    let matched: string[] = [];
    if (Array.isArray(rule.match[0])) {
      // Multiple OR options
      for (const option of rule.match as string[][]) {
        const allPresent = option.every(k => foundKeywords.includes(k));
        if (allPresent && option.length > score) {
          score = option.length;
          matched = option;
        }
      }
    } else {
      // Single AND option
      const allPresent = (rule.match as string[]).every(k => foundKeywords.includes(k));
      if (allPresent && (rule.match as string[]).length > score) {
        score = (rule.match as string[]).length;
        matched = rule.match as string[];
      }
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { action: rule.action, score, matched };
    }
  }

  if (bestMatch) {
    return {
      action: bestMatch.action,
      confidence: Math.min(1, bestMatch.score / 3), // Simple confidence metric
      matchedKeywords: bestMatch.matched,
    };
  }

  return null;
}

// Example usage:
// const result = parseVoiceCommand("en crops kaami");
// result: { action: "VIEW_MY_CROPS", confidence: 0.67, matchedKeywords: ["MY", "CROPS"] }