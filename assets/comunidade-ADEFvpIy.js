import{createClient as i}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const o="https://npxgzneiemntoedhdbca.supabase.co",d="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",r=i(o,d);function c(){return setTimeout(a,0),`
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
  `}async function a(){const e=document.getElementById("questions-list");if(!e)return;const{data:n,error:s}=await r.from("questions").select(`
      id,
      student_name,
      question,
      created_at,
      answer (
        content,
        author_name,
        created_at
      )
    `).order("created_at",{ascending:!1});if(s){e.innerHTML="<p>Erro ao carregar perguntas.</p>",console.error(s);return}if(!n||n.length===0){e.innerHTML="<p>Ainda não há perguntas.</p>";return}e.innerHTML=n.map(t=>`
    <div class="question-card">
      <strong>${t.student_name}</strong>
      <p class="question-text">${t.question}</p>

      ${t.answer?`
            <div class="answer">
              <span class="badge">Resposta do professor</span>
              <p>${t.answer.content}</p>
            </div>
          `:`
            <div class="answer waiting">
              ⏳ Aguardando resposta
            </div>
          `}
    </div>
  `).join("")}document.addEventListener("submit",async e=>{if(e.target.id!=="question-form")return;e.preventDefault();const n=document.getElementById("student_name").value.trim(),s=document.getElementById("question").value.trim();if(!n||!s)return;const{error:t}=await r.from("questions").insert({student_name:n,question:s});if(t){alert("Erro ao enviar pergunta."),console.error(t);return}e.target.reset(),a()});export{c as render};
