import{createClient as r}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const d="https://npxgzneiemntoedhdbca.supabase.co",u="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",i=r(d,u);function l(){return setTimeout(o,0),`
    <section class="community-wrapper">

      <div class="community-card">
        <h1>💬 Comunidade do Desafio</h1>
        <p class="subtitle">
          Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
        </p>

        <div class="form">
          <input
            id="student_name"
            placeholder="Seu nome"
          />

          <textarea
            id="question"
            placeholder="Digite sua dúvida..."
          ></textarea>

          <button onclick="sendQuestion()">Enviar dúvida</button>
        </div>
      </div>

      <div class="community-card mural">
        <h2>📌 Mural de Perguntas</h2>
        <div id="questions-list" class="questions">
          <p class="loading">Carregando perguntas...</p>
        </div>
      </div>

    </section>
  `}window.sendQuestion=async function(){const e=document.getElementById("student_name").value.trim(),n=document.getElementById("question").value.trim();if(!e||!n){alert("Preencha seu nome e a dúvida.");return}const{error:t}=await i.from("questions").insert([{student_name:e,question:n}]);if(t){alert("Erro ao enviar dúvida."),console.error(t);return}document.getElementById("student_name").value="",document.getElementById("question").value="",o()};async function o(){const e=document.getElementById("questions-list"),{data:n,error:t}=await i.from("questions").select(`
      id,
      student_name,
      question,
      answers (
        content,
        author_name
      )
    `).order("created_at",{ascending:!1});if(t){e.innerHTML="<p>Erro ao carregar perguntas.</p>",console.error(t);return}if(!n.length){e.innerHTML="<p>Nenhuma dúvida ainda.</p>";return}e.innerHTML=n.map(s=>`
        <div class="question-card">
          <strong>${s.student_name}</strong>
          <p>${s.question}</p>

          ${s.answers&&s.answers.length?s.answers.map(a=>`
                    <div class="answer">
                      <span>Resposta:</span>
                      <p>${a.content}</p>
                      <small>${a.author_name||"Instrutor"}</small>
                    </div>
                  `).join(""):'<em class="pending">Aguardando resposta…</em>'}
        </div>
      `).join("")}export{l as render};
