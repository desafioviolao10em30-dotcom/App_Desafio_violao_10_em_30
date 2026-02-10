import { supabase } from "./supabase.js";

const list = document.getElementById("questions-list");

async function loadQuestions() {
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

function renderQuestion(q) {
  const date = new Date(q.created_at).toLocaleDateString("pt-BR");

  return `
    <div class="question-card" data-id="${q.id}">
      <div class="question-header" onclick="toggleQuestion('${q.id}')">
        <div class="question-meta">
          <span class="question-author">${q.student_name || "Aluno"}</span>
          <span class="question-date">${date}</span>
        </div>
        <span class="question-toggle">▾</span>
      </div>

      <div class="question-text">
        ${q.question}
      </div>

      <div class="answers">
        ${
          q.answer && q.answer.length
            ? q.answer.map(renderAnswer).join("")
            : `<div class="no-answers">Ainda sem respostas.</div>`
        }
      </div>
    </div>
  `;
}

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

/* Accordion */
window.toggleQuestion = function (id) {
  const card = document.querySelector(
    `.question-card[data-id="${id}"]`
  );
  card.classList.toggle("open");
};

loadQuestions();
