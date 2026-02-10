import{createClient as d}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const u="https://npxgzneiemntoedhdbca.supabase.co",c="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",o=d(u,c);function l(){return`
    <section class="comunidade-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Este é o mural oficial de dúvidas do curso. Envie sua pergunta abaixo.
      </p>

      <form id="form-duvida" class="form">
        <input
          type="text"
          id="student_name"
          placeholder="Seu nome"
          required
          class="input"
        />

        <textarea
          id="question"
          placeholder="Digite sua dúvida"
          required
          class="textarea"
        ></textarea>

        <button type="submit" class="button primary">
          Enviar dúvida
        </button>
      </form>
    </section>

    <section class="mural-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="mural">Carregando perguntas...</div>
    </section>
  `}async function p(){const s=document.getElementById("form-duvida"),r=document.getElementById("mural");s.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("student_name").value.trim(),e=document.getElementById("question").value.trim();if(!n||!e)return;const{error:a}=await o.from("questions").insert([{student_name:n,question:e}]);if(a){alert("Erro ao enviar dúvida."),console.error(a);return}s.reset(),i()}),i();async function i(){r.innerHTML="Carregando perguntas...";const{data:t,error:n}=await o.from("questions").select(`
        id,
        student_name,
        question,
        created_at,
        answer (
          answer
        )
      `).order("created_at",{ascending:!1});if(n){r.innerHTML="Erro ao carregar perguntas.",console.error(n);return}if(!t.length){r.innerHTML="Nenhuma dúvida enviada ainda.";return}r.innerHTML=t.map(e=>{const a=Array.isArray(e.answer)&&e.answer.length?`
              <div class="answer">
                <strong>Resposta do instrutor:</strong>
                <p>${e.answer[0].answer}</p>
              </div>
            `:`
              <div class="answer pending">
                Aguardando resposta…
              </div>
            `;return`
          <div class="question-card">
            <strong>${e.student_name}</strong>
            <p>${e.question}</p>
            ${a}
          </div>
        `}).join("")}}export{p as afterRender,l as render};
