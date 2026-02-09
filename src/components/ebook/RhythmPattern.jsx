import React from "react";

export default function RhythmPattern({ name = "Ritmo", pattern }) {
  return (
    <div className="bg-purple-900/40 border border-purple-700/50 rounded-2xl p-4">
      <div className="text-white font-bold mb-2">{name}</div>
      <div className="text-purple-200 text-sm">
        {pattern || "(Padrão do ritmo será adicionado aqui)"}
      </div>
    </div>
  );
}
