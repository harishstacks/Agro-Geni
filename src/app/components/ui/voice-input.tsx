import { useLanguage } from "../../LanguageContext";
import { t } from "../../i18n";
import React, { useRef, useState } from "react";
import { Input } from "./input";
import { Mic } from "lucide-react";

// Simple Tanglish mapping for demo (expand as needed)
const tanglishMap: Record<string, string> = {
  "vanakkam": "வணக்கம்",
  "en peru": "என் பெயர்",
  "kaadhal": "காதல்",
  "kaadhalan": "காதலன்",
  "kaadhalar": "காதலர்",
  "phone": "போன்",
  "number": "எண்",
  "sell": "விற்பனை",
  "crop": "பயிர்",
  "book": "புக்",
  "godown": "கொடௌன்",
  "order": "ஆர்டர்",
  "buyer": "வாங்குபவர்",
  "farmer": "விவசாயி",
  "warehouse": "கொடௌன்",
  "login": "உள்நுழைவு",
  "register": "பதிவு",
  "password": "கடவுச்சொல்",
  "submit": "சமர்ப்பிக்கவும்",
  "next": "அடுத்தது",
  "back": "பின்னால்",
  "exit": "வெளியேறு",
  // Add more as needed
};

function toTanglish(text: string): string {
  // Replace known words with Tanglish (Tamil in Latin script)
  let result = text;
  Object.entries(tanglishMap).forEach(([en, ta]) => {
    result = result.replace(new RegExp(en, "gi"), ta);
  });
  return result;
}

export function VoiceInput({ value, onChange, placeholder, ...props }: React.ComponentProps<typeof Input>) {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const { lang } = useLanguage();

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert(t("voiceNotSupported", lang));
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'ta' ? "ta-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      let transcript = event.results[0][0].transcript;
      transcript = toTanglish(transcript);
      if (onChange) {
        onChange({ target: { value: transcript } } as any);
      }
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="relative flex items-center">
      <Input
        value={value}
        onChange={onChange}
        placeholder={toTanglish(t(placeholder || "", lang))}
        {...props}
      />
      <button
        type="button"
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors ${listening ? "animate-pulse" : ""}`}
        onClick={handleVoice}
        aria-label={t("voiceInput", lang)}
      >
        <Mic className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
}
