// pages/comunidade.js
import { supabase } from '../supabase.js';

export async function render() {
  return `
    <section class="card community">
      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida por mim.
      </p>

      <div class="form">
        <input
          id="studentName"
          type="text"
          placeholder="Seu nome"
          value="Magno"
        />

        <textarea
          id="questionText"
          placeholder="Digite sua dúvida..."
          rows="4"
        ></textarea>

        <button id="sendQuestion" class="button primary">
          Enviar dúvida
        </button>
      </div>

      <hr />

      <h2>📌 Mural de Perguntas</h2>
      <div id="questionsList">Carregando perguntas...</div>
    </section>
  `;
}

export async function afterRender() {
  const button = document.getElementById('sendQuestion');
  button.addEventListener('click', sendQuestion);

  await loadQuestions();
}

async function sendQuestion() {
  const name = document.getElementById('studentName').value.trim();
  const question = document.getElementById('questionText').value.trim();

  if (!name || !question) {
    alert('Preencha seu nome e a dúvida.');
    return;
  }

  const { error } = await supabase
    .from('questions')
    .insert([
      {
        student_name: name,
        question: question
      }
    ]);

  if (error) {
    console.error(error);
    alert('Erro ao enviar dúvida.');
    return;
  }

  document.getElementById('questionText').value = '';
  await loadQuestions();
}

async function loadQuestions() {
  const container = document.getElementById('questionsList');

  const { data, error } = await supabase
    .from('questions')
    .select(`
      id,
      student_name,
      question,
      created_at,
      answer:answer (
        answer_text
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    container.innerHTML = '<p>Erro ao carregar perguntas.</p>';
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = '<p>Nenhuma dúvida enviada ainda.</p>';
    return;
  }

  container.innerHTML = data.map(q => `
    <div class="question-card">
      <strong>${q.student_name}</strong>
      <p>${q.question}</p>

      ${
        q.answer && q.answer.length > 0
          ? `<div class="answer">
               <span>Resposta:</span>
               <p>${q.answer[0].answer_text}</p>
             </div>`
          : `<em>Aguardando resposta…</em>`
      }
    </div>
  `).join('');
}
