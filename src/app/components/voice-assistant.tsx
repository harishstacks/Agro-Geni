import React, { useRef, useState } from "react";

import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import { Mic, X } from "lucide-react";
import { parseVoiceCommand } from "../voice-intent";

function speak(text: string, lang: string) {
  if ('speechSynthesis' in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    if (lang === "ta") {
      utter.lang = "ta-IN";
      // Try to select a Tamil voice if available
      const voices = window.speechSynthesis.getVoices();
      const tamilVoice = voices.find(v => v.lang?.toLowerCase().startsWith("ta"));
      if (tamilVoice) {
        utter.voice = tamilVoice;
      }
    } else {
      utter.lang = "en-IN";
      // Prefer Indian English if available
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang?.toLowerCase() === "en-in");
      if (enVoice) {
        utter.voice = enVoice;
      }
    }
    window.speechSynthesis.speak(utter);
  }
}

export function VoiceAssistant({ onCommand }: { onCommand: (cmd: string, transcript: string) => void }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef<any>(null);
  const { lang } = useLanguage();

  // Command help text for each language
  const helpText = lang === "ta"
    ? `குரல் கட்டளைகள் உதாரணம்: உள்நுழைவு, பயிர்கள் விற்பனை, கிடங்கு முன்பதிவு, என் முன்பதிவுகள், முகப்பு, சுயவிவரம், உதவி, வெளியேறு.`
    : `Voice command examples: login, sell crops, book godown, my bookings, home, profile, help, logout.`;

  const startListening = () => {
    setError("");
    // Speak help message automatically when mic is activated
    speak(helpText, lang);
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError(lang === "ta" ? "இந்த உலாவியில் குரல் அடையாளம் ஆதரிக்கப்படவில்லை." : "Voice recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "ta" ? "ta-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: any) => {
      let spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      const parsedIntent = parseVoiceCommand(spoken);
      if (parsedIntent && parsedIntent.confidence >= 0.3) {
        onCommand(parsedIntent.action, spoken);
        setError("");
      } else {
        setError(lang === "ta" ? "கட்டளை அடையாளம் காணப்படவில்லை" : "Command not recognized");
        speak(lang === "ta" ? "தயவு செய்து மீண்டும் முயற்சிக்கவும்" : "Please try again", lang);
      }
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <>
      {/* Floating Mic Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-3xl focus:outline-none border-4 border-white hover:bg-primary/90 transition-all"
        onClick={listening ? stopListening : startListening}
        aria-label={listening ? (lang === "ta" ? "கேட்பதை நிறுத்தவும்" : "Stop listening") : (lang === "ta" ? "குரல் உதவியைத் தொடங்கவும்" : "Start voice assistant")}
        style={{ fontSize: 32 }}
      >
        {listening ? <X className="w-8 h-8 animate-pulse" /> : <Mic className="w-8 h-8" />}
      </button>
      {/* Help Button */}
      <button
        className="fixed bottom-6 right-24 z-50 bg-secondary text-secondary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-xl focus:outline-none border-4 border-white hover:bg-secondary/90 transition-all"
        onClick={() => speak(helpText, lang)}
        aria-label={lang === "ta" ? "உதவி கட்டளைகள்" : "Help commands"}
        style={{ fontSize: 20 }}
      >
        ?
      </button>
      {/* Transcript Box */}
      {(transcript || error) && (
        <div className={`fixed bottom-28 right-6 z-50 bg-white border border-border rounded-xl shadow-lg px-6 py-4 min-w-[260px] max-w-xs ${error ? "border-red-400" : "border-primary"}`}>
          <div className="text-lg font-semibold mb-1">{error ? (lang === "ta" ? "பிழை" : "Error") : (lang === "ta" ? "கேட்டது" : "Heard")}</div>
          <div className={`text-base ${error ? "text-red-600" : "text-primary"}`}>{error || transcript}</div>
        </div>
      )}
    </>
  );
}
