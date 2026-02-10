const i="https://npxgzneiemntoedhdbca.supabase.co",r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",s=window.supabase.createClient(i,r,{auth:{persistSession:!1,autoRefreshToken:!1}});async function o(){const{data:t,error:n}=await s.from("questions").select("*").order("created_at",{ascending:!1});let e="";return n?e='<p class="error">Erro ao carregar perguntas.</p>':!t||t.length===0?e='<p class="empty">Nenhuma dúvida enviada ainda.</p>':e=t.map(a=>`
        <div class="question-card">
          <div class="question-author">${a.student_name}</div>
          <div class="question-text">${a.question}</div>
        </div>
      `).join(""),`
    <section class="community-wrapper">

      <div class="card community-form">
        <h1>💬 Comunidade do Desafio</h1>
        <p>Envie sua dúvida abaixo. Ela aparecerá no mural.</p>

        <input
          id="studentName"
          placeholder="Seu nome"
          class="input"
        />

        <textarea
          id="questionText"
          placeholder="Digite sua dúvida"
          class="textarea"
        ></textarea>

        <button id="sendQuestion" class="button primary">
          Enviar dúvida
        </button>
      </div>

      <div class="card community-mural">
        <h2>📌 Mural de Perguntas</h2>
        ${e}
      </div>

    </section>
  `}async function d(){const t=document.getElementById("sendQuestion");t&&t.addEventListener("click",async()=>{const n=document.getElementById("studentName").value.trim(),e=document.getElementById("questionText").value.trim();if(!n||!e){alert("Preencha seu nome e a dúvida.");return}const{error:a}=await s.from("questions").insert([{student_name:n,question:e}]);a?(alert("Erro ao enviar dúvida."),console.error(a)):window.location.reload()})}export{d as afterRender,o as render};
