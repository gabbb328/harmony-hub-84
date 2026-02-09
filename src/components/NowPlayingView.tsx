import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Share2, MoreHorizontal, Sparkles, BarChart3 } from "lucide-react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from "lucide-react";
import WaveformProgress from "./WaveformProgress";
import VisualizerCanvas from "./VisualizerCanvas";
import { formatTime } from "@/lib/mock-data";
import type { usePlayerStore } from "@/hooks/usePlayerStore";

type NowPlayingProps = ReturnType<typeof usePlayerStore> & {
  onClose: () => void;
};

export default function NowPlayingView(props: NowPlayingProps) {
  const { currentTrack, isPlaying, progress, toggle, setProgress, nextTrack, prevTrack, shuffle, repeat, toggleShuffle, toggleRepeat, onClose } = props;
  const [showVisualizer, setShowVisualizer] = useState(false);

  if (!currentTrack) return null;

  const elapsed = (progress / 100) * currentTrack.duration;

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
    >
      {/* Blurred background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrack.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img src={currentTrack.cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[80px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </motion.div>
      </AnimatePresence>

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-4 z-10">
        <motion.button onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors">
          <X className="w-6 h-6" />
        </motion.button>
        <p className="text-sm font-medium text-foreground/70 uppercase tracking-wider">In riproduzione</p>
        <div className="flex items-center gap-1">
          <motion.button onClick={() => setShowVisualizer(!showVisualizer)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-colors ${showVisualizer ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-foreground hover:bg-foreground/10"}`}>
            <BarChart3 className="w-6 h-6" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors">
            <MoreHorizontal className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 z-10">
        {showVisualizer ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-80 h-80 flex items-center justify-center">
            <VisualizerCanvas isPlaying={isPlaying} />
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={currentTrack.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative">
              <img src={currentTrack.cover} alt={currentTrack.album} className="w-80 h-80 rounded-2xl object-cover shadow-2xl" />
              {isPlaying && (
                <motion.div className="absolute -inset-1 rounded-2xl glow-primary opacity-30"
                  animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Track info */}
        <div className="mt-10 text-center w-full max-w-md">
          <div className="flex items-center justify-between">
            <div className="text-left min-w-0">
              <motion.h2 key={currentTrack.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-foreground truncate">
                {currentTrack.title}
              </motion.h2>
              <p className="text-lg text-muted-foreground mt-1">{currentTrack.artist}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-6 h-6" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Waveform */}
          <div className="mt-6">
            <WaveformProgress progress={progress} isPlaying={isPlaying} onSeek={setProgress} />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground tabular-nums">{formatTime(elapsed)}</span>
              <span className="text-xs text-muted-foreground tabular-nums">{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={toggleShuffle}
              className={`p-2 ${shuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"} transition-colors`}>
              <Shuffle className="w-5 h-5" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={prevTrack} className="p-2 text-foreground">
              <SkipBack className="w-6 h-6 fill-current" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggle}
              className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center shadow-xl">
              {isPlaying ? <Pause className="w-7 h-7 text-background" /> : <Play className="w-7 h-7 text-background ml-1" />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={nextTrack} className="p-2 text-foreground">
              <SkipForward className="w-6 h-6 fill-current" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={toggleRepeat}
              className={`p-2 ${repeat !== "off" ? "text-primary" : "text-muted-foreground hover:text-foreground"} transition-colors`}>
              {repeat === "one" ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* AI Mood badge */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Mood: <span className="text-foreground font-medium">Energetico</span> · {currentTrack.bpm} BPM
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
