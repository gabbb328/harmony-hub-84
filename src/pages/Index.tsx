import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import PlayerBar from "@/components/PlayerBar";
import HomeContent from "@/components/HomeContent";
import NowPlayingView from "@/components/NowPlayingView";
import { usePlayerStore } from "@/hooks/usePlayerStore";

const Index = () => {
  const player = usePlayerStore();
  const [activeSection, setActiveSection] = useState("home");
  const [showNowPlaying, setShowNowPlaying] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex flex-1 min-h-0">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 flex flex-col min-w-0">
          <HomeContent onPlayTrack={player.playTrack} />
        </main>
      </div>
      <PlayerBar {...player} onExpandClick={() => setShowNowPlaying(true)} />

      <AnimatePresence>
        {showNowPlaying && (
          <NowPlayingView {...player} onClose={() => setShowNowPlaying(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
