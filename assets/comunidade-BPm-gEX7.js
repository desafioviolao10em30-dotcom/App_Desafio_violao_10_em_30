import{createClient as i}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const o="https://npxgzneiemntoedhdbca.supabase.co",d="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",s=i(o,d);async function m(){return`
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
  `}async function l(){document.getElementById("sendQuestion").addEventListener("click",u),await r()}async function u(){const e=document.getElementById("studentName").value.trim(),n=document.getElementById("questionText").value.trim();if(!e||!n){alert("Preencha seu nome e a dúvida.");return}const{error:t}=await s.from("questions").insert([{student_name:e,question:n}]);if(t){console.error(t),alert("Erro ao enviar dúvida.");return}document.getElementById("questionText").value="",await r()}async function r(){const e=document.getElementById("questionsList"),{data:n,error:t}=await s.from("questions").select(`
      id,
      student_name,
      question,
      created_at,
      answer:answer (
        answer_text
      )
    `).order("created_at",{ascending:!1});if(t){console.error(t),e.innerHTML="<p>Erro ao carregar perguntas.</p>";return}if(!n||n.length===0){e.innerHTML="<p>Nenhuma dúvida enviada ainda.</p>";return}e.innerHTML=n.map(a=>`
    <div class="question-card">
      <strong>${a.student_name}</strong>
      <p>${a.question}</p>

      ${a.answer&&a.answer.length>0?`<div class="answer">
               <span>Resposta:</span>
               <p>${a.answer[0].answer_text}</p>
             </div>`:"<em>Aguardando resposta…</em>"}
    </div>
  `).join("")}export{l as afterRender,m as render};
