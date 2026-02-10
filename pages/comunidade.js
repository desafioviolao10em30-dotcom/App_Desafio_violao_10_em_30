// pages/comunidade.js
import { supabase } from "../supabase.js";

export async function render() {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  let muralHtml = "";

  if (error) {
    muralHtml = `<p class="error">Erro ao carregar perguntas.</p>`;
  } else if (!data || data.length === 0) {
    muralHtml = `<p class="empty">Nenhuma dúvida enviada ainda.</p>`;
  } else {
    muralHtml = data
      .map(
        (q) => `
        <div class="question-card">
          <div class="question-author">${q.student_name}</div>
          <div class="question-text">${q.question}</div>
        </div>
      `
      )
      .join("");
  }

  return `
    <section class="community-wrapper">

      <div class="card community-form">
        <h1>💬 Comunidade do Desafio</h1>
        <p>Envie sua dúvida abaixo. Ela aparecerá no mural.</p>

        <input
          id="studentName"
          placeholder="Seu nome"
          class="input"
        />

        <textarea
          id="questionText"
          placeholder="Digite sua dúvida"
          class="textarea"
        ></textarea>

        <button id="sendQuestion" class="button primary">
          Enviar dúvida
        </button>
      </div>

      <div class="card community-mural">
        <h2>📌 Mural de Perguntas</h2>
        ${muralHtml}
      </div>

    </section>
  `;
}

export async function afterRender() {
  const btn = document.getElementById("sendQuestion");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    const name = document.getElementById("studentName").value.trim();
    const text = document.getElementById("questionText").value.trim();

    if (!name || !text) {
      alert("Preencha seu nome e a dúvida.");
      return;
    }

    const { error } = await supabase.from("questions").insert([
      {
        student_name: name,
        question: text,
      },
    ]);

    if (error) {
      alert("Erro ao enviar dúvida.");
      console.error(error);
    } else {
      window.location.reload();
    }
  });
}
