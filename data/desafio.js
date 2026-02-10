// data/desafio.js
// Tudo estático aqui: módulos, músicas e (se quiser) ofertas/mentoria.
// Você pode ir preenchendo aos poucos — o app não quebra.

window.DESAFIO_DATA = {
  app: {
    title: "DESAFIO VIOLÃO 10 em 30",
    subtitle: "Ebook de apoio às vídeo-aulas do curso on-line",
    slogan: `"Do zero às suas primeiras 10 músicas em 30 dias – Aqui Você é Capaz!"`,
  },

  modules: [
    {
      id: 1,
      title: "Boas-vindas ao Desafio",
      videoUrl: "", // cole aqui um link do YouTube se tiver
      content: `
## Bem-vindo(a)!
Parabéns por dar o primeiro passo na sua jornada musical.

**Como usar este ebook:**
- Assista às vídeo-aulas
- Leia o conteúdo do módulo
- Pratique pelo menos 20 min/dia
- Volte aqui sempre que travar
      `.trim(),
      infoBoxes: [
        {
          title: "Como usar este material",
          items: [
            "Assista às vídeo-aulas com atenção",
            "Use este ebook como guia de consulta",
            "Pratique pelo menos 20 minutos por dia",
            "Tire suas dúvidas na comunidade",
          ],
        },
      ],
    },

    {
      id: 2,
      title: "Partes do violão e afinação",
      videoUrl: "",
      content: `
## Partes do violão
Aprenda os nomes e para que serve cada parte.

## Afinação
A afinação padrão é: **E A D G B e**
      `.trim(),
      infoBoxes: [],
    },

    {
      id: 3,
      title: "Acordes básicos",
      videoUrl: "",
      content: `
## Acordes base
Aqui você vai aprender os acordes que liberam a maioria das músicas do desafio.
      `.trim(),
      infoBoxes: [],
      chords: [
        { name: "C", shape: ["x", 3, 2, 0, 1, 0], fingers: ["", 3, 2, "", 1, ""] },
        { name: "G", shape: [3, 2, 0, 0, 0, 3], fingers: [2, 1, "", "", "", 3] },
        { name: "Am", shape: ["x", 0, 2, 2, 1, 0], fingers: ["", "", 2, 3, 1, ""] },
        { name: "D", shape: ["x", "x", 0, 2, 3, 2], fingers: ["", "", "", 1, 3, 2] },
        { name: "A", shape: ["x", 0, 2, 2, 2, 0], fingers: ["", "", 1, 2, 3, ""] },
        { name: "Em", shape: [0, 2, 2, 0, 0, 0], fingers: ["", 2, 3, "", "", ""] },
      ],
    },

    {
      id: 4,
      title: "Ritmos",
      videoUrl: "",
      content: `
## Ritmos do desafio
O ritmo é o que dá vida à música.
Comece devagar e aumente a velocidade aos poucos.
      `.trim(),
      infoBoxes: [],
      rhythms: [
        {
          key: "balada-folk",
          name: "Balada Folk",
          pattern: ["P", "IMA", "P-up", "P", "P-up", "P", "IMA"],
          counts: ["1e", "2e", "", "", "", "", "4e"],
          groups: [{ start: 2, end: 5, midlabel: "3", endlabel: "e" }],
        },
        {
          key: "pop-rock",
          name: "Pop-Rock",
          pattern: ["P", "IMA", "P-up", "P-up", "IMA"],
          counts: ["1e.", "2.", "", "", "4e"],
          groups: [{ start: 2, end: 3, startlabel: "e", midlabel: "3", endlabel: "e" }],
        },
      ],
    },

    {
      id: 5,
      title: "Hora das músicas",
      videoUrl: "",
      content: `
## Agora é prática
Aqui você encontra as músicas separadas por nível de acordes.
      `.trim(),
      infoBoxes: [],
    },

    {
      id: 6,
      title: "Conclusão",
      videoUrl: "",
      content: "",
      infoBoxes: [],
      conclusion: {
        title: "Parabéns! ✅",
        subtitle:
          'Se você chegou até aqui, você já é um <span class="hl">violonista em formação</span>.',
        description:
          "Continue praticando, revise os módulos e evolua um degrau por dia.",
        nextSteps: [
          "Continue praticando as músicas aprendidas",
          "Aprenda novos acordes e ritmos",
          "Participe da comunidade e ajude outros alunos",
          "Grave vídeos tocando e acompanhe seu progresso",
        ],
        buttonText: "Ir para a Comunidade",
        buttonHash: "#/comunidade",
      },
    },
  ],

  // Músicas (igual base44): você pode preencher aos poucos
  songs: [
    // nível 2
    {
      id: "s1",
      title: "Música Exemplo 1",
      artist: "Artista",
      level: 2,
      chords: ["Em", "G"],
      rhythm: "balada-folk", // ou "pop-rock"
      videoUrl: "",
      pdfUrl: "",
      order: 1,
    },

    // nível 3
    {
      id: "s2",
      title: "Música Exemplo 2",
      artist: "Artista",
      level: 3,
      chords: ["C", "G", "Am"],
      rhythm: "pop-rock",
      videoUrl: "",
      pdfUrl: "",
      order: 2,
    },
  ],

  // Mentoria (substitui Express)
  mentoria: {
    title: "Mentoria Violão Sem Travar",
    description:
      "Para quem já tentou aprender violão, mas sempre trava. Um caminho guiado, claro e com acompanhamento.",
    ctaText: "Quero destravar",
    ctaUrl: "https://wa.me/SEUNUMERO", // troque
  },
};

