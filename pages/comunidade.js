const SUPABASE_URL = "https://npxgzneiemntoedhdbca.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns";

export function render() {
  return `
  <section class="community-wrap">

    <div class="community-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Este é o mural oficial de dúvidas do curso.
      </p>

      <form id="question-form" class="form">
        <input
          type="text"
          id="student_name"
          placeholder="Seu nome"
          required
        />

        <textarea
          id="question"
          placeholder="Escreva sua dúvida aqui..."
          required
        ></textarea>

        <button type="submit" class="btn-primary">
          Enviar dúvida
        </button>
      </form>
    </div>

    <div class="community-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="questions-list">Carregando perguntas...</div>
    </div>

  </section>
  `;
}

document.addEventListener("submit", async (e) => {
  if (e.target.id !== "question-form") return;
  e.preventDefault();

  const name = document.getElementById("student_name").value.trim();
  const question = document.getElementById("question").value.trim();

  if (!name || !question) return alert("Preencha todos os campos.");

  const res = await fetch(`${SUPABASE_URL}/rest/v1/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({
      student_name: name,
      question: question,
    }),
  });

  if (!res.ok) {
    alert("Erro ao enviar dúvida.");
    return;
  }

  document.getElementById("question-form").reset();
  loadQuestions();
});

async function loadQuestions() {
  const list = document.getElementById("questions-list");

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/questions?select=student_name,question,created_at&order=created_at.desc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );

  if (!res.ok) {
    list.innerHTML = "Erro ao carregar perguntas.";
    return;
  }

  const data = await res.json();

  if (!data.length) {
    list.innerHTML = "Nenhuma dúvida enviada ainda.";
    return;
  }

  list.innerHTML = data
    .map(
      (q) => `
      <div class="question-card">
        <strong>${q.student_name}</strong>
        <p>${q.question}</p>
      </div>
    `
    )
    .join("");
}

setTimeout(loadQuestions, 300);
