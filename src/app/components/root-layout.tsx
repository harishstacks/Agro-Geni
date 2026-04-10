import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { VoiceAssistant } from "./voice-assistant";

export default function RootLayout() {
  const navigate = useNavigate();
  const handleVoiceCommand = (cmd: string, transcript: string) => {
    switch (cmd) {
      case 'login':
        navigate('/login');
        break;
      case 'sell-crops':
        navigate('/farmer/sell-crops');
        break;
      case 'my-crops':
        navigate('/farmer');
        break;
      case 'book-godown':
        navigate('/farmer/book-godown');
        break;
      case 'my-bookings':
        navigate('/farmer/bookings');
        break;
      case 'show-crops':
        navigate('/buyer');
        break;
      case 'show-orders':
        navigate('/buyer-orders');
        break;
      case 'home':
        navigate('/');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'logout':
        navigate('/login');
        break;
      default:
        // No-op
        break;
    }
  };
  return (
    <>
      <VoiceAssistant onCommand={handleVoiceCommand} />
      <Outlet />
    </>
  );
}
