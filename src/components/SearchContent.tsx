import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, TrendingUp, X } from "lucide-react";
import { mockTracks, mockPlaylists, type Track } from "@/lib/mock-data";

interface SearchContentProps {
  onPlayTrack: (track: Track) => void;
}

const genres = [
  { name: "Pop", color: "from-pink-500 to-rose-600" },
  { name: "Hip-Hop", color: "from-amber-500 to-orange-600" },
  { name: "Rock", color: "from-red-500 to-red-700" },
  { name: "Electronic", color: "from-cyan-400 to-blue-600" },
  { name: "Jazz", color: "from-yellow-500 to-amber-600" },
  { name: "Classica", color: "from-indigo-400 to-purple-600" },
  { name: "R&B", color: "from-fuchsia-500 to-pink-600" },
  { name: "Lo-Fi", color: "from-teal-400 to-emerald-600" },
  { name: "Indie", color: "from-lime-400 to-green-600" },
  { name: "Metal", color: "from-slate-500 to-zinc-700" },
  { name: "Ambient", color: "from-sky-400 to-indigo-500" },
  { name: "Latin", color: "from-orange-400 to-red-500" },
];

export default function SearchContent({ onPlayTrack }: SearchContentProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? mockTracks.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.artist.toLowerCase().includes(query.toLowerCase()) ||
          t.album.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Search bar */}
      <div className="relative max-w-xl mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cosa vuoi ascoltare?"
          className="w-full h-12 pl-12 pr-10 rounded-full bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {query.trim() ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-lg font-bold text-foreground mb-4">Risultati</h2>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">Nessun risultato per "{query}"</p>
          ) : (
            <div className="space-y-1">
              {filtered.map((track, i) => (
                <motion.button
                  key={track.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onPlayTrack(track)}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <img src={track.cover} alt="" className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{track.artist} · {track.album}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        <>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
            Esplora generi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.map((genre, i) => (
              <motion.button
                key={genre.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, type: "spring" as const, stiffness: 200 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setQuery(genre.name)}
                className={`relative h-28 rounded-xl overflow-hidden bg-gradient-to-br ${genre.color} p-4 text-left`}
              >
                <span className="text-lg font-bold text-foreground">{genre.name}</span>
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
