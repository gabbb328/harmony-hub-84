import { motion } from "framer-motion";
import { Play, Sparkles, TrendingUp, Clock } from "lucide-react";
import { mockTracks, mockPlaylists, recentlyPlayed, type Track } from "@/lib/mock-data";

interface HomeContentProps {
  onPlayTrack: (track: Track) => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 25, stiffness: 200 } },
};

export default function HomeContent({ onPlayTrack }: HomeContentProps) {
  const greeting = getGreeting();

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <motion.div variants={container} initial="hidden" animate="show">
        {/* Greeting */}
        <motion.h1 variants={item} className="text-3xl font-bold text-foreground mb-8">
          {greeting}
        </motion.h1>

        {/* Quick picks grid */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3 mb-10">
          {recentlyPlayed.map((track) => (
            <motion.button
              key={track.id}
              onClick={() => onPlayTrack(track)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-secondary/50 hover:bg-secondary rounded-lg overflow-hidden group transition-colors duration-200"
            >
              <img src={track.cover} alt="" className="w-12 h-12 object-cover" />
              <span className="text-sm font-medium text-foreground truncate pr-2">
                {track.title}
              </span>
              <div className="ml-auto pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* AI DJ Section */}
        <motion.div variants={item} className="mb-10">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-music p-6 cursor-pointer group"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">AI DJ</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Il tuo DJ personale</h3>
              <p className="text-muted-foreground text-sm">
                Lascia che l'AI scelga la musica perfetta per il tuo momento
              </p>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-60 group-hover:opacity-100 transition-opacity">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border-2 border-primary/30 border-t-primary"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Playlists */}
        <Section title="Le tue playlist" icon={<TrendingUp className="w-5 h-5" />}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {mockPlaylists.map((pl) => (
              <motion.div
                key={pl.id}
                variants={item}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-square shadow-lg">
                  <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-3 right-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-sm font-semibold text-foreground truncate">{pl.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{pl.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Recently played tracks */}
        <Section title="Ascoltati di recente" icon={<Clock className="w-5 h-5" />}>
          <div className="space-y-1">
            {mockTracks.map((track, i) => (
              <motion.button
                key={track.id}
                variants={item}
                onClick={() => onPlayTrack(track)}
                whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg group transition-colors"
              >
                <span className="w-6 text-right text-sm text-muted-foreground tabular-nums group-hover:hidden">
                  {i + 1}
                </span>
                <Play className="w-4 h-4 text-foreground hidden group-hover:block ml-1" />
                <img src={track.cover} alt="" className="w-10 h-10 rounded object-cover" />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
                <span className="text-sm text-muted-foreground">{track.album}</span>
                <span className="text-sm text-muted-foreground tabular-nums ml-8">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>
        </Section>

        {/* Spacer for player bar */}
        <div className="h-8" />
      </motion.div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.section variants={item} className="mb-10">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buongiorno ☀️";
  if (h < 18) return "Buon pomeriggio 🌤";
  return "Buonasera 🌙";
}
