import{createClient as o}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const d="https://npxgzneiemntoedhdbca.supabase.co",u="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",r=o(d,u);function I(){return setTimeout(c,0),`
    <section class="card comunidade-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p>Envie sua dúvida abaixo. Ela aparecerá no mural.</p>

      <div class="form">
        <input id="student_name" placeholder="Seu nome" />
        <textarea id="question" placeholder="Digite sua dúvida"></textarea>
        <button id="send">Enviar dúvida</button>
      </div>
    </section>

    <section class="card mural-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="mural">Carregando...</div>
    </section>
  `}async function c(){document.getElementById("send").onclick=m,s()}async function m(){const e=document.getElementById("student_name").value.trim(),n=document.getElementById("question").value.trim();if(!e||!n){alert("Preencha nome e pergunta.");return}const{error:t}=await r.from("questions").insert([{student_name:e,question:n}]);if(t){console.error(t),alert("Erro ao enviar dúvida.");return}document.getElementById("question").value="",s()}async function s(){const e=document.getElementById("mural"),{data:n,error:t}=await r.from("questions").select(`
      id,
      student_name,
      question,
      answer ( answer )
    `).order("created_at",{ascending:!1});if(t){console.error(t),e.innerHTML="Erro ao carregar perguntas.";return}if(!n.length){e.innerHTML="Nenhuma dúvida enviada ainda.";return}e.innerHTML=n.map(a=>{var i;return`
      <div class="question">
        <strong>${a.student_name}</strong>
        <p>${a.question}</p>

        ${(i=a.answer)!=null&&i.length?`<div class="answer">💡 ${a.answer[0].answer}</div>`:'<div class="waiting">⏳ Aguardando resposta</div>'}
      </div>
    `}).join("")}export{I as render};
