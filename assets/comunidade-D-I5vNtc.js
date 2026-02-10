const a="https://npxgzneiemntoedhdbca.supabase.co",i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns";function o(){return`
  <section class="community-wrap">

    <div class="community-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Este é o mural oficial de dúvidas do curso.
      </p>

      <form id="question-form" class="form">
        <input
          type="text"
          id="student_name"
          placeholder="Seu nome"
          required
        />

        <textarea
          id="question"
          placeholder="Escreva sua dúvida aqui..."
          required
        ></textarea>

        <button type="submit" class="btn-primary">
          Enviar dúvida
        </button>
      </form>
    </div>

    <div class="community-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="questions-list">Carregando perguntas...</div>
    </div>

  </section>
  `}document.addEventListener("submit",async e=>{if(e.target.id!=="question-form")return;e.preventDefault();const t=document.getElementById("student_name").value.trim(),n=document.getElementById("question").value.trim();if(!t||!n)return alert("Preencha todos os campos.");if(!(await fetch(`${a}/rest/v1/questions`,{method:"POST",headers:{"Content-Type":"application/json",apikey:i,Authorization:`Bearer ${i}`},body:JSON.stringify({student_name:t,question:n})})).ok){alert("Erro ao enviar dúvida.");return}document.getElementById("question-form").reset(),r()});async function r(){const e=document.getElementById("questions-list"),t=await fetch(`${a}/rest/v1/questions?select=student_name,question,created_at&order=created_at.desc`,{headers:{apikey:i,Authorization:`Bearer ${i}`}});if(!t.ok){e.innerHTML="Erro ao carregar perguntas.";return}const n=await t.json();if(!n.length){e.innerHTML="Nenhuma dúvida enviada ainda.";return}e.innerHTML=n.map(s=>`
      <div class="question-card">
        <strong>${s.student_name}</strong>
        <p>${s.question}</p>
      </div>
    `).join("")}setTimeout(r,300);export{o as render};
