import React from "react";

export default function ChordDiagram({ name = "Acorde", diagram }) {
  // placeholder leve (pra não travar o build)
  return (
    <div className="bg-purple-900/40 border border-purple-700/50 rounded-2xl p-4">
      <div className="text-white font-bold mb-2">{name}</div>
      <div className="text-purple-200 text-sm">
        (Diagrama será adicionado aqui)
      </div>
    </div>
  );
}
