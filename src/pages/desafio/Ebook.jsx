import React, { useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Download,
  Guitar,
  Music,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";

import ChordDiagram from '@/components/ebook/ChordDiagram';
import RhythmPattern from '@/components/ebook/RhythmPattern';
import SongCard from '@/components/ebook/SongCard';
import GuitarDiagram from '@/components/ebook/GuitarDiagram';
import TuningGuide from '@/components/ebook/TuningGuide';
import VideoEmbed from '@/components/ebook/VideoEmbed';
import OfferCard from '@/components/ebook/OfferCard';
import ExpressModule from '@/components/ebook/ExpressModule';

import { desafioModules, desafioSongs, desafioOffers } from '@/data/desafio';

function getProgress() {
  try {
    const raw = localStorage.getItem('dv_progress');
    return raw ? JSON.parse(raw) : { completedModules: [] };
  } catch {
    return { completedModules: [] };
  }
}

function setProgress(next) {
  localStorage.setItem('dv_progress', JSON.stringify(next));
}

export default function Ebook() {
  const [activeModule, setActiveModule] = useState(null);
  const contentRef = useRef(null);

  const modules = desafioModules;
  const songs = desafioSongs;
  const offers = desafioOffers;

  const songsByLevel = useMemo(() => ({
    2: songs.filter(s => s.level === 2),
    3: songs.filter(s => s.level === 3),
    4: songs.filter(s => s.level === 4),
    '5+': songs.filter(s => s.level >= 5),
  }), [songs]);

  const chords = [
    { name: 'C', chord: ['x', 3, 2, 0, 1, 0], fingers: ['', 3, 2, '', 1, ''] },
    { name: 'G', chord: [3, 2, 0, 0, 0, 3], fingers: [2, 1, '', '', '', 3] },
    { name: 'Am', chord: ['x', 0, 2, 2, 1, 0], fingers: ['', '', 2, 3, 1, ''] },
    { name: 'D', chord: ['x', 'x', 0, 2, 3, 2], fingers: ['', '', '', 1, 3, 2] },
    { name: 'A', chord: ['x', 0, 2, 2, 2, 0], fingers: ['', '', 1, 2, 3, ''] },
    { name: 'Em', chord: [0, 2, 2, 0, 0, 0], fingers: ['', 2, 3, '', '', ''] },
  ];

  const isExpressUnlocked = useMemo(() => {
    const p = getProgress();
    // regra simples: módulos 1..6 concluídos (exceto 2.5 que é “bônus”)
    const required = [1, 2, 3, 4, 5, 6];
    return required.every(id => p.completedModules?.includes(id));
  }, []);

  const markModuleCompleted = (id) => {
    const p = getProgress();
    const set = new Set(p.completedModules || []);
    set.add(id);
    setProgress({ ...p, completedModules: Array.from(set) });
    // feedback rápido: você pode trocar por um toast depois
    alert(`Módulo ${id} marcado como concluído!`);
  };

  const handlePrint = () => window.print();

  const getModuleById = (id) => modules.find(m => m.id === id);
  const getModuleVideo = (id) => getModuleById(id)?.videoUrl || null;
  const getModuleContent = (id) => getModuleById(id)?.content || '';
  const getModuleInfoBoxes = (id) => getModuleById(id)?.infoBoxes || [];

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
            DESAFIO VIOLÃO <span className="text-green-400">10</span> em <span className="text-green-400">30</span>
          </h1>

          <p className="text-purple-200">Ebook de apoio às vídeo-aulas do curso on-line</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Button
              onClick={handlePrint}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-purple-900 font-bold px-6 py-3 rounded-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar PDF do Conteúdo
            </Button>

            {/* botão “admin” simples pra desbloquear testando */}
            <Button
              onClick={() => {
                setProgress({ completedModules: [1,2,3,4,5,6] });
                alert('Progresso liberado (Express desbloqueado). Recarregue a página.');
              }}
              variant="outline"
              className="border-purple-700 text-purple-100"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Liberar Express (teste)
            </Button>
          </div>
        </div>

        {/* Módulos */}
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="bg-purple-800/30 rounded-2xl border border-purple-700/50 overflow-hidden">
              <button
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-purple-700/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    {module.id === 2 ? <Guitar className="w-6 h-6 text-white" /> :
                     module.id === 2.5 ? <ShoppingCart className="w-6 h-6 text-white" /> :
                     module.id === 4 ? <Music className="w-6 h-6 text-white" /> :
                     <BookOpen className="w-6 h-6 text-white" />}
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-purple-400 uppercase">Módulo {module.id}</p>
                    <h3 className="text-lg font-bold text-white">{module.title}</h3>
                  </div>
                </div>

                <ChevronDown className={`w-6 h-6 text-purple-300 transition-transform ${activeModule === module.id ? 'rotate-180' : ''}`} />
              </button>

              {activeModule === module.id && (
                <div className="px-5 pb-6 border-t border-purple-700/50">
                  <div className="pt-6 space-y-6">

                    {/* vídeo */}
                    {getModuleVideo(module.id) && (
                      <VideoEmbed videoUrl={getModuleVideo(module.id)} title={module.title} />
                    )}

                    {/* markdown */}
                    {getModuleContent(module.id) && (
                      <div className="bg-purple-900/50 rounded-xl p-6 border border-purple-700">
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown>{getModuleContent(module.id)}</ReactMarkdown>
                        </div>
                      </div>
                    )}

                    {/* infoboxes */}
                    {getModuleInfoBoxes(module.id).length > 0 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {getModuleInfoBoxes(module.id).map((box, idx) => (
                          <div key={idx} className="bg-purple-900/50 rounded-xl p-6 border border-purple-700">
                            <h3 className="text-xl font-bold text-yellow-400 mb-4">{box.title}</h3>
                            {box.content && <p className="text-white">{box.content}</p>}
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

                    {/* conteúdos “fixos” iguais ao Base44 */}
                    {module.id === 2 && (
                      <>
                        <GuitarDiagram />
                        <TuningGuide />
                      </>
                    )}

                    {module.id === 3 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {chords.map((ch, i) => (
                          <ChordDiagram key={i} title={ch.name} chord={ch.chord} fingers={ch.fingers} />
                        ))}
                      </div>
                    )}

                    {module.id === 4 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        <RhythmPattern
                          name="Balada Folk"
                          pattern={['P', 'IMA', 'P-up', 'P', 'P-up', 'P', 'IMA']}
                          counts={['1e', '2e', '', '', '', '', '4e']}
                          groups={[{ start: 2, end: 5, midlabel: '3', endlabel: 'e' }]}
                        />
                        <RhythmPattern
                          name="Pop-Rock"
                          pattern={['P', 'IMA', 'P-up', 'P-up', 'IMA']}
                          counts={['1e.', '2.', '', '', '4e']}
                          groups={[{ start: 2, end: 3, startlabel: 'e', midlabel: '3', endlabel: 'e' }]}
                        />
                      </div>
                    )}

                    {module.id === 2.5 && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-xl p-8 border border-yellow-500/30 text-center">
                          <ShoppingCart className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-white mb-4">Produtos com Desconto Especial</h3>
                          <p className="text-purple-200 max-w-2xl mx-auto">
                            Produtos selecionados com descontos exclusivos para alunos.
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {offers.map((offer) => (
                            <OfferCard key={offer.id} offer={offer} />
                          ))}
                        </div>
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
                                  <SongCard key={song.id} {...song} color={level === 2 ? 'green' : level === 3 ? 'yellow' : level === 4 ? 'purple' : 'orange'} />
                                ))}
                              </div>
                            </div>
                          )
                        ))}
                      </>
                    )}

                    {module.id === 6 && (
                      <div className="bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded-xl p-8 border border-green-500/30 text-center space-y-4">
                        <h3 className="text-2xl font-bold text-white">
                          {getModuleById(6)?.conclusion?.title || 'Parabéns!'}
                        </h3>
                        <p
                          className="text-xl text-purple-200"
                          dangerouslySetInnerHTML={{ __html: getModuleById(6)?.conclusion?.subtitle || '' }}
                        />
                        <p className="text-purple-300">
                          {getModuleById(6)?.conclusion?.description || ''}
                        </p>

                        <div className="max-w-xl mx-auto text-left bg-purple-900/40 border border-purple-700 rounded-xl p-6">
                          <h4 className="text-yellow-400 font-bold mb-3">Próximos passos</h4>
                          <ul className="space-y-2 text-purple-200">
                            {(getModuleById(6)?.conclusion?.nextSteps || []).map((s, idx) => (
                              <li key={idx} className="flex gap-2">
                                <ChevronRight className="w-4 h-4 text-green-400 mt-1" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {getModuleById(6)?.conclusion?.buttonUrl && (
                          <a href={getModuleById(6).conclusion.buttonUrl} target="_blank" rel="noreferrer">
                            <Button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-6 text-lg rounded-xl">
                              <MessageCircle className="w-5 h-5 mr-2" />
                              {getModuleById(6)?.conclusion?.buttonText || 'Acessar'}
                            </Button>
                          </a>
                        )}
                      </div>
                    )}

                    {/* botão “concluir módulo” */}
                    {Number.isFinite(module.id) && module.id !== 2.5 && (
                      <Button
                        onClick={() => markModuleCompleted(module.id)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl py-6"
                      >
                        Marcar Módulo {module.id} como concluído
                      </Button>
                    )}

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Express */}
        <div className="mt-8">
          <ExpressModule isLocked={!isExpressUnlocked} />
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
