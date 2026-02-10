import React, { useState, useRef } from "react";
import {
  BookOpen,
  Download,
  ChevronDown,
  ChevronRight,
  Music,
  Sparkles,
} from "lucide-react";

/**
 * IMPORTANTE
 * Este Ebook lê tudo de:
 * window.DESAFIO_DATA (data/desafio.js)
 */

export default function Ebook() {
  const data = window.DESAFIO_DATA;

  const modules = data?.modules || [];
  const songs = data?.songs || [];
  const mentoria = data?.mentoria;

  const [activeModule, setActiveModule] = useState(null);
  const contentRef = useRef(null);

  const songsByLevel = {
    2: songs.filter((s) => s.level === 2),
    3: songs.filter((s) => s.level === 3),
    4: songs.filter((s) => s.level === 4),
    "5+": songs.filter((s) => s.level >= 5),
  };

  const handlePrint = () => window.print();

  return (
    <div
      ref={contentRef}
      className="min-h-screen px-4 py-8 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950"
    >
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">
              Ebook Interativo
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {data.app?.title}
          </h1>

          <p className="text-purple-200 mb-6">
            {data.app?.subtitle}
          </p>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-purple-900 font-bold px-6 py-3 rounded-xl hover:scale-[1.02] transition"
          >
            <Download className="w-5 h-5" />
            Baixar PDF
          </button>
        </div>

        {/* MÓDULOS */}
        <div className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-purple-800/30 rounded-2xl border border-purple-700/50 overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveModule(
                    activeModule === module.id ? null : module.id
                  )
                }
                className="w-full flex items-center justify-between p-5 hover:bg-purple-700/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>

                  <div className="text-left">
                    <p className="text-xs text-purple-400 uppercase">
                      Módulo {module.id}
                    </p>
                    <h3 className="text-lg font-bold text-white">
                      {module.title}
                    </h3>
                  </div>
                </div>

                <ChevronDown
                  className={`w-6 h-6 text-purple-300 transition-transform ${
                    activeModule === module.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeModule === module.id && (
                <div className="px-5 pb-6 border-t border-purple-700/50">
                  <div className="pt-6 space-y-6">

                    {/* VÍDEO */}
                    {module.videoUrl && (
                      <div className="aspect-video rounded-xl overflow-hidden border border-purple-700">
                        <iframe
                          src={module.videoUrl}
                          title={module.title}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {/* TEXTO */}
                    {module.content && (
                      <div className="bg-purple-900/50 rounded-xl p-6 border border-purple-700 text-purple-100 leading-relaxed whitespace-pre-line">
                        {module.content}
                      </div>
                    )}

                    {/* INFO BOXES */}
                    {module.infoBoxes?.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {module.infoBoxes.map((box, i) => (
                          <div
                            key={i}
                            className="bg-purple-900/50 rounded-xl p-6 border border-purple-700"
                          >
                            <h3 className="text-xl font-bold text-yellow-400 mb-4">
                              {box.title}
                            </h3>

                            {box.content && (
                              <p className="text-white mb-4">
                                {box.content}
                              </p>
                            )}

                            {box.items && (
                              <ul className="space-y-2 text-white">
                                {box.items.map((item, j) => (
                                  <li key={j} className="flex gap-2">
                                    <ChevronRight className="w-4 h-4 text-green-400 mt-1" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* MÚSICAS */}
                    {module.id === 5 && (
                      <>
                        {[2, 3, 4, "5+"].map((level) => (
                          songsByLevel[level]?.length > 0 && (
                            <div key={level}>
                              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                                Músicas nível {level}
                              </h3>

                              <div className="grid md:grid-cols-2 gap-4">
                                {songsByLevel[level].map((song) => (
                                  <div
                                    key={song.id}
                                    className="bg-purple-900/50 p-4 rounded-xl border border-purple-700"
                                  >
                                    <h4 className="text-white font-bold">
                                      {song.title}
                                    </h4>
                                    <p className="text-purple-300 text-sm italic">
                                      {song.artist}
                                    </p>
                                    <p className="text-purple-200 text-sm mt-2">
                                      Acordes: {song.chords.join(", ")}
                                    </p>

                                    <div className="flex gap-3 mt-3">
                                      {song.videoUrl && (
                                        <a
                                          href={song.videoUrl}
                                          target="_blank"
                                          className="text-green-400 text-sm underline"
                                        >
                                          Vídeo
                                        </a>
                                      )}
                                      {song.pdfUrl && (
                                        <a
                                          href={song.pdfUrl}
                                          target="_blank"
                                          className="text-yellow-400 text-sm underline"
                                        >
                                          PDF
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        ))}
                      </>
                    )}

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MENTORIA */}
        {mentoria && (
          <div className="mt-14 bg-gradient-to-br from-yellow-500/20 to-green-500/20 rounded-2xl p-8 border border-yellow-500/40 text-center">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />

            <h2 className="text-2xl font-black text-white mb-3">
              {mentoria.title}
            </h2>

            <p className="text-purple-200 max-w-2xl mx-auto mb-6">
              {mentoria.description}
            </p>

            <a
              href={mentoria.ctaUrl}
              target="_blank"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-xl hover:scale-[1.03] transition"
            >
              <Music className="w-5 h-5" />
              {mentoria.ctaText}
            </a>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-12 text-center py-6 border-t border-purple-700/50">
          <p className="text-yellow-400 font-semibold">
            {data.app?.slogan}
          </p>
        </div>
      </div>
    </div>
  );
}
