import React, { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

/**
 * Ebook simples (estático) para GitHub Pages
 * - Sem Base44
 * - Sem alias "@/..."
 * - Sem componentes externos
 */

export default function Ebook() {
  const contentRef = useRef(null);
  const [activeModule, setActiveModule] = useState(1);

  const modules = useMemo(
    () => [
      {
        id: 1,
        title: "Boas-vindas e como usar o Desafio",
        content: `
## Bem-vindo(a) ao Desafio Violão 10 em 30 🎸

Nos próximos **30 dias**, você vai aprender a tocar **10 músicas reais** no violão, mesmo começando do zero.

### Como usar esse material
- Assista às vídeo-aulas
- Use este ebook como guia/consulta
- Pratique pelo menos **20 minutos por dia**
- Repita os trechos difíceis sem pressa
        `.trim(),
      },
      {
        id: 2,
        title: "Partes do violão e afinação",
        content: `
## Partes do violão
- Braço, escala, trastes
- Tarraxas
- Cavalete
- Cordas

## Afinação padrão (da 6ª para a 1ª corda)
**E A D G B E**
        `.trim(),
      },
      {
        id: 3,
        title: "Acordes básicos",
        content: `
## Acordes básicos (começo do Desafio)
Aqui você foca em trocar acordes sem travar.

Sugestão inicial:
- **Em**
- **G**
- **C**
- **D**
- **Am**
        `.trim(),
      },
      {
        id: 4,
        title: "Ritmos essenciais",
        content: `
## Ritmos essenciais
Comece lento. O ritmo “bonito” vem depois.

Dicas:
- Mantenha a mão direita sempre em movimento
- Treine com metrônomo (lento)
- Faça 2 minutos por ritmo, todo dia
        `.trim(),
      },
      {
        id: 5,
        title: "Músicas do Desafio (lista)",
        content: `
## As 10 músicas do Desafio
Coloque aqui a lista oficial (você me manda depois e eu organizo bonito).

Enquanto isso, você pode inserir:
1. Música 1
2. Música 2
3. Música 3
...
10. Música 10
        `.trim(),
      },
      {
        id: 6,
        title: "Conclusão e próximos passos",
        content: `
## Parabéns! ✅

Se você fez o Desafio, você já tem base real:
- acordes
- ritmo
- troca
- constância

Próximo passo: continuar evoluindo com direção (mentoria / comunidade).
        `.trim(),
      },
    ],
    []
  );

  function handlePrint() {
    window.print();
  }

  return (
    <div ref={contentRef} style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>📘 Ebook de Apoio</div>
          <h1 style={styles.h1}>
            DESAFIO VIOLÃO <span style={{ color: "#22c55e" }}>10</span> em{" "}
            <span style={{ color: "#22c55e" }}>30</span>
          </h1>
          <p style={styles.subtitle}>Ebook de apoio às vídeo-aulas do curso</p>

          <button onClick={handlePrint} style={styles.printBtn}>
            ⬇️ Baixar PDF do Conteúdo
          </button>
        </div>

        <div style={styles.layout}>
          {/* menu */}
          <aside style={styles.aside}>
            <h3 style={styles.asideTitle}>Sumário</h3>
            <div style={{ display: "grid", gap: 8 }}>
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  style={{
                    ...styles.moduleBtn,
                    ...(activeModule === m.id ? styles.moduleBtnActive : {}),
                  }}
                >
                  <span style={styles.moduleId}>Módulo {m.id}</span>
                  <span style={styles.moduleTitle}>{m.title}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* conteúdo */}
          <main style={styles.main}>
            <div style={styles.card}>
              <h2 style={styles.h2}>
                Módulo {activeModule} —{" "}
                {modules.find((m) => m.id === activeModule)?.title}
              </h2>
              <div style={styles.markdown}>
                <ReactMarkdown>
                  {modules.find((m) => m.id === activeModule)?.content || ""}
                </ReactMarkdown>
              </div>
            </div>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                “Do zero às suas primeiras 10 músicas em 30 dias – Aqui Você é Capaz!”
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #1a0630 0%, #0f0f10 100%)",
    color: "#fff",
    padding: "24px 16px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  container: { maxWidth: 1100, margin: "0 auto" },
  header: { textAlign: "center", marginBottom: 20 },
  badge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(234,179,8,0.18)",
    color: "#facc15",
    fontWeight: 700,
    marginBottom: 10,
  },
  h1: { fontSize: 32, margin: "0 0 8px", fontWeight: 900 },
  subtitle: { margin: 0, color: "#c4b5fd" },
  printBtn: {
    marginTop: 14,
    padding: "12px 16px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontWeight: 800,
    background: "linear-gradient(90deg,#facc15,#eab308)",
    color: "#1a0630",
  },
  layout: { display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 },
  aside: {
    background: "rgba(88,28,135,0.25)",
    border: "1px solid rgba(168,85,247,0.25)",
    borderRadius: 16,
    padding: 14,
    height: "fit-content",
  },
  asideTitle: { margin: "0 0 10px", color: "#facc15" },
  moduleBtn: {
    textAlign: "left",
    borderRadius: 14,
    border: "1px solid rgba(168,85,247,0.25)",
    padding: "10px 12px",
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    cursor: "pointer",
  },
  moduleBtnActive: {
    outline: "2px solid rgba(34,197,94,0.55)",
    background: "rgba(34,197,94,0.12)",
  },
  moduleId: { display: "block", fontSize: 12, color: "#a78bfa", fontWeight: 800 },
  moduleTitle: { display: "block", fontSize: 14, fontWeight: 800, marginTop: 2 },
  main: { minWidth: 0 },
  card: {
    background: "rgba(88,28,135,0.2)",
    border: "1px solid rgba(168,85,247,0.25)",
    borderRadius: 16,
    padding: 16,
  },
  h2: { margin: "0 0 12px", color: "#facc15" },
  markdown: { color: "#e9d5ff", lineHeight: 1.6 },
  footer: {
    marginTop: 16,
    textAlign: "center",
    padding: "14px 10px",
    borderTop: "1px solid rgba(168,85,247,0.25)",
  },
  footerText: { margin: 0, color: "#facc15", fontWeight: 800 },
};
