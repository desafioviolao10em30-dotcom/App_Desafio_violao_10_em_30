const o="https://npxgzneiemntoedhdbca.supabase.co",r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns";async function u(t,n){const e=await fetch(`${o}/rest/v1/${t}`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(n)});if(!e.ok){const s=await e.text();throw new Error(s)}return e.json()}async function c(t,n=""){const e=await fetch(`${o}/rest/v1/${t}${n}`,{headers:{apikey:r,Authorization:`Bearer ${r}`}});if(!e.ok){const s=await e.text();throw new Error(s)}return e.json()}function p(){return setTimeout(()=>{d(),l()},0),`
    <section class="card comunidade">

      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Envie sua dúvida abaixo. Ela aparecerá no mural e será respondida pelo instrutor.
      </p>

      <form id="question-form" class="question-form">
        <input
          type="text"
          id="student_name"
          placeholder="Seu nome"
          required
        />

        <textarea
          id="question_text"
          placeholder="Escreva sua dúvida..."
          rows="4"
          required
        ></textarea>

        <button type="submit" class="button primary">
          Enviar dúvida
        </button>
      </form>

      <div class="divider"></div>

      <h2>📌 Mural de Perguntas</h2>
      <div id="questions-list" class="questions-list">
        <p class="muted">Carregando perguntas...</p>
      </div>

    </section>
  `}function l(){document.getElementById("question-form").addEventListener("submit",async n=>{n.preventDefault();const e=document.getElementById("student_name").value.trim(),s=document.getElementById("question_text").value.trim();if(!e||!s){alert("Preencha todos os campos.");return}try{await u("questions",{student_name:e,question:s}),document.getElementById("question_text").value="",d()}catch(a){console.error(a),alert("Erro ao enviar dúvida.")}})}async function d(){const t=document.getElementById("questions-list");try{const n=await c("questions","?select=*,answers(*)&order=created_at.desc");if(!n.length){t.innerHTML='<p class="muted">Nenhuma dúvida enviada ainda.</p>';return}t.innerHTML=n.map(e=>{var s;return`
        <div class="question-card">
          <div class="question">
            <strong>${i(e.student_name)}</strong>
            <p>${i(e.question)}</p>
          </div>

          ${(s=e.answers)!=null&&s.length?e.answers.map(a=>`
                    <div class="answer">
                      <span>Resposta do instrutor</span>
                      <p>${i(a.content)}</p>
                    </div>
                  `).join(""):'<div class="answer pending">Aguardando resposta...</div>'}
        </div>
      `}).join("")}catch(n){console.error(n),t.innerHTML='<p class="muted">Erro ao carregar perguntas.</p>'}}function i(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}export{p as render};
