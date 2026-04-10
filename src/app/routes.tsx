import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/landing-page";
import { LoginPage } from "./pages/login-page";
import { FarmerDashboard } from "./pages/farmer-dashboard";
import { BuyerDashboard } from "./pages/buyer-dashboard";
import { GodownDashboard } from "./pages/godown-dashboard";
import { MarketplacePage } from "./pages/marketplace-page";
import { NotificationsPage } from "./pages/notifications-page";
import { MessagesPage } from "./pages/messages-page";
import { ProfilePage } from "./pages/profile-page";
import { AIInsights } from "./pages/ai-insights";
import RootLayout from "./components/root-layout";
import { ErrorPage } from "./pages/error-page";

import FarmerBookingsPage from "./pages/farmer-bookings";
import FarmerSellCropsPage from "./pages/farmer-sell-crops";
import FarmerBookGodownPage from "./pages/farmer-book-godown";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "farmer", element: <FarmerDashboard /> },
      { path: "farmer/bookings", element: <FarmerBookingsPage /> },
      { path: "farmer/sell-crops", element: <FarmerSellCropsPage /> },
      { path: "farmer/book-godown", element: <FarmerBookGodownPage /> },
      { path: "buyer", element: <BuyerDashboard /> },
      { path: "buyer-orders", element: <BuyerDashboard /> },
      { path: "godown", element: <GodownDashboard /> },
      { path: "marketplace", element: <MarketplacePage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "ai-insights", element: <AIInsights /> },
    ],
  },
]);
