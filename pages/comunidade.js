import { supabase } from "../js/supabase.js";

export function render() {
  return `
    <section class="page-wrap">

      <div class="card card--highlight">
        <h1 class="title-xl">💬 Comunidade do Desafio</h1>
        <p class="muted">
          Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
        </p>

        <input
          id="studentName"
          class="input"
          placeholder="Seu nome"
          value="Aluno"
        />

        <textarea
          id="questionText"
          class="textarea"
          placeholder="Digite sua dúvida..."
        ></textarea>

        <button id="sendQuestion" class="btn btn-yellow">
          Enviar dúvida
        </button>
      </div>

      <div class="card">
        <h2 class="title-md">📌 Mural de Perguntas</h2>
        <div id="questionsList" class="questions-list">
          Carregando perguntas...
        </div>
      </div>

    </section>
  `;
}

export async function mount() {
  loadQuestions();

  document
    .getElementById("sendQuestion")
    .addEventListener("click", sendQuestion);
}

/* ---------------- FUNCTIONS ---------------- */

async function loadQuestions() {
  const list = document.getElementById("questionsList");

  const { data, error } = await supabase
    .from("questions")
    .select("id, student_name, question, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    list.innerHTML = "Erro ao carregar perguntas.";
    console.error(error);
    return;
  }

  if (!data.length) {
    list.innerHTML = "<p class='muted'>Nenhuma dúvida enviada ainda.</p>";
    return;
  }

  list.innerHTML = data
    .map(
      (q) => `
      <div class="question-card">
        <div class="question-header">
          <strong>${q.student_name || "Aluno"}</strong>
          <span>${formatDate(q.created_at)}</span>
        </div>
        <p>${q.question}</p>
      </div>
    `
    )
    .join("");
}

async function sendQuestion() {
  const name = document.getElementById("studentName").value.trim();
  const text = document.getElementById("questionText").value.trim();

  if (!text) {
    alert("Digite sua dúvida.");
    return;
  }

  const { error } = await supabase.from("questions").insert({
    student_name: name || "Aluno",
    question: text,
  });

  if (error) {
    alert("Erro ao enviar dúvida.");
    console.error(error);
    return;
  }

  document.getElementById("questionText").value = "";
  loadQuestions();
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("pt-BR");
}
