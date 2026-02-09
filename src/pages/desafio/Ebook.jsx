// src/pages/desafio/Ebook.jsx
import React, { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { desafioModules, desafioSongs, DESAFIO_LINKS } from "../../data/desafio";
import "./ebook.css";

export default function Ebook() {
  const contentRef = useRef(null);
  const [activeModule, setActiveModule] = useState(1);

  const active = useMemo(
    () => desafioModules.find((m) => m.id === activeModule),
    [activeModule]
  );

  const songsByLevel = useMemo(() => {
    const by = { 2: [], 3: [], 4: [], "5+": [] };
    for (const s of desafioSongs) {
      if (s.level === 2) by[2].push(s);
      else if (s.level === 3) by[3].push(s);
      else if (s.level === 4) by[4].push(s);
      else by["5+"].push(s);
    }
    return by;
  }, []);

  function handlePrint() {
    window.print();
  }

  return (
    <div className="ebook-wrap" ref={contentRef}>
      <div className="ebook-container">
        <div className="header">
          <span className="badge">📘 Ebook de Apoio</span>
          <h1 className="title">
            DESAFIO VIOLÃO <span style={{ color: "var(--green)" }}>10</span> em{" "}
            <span style={{ color: "var(--green)" }}>30</span>
          </h1>
          <p className="subtitle">Ebook de apoio às vídeo-aulas do curso</p>

          <button className="btn btn-yellow" onClick={handlePrint}>
            ⬇️ Baixar PDF do Conteúdo
          </button>
        </div>

        <div className="grid">
          {/* Lateral */}
          <aside className="card">
            <div className="card-pad">
              <h3 className="side-title">Sumário</h3>

              <div style={{ display: "grid", gap: 10 }}>
                {desafioModules.map((m) => (
                  <button
                    key={m.id}
                    className={`module-btn ${activeModule === m.id ? "module-active" : ""}`}
                    onClick={() => setActiveModule(m.id)}
                  >
                    <span className="module-meta">
                      <span className="module-id">MÓDULO {m.id}</span>
                      <span className="module-name">{m.title}</span>
                    </span>
                    <span style={{ opacity: 0.7 }}>›</span>
                  </button>
                ))}
              </div>

              <div className="hr" />

              <div className="cta">
                <a
                  className="linkbtn linkbtn-green"
                  href={DESAFIO_LINKS.app}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir Plataforma / App
                </a>

                <a
                  className="linkbtn linkbtn-outline"
                  href={`mailto:${DESAFIO_LINKS.suporteEmail}`}
                >
                  Suporte por e-mail
                </a>
              </div>
            </div>
          </aside>

          {/* Conteúdo */}
          <main className="card">
            <div className="card-pad">
              <h2 className="content-title">
                Módulo {active?.id} — {active?.title}
              </h2>

              {active?.content && (
                <div style={{ color: "#e9d5ff", lineHeight: 1.6 }}>
                  <ReactMarkdown>{active.content}</ReactMarkdown>
                </div>
              )}

              {/* boxes */}
              {active?.infoBoxes?.length > 0 && (
                <div className="mini-grid">
                  {active.infoBoxes.map((box, idx) => (
                    <div className="infobox" key={idx}>
                      <h4>{box.title}</h4>
                      {box.content && <p>{box.content}</p>}
                      {box.items?.length > 0 && (
                        <ul>
                          {box.items.map((it, i) => (
                            <li key={i}>{it}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* músicas */}
              {active?.id === 5 && (
                <>
                  <div className="hr" />

                  <h3 style={{ margin: "0 0 10px", color: "var(--yellow)" }}>
                    Músicas do Desafio (por níveis)
                  </h3>

                  {[2, 3, 4, "5+"].map((lvl) => (
                    <div key={lvl} style={{ marginTop: 14 }}>
                      <h4 style={{ margin: "0 0 10px", color: "#fff" }}>
                        Nível {lvl}
                      </h4>

                      <div className="songs">
                        {songsByLevel[lvl].map((s) => (
                          <div className="song" key={s.id}>
                            <h4>
                              {s.title} <small>— {s.artist}</small>
                            </h4>
                            <p>{s.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* CTA mentoria no módulo 6 */}
              {active?.id === 6 && (
                <>
                  <div className="hr" />
                  <div className="cta">
                    <a
                      className="linkbtn linkbtn-green"
                      href={DESAFIO_LINKS.mentoria}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Continuar na Mentoria (próximo passo)
                    </a>
                  </div>
                </>
              )}

              <div className="footer">
                “Do zero às suas primeiras 10 músicas em 30 dias – Aqui Você é Capaz!”
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
