import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic2, BookOpen, Languages, Lightbulb } from "lucide-react";
import type { Track } from "@/lib/mock-data";

interface LyricsContentProps {
  currentTrack: Track | null;
}

const mockLyrics = [
  { time: 0, text: "Walking through the midnight rain" },
  { time: 5, text: "Echoes bouncing off the walls" },
  { time: 10, text: "Every step a different sound" },
  { time: 15, text: "Lost inside the city lights" },
  { time: 20, text: "Searching for a sign tonight" },
  { time: 25, text: "Dancing with the shadows near" },
  { time: 30, text: "Whispers only I can hear" },
  { time: 35, text: "Melody that fills the air" },
  { time: 40, text: "Finding peace beyond the noise" },
  { time: 45, text: "Music is my only voice" },
  { time: 50, text: "Rhythms flowing through my veins" },
  { time: 55, text: "Breaking free from all the chains" },
];

const translations: Record<string, string> = {
  "Walking through the midnight rain": "Camminando sotto la pioggia di mezzanotte",
  "Echoes bouncing off the walls": "Echi che rimbalzano sui muri",
  "Every step a different sound": "Ogni passo un suono diverso",
  "Lost inside the city lights": "Perso nelle luci della città",
  "Searching for a sign tonight": "Cercando un segno stanotte",
  "Dancing with the shadows near": "Danzando con le ombre vicine",
  "Whispers only I can hear": "Sussurri che solo io posso sentire",
  "Melody that fills the air": "Melodia che riempie l'aria",
  "Finding peace beyond the noise": "Trovando pace oltre il rumore",
  "Music is my only voice": "La musica è la mia unica voce",
  "Rhythms flowing through my veins": "Ritmi che scorrono nelle mie vene",
  "Breaking free from all the chains": "Liberandomi da tutte le catene",
};

const explanations: Record<string, string> = {
  "Walking through the midnight rain": "Metafora del viaggio interiore, la pioggia rappresenta le emozioni",
  "Lost inside the city lights": "Contrasto tra la modernità e la solitudine interiore",
  "Music is my only voice": "La musica come forma di espressione autentica quando le parole non bastano",
};

type Mode = "lyrics" | "translate" | "learn";

export default function LyricsContent({ currentTrack }: LyricsContentProps) {
  const [activeLine, setActiveLine] = useState(3);
  const [mode, setMode] = useState<Mode>("lyrics");

  if (!currentTrack) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Mic2 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Riproduci un brano per vedere i testi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src={currentTrack.cover} alt="" className="w-14 h-14 rounded-lg object-cover shadow-lg" />
          <div>
            <h1 className="text-xl font-bold text-foreground">{currentTrack.title}</h1>
            <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-secondary">
          {([
            { id: "lyrics" as Mode, label: "Testi", icon: Mic2 },
            { id: "translate" as Mode, label: "Traduci", icon: Languages },
            { id: "learn" as Mode, label: "Impara", icon: Lightbulb },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lyrics */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence>
          {mockLyrics.map((line, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveLine(i)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                activeLine === i
                  ? "bg-primary/10"
                  : "hover:bg-secondary/50"
              }`}
            >
              <p
                className={`text-lg font-medium transition-all duration-500 ${
                  activeLine === i
                    ? "text-primary text-2xl"
                    : Math.abs(activeLine - i) === 1
                    ? "text-foreground/70"
                    : "text-muted-foreground/40"
                }`}
              >
                {line.text}
              </p>

              {/* Translation */}
              {mode === "translate" && activeLine === i && translations[line.text] && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-sm text-accent mt-2"
                >
                  🇮🇹 {translations[line.text]}
                </motion.p>
              )}

              {/* Explanation */}
              {mode === "learn" && activeLine === i && explanations[line.text] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 p-3 rounded-lg bg-accent/10 border border-accent/20"
                >
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <p className="text-sm text-accent">{explanations[line.text]}</p>
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
