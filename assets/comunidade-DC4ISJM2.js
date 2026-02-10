import{createClient as m}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const l="https://npxgzneiemntoedhdbca.supabase.co",p="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",i=m(l,p);function f(){return`
    <section class="comunidade-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Este é o mural oficial de dúvidas do curso. Envie sua pergunta abaixo.
      </p>

      <form id="form-duvida" class="form">
        <input
          type="text"
          id="student_name"
          placeholder="Seu nome"
          required
          class="input"
        />

        <textarea
          id="question"
          placeholder="Digite sua dúvida"
          required
          class="textarea"
        ></textarea>

        <button type="submit" class="button primary">
          Enviar dúvida
        </button>
      </form>
    </section>

    <section class="mural-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="mural">Carregando perguntas...</div>
    </section>
  `}async function v(){const d=document.getElementById("form-duvida"),r=document.getElementById("mural");d.addEventListener("submit",async n=>{n.preventDefault();const t=document.getElementById("student_name").value.trim(),s=document.getElementById("question").value.trim();if(!t||!s)return;const{error:e}=await i.from("questions").insert([{student_name:t,question:s}]);if(e){alert("Erro ao enviar dúvida."),console.error(e);return}d.reset(),o()}),o();async function o(){r.innerHTML="Carregando perguntas...";const{data:n,error:t}=await i.from("questions").select("*").order("created_at",{ascending:!1});if(t){r.innerHTML="Erro ao carregar perguntas.",console.error(t);return}if(!n.length){r.innerHTML="Nenhuma dúvida enviada ainda.";return}const s=n.map(a=>a.id),{data:e}=await i.from("answer").select("*").in("id_da_pergunta",s);r.innerHTML=n.map(a=>{const u=e==null?void 0:e.find(c=>c.id_da_pergunta===a.id);return`
          <div class="question-card">
            <strong>${a.student_name}</strong>
            <p>${a.question}</p>

            ${u?`
                  <div class="answer">
                    <strong>Resposta do instrutor:</strong>
                    <p>${u.answer}</p>
                  </div>
                `:`
                  <div class="answer pending">
                    Aguardando resposta…
                  </div>
                `}
          </div>
        `}).join("")}}export{v as afterRender,f as render};
