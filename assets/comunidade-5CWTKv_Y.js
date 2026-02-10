const o="https://npxgzneiemntoedhdbca.supabase.co",d="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",i=window.supabase.createClient(o,d,{auth:{persistSession:!1,autoRefreshToken:!1}});async function c(){return`
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
  `}async function u(){const a=document.getElementById("questionsList"),r=document.getElementById("sendQuestion");async function n(){const{data:e,error:t}=await i.from("questions_public").select("*").order("created_at",{ascending:!1});if(t){a.innerHTML='<p class="muted">Erro ao carregar perguntas.</p>';return}if(!e.length){a.innerHTML='<p class="muted">Nenhuma dúvida enviada ainda.</p>';return}a.innerHTML=e.map(s=>`
      <div class="question-card">
        <div class="question-header">
          <strong>${s.author_name}</strong>
          <span class="date">
            ${new Date(s.created_at).toLocaleDateString()}
          </span>
        </div>

        <p class="question-text">${s.question}</p>

        ${s.answer?`
              <div class="answer-card">
                <span class="badge">Instrutor</span>
                <p>${s.answer}</p>
              </div>
            `:""}
      </div>
    `).join("")}r.addEventListener("click",async()=>{const e=document.getElementById("author").value.trim(),t=document.getElementById("question").value.trim();!e||!t||(await i.from("questions").insert({author_name:e,question:t}),document.getElementById("question").value="",n())}),n()}export{u as mount,c as render};
