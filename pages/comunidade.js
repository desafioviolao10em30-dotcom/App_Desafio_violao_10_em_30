// pages/comunidade.js

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 CONFIG SUPABASE
const SUPABASE_URL = "https://npxgzneiemntoedhdbca.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function render() {
  setTimeout(loadQuestions, 0);

  return `
    <section class="community-wrapper">

      <div class="community-card">
        <h1>💬 Comunidade do Desafio</h1>
        <p class="subtitle">
          Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
        </p>

        <div class="form">
          <input
            id="student_name"
            placeholder="Seu nome"
          />

          <textarea
            id="question"
            placeholder="Digite sua dúvida..."
          ></textarea>

          <button onclick="sendQuestion()">Enviar dúvida</button>
        </div>
      </div>

      <div class="community-card mural">
        <h2>📌 Mural de Perguntas</h2>
        <div id="questions-list" class="questions">
          <p class="loading">Carregando perguntas...</p>
        </div>
      </div>

    </section>
  `;
}

// 🚀 ENVIAR PERGUNTA
window.sendQuestion = async function () {
  const name = document.getElementById("student_name").value.trim();
  const question = document.getElementById("question").value.trim();

  if (!name || !question) {
    alert("Preencha seu nome e a dúvida.");
    return;
  }

  const { error } = await supabase.from("questions").insert([
    {
      student_name: name,
      question: question,
    },
  ]);

  if (error) {
    alert("Erro ao enviar dúvida.");
    console.error(error);
    return;
  }

  document.getElementById("student_name").value = "";
  document.getElementById("question").value = "";

  loadQuestions();
};

// 📥 CARREGAR PERGUNTAS
async function loadQuestions() {
  const list = document.getElementById("questions-list");

  const { data, error } = await supabase
    .from("questions")
    .select(`
      id,
      student_name,
      question,
      answers (
        content,
        author_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    list.innerHTML = "<p>Erro ao carregar perguntas.</p>";
    console.error(error);
    return;
  }

  if (!data.length) {
    list.innerHTML = "<p>Nenhuma dúvida ainda.</p>";
    return;
  }

  list.innerHTML = data
    .map(
      (q) => `
        <div class="question-card">
          <strong>${q.student_name}</strong>
          <p>${q.question}</p>

          ${
            q.answers && q.answers.length
              ? q.answers
                  .map(
                    (a) => `
                    <div class="answer">
                      <span>Resposta:</span>
                      <p>${a.content}</p>
                      <small>${a.author_name || "Instrutor"}</small>
                    </div>
                  `
                  )
                  .join("")
              : `<em class="pending">Aguardando resposta…</em>`
          }
        </div>
      `
    )
    .join("");
}
