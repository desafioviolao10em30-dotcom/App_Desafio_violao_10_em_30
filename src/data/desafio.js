// src/data/desafio.js

// ===============================
// MÓDULOS DO DESAFIO
// ===============================
export const desafioModules = [
  {
    id: 1,
    order: 1,
    title: "Boas-vindas ao Desafio",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    content: `
## Bem-vindo(a)!

Parabéns por dar o primeiro passo na sua jornada musical.
Nos próximos **30 dias**, você vai aprender a tocar **10 músicas completas no violão**,
mesmo que nunca tenha tocado antes.
    `,
    infoBoxes: [
      {
        title: "Como usar este material",
        items: [
          "Assista às vídeo-aulas com atenção",
          "Use este ebook como guia de consulta",
          "Pratique pelo menos 20 minutos por dia",
          "Tire suas dúvidas na comunidade"
        ]
      }
    ]
  },

  {
    id: 2,
    order: 2,
    title: "Conhecendo o Violão e Afinação",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    content: `
## Partes do Violão

Aqui você vai aprender o nome e a função de cada parte do instrumento,
além de como afinar corretamente antes de praticar.
    `,
    infoBoxes: []
  },

  {
    id: 3,
    order: 3,
    title: "Acordes Básicos",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    content: `
## O que são acordes?

Acordes são combinações de notas tocadas simultaneamente.
Eles são a base da maioria das músicas que você vai aprender.
    `,
    infoBoxes: []
  },

  {
    id: 4,
    order: 4,
    title: "Ritmos para Violão",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
    content: `
## Ritmo é movimento

Aqui você aprende como movimentar a mão direita para dar vida à música.
    `,
    infoBoxes: []
  },

  {
    id: 5,
    order: 5,
    title: "Hora de Praticar as Músicas",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_5",
    content: `
## Agora é prática!

Separei as músicas por nível de dificuldade para facilitar sua evolução.
    `,
    infoBoxes: []
  },

  {
    id: 6,
    order: 6,
    title: "Conclusão e Próximos Passos",
    videoUrl: "",
    content: `
## Parabéns!

Se você chegou até aqui, você **já é um violonista em formação**.
Continue praticando e evoluindo.
    `,
    nextSteps: [
      "Continue praticando as músicas aprendidas",
      "Aprenda novos acordes e ritmos",
      "Participe da comunidade",
      "Grave vídeos tocando"
    ]
  }
];

// ===============================
// MÚSICAS DO DESAFIO
// ===============================
export const desafioSongs = [
  {
    id: 1,
    title: "Música Exemplo 1",
    artist: "Artista Exemplo",
    level: 2,
    chords: ["C", "G"],
    videoUrl: "https://www.youtube.com/embed/VIDEO_SONG_1",
    pdfUrl: "/pdfs/musica-exemplo-1.pdf"
  },
  {
    id: 2,
    title: "Música Exemplo 2",
    artist: "Artista Exemplo",
    level: 3,
    chords: ["C", "G", "Am"],
    videoUrl: "https://www.youtube.com/embed/VIDEO_SONG_2",
    pdfUrl: "/pdfs/musica-exemplo-2.pdf"
  }
];

// ===============================
// OFERTAS (OPCIONAL)
// ===============================
export const desafioOffers = [
  {
    id: 1,
    title: "Violão Acústico Iniciante",
    price: "R$ 599,00",
    imageUrl: "https://via.placeholder.com/300",
    link: "https://seulink.com"
  }
];
