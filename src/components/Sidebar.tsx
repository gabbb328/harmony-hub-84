import { motion } from "framer-motion";
import { Home, Search, Library, Radio, Mic2, BarChart3, Headphones, Sparkles, Heart, Clock, ListMusic } from "lucide-react";
import { mockPlaylists } from "@/lib/mock-data";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const mainNav = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Cerca", icon: Search },
  { id: "library", label: "Libreria", icon: Library },
];

const features = [
  { id: "ai-dj", label: "AI DJ", icon: Sparkles },
  { id: "radio", label: "Radio", icon: Radio },
  { id: "lyrics", label: "Testi", icon: Mic2 },
  { id: "stats", label: "Statistiche", icon: BarChart3 },
  { id: "devices", label: "Dispositivi", icon: Headphones },
];

const libraryItems = [
  { id: "liked", label: "Brani che ti piacciono", icon: Heart },
  { id: "recent", label: "Ascoltati di recente", icon: Clock },
  { id: "queue", label: "Coda", icon: ListMusic },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-64 h-full flex flex-col bg-sidebar border-r border-sidebar-border overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="px-6 py-5">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-gradient-primary">Music</span>
          <span className="text-foreground">Hub</span>
        </h1>
      </div>

      {/* Main nav */}
      <nav className="px-3 space-y-1">
        {mainNav.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={activeSection === item.id}
            onClick={() => onSectionChange(item.id)}
          />
        ))}
      </nav>

      {/* Features */}
      <div className="px-3 mt-6">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          Funzioni
        </p>
        {features.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={activeSection === item.id}
            onClick={() => onSectionChange(item.id)}
          />
        ))}
      </div>

      {/* Library */}
      <div className="px-3 mt-6">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          La tua musica
        </p>
        {libraryItems.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={activeSection === item.id}
            onClick={() => onSectionChange(item.id)}
          />
        ))}
      </div>

      {/* Playlists */}
      <div className="px-3 mt-6 flex-1">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          Playlist
        </p>
        <div className="space-y-0.5">
          {mockPlaylists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => onSectionChange(`playlist-${pl.id}`)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors duration-200"
            >
              <img src={pl.cover} alt="" className="w-8 h-8 rounded object-cover" />
              <span className="truncate">{pl.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-foreground bg-secondary"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <Icon className="w-5 h-5 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
