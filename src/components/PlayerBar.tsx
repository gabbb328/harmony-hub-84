import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Mic2,
  ListMusic,
  Monitor,
  Maximize2,
} from "lucide-react";
import WaveformProgress from "./WaveformProgress";
import { formatTime } from "@/lib/mock-data";
import type { usePlayerStore } from "@/hooks/usePlayerStore";

type PlayerProps = ReturnType<typeof usePlayerStore> & {
  onExpandClick: () => void;
};

export default function PlayerBar(props: PlayerProps) {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    shuffle,
    repeat,
    toggle,
    setProgress,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    nextTrack,
    prevTrack,
    onExpandClick,
  } = props;

  if (!currentTrack) return null;

  const elapsed = (progress / 100) * currentTrack.duration;

  return (
    <div className="h-24 glass-surface border-t border-border/50 flex items-center px-4 gap-4 z-50 shrink-0">
      {/* Track info */}
      <div className="flex items-center gap-3 w-72 min-w-0">
        <motion.button
          onClick={onExpandClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative shrink-0"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTrack.id}
              src={currentTrack.cover}
              alt={currentTrack.album}
              className="w-14 h-14 rounded-lg object-cover shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-lg ring-2 ring-primary/40"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate text-foreground">
            {currentTrack.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Center controls */}
      <div className="flex-1 max-w-2xl mx-auto flex flex-col gap-1">
        <div className="flex items-center justify-center gap-4">
          <ControlBtn
            onClick={toggleShuffle}
            active={shuffle}
            icon={<Shuffle className="w-4 h-4" />}
          />
          <ControlBtn
            onClick={prevTrack}
            icon={<SkipBack className="w-4 h-4 fill-current" />}
          />

          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-background" />
            ) : (
              <Play className="w-5 h-5 text-background ml-0.5" />
            )}
          </motion.button>

          <ControlBtn
            onClick={nextTrack}
            icon={<SkipForward className="w-4 h-4 fill-current" />}
          />
          <ControlBtn
            onClick={toggleRepeat}
            active={repeat !== "off"}
            icon={
              repeat === "one" ? (
                <Repeat1 className="w-4 h-4" />
              ) : (
                <Repeat className="w-4 h-4" />
              )
            }
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-10 text-right tabular-nums">
            {formatTime(elapsed)}
          </span>
          <div className="flex-1">
            <WaveformProgress
              progress={progress}
              isPlaying={isPlaying}
              onSeek={setProgress}
            />
          </div>
          <span className="text-xs text-muted-foreground w-10 tabular-nums">
            {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 w-56 justify-end">
        <ControlBtn icon={<Mic2 className="w-4 h-4" />} />
        <ControlBtn icon={<ListMusic className="w-4 h-4" />} />
        <ControlBtn icon={<Monitor className="w-4 h-4" />} />

        <div className="flex items-center gap-1.5 ml-1">
          <button
            onClick={() => setVolume(volume === 0 ? 75 : 0)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : volume < 50 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 h-1 accent-foreground cursor-pointer"
          />
        </div>

        <ControlBtn
          onClick={onExpandClick}
          icon={<Maximize2 className="w-4 h-4" />}
        />
      </div>
    </div>
  );
}

function ControlBtn({
  onClick,
  icon,
  active,
}: {
  onClick?: () => void;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className={`p-1.5 rounded-full transition-colors ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
    </motion.button>
  );
}
