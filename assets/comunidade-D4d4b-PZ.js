import{createClient as o}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const s=o("https://npxgzneiemntoedhdbca.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns");function u(){return`
    <section class="page-wrap">

      <div class="card">
        <h1 class="title-xl""gold-title">💬 Comunidade do Desafio</h1>
        <p class="muted">
          Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
        </p>

        <input
          id="studentName"
          class="input"
          placeholder="Seu nome"
          value="Aluno"
        />

        <textarea
          id="questionText"
          class="textarea"
          placeholder="Digite sua dúvida..."
        ></textarea>

        <button id="sendQuestion" class="btn btn-yellow""btn-gold">
          Enviar dúvida
        </button>
      </div>

      <div class="card" style="margin-top:24px;">
        <h2 class="gold-title">📌Mural de Perguntas</h2>
        <div id="questionsList" class="questions-list">
          <p class="muted">Carregando perguntas...</p>
        </div>
      </div>

    </section>
  `}function l(){document.getElementById("sendQuestion").addEventListener("click",r),i()}async function r(){const e=document.getElementById("studentName").value.trim(),t=document.getElementById("questionText").value.trim();if(!t){alert("Digite sua dúvida.");return}const{error:n}=await s.from("questions").insert([{student_name:e||"Aluno",question:t}]);if(n){console.error(n),alert("Erro ao enviar dúvida.");return}document.getElementById("questionText").value="",i()}async function i(){const e=document.getElementById("questionsList"),{data:t,error:n}=await s.from("questions").select("student_name, question, created_at").order("created_at",{ascending:!1});if(n){console.error(n),e.innerHTML="<p class='muted'>Erro ao carregar perguntas.</p>";return}if(!t.length){e.innerHTML="<p class='muted'>Nenhuma dúvida enviada ainda.</p>";return}e.innerHTML=t.map(a=>`
        <div class="question-item">
          <strong>${a.student_name||"Aluno"}</strong>
          <span class="date">
            ${new Date(a.created_at).toLocaleDateString("pt-BR")}
          </span>
          <p>${a.question}</p>
        </div>
      `).join("")}export{l as mount,u as render};
