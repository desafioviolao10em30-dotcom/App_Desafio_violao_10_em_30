import { supabase } from "../supabase.js";

export function render() {
  return `
    <section class="page-wrap">

      <div class="card">
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

      <div class="card" style="margin-top:24px;">
        <h2>📌 Mural de Perguntas</h2>
        <div id="questionsList" class="questions-list">
          <p class="muted">Carregando perguntas...</p>
        </div>
      </div>

    </section>
  `;
}

export function mount() {
  document
    .getElementById("sendQuestion")
    .addEventListener("click", sendQuestion);

  loadQuestions();
}

async function sendQuestion() {
  const name = document.getElementById("studentName").value.trim();
  const text = document.getElementById("questionText").value.trim();

  if (!text) {
    alert("Digite sua dúvida.");
    return;
  }

  const { error } = await supabase.from("questions").insert([
    {
      student_name: name || "Aluno",
      question: text,
    },
  ]);

  if (error) {
    console.error(error);
    alert("Erro ao enviar dúvida.");
    return;
  }

  document.getElementById("questionText").value = "";
  loadQuestions();
}

async function loadQuestions() {
  const list = document.getElementById("questionsList");

  const { data, error } = await supabase
    .from("questions")
    .select("student_name, question, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    list.innerHTML = "<p class='muted'>Erro ao carregar perguntas.</p>";
    return;
  }

  if (!data.length) {
    list.innerHTML = "<p class='muted'>Nenhuma dúvida enviada ainda.</p>";
    return;
  }

  list.innerHTML = data
    .map(
      (q) => `
        <div class="question-item">
          <strong>${q.student_name || "Aluno"}</strong>
          <span class="date">
            ${new Date(q.created_at).toLocaleDateString("pt-BR")}
          </span>
          <p>${q.question}</p>
        </div>
      `
    )
    .join("");
}
