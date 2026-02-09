import { useState, useCallback } from "react";
import { Track, mockTracks } from "@/lib/mock-data";

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
  queue: Track[];
}

export function usePlayerStore() {
  const [state, setState] = useState<PlayerState>({
    currentTrack: mockTracks[0],
    isPlaying: false,
    progress: 35,
    volume: 75,
    shuffle: false,
    repeat: "off",
    queue: mockTracks,
  });

  const play = useCallback(() => setState((s) => ({ ...s, isPlaying: true })), []);
  const pause = useCallback(() => setState((s) => ({ ...s, isPlaying: false })), []);
  const toggle = useCallback(() => setState((s) => ({ ...s, isPlaying: !s.isPlaying })), []);

  const setProgress = useCallback((p: number) => setState((s) => ({ ...s, progress: p })), []);
  const setVolume = useCallback((v: number) => setState((s) => ({ ...s, volume: v })), []);

  const toggleShuffle = useCallback(() => setState((s) => ({ ...s, shuffle: !s.shuffle })), []);
  const toggleRepeat = useCallback(() =>
    setState((s) => ({
      ...s,
      repeat: s.repeat === "off" ? "all" : s.repeat === "all" ? "one" : "off",
    })), []);

  const playTrack = useCallback((track: Track) => {
    setState((s) => ({ ...s, currentTrack: track, isPlaying: true, progress: 0 }));
  }, []);

  const nextTrack = useCallback(() => {
    setState((s) => {
      if (!s.currentTrack) return s;
      const idx = s.queue.findIndex((t) => t.id === s.currentTrack!.id);
      const next = s.queue[(idx + 1) % s.queue.length];
      return { ...s, currentTrack: next, progress: 0 };
    });
  }, []);

  const prevTrack = useCallback(() => {
    setState((s) => {
      if (!s.currentTrack) return s;
      const idx = s.queue.findIndex((t) => t.id === s.currentTrack!.id);
      const prev = s.queue[(idx - 1 + s.queue.length) % s.queue.length];
      return { ...s, currentTrack: prev, progress: 0 };
    });
  }, []);

  return { ...state, play, pause, toggle, setProgress, setVolume, toggleShuffle, toggleRepeat, playTrack, nextTrack, prevTrack };
}
