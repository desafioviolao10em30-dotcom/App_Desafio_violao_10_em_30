import { supabase } from "../supabase.js";

export function render() {
  setTimeout(initCommunity, 0);

  return `
    <section class="card comunidade-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p>Envie sua dúvida abaixo. Ela aparecerá no mural.</p>

      <div class="form">
        <input id="student_name" placeholder="Seu nome" />
        <textarea id="question" placeholder="Digite sua dúvida"></textarea>
        <button id="send">Enviar dúvida</button>
      </div>
    </section>

    <section class="card mural-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="mural">Carregando...</div>
    </section>
  `;
}

async function initCommunity() {
  document.getElementById("send").onclick = sendQuestion;
  loadQuestions();
}

async function sendQuestion() {
  const name = document.getElementById("student_name").value.trim();
  const question = document.getElementById("question").value.trim();

  if (!name || !question) {
    alert("Preencha nome e pergunta.");
    return;
  }

  const { error } = await supabase
    .from("questions")
    .insert([{ student_name: name, question }]);

  if (error) {
    console.error(error);
    alert("Erro ao enviar dúvida.");
    return;
  }

  document.getElementById("question").value = "";
  loadQuestions();
}

async function loadQuestions() {
  const mural = document.getElementById("mural");

  const { data, error } = await supabase
    .from("questions")
    .select(`
      id,
      student_name,
      question,
      answer ( answer )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    mural.innerHTML = "Erro ao carregar perguntas.";
    return;
  }

  if (!data.length) {
    mural.innerHTML = "Nenhuma dúvida enviada ainda.";
    return;
  }

  mural.innerHTML = data
    .map(
      (q) => `
      <div class="question">
        <strong>${q.student_name}</strong>
        <p>${q.question}</p>

        ${
          q.answer?.length
            ? `<div class="answer">💡 ${q.answer[0].answer}</div>`
            : `<div class="waiting">⏳ Aguardando resposta</div>`
        }
      </div>
    `
    )
    .join("");
}
