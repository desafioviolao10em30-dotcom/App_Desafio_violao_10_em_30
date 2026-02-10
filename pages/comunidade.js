// pages/comunidade.js
// Comunidade do Desafio – Supabase (backend gratuito)

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://npxgzneiemntoedhdbca.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function render() {
  setTimeout(loadQuestions, 0);

  return `
    <section class="card">
      <h1>💬 Comunidade do Desafio</h1>
      <p>
        Este é o mural oficial de dúvidas do curso.
        Envie sua pergunta abaixo.
      </p>

      <form id="question-form" class="community-form">
        <input
          type="text"
          id="student_name"
          placeholder="Seu nome"
          required
        />

        <textarea
          id="question"
          placeholder="Digite sua dúvida..."
          required
        ></textarea>

        <button type="submit" class="button primary">
          Enviar dúvida
        </button>
      </form>
    </section>

    <section class="card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="questions-list">
        <p>Carregando perguntas...</p>
      </div>
    </section>
  `;
}

async function loadQuestions() {
  const container = document.getElementById("questions-list");
  if (!container) return;

  const { data, error } = await supabase
    .from("questions")
    .select(`
      id,
      student_name,
      question,
      created_at,
      answer (
        content,
        author_name,
        created_at
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    container.innerHTML = "<p>Erro ao carregar perguntas.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Ainda não há perguntas.</p>";
    return;
  }

  container.innerHTML = data.map(q => `
    <div class="question-card">
      <strong>${q.student_name}</strong>
      <p class="question-text">${q.question}</p>

      ${
        q.answer
          ? `
            <div class="answer">
              <span class="badge">Resposta do professor</span>
              <p>${q.answer.content}</p>
            </div>
          `
          : `
            <div class="answer waiting">
              ⏳ Aguardando resposta
            </div>
          `
      }
    </div>
  `).join("");
}

document.addEventListener("submit", async (e) => {
  if (e.target.id !== "question-form") return;

  e.preventDefault();

  const name = document.getElementById("student_name").value.trim();
  const question = document.getElementById("question").value.trim();

  if (!name || !question) return;

  const { error } = await supabase
    .from("questions")
    .insert({
      student_name: name,
      question: question,
    });

  if (error) {
    alert("Erro ao enviar pergunta.");
    console.error(error);
    return;
  }

  e.target.reset();
  loadQuestions();
});

