// pages/comunidade.js
import { supabase } from '../supabase.js';

export async function render() {
  return `
    <section class="page-wrap">

      <div class="card card--soft">
        <h1 class="title-xl">💬 Comunidade do Desafio</h1>
        <p class="muted">
          Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
        </p>

        <div class="form-group">
          <input
            id="author"
            class="input"
            placeholder="Seu nome"
            value="Magno"
          />

          <textarea
            id="question"
            class="input"
            rows="4"
            placeholder="Digite sua dúvida..."
          ></textarea>

          <button id="sendQuestion" class="btn btn-primary">
            Enviar dúvida
          </button>
        </div>
      </div>

      <div class="card card--soft" style="margin-top:32px;">
        <h2 class="title-md">📌 Mural de Perguntas</h2>

        <div id="questionsList" class="questions-list">
          <p class="muted">Carregando perguntas...</p>
        </div>
      </div>

    </section>
  `;
}

export async function mount() {
  const list = document.getElementById('questionsList');
  const btn = document.getElementById('sendQuestion');

  async function loadQuestions() {
    const { data, error } = await supabase
      .from('questions_public')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      list.innerHTML = `<p class="muted">Erro ao carregar perguntas.</p>`;
      return;
    }

    if (!data.length) {
      list.innerHTML = `<p class="muted">Nenhuma dúvida enviada ainda.</p>`;
      return;
    }

    list.innerHTML = data.map(q => `
      <div class="question-card">
        <div class="question-header">
          <strong>${q.author_name}</strong>
          <span class="date">
            ${new Date(q.created_at).toLocaleDateString()}
          </span>
        </div>

        <p class="question-text">${q.question}</p>

        ${
          q.answer
            ? `
              <div class="answer-card">
                <span class="badge">Instrutor</span>
                <p>${q.answer}</p>
              </div>
            `
            : ''
        }
      </div>
    `).join('');
  }

  btn.addEventListener('click', async () => {
    const author = document.getElementById('author').value.trim();
    const question = document.getElementById('question').value.trim();

    if (!author || !question) return;

    await supabase.from('questions').insert({
      author_name: author,
      question
    });

    document.getElementById('question').value = '';
    loadQuestions();
  });

  loadQuestions();
}
