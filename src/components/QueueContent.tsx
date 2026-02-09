import { motion } from "framer-motion";
import { GripVertical, Play, X, ListMusic } from "lucide-react";
import { type Track, formatTime } from "@/lib/mock-data";

interface QueueContentProps {
  queue: Track[];
  currentTrack: Track | null;
  onPlayTrack: (track: Track) => void;
}

export default function QueueContent({ queue, currentTrack, onPlayTrack }: QueueContentProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3"
      >
        <ListMusic className="w-8 h-8 text-primary" />
        Coda di riproduzione
      </motion.h1>

      {/* Now playing */}
      {currentTrack && (
        <div className="mb-8">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">In riproduzione</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20"
          >
            <img src={currentTrack.cover} alt="" className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">{formatTime(currentTrack.duration)}</span>
          </motion.div>
        </div>
      )}

      {/* Queue */}
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Prossimi brani</p>
      <div className="space-y-1">
        {queue
          .filter((t) => t.id !== currentTrack?.id)
          .map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground/30 shrink-0" />
              <span className="w-6 text-right text-sm text-muted-foreground tabular-nums">{i + 1}</span>
              <button onClick={() => onPlayTrack(track)} className="shrink-0">
                <img src={track.cover} alt="" className="w-10 h-10 rounded object-cover" />
              </button>
              <button onClick={() => onPlayTrack(track)} className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </button>
              <span className="text-xs text-muted-foreground tabular-nums">{formatTime(track.duration)}</span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
