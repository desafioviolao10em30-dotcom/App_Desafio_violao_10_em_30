// pages/comunidade.js
import { supabase } from '../supabase.js';

export function render() {
  return `
    <section class="page-wrap">

      <!-- CARD ENVIAR DÚVIDA -->
      <div class="card card--glass">
        <h1 class="title-lg">💬 Comunidade do Desafio</h1>
        <p class="muted">
          Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
        </p>

        <input
          id="authorInput"
          class="input"
          type="text"
          placeholder="Seu nome"
          value="Magno"
        />

        <textarea
          id="questionInput"
          class="textarea"
          placeholder="Digite sua dúvida..."
        ></textarea>

        <button id="sendBtn" class="btn btn-yellow">
          Enviar dúvida
        </button>
      </div>

      <!-- MURAL -->
      <div class="card card--glass" style="margin-top:24px;">
        <h2 class="title-md">📌 Mural de Perguntas</h2>
        <div id="questionsList" class="questions-list">
          <p class="muted">Carregando perguntas...</p>
        </div>
      </div>

    </section>
  `;
}

export function mount() {
  const btn = document.getElementById('sendBtn');
  btn.addEventListener('click', sendQuestion);

  loadQuestions();
}

/* -------------------------
   ENVIAR DÚVIDA
--------------------------*/
async function sendQuestion() {
  const author = document.getElementById('authorInput').value.trim();
  const question = document.getElementById('questionInput').value.trim();

  if (!author || !question) {
    alert('Preencha o nome e a dúvida.');
    return;
  }

  const { error } = await supabase
    .from('questions')
    .insert([
      {
        author_name: author, // ⚠️ ajuste aqui se o nome da coluna for outro
        question: question
      }
    ]);

  if (error) {
    console.error(error);
    alert('Erro ao enviar dúvida.');
    return;
  }

  document.getElementById('questionInput').value = '';
  loadQuestions();
}

/* -------------------------
   CARREGAR MURAL
--------------------------*/
async function loadQuestions() {
  const list = document.getElementById('questionsList');
  list.innerHTML = '<p class="muted">Carregando...</p>';

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    list.innerHTML = '<p class="muted">Erro ao carregar perguntas.</p>';
    return;
  }

  if (!data.length) {
    list.innerHTML = '<p class="muted">Nenhuma dúvida enviada ainda.</p>';
    return;
  }

  list.innerHTML = data.map(renderQuestion).join('');
}

/* -------------------------
   TEMPLATE DA PERGUNTA
--------------------------*/
function renderQuestion(item) {
  return `
    <div class="question-card">
      <div class="question-header">
        <strong>${item.author_name ?? 'Aluno'}</strong>
        <span class="date">
          ${formatDate(item.created_at)}
        </span>
      </div>

      <p class="question-text">
        ${item.question}
      </p>
    </div>
  `;
}

/* -------------------------
   FORMATAR DATA
--------------------------*/
function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('pt-BR');
}
