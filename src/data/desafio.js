// Tudo que antes vinha do Base44, agora fica aqui (ou você pode dividir em 2-3 arquivos).

export const desafioModules = [
  {
    id: 1,
    title: 'Boas-vindas ao Desafio',
    videoUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    content: `# Bem-vindo(a)!\n\nSeu texto em markdown...`,
    infoBoxes: [
      {
        title: 'Bem-vindo(a) ao Desafio!',
        content: 'Parabéns por dar o primeiro passo...',
      },
      {
        title: 'Como usar este material',
        items: [
          'Assista às vídeo-aulas com atenção',
          'Use este ebook como guia de consulta',
          'Pratique pelo menos 20 minutos por dia',
          'Tire suas dúvidas na comunidade',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Partes do Violão e Afinação',
    videoUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    content: '',
    infoBoxes: [],
  },
  {
    id: 2.5,
    title: 'Produtos com Desconto',
    videoUrl: '',
    content: '',
    infoBoxes: [],
  },
  {
    id: 3,
    title: 'Acordes Básicos',
    videoUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    content: '',
    infoBoxes: [],
  },
  {
    id: 4,
    title: 'Ritmos',
    videoUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    content: '',
    infoBoxes: [],
  },
  {
    id: 5,
    title: 'Hora de Praticar as Músicas',
    videoUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    content: '',
    infoBoxes: [],
  },
  {
    id: 6,
    title: 'Conclusão',
    videoUrl: '',
    content: '',
    infoBoxes: [],
    conclusion: {
      title: 'Parabéns!',
      subtitle:
        'Se você chegou até aqui, você já é um <span class="text-yellow-400 font-semibold">violonista em formação</span>.',
      description:
        'Continue praticando, explore novas músicas e lembre-se: a música é uma jornada.',
      nextSteps: [
        'Continue praticando as músicas aprendidas',
        'Aprenda novos acordes e ritmos',
        'Participe da comunidade e ajude outros alunos',
        'Grave vídeos tocando e compartilhe!',
      ],
      buttonText: 'Acessar a Comunidade',
      buttonUrl: 'https://seu-link-da-comunidade.com',
    },
  },
]

export const desafioSongs = [
  // Exemplo
  {
    id: 's1',
    title: 'Música 1',
    artist: 'Artista',
    chords: ['C', 'G'],
    level: 2,
    rhythm: 'balada-folk',
    pdf_url: 'https://...pdf',
    video_url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
  },
]

export const desafioOffers = [
  // Exemplo
  {
    id: 'o1',
    title: 'Capotraste',
    description: 'Essencial para tocar em outros tons.',
    image_url: 'https://...imagem',
    price: 'R$ 39,90',
    affiliate_url: 'https://...',
    mercado_livre_url: 'https://...',
  },
]

// “Express 26x100” – se você quiser montar depois
export const expressWeeks = [
  // { week_number: 1, songs: [ {song_order:1, title:'', artist:'', ...}, ... ] }
]
