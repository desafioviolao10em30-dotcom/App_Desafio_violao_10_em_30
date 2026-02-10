import { supabase } from '../supabase.js';

export async function render() {
  let muralHTML = '';

  const { data, error } = await supabase
    .from('questions')
    .select(`
      id,
      student_name,
      question,
      created_at,
      answer (
        content,
        author_name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    muralHTML = `<p class="muted">Erro ao carregar perguntas.</p>`;
  } else if (!data || data.length === 0) {
    muralHTML = `<p class="muted">Nenhuma dúvida enviada ainda.</p>`;
  } else {
    muralHTML = data.map(q => `
      <div class="question-card">
        <div class="question">
          <strong>${q.student_name}</strong>
          <p>${q.question}</p>
        </div>

        ${
          q.answer && q.answer.length
            ? q.answer.map(a => `
              <div class="answer">
                <strong>${a.author_name}</strong>
                <p>${a.content}</p>
              </div>
            `).join('')
            : `<em class="muted">Aguardando resposta do instrutor</em>`
        }
      </div>
    `).join('');
  }

  return `
    <section class="community-page">
      <div class="card community-form">
        <h1>💬 Comunidade do Desafio</h1>
        <p>Envie sua dúvida abaixo. Ela aparecerá no mural.</p>

        <input id="student_name" placeholder="Seu nome" />
        <textarea id="question" placeholder="Digite sua dúvida"></textarea>

        <button class="button gold" id="send">Enviar dúvida</button>
      </div>

      <div class="card">
        <h2>📌 Mural de Perguntas</h2>
        ${muralHTML}
      </div>
    </section>
  `;
}

document.addEventListener('click', async (e) => {
  if (e.target.id !== 'send') return;

  const name = document.getElementById('student_name').value.trim();
  const question = document.getElementById('question').value.trim();

  if (!name || !question) {
    alert('Preencha todos os campos.');
    return;
  }

  const { error } = await supabase
    .from('questions')
    .insert([{ student_name: name, question }]);

  if (error) {
    console.error(error);
    alert('Erro ao enviar dúvida.');
    return;
  }

  location.reload();
});
