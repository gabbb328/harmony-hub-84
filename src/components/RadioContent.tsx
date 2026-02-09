import { motion } from "framer-motion";
import { Radio, Play, Wifi } from "lucide-react";
import albumCover1 from "@/assets/album-cover-1.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";
import albumCover3 from "@/assets/album-cover-3.jpg";
import albumCover4 from "@/assets/album-cover-4.jpg";

const stations = [
  { id: "1", name: "Deep Focus Radio", genre: "Ambient / Electronic", cover: albumCover3, listeners: 12453 },
  { id: "2", name: "Night Drive FM", genre: "Synthwave / Retrowave", cover: albumCover2, listeners: 8721 },
  { id: "3", name: "Chill Lounge", genre: "Lo-Fi / Chill", cover: albumCover1, listeners: 23102 },
  { id: "4", name: "Energy Boost", genre: "EDM / Dance", cover: albumCover4, listeners: 15890 },
  { id: "5", name: "Jazz & Soul", genre: "Jazz / Soul / R&B", cover: albumCover3, listeners: 6234 },
  { id: "6", name: "Indie Discovery", genre: "Indie / Alternative", cover: albumCover4, listeners: 9567 },
];

export default function RadioContent() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3"
      >
        <Radio className="w-8 h-8 text-primary" />
        Radio
      </motion.h1>
      <p className="text-muted-foreground mb-8">Stazioni curate e mixate dal DJ automatico</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((station, i) => (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass-surface rounded-xl overflow-hidden cursor-pointer group"
          >
            <div className="relative h-40">
              <img src={station.cover} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-bold text-foreground">{station.name}</h3>
                <p className="text-xs text-muted-foreground">{station.genre}</p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center gap-2">
              <Wifi className="w-3 h-3 text-primary" />
              <span className="text-xs text-muted-foreground">
                {station.listeners.toLocaleString()} ascoltatori
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
