// pages/comunidade.js
import { supabase } from "../supabase.js";

function el(id) {
  return document.getElementById(id);
}

function formatDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function initials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "👤";
  const a = parts[0]?.[0] || "";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderQuestionCard(q) {
  const student = q.student_name || "Aluno";
  const question = q.question || "";
  const created = formatDate(q.created_at);

  // Respostas (pode vir como array)
  const answers = Array.isArray(q.answer) ? q.answer : [];

  const answersHtml = answers.length
    ? `
      <div class="answers">
        <div class="answers-title">RESPOSTAS</div>
        ${answers
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map((a) => {
            const author = a.author_name || "Instrutor";
            const isInstructor = a.is_instructor !== false; // default true pra ficar “instrutor”
            return `
              <div class="a-card">
                <div class="a-meta">
                  <div class="q-name">
                    <div class="avatar" style="background: rgba(34,197,94,.18); border-color: rgba(34,197,94,.25)">
                      ${escapeHtml(initials(author))}
                    </div>
                    <span>${escapeHtml(author)}</span>
                  </div>
                  ${isInstructor ? `<span class="a-pill">Instrutor</span>` : ``}
                  <span class="a-time">${escapeHtml(formatDate(a.created_at))}</span>
                </div>
                <div class="q-text">${escapeHtml(a.content || "")}</div>
              </div>
            `;
          })
          .join("")}
      </div>
    `
    : `
      <div class="answers">
        <div class="answers-title">RESPOSTAS</div>
        <div class="empty">Ainda sem resposta do instrutor.</div>
      </div>
    `;

  return `
    <div class="q-card">
      <div class="q-top">
        <div class="q-meta">
          <div class="q-name">
            <div class="avatar">${escapeHtml(initials(student))}</div>
            <span>${escapeHtml(student)}</span>
          </div>
          <span>${escapeHtml(created)}</span>
        </div>
        <div class="q-text">${escapeHtml(question)}</div>
      </div>
      ${answersHtml}
    </div>
  `;
}

async function fetchQuestions() {
  // Importante:
  // - "questions" tem: id, student_name, question, created_at
  // - "answer" tem FK question_id -> questions.id
  const { data, error } = await supabase
    .from("questions")
    .select(`
      id,
      student_name,
      question,
      created_at,
      answer (
        id,
        question_id,
        content,
        author_name,
        is_instructor,
        created_at
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function insertQuestion(student_name, question) {
  const payload = {
    student_name,
    question,
  };

  const { data, error } = await supabase
    .from("questions")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;
  return data;
}

async function refreshMural() {
  const list = el("muralList");
  const status = el("muralStatus");

  if (!list) return;

  list.innerHTML = "";
  status.textContent = "Carregando perguntas...";

  try {
    const questions = await fetchQuestions();
    if (!questions.length) {
      status.textContent = "";
      list.innerHTML = `<div class="empty">Nenhuma dúvida enviada ainda.</div>`;
      return;
    }

    status.textContent = "";
    list.innerHTML = questions.map(renderQuestionCard).join("");
  } catch (e) {
    console.error(e);
    status.textContent = "Não foi possível carregar as perguntas.";
    list.innerHTML = `<div class="empty">Erro ao carregar perguntas. Verifique o console (F12).</div>`;
  }
}

export async function render() {
  return `
    <section class="page-wrap">
      <div class="card">
        <div class="badge">💬 Comunidade</div>
        <h1 class="title-xl">Comunidade do Desafio</h1>
        <p class="muted">
          Este é o mural oficial de dúvidas do curso. Envie sua pergunta abaixo e ela aparecerá no mural.
        </p>

        <div class="form-grid" style="margin-top:16px;">
          <input id="studentName" class="input" type="text" placeholder="Seu nome" autocomplete="name" />
          <textarea id="studentQuestion" class="textarea" placeholder="Escreva sua dúvida..."></textarea>
          <button id="sendBtn" class="btn btn-primary" type="button">
            ✈️ Enviar dúvida
          </button>
        </div>

        <div id="sendStatus" class="muted" style="margin-top:12px; font-weight:800;"></div>
      </div>

      <div class="card card--soft">
        <div class="mural-header">
          <h2 class="title-lg">📌 Mural de Perguntas</h2>
          <div id="muralStatus" class="muted" style="font-weight:800;"></div>
        </div>

        <div id="muralList" class="mural-list"></div>
      </div>
    </section>
  `;
}

export async function mount() {
  const nameInput = el("studentName");
  const qInput = el("studentQuestion");
  const btn = el("sendBtn");
  const sendStatus = el("sendStatus");

  // valores iniciais (se quiser)
  if (nameInput && !nameInput.value) {
    nameInput.value = localStorage.getItem("dv_student_name") || "";
  }

  await refreshMural();

  if (!btn) return;

  btn.addEventListener("click", async () => {
    const student = (nameInput?.value || "").trim();
    const question = (qInput?.value || "").trim();

    if (!student || student.length < 2) {
      sendStatus.textContent = "Digite seu nome (mínimo 2 letras).";
      return;
    }
    if (!question || question.length < 5) {
      sendStatus.textContent = "Escreva sua dúvida (mínimo 5 caracteres).";
      return;
    }

    localStorage.setItem("dv_student_name", student);

    try {
      btn.disabled = true;
      btn.style.opacity = "0.85";
      sendStatus.textContent = "Enviando...";

      await insertQuestion(student, question);

      sendStatus.textContent = "✅ Enviado! Sua dúvida já apareceu no mural.";
      if (qInput) qInput.value = "";

      await refreshMural();
    } catch (e) {
      console.error(e);
      sendStatus.textContent =
        "❌ Não foi possível enviar. Verifique as Policies (RLS) no Supabase ou o console (F12).";
    } finally {
      btn.disabled = false;
      btn.style.opacity = "1";
    }
  });
}
