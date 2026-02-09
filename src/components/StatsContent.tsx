import { motion } from "framer-motion";
import { BarChart3, Clock, TrendingUp, Music, Headphones, Disc3 } from "lucide-react";

const topArtists = [
  { name: "Luna Waves", plays: 342, pct: 100 },
  { name: "Skyline", plays: 287, pct: 84 },
  { name: "Aether", plays: 231, pct: 67 },
  { name: "Pastel Dreams", plays: 198, pct: 58 },
  { name: "Noctis", plays: 156, pct: 46 },
];

const topGenres = [
  { name: "Electronic", pct: 35, color: "bg-cyan-500" },
  { name: "Ambient", pct: 25, color: "bg-indigo-500" },
  { name: "Lo-Fi", pct: 20, color: "bg-emerald-500" },
  { name: "Pop", pct: 12, color: "bg-pink-500" },
  { name: "Altro", pct: 8, color: "bg-muted-foreground" },
];

const listeningHours = [
  { day: "Lun", hours: 2.5 },
  { day: "Mar", hours: 3.2 },
  { day: "Mer", hours: 1.8 },
  { day: "Gio", hours: 4.1 },
  { day: "Ven", hours: 5.3 },
  { day: "Sab", hours: 6.2 },
  { day: "Dom", hours: 4.8 },
];

const maxHours = Math.max(...listeningHours.map((d) => d.hours));

const stats = [
  { label: "Ore totali", value: "127", icon: Clock },
  { label: "Brani ascoltati", value: "2,843", icon: Music },
  { label: "Artisti diversi", value: "186", icon: Headphones },
  { label: "Album completi", value: "34", icon: Disc3 },
];

export default function StatsContent() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3"
      >
        <BarChart3 className="w-8 h-8 text-primary" />
        Le tue statistiche
      </motion.h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-surface rounded-xl p-5"
          >
            <stat.icon className="w-5 h-5 text-primary mb-3" />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-surface rounded-xl p-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
            Ascolto settimanale
          </h2>
          <div className="flex items-end justify-between gap-3 h-40">
            {listeningHours.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                  transition={{ delay: 0.5 + i * 0.08, type: "spring" as const, stiffness: 100 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary/60 to-primary min-h-[4px]"
                />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top artists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-surface rounded-xl p-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-6">Top Artisti</h2>
          <div className="space-y-4">
            {topArtists.map((artist, i) => (
              <div key={artist.name} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-5 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-1">{artist.name}</p>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${artist.pct}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{artist.plays} plays</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Genre breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-surface rounded-xl p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-bold text-foreground mb-6">Generi preferiti</h2>
          <div className="flex items-center gap-2 h-8 rounded-full overflow-hidden mb-4">
            {topGenres.map((g) => (
              <motion.div
                key={g.name}
                initial={{ width: 0 }}
                animate={{ width: `${g.pct}%` }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className={`h-full ${g.color} first:rounded-l-full last:rounded-r-full`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {topGenres.map((g) => (
              <div key={g.name} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${g.color}`} />
                <span className="text-sm text-muted-foreground">{g.name} ({g.pct}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
