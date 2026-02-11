// ================================
// CONFIGURAÇÃO BASE
// ================================
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ⚠️ SUA URL JÁ ESTÁ CERTA
const SUPABASE_URL = "https://npxgzneiemntoedhdbca.supabase.co";

// ⚠️ COLE A SUA ANON PUBLIC KEY AQUI
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ================================
// ROUTER SIMPLES (HASH)
// ================================
const routes = {};

function registerRoute(path, render, mount) {
  routes[path] = { render, mount };
}

function router() {
  const app = document.getElementById("app");
  const hash = location.hash.replace("#", "") || "/inicio";

  const route = routes[hash];

  if (!route) {
    app.innerHTML = `<h2>Página não encontrada</h2>`;
    return;
  }

  app.innerHTML = route.render();
  if (route.mount) route.mount();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

// ================================
// PÁGINA INÍCIO
// ================================
registerRoute("/inicio", () => `
  <section>
    <h1 style="font-size:42px;font-weight:800;margin-bottom:16px;">
      Desafio Violão 10 em 30
    </h1>
    <p style="max-width:600px;font-size:18px;opacity:.9;">
      Do zero às suas primeiras 10 músicas em 30 dias.
    </p>
  </section>
`);

// ================================
// PÁGINA COMUNIDADE
// ================================
registerRoute(
  "/comunidade",
  () => `
  <section class="card">
    <h2 class="gold">💬 Comunidade do Desafio</h2>
    <p>Envie sua dúvida. Ela aparecerá no mural.</p>

    <input id="studentName" placeholder="Seu nome" />
    <textarea id="questionText" placeholder="Digite sua dúvida..."></textarea>
    <button id="sendQuestion">Enviar dúvida</button>

    <hr style="margin:30px 0" />

    <h3 class="gold">📌 Mural de Perguntas</h3>
    <div id="questionsList">Carregando...</div>
  </section>
`,
  () => {
    const nameInput = document.getElementById("studentName");
    const textInput = document.getElementById("questionText");
    const btn = document.getElementById("sendQuestion");
    const list = document.getElementById("questionsList");

    async function loadQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        list.innerHTML = "Erro ao carregar perguntas";
        return;
      }

      list.innerHTML = data
        .map(
          (q) => `
          <div class="question-card">
            <strong>${q.student_name || "Aluno"}</strong>
            <span>${new Date(q.created_at).toLocaleDateString()}</span>
            <p>${q.question}</p>
          </div>
        `
        )
        .join("");
    }

    btn.onclick = async () => {
      const student_name = nameInput.value.trim();
      const question = textInput.value.trim();

      if (!student_name || !question) {
        alert("Preencha nome e dúvida");
        return;
      }

      const { error } = await supabase.from("questions").insert([
        {
          student_name,
          question,
        },
      ]);

      if (error) {
        alert("Erro ao enviar dúvida");
        return;
      }

      textInput.value = "";
      loadQuestions();
    };

    loadQuestions();
  }
);

// ================================
// PÁGINA MENTORIA
// ================================
registerRoute("/mentoria", () => `
  <section class="card">
    <h2 class="gold">🎸 Mentoria Violão Sem Travar</h2>
    <p>Acompanhamento direto com o instrutor.</p>
    <a href="https://wa.me/SEUNUMERO" target="_blank">Falar no WhatsApp</a>
  </section>
`);

// ================================
// PÁGINA ADMIN (BASE)
// ================================
registerRoute("/admin", () => `
  <section class="card">
    <h2 class="gold">⚙️ Painel Admin</h2>
    <p>Área administrativa (responder dúvidas, loja, conteúdos).</p>
  </section>
`);
