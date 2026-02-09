import React from "react";
import { Music } from "lucide-react";

export default function SongCard({ title, artist, chords = [], level }) {
  return (
    <div className="bg-purple-900/40 border border-purple-700/50 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <Music className="w-5 h-5 text-green-400" />
        </div>
        <div className="flex-1">
          <div className="text-white font-black">{title}</div>
          <div className="text-purple-200 text-sm">{artist}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
              nível {level}
            </span>
            {chords.map((c) => (
              <span key={c} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
