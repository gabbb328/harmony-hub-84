import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Zap, Music, Sun, Moon, Coffee } from "lucide-react";
import { mockTracks, type Track } from "@/lib/mock-data";

interface AIDJContentProps {
  onPlayTrack: (track: Track) => void;
}

interface Message {
  id: string;
  role: "ai" | "user";
  text: string;
  tracks?: Track[];
}

const moodSuggestions = [
  { label: "Energetico", icon: Zap, mood: "energetico" },
  { label: "Rilassante", icon: Sun, mood: "rilassante" },
  { label: "Notturno", icon: Moon, mood: "notturno" },
  { label: "Focus", icon: Coffee, mood: "focus" },
];

const aiResponses: Record<string, { text: string; trackIds: string[] }> = {
  energetico: {
    text: "🔥 Perfetto! Ho selezionato brani ad alta energia con BPM sostenuto. Questi ti daranno la carica giusta!",
    trackIds: ["2", "5", "6"],
  },
  rilassante: {
    text: "🌊 Ecco una selezione chill per rilassarti. Ho scelto brani con BPM basso e atmosfere morbide.",
    trackIds: ["4", "8", "3"],
  },
  notturno: {
    text: "🌙 Vibes notturne in arrivo. Ho mixato atmosfere deep con melodie ipnotiche.",
    trackIds: ["1", "5", "7"],
  },
  focus: {
    text: "🎯 Modalità concentrazione attivata. Questi brani hanno il ritmo perfetto per lavorare senza distrazioni.",
    trackIds: ["3", "7", "8"],
  },
};

export default function AIDJContent({ onPlayTrack }: AIDJContentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Ciao! Sono il tuo AI DJ 🎧 Dimmi che mood hai o scegli tra le opzioni qui sotto. Creerò la playlist perfetta per te!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (mood: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: mood };
    setMessages((prev) => [...prev, userMsg]);

    const key = Object.keys(aiResponses).find((k) => mood.toLowerCase().includes(k)) || "energetico";
    const response = aiResponses[key];
    const tracks = response.trackIds.map((id) => mockTracks.find((t) => t.id === id)!).filter(Boolean);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "ai", text: response.text, tracks },
      ]);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSend(input.trim());
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI DJ</h1>
            <p className="text-sm text-muted-foreground">Il tuo assistente musicale intelligente</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-lg rounded-2xl px-5 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "glass-surface text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.tracks && msg.tracks.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {msg.tracks.map((track) => (
                      <motion.button
                        key={track.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onPlayTrack(track)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg bg-background/30 hover:bg-background/50 transition-colors"
                      >
                        <img src={track.cover} alt="" className="w-10 h-10 rounded object-cover" />
                        <div className="text-left min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{track.title}</p>
                          <p className="text-xs opacity-70 truncate">{track.artist} · {track.bpm} BPM</p>
                        </div>
                        <Music className="w-4 h-4 opacity-50" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Mood suggestions */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {moodSuggestions.map((s) => (
              <motion.button
                key={s.mood}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(s.mood)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-surface hover:bg-secondary/80 transition-colors"
              >
                <s.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{s.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-8 py-4">
        <div className="flex items-center gap-3 p-2 rounded-full glass-surface">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dimmi il tuo mood..."
            className="flex-1 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
