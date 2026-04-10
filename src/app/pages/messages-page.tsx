import { Header } from "../components/header";
import { Search, Send, Phone, Video, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

export function MessagesPage() {
  const { lang } = useLanguage();
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: t('farmer', lang),
      lastMessage: lang === 'ta' ? "ஆம், கோதுமை ஆர்கானிக் மற்றும் விநியோகத்திற்கு தயாராக உள்ளது" : "Yes, the wheat is organic and ready for delivery",
      time: "10:30 AM",
      unread: 2,
      avatar: "RK",
    },
    {
      id: 2,
      name: "Anil Traders",
      role: t('buyer', lang),
      lastMessage: lang === 'ta' ? "அரிசியின் புகைப்படங்களை அனுப்ப முடியுமா?" : "Can you send photos of the rice?",
      time: lang === 'ta' ? "நேற்று" : "Yesterday",
      unread: 0,
      avatar: "AT",
    },
    {
      id: 3,
      name: "Green Valley Storage",
      role: t('godownOwner', lang),
      lastMessage: lang === 'ta' ? "உங்கள் முன்பதிவு உறுதி செய்யப்பட்டது" : "Your booking has been confirmed",
      time: lang === 'ta' ? "2 நாட்களுக்கு முன்" : "2 days ago",
      unread: 0,
      avatar: "GV",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "other",
      text: lang === 'ta' ? "வணக்கம்! உங்கள் கோதுமையை வாங்க விரும்புகிறேன்" : "Hello! I'm interested in buying your wheat",
      time: "9:45 AM",
    },
    {
      id: 2,
      sender: "me",
      text: lang === 'ta' ? "வணக்கம்! நிச்சயமாக, என்னிடம் 2000 கிலோ உள்ளது" : "Hello! Sure, I have 2000 kg available",
      time: "9:50 AM",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">{t('messages', lang)}</h1>

        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-3 h-[calc(100vh-250px)]">
            {/* Conversations List */}
            <div className="md:col-span-1 border-r border-border">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('searchConversations', lang)}
                    className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(100%-73px)]">
                {conversations.map((conversation, index) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedChat(index)}
                    className={`w-full p-4 border-b border-border hover:bg-muted/50 transition-colors text-left ${
                      selectedChat === index ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">{conversation.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-card-foreground truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            {conversation.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="flex-shrink-0 ml-2 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{conversation.role}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {conversations[selectedChat].avatar}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      {conversations[selectedChat].name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {conversations[selectedChat].role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Messages Area Placeholder */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-card-foreground"
                      } rounded-2xl px-4 py-3`}
                    >
                      <p className="text-sm mb-1">{msg.text}</p>
                      <p
                        className={`text-xs ${
                          msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={t('typeMessage', lang)}
                    className="flex-1 px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {t('send', lang)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
