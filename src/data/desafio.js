// src/data/desafio.js

export const DESAFIO_LINKS = {
  app: "https://desafio-violao-10-em-30-114d6c13.base44.app/",
  suporteEmail: "desafioviolao10em30@gmail.com",
  mentoria: "#", // depois você troca pelo link da página da mentoria
};

export const desafioModules = [
  {
    id: 1,
    title: "Boas-vindas e como usar o Desafio",
    videoUrl: "",
    content: `
Chegou o momento de destravar de verdade.

Nos próximos **30 dias**, você vai sair do zero e tocar músicas reais no violão.
Sem adivinhar. Sem ficar pulando de vídeo em vídeo.

**Regra do jogo:**  
👉 não é sobre “talento” — é sobre **constância + método**.

### Como usar este material
- Assista a aula do módulo
- Leia o resumo aqui (pra fixar)
- Pratique **20 min por dia**
- Repita o simples até ficar automático
    `.trim(),
    infoBoxes: [
      {
        title: "Seu objetivo aqui",
        items: [
          "Criar base de acordes + ritmo",
          "Tocar músicas reais (mesmo simples)",
          "Ter direção clara do que praticar",
          "Chegar no final sem travar",
        ],
      },
      {
        title: "Como você vence o Desafio",
        content:
          "O aluno que vence não é o que toca perfeito. É o que aparece todo dia, mesmo errando.",
      },
    ],
  },

  {
    id: 2,
    title: "Violão do zero: postura + afinação + primeiros movimentos",
    videoUrl: "",
    content: `
Aqui você monta o seu “alicerce”.

- Posição do corpo e das mãos
- Como segurar a palheta (ou tocar com dedos)
- Afinação padrão **E A D G B E**
- Primeiros exercícios de coordenação

👉 Quanto mais leve e organizado, mais rápido você evolui.
    `.trim(),
    infoBoxes: [
      {
        title: "Atenção",
        content:
          "Se o som está 'trastejando' ou doendo demais, ajuste postura e pressão. O começo é ajuste fino.",
      },
    ],
  },

  {
    id: 3,
    title: "Acordes do Desafio: os que destravam 80% das músicas",
    videoUrl: "",
    content: `
Agora você aprende acordes com **método**, não decorando aleatório.

🎯 O foco não é fazer “bonito”.  
É fazer **certo** e **repetível**.

👉 Dica: treine as trocas no ar (sem tocar) por 60 segundos e depois toque.
    `.trim(),
    infoBoxes: [
      {
        title: "Acordes-base (exemplo)",
        items: ["Em", "G", "C", "D", "Am", "A (se entrar no seu desafio)"],
      },
    ],
  },

  {
    id: 4,
    title: "Ritmos: o que faz parecer música (mesmo com poucos acordes)",
    videoUrl: "",
    content: `
Muita gente trava no violão por um motivo:

👉 troca de acorde até sai... mas **o ritmo quebra**.

Aqui você treina o que dá “cara de música”:
- mão direita constante
- batida simples e firme
- consistência (sem pressa)

Se ficar confuso: **volta, repete e simplifica**.
    `.trim(),
    infoBoxes: [
      {
        title: "Regra de ouro",
        content:
          "Ritmo lento e constante > ritmo rápido e quebrado. O rápido vem depois.",
      },
    ],
  },

  {
    id: 5,
    title: "Músicas do Desafio (por níveis)",
    videoUrl: "",
    content: `
Agora é prática de verdade.

Você vai tocar músicas organizadas por quantidade de acordes.
Isso te dá **progressão** e evita travar.

👉 O foco aqui é tocar com constância, cantar junto e sentir o violão responder.
    `.trim(),
    infoBoxes: [
      {
        title: "Como praticar as músicas",
        items: [
          "1) Toque só o ritmo em cordas soltas",
          "2) Faça as trocas sem ritmo (devagar)",
          "3) Junte ritmo + trocas",
          "4) Toque junto com a aula no app",
        ],
      },
    ],
  },

  {
    id: 6,
    title: "Conclusão: o próximo passo para não travar de novo",
    videoUrl: "",
    content: `
Se você chegou até aqui, você já provou uma coisa:

✅ **Você consegue.**

Agora existem dois caminhos:

**1) Seguir sozinho e correr o risco de travar de novo**  
(sem saber o que treinar, sem correção)

**2) Continuar evoluindo com direção e acompanhamento**  
(erro corrigido, progresso constante)

É por isso que existe a **Mentoria Violão Sem Travar**:
a continuação natural pra quem terminou o Desafio e quer seguir com segurança.
    `.trim(),
    infoBoxes: [
      {
        title: "A Mentoria é para quem:",
        items: [
          "Já destravou o básico",
          "Quer direção clara do que treinar",
          "Quer correção e acompanhamento",
          "Não quer recomeçar do zero",
        ],
      },
    ],
  },
];

export const desafioSongs = [
  // NÍVEL 2 (exemplos do seu roteiro anterior)
  {
    id: "2-1",
    level: 2,
    title: "Acima do Sol",
    artist: "Skank",
    text: "Vamos estudar essa música direto pelo nosso app.",
  },
  {
    id: "2-2",
    level: 2,
    title: "Cachimbo da Paz",
    artist: "Gabriel, o Pensador",
    text: "Vamos estudar essa música direto pelo nosso app.",
  },
  {
    id: "2-3",
    level: 2,
    title: "Te Esperando",
    artist: "Luan Santana",
    text: "Vamos estudar essa música direto pelo nosso app.",
  },

  // NÍVEL 3
  {
    id: "3-1",
    level: 3,
    title: "Lua Cheia",
    artist: "Armandinho",
    text:
      "Essa música é perfeita pra ganhar fluidez. No app você vai treinar as trocas com ritmo, do jeito certo — sem travar.",
  },
  {
    id: "3-2",
    level: 3,
    title: "What’s Up",
    artist: "4 Non Blondes",
    text:
      "Aqui você sente o salto: 3 acordes viram repertório. No app, seguimos passo a passo até ficar natural tocar e cantar junto.",
  },
  {
    id: "3-3",
    level: 3,
    title: "Lenha",
    artist: "Zeca Baleiro",
    text:
      "Ótima pra firmar o ritmo e parar de “quebrar” a batida. Vamos estudar direto no app com direcionamento de prática.",
  },
  {
    id: "3-4",
    level: 3,
    title: "Sorte Grande",
    artist: "Ivete Sangalo",
    text:
      "Música que todo mundo reconhece — e é aqui que você percebe: ‘eu realmente estou tocando’. Estudo direto no app.",
  },

  // NÍVEL 4
  {
    id: "4-1",
    level: 4,
    title: "Fada",
    artist: "Victor e Leo",
    text:
      "4 acordes exigem organização. No app, você aprende a antecipar as trocas e manter o ritmo firme.",
  },
  {
    id: "4-2",
    level: 4,
    title: "Choram as Rosas",
    artist: "Bruno e Marrone",
    text:
      "Aqui muita gente trava — não por dificuldade, mas por falta de método. No app você segue o passo a passo certo.",
  },

  // NÍVEL 5+
  {
    id: "5-1",
    level: 5,
    title: "Eu Sei",
    artist: "Legião Urbana",
    text:
      "Essa é a prova final do desafio: quando você toca essa, você saiu do zero de verdade. Vamos estudar direto no app.",
  },
];
