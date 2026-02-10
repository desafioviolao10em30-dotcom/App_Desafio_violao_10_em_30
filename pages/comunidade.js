// pages/comunidade.js
import { supabase } from "../supabase.js";

export function render() {
  setTimeout(initComunidade, 0);

  return `
    <section class="card comunidade-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Este é o mural oficial de dúvidas do curso.
      </p>

      <div class="form">
        <input
          id="student_name"
          type="text"
          placeholder="Seu nome"
          class="input"
        />

        <textarea
          id="question"
          placeholder="Digite sua dúvida"
          class="textarea"
        ></textarea>

        <button id="sendQuestion" class="button primary">
          Enviar dúvida
        </button>
      </div>
    </section>

    <section class="card mural-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="mural">Carregando perguntas...</div>
    </section>
  `;
}

function initComunidade() {
  document
    .getElementById("sendQuestion")
    .addEventListener("click", enviarPergunta);

  carregarPerguntas();
}

async function enviarPergunta() {
  const name = document.getElementById("student_name").value.trim();
  const question = document.getElementById("question").value.trim();

  if (!name || !question) {
    alert("Preencha nome e dúvida.");
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
  carregarPerguntas();
}

async function carregarPerguntas() {
  const mural = document.getElementById("mural");

  const { data, error } = await supabase
    .from("questions")
    .select(`
      id,
      student_name,
      question,
      created_at,
      answer (
        answer
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    mural.innerHTML = "<p>Erro ao carregar perguntas.</p>";
    return;
  }

  if (!data.length) {
    mural.innerHTML = "<p>Nenhuma dúvida enviada ainda.</p>";
    return;
  }

  mural.innerHTML = data
    .map(
      (q) => `
      <div class="question-card">
        <strong>${q.student_name}</strong>
        <p>${q.question}</p>

        ${
          q.answer
            ? `<div class="answer">
                <strong>Resposta:</strong>
                <p>${q.answer.answer}</p>
              </div>`
            : `<div class="answer pending">Aguardando resposta…</div>`
        }
      </div>
    `
    )
    .join("");
}
