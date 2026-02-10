// pages/comunidade.js
import { supabaseInsert, supabaseSelect } from "../supabase.js";

export function render() {
  setTimeout(() => {
    carregarPerguntas();
    bindForm();
  }, 0);

  return `
    <section class="card comunidade">

      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
      </p>

      <form id="question-form" class="question-form">
        <input
          type="text"
          id="student_name"
          placeholder="Seu nome"
          required
        />

        <textarea
          id="question_text"
          placeholder="Escreva sua dúvida..."
          rows="4"
          required
        ></textarea>

        <button type="submit" class="button primary">
          Enviar dúvida
        </button>
      </form>

      <div class="divider"></div>

      <h2>📌 Mural de Perguntas</h2>
      <div id="questions-list" class="questions-list">
        <p class="muted">Carregando perguntas...</p>
      </div>

    </section>
  `;
}

/* -------------------------
   FORM
-------------------------- */
function bindForm() {
  const form = document.getElementById("question-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("student_name").value.trim();
    const question = document.getElementById("question_text").value.trim();

    if (!name || !question) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await supabaseInsert("questions", {
        student_name: name,
        question: question,
      });

      document.getElementById("question_text").value = "";
      carregarPerguntas();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar dúvida.");
    }
  });
}

/* -------------------------
   LOAD QUESTIONS
-------------------------- */
async function carregarPerguntas() {
  const list = document.getElementById("questions-list");

  try {
    const questions = await supabaseSelect(
      "questions",
      "?select=*,answers(*)&order=created_at.desc"
    );

    if (!questions.length) {
      list.innerHTML = `<p class="muted">Nenhuma dúvida enviada ainda.</p>`;
      return;
    }

    list.innerHTML = questions
      .map(
        (q) => `
        <div class="question-card">
          <div class="question">
            <strong>${escapeHtml(q.student_name)}</strong>
            <p>${escapeHtml(q.question)}</p>
          </div>

          ${
            q.answers?.length
              ? q.answers
                  .map(
                    (a) => `
                    <div class="answer">
                      <span>Resposta do instrutor</span>
                      <p>${escapeHtml(a.content)}</p>
                    </div>
                  `
                  )
                  .join("")
              : `<div class="answer pending">Aguardando resposta...</div>`
          }
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error(err);
    list.innerHTML = `<p class="muted">Erro ao carregar perguntas.</p>`;
  }
}

/* -------------------------
   UTILS
-------------------------- */
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
