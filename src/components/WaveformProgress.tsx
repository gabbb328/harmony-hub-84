import { useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface WaveformProgressProps {
  progress: number; // 0-100
  isPlaying: boolean;
  onSeek: (progress: number) => void;
}

const BAR_COUNT = 48;

export default function WaveformProgress({ progress, isPlaying, onSeek }: WaveformProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate pseudo-random wave heights
  const barHeights = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, (_, i) => {
      const seed = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      return 0.2 + (seed - Math.floor(seed)) * 0.8;
    });
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      onSeek(Math.max(0, Math.min(100, x * 100)));
    },
    [onSeek]
  );

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-[2px] h-10 cursor-pointer group"
      onClick={handleClick}
    >
      {barHeights.map((height, i) => {
        const barProgress = (i / BAR_COUNT) * 100;
        const isPast = barProgress <= progress;

        return (
          <motion.div
            key={i}
            className="flex-1 rounded-full min-w-[2px]"
            style={{
              backgroundColor: isPast
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground) / 0.25)",
            }}
            animate={{
              height: isPlaying
                ? `${height * 100}%`
                : `${height * 40 + 15}%`,
              scaleY: isPlaying ? [1, 0.6 + Math.random() * 0.4, 1] : 1,
            }}
            transition={
              isPlaying
                ? {
                    scaleY: {
                      duration: 0.4 + Math.random() * 0.4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: i * 0.02,
                    },
                    height: { duration: 0.3, ease: "easeOut" },
                  }
                : { height: { duration: 0.6, ease: "easeOut" } }
            }
          />
        );
      })}

      {/* Hover indicator */}
      <div className="absolute inset-0 bg-foreground/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
}
