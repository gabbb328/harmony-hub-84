import { motion } from "framer-motion";
import { Play, Music, Disc3 } from "lucide-react";
import { mockTracks, mockPlaylists, type Track } from "@/lib/mock-data";

interface LibraryContentProps {
  onPlayTrack: (track: Track) => void;
}

export default function LibraryContent({ onPlayTrack }: LibraryContentProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-foreground mb-8"
      >
        La tua libreria
      </motion.h1>

      {/* Albums grid */}
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Disc3 className="w-5 h-5 text-muted-foreground" />
        Album
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10">
        {mockPlaylists.map((pl, i) => (
          <motion.div
            key={pl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden mb-3 aspect-square shadow-lg">
              <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors" />
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-xl">
                  <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                </div>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-foreground truncate">{pl.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{pl.trackCount} brani</p>
          </motion.div>
        ))}
      </div>

      {/* All tracks */}
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Music className="w-5 h-5 text-muted-foreground" />
        Tutti i brani
      </h2>
      <div className="space-y-1">
        {mockTracks.map((track, i) => (
          <motion.button
            key={track.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onPlayTrack(track)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors group"
          >
            <span className="w-6 text-right text-sm text-muted-foreground tabular-nums group-hover:hidden">{i + 1}</span>
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
    </div>
  );
}
