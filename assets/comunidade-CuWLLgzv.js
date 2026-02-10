const r="https://npxgzneiemntoedhdbca.supabase.co",i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",a=window.supabase.createClient(r,i,{auth:{persistSession:!1,autoRefreshToken:!1}});function c(){return`
    <section class="page-wrap">

      <!-- CARD ENVIAR DÚVIDA -->
      <div class="card card--glass">
        <h1 class="title-lg">💬 Comunidade do Desafio</h1>
        <p class="muted">
          Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
        </p>

        <input
          id="authorInput"
          class="input"
          type="text"
          placeholder="Seu nome"
          value="Magno"
        />

        <textarea
          id="questionInput"
          class="textarea"
          placeholder="Digite sua dúvida..."
        ></textarea>

        <button id="sendBtn" class="btn btn-yellow">
          Enviar dúvida
        </button>
      </div>

      <!-- MURAL -->
      <div class="card card--glass" style="margin-top:24px;">
        <h2 class="title-md">📌 Mural de Perguntas</h2>
        <div id="questionsList" class="questions-list">
          <p class="muted">Carregando perguntas...</p>
        </div>
      </div>

    </section>
  `}function l(){document.getElementById("sendBtn").addEventListener("click",o),s()}async function o(){const e=document.getElementById("authorInput").value.trim(),t=document.getElementById("questionInput").value.trim();if(!e||!t){alert("Preencha o nome e a dúvida.");return}const{error:n}=await a.from("questions").insert([{author_name:e,question:t}]);if(n){console.error(n),alert("Erro ao enviar dúvida.");return}document.getElementById("questionInput").value="",s()}async function s(){const e=document.getElementById("questionsList");e.innerHTML='<p class="muted">Carregando...</p>';const{data:t,error:n}=await a.from("questions").select("*").order("created_at",{ascending:!1});if(n){console.error(n),e.innerHTML='<p class="muted">Erro ao carregar perguntas.</p>';return}if(!t.length){e.innerHTML='<p class="muted">Nenhuma dúvida enviada ainda.</p>';return}e.innerHTML=t.map(d).join("")}function d(e){return`
    <div class="question-card">
      <div class="question-header">
        <strong>${e.author_name??"Aluno"}</strong>
        <span class="date">
          ${u(e.created_at)}
        </span>
      </div>

      <p class="question-text">
        ${e.question}
      </p>
    </div>
  `}function u(e){return e?new Date(e).toLocaleDateString("pt-BR"):""}export{l as mount,c as render};
