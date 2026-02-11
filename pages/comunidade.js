import { supabase } from "../supabase.js";

/* =========================
   RENDER
========================= */
export function render() {
  return `
    <section class="page-wrap">
      <div class="community-wrapper">

        <div class="community-card">
          <h2 class="community-title">💬 Comunidade do Desafio</h2>
          <p class="community-subtitle">
            Envie sua dúvida abaixo. Ela aparecerá no mural.
          </p>

          <input
            type="text"
            id="student-name"
            placeholder="Seu nome"
            class="input"
          />

          <textarea
            id="question-text"
            placeholder="Digite sua dúvida..."
            class="textarea"
          ></textarea>

          <button id="send-question" class="btn btn-gold">
            Enviar dúvida
          </button>
        </div>

        <div class="community-card">
          <h3 class="community-title">📌 Mural de Perguntas</h3>
          <div id="questions-list"></div>
        </div>

      </div>
    </section>
  `;
}

/* =========================
   MOUNT
========================= */
export function mount() {
  const list = document.getElementById("questions-list");
  const btn = document.getElementById("send-question");

  btn.addEventListener("click", sendQuestion);

  loadQuestions(list);
}

/* =========================
   LOAD QUESTIONS
========================= */
async function loadQuestions(list) {
  const { data: questions, error } = await supabase
    .from("questions")
    .select(`
      id,
      question,
      student_name,
      created_at,
      answer (
        id,
        answer,
        created_at
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    list.innerHTML = "<p>Erro ao carregar perguntas.</p>";
    return;
  }

  list.innerHTML = questions.map(renderQuestion).join("");
}

/* =========================
   RENDER QUESTION
========================= */
function renderQuestion(q) {
  const date = new Date(q.created_at).toLocaleDateString("pt-BR");

  return `
    <div class="question-card" data-id="${q.id}">
      <div class="question-header" data-toggle="${q.id}">
        <div>
          <strong>${q.student_name || "Aluno"}</strong>
          <span class="date">${date}</span>
        </div>
        <span class="arrow">▾</span>
      </div>

      <div class="question-body">
        <p>${q.question}</p>

        <div class="answers">
          ${
            q.answer && q.answer.length
              ? q.answer.map(renderAnswer).join("")
              : `<div class="no-answers">Ainda sem respostas.</div>`
          }
        </div>
      </div>
    </div>
  `;
}

/* =========================
   RENDER ANSWER
========================= */
function renderAnswer(a) {
  const date = new Date(a.created_at).toLocaleDateString("pt-BR");

  return `
    <div class="answer-card">
      <div class="answer-author">Instrutor</div>
      <div class="answer-date">${date}</div>
      <div class="answer-text">${a.answer}</div>
    </div>
  `;
}

/* =========================
   SEND QUESTION
========================= */
async function sendQuestion() {
  const name = document.getElementById("student-name").value.trim();
  const text = document.getElementById("question-text").value.trim();

  if (!text) return alert("Digite sua dúvida.");

  await supabase.from("questions").insert({
    student_name: name || "Aluno",
    question: text,
  });

  document.getElementById("question-text").value = "";

  const list = document.getElementById("questions-list");
  loadQuestions(list);
}

/* =========================
   ACCORDION
========================= */
document.addEventListener("click", (e) => {
  const header = e.target.closest(".question-header");
  if (!header) return;

  const id = header.dataset.toggle;
  const card = document.querySelector(
    `.question-card[data-id="${id}"]`
  );
  card.classList.toggle("open");
});
