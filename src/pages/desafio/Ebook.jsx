import React, { useState, useRef } from 'react';
import {
  BookOpen,
  Download,
  Music,
  Guitar,
  ChevronRight,
  ChevronDown,
  Sparkles,
  MessageCircle,
  ShoppingCart
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

import ChordDiagram from '@/components/ebook/ChordDiagram';
import RhythmPattern from '@/components/ebook/RhythmPattern';
import SongCard from '@/components/ebook/SongCard';
import GuitarDiagram from '@/components/ebook/GuitarDiagram';
import TuningGuide from '@/components/ebook/TuningGuide';
import VideoEmbed from '@/components/ebook/VideoEmbed';
import ReactMarkdown from 'react-markdown';

import { desafioModules, desafioSongs } from '@/data/desafio';

export default function Ebook() {
  const [activeModule, setActiveModule] = useState(null);
  const contentRef = useRef(null);

  const modules = desafioModules;
  const songs = desafioSongs;

  const songsByLevel = {
    2: songs.filter(s => s.level === 2),
    3: songs.filter(s => s.level === 3),
    4: songs.filter(s => s.level === 4),
    '5+': songs.filter(s => s.level >= 5),
  };

  const getModuleById = (id) =>
    modules.find(m => m.id === id);

  const getModuleVideo = (id) =>
    getModuleById(id)?.videoUrl || null;

  const getModuleContent = (id) =>
    getModuleById(id)?.content || '';

  const getModuleInfoBoxes = (id) =>
    getModuleById(id)?.infoBoxes || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 px-4" ref={contentRef}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Ebook de Apoio</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            DESAFIO VIOLÃO <span className="text-green-400">10</span> em{' '}
            <span className="text-green-400">30</span>
          </h1>
          <p className="text-purple-200">
            Ebook de apoio às vídeo-aulas do curso on-line
          </p>

          <Button
            onClick={handlePrint}
            className="mt-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-purple-900 font-bold px-6 py-3 rounded-xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Baixar PDF do Conteúdo
          </Button>
        </div>

        {/* Módulos */}
        <div className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-purple-800/30 rounded-2xl border border-purple-700/50 overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveModule(activeModule === module.id ? null : module.id)
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
                    activeModule === module.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeModule === module.id && (
                <div className="px-5 pb-6 border-t border-purple-700/50">
                  <div className="pt-6 space-y-6">

                    {getModuleVideo(module.id) && (
                      <VideoEmbed
                        videoUrl={getModuleVideo(module.id)}
                        title={module.title}
                      />
                    )}

                    {getModuleContent(module.id) && (
                      <div className="bg-purple-900/50 rounded-xl p-6 border border-purple-700">
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown>
                            {getModuleContent(module.id)}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}

                    {getModuleInfoBoxes(module.id).length > 0 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {getModuleInfoBoxes(module.id).map((box, idx) => (
                          <div
                            key={idx}
                            className="bg-purple-900/50 rounded-xl p-6 border border-purple-700"
                          >
                            <h3 className="text-xl font-bold text-yellow-400 mb-4">
                              {box.title}
                            </h3>
                            {box.content && (
                              <p className="text-white">{box.content}</p>
                            )}
                            {box.items && (
                              <ul className="mt-4 space-y-2 text-white">
                                {box.items.map((item, i) => (
                                  <li key={i} className="flex gap-2">
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

                    {module.id === 5 && (
                      <>
                        {[2, 3, 4, '5+'].map(level => (
                          songsByLevel[level]?.length > 0 && (
                            <div key={level}>
                              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                                Músicas nível {level}
                              </h3>
                              <div className="grid md:grid-cols-2 gap-4">
                                {songsByLevel[level].map(song => (
                                  <SongCard key={song.id} {...song} />
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

        {/* Footer */}
        <div className="mt-12 text-center py-6 border-t border-purple-700/50">
          <p className="text-yellow-400 font-semibold">
            "Do zero às suas primeiras 10 músicas em 30 dias – Aqui Você é Capaz!"
          </p>
        </div>

      </div>
    </div>
  );
}
