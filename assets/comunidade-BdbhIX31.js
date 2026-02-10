import{createClient as i}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const d="https://npxgzneiemntoedhdbca.supabase.co",o="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",r=i(d,o);function m(){return setTimeout(u,0),`
    <section class="card comunidade-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Este é o mural oficial de dúvidas do curso.
      </p>

      <div class="form">
        <input
          id="student_name"
          type="text"
          placeholder="Seu nome"
          class="input"
        />

        <textarea
          id="question"
          placeholder="Digite sua dúvida"
          class="textarea"
        ></textarea>

        <button id="sendQuestion" class="button primary">
          Enviar dúvida
        </button>
      </div>
    </section>

    <section class="card mural-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="mural">Carregando perguntas...</div>
    </section>
  `}function u(){document.getElementById("sendQuestion").addEventListener("click",c),s()}async function c(){const e=document.getElementById("student_name").value.trim(),n=document.getElementById("question").value.trim();if(!e||!n){alert("Preencha nome e dúvida.");return}const{error:t}=await r.from("questions").insert([{student_name:e,question:n}]);if(t){console.error(t),alert("Erro ao enviar dúvida.");return}document.getElementById("question").value="",s()}async function s(){const e=document.getElementById("mural"),{data:n,error:t}=await r.from("questions").select(`
      id,
      student_name,
      question,
      created_at,
      answer (
        answer
      )
    `).order("created_at",{ascending:!1});if(t){console.error(t),e.innerHTML="<p>Erro ao carregar perguntas.</p>";return}if(!n.length){e.innerHTML="<p>Nenhuma dúvida enviada ainda.</p>";return}e.innerHTML=n.map(a=>`
      <div class="question-card">
        <strong>${a.student_name}</strong>
        <p>${a.question}</p>

        ${a.answer?`<div class="answer">
                <strong>Resposta:</strong>
                <p>${a.answer.answer}</p>
              </div>`:'<div class="answer pending">Aguardando resposta…</div>'}
      </div>
    `).join("")}export{m as render};
