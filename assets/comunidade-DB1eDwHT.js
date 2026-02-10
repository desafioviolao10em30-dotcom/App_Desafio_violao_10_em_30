const f="https://npxgzneiemntoedhdbca.supabase.co",g="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",m=window.supabase.createClient(f,g,{auth:{persistSession:!1,autoRefreshToken:!1}});function o(t){return document.getElementById(t)}function l(t){if(!t)return"";try{return new Date(t).toLocaleString("pt-BR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return""}}function u(t=""){var s;const e=String(t).trim().split(/\s+/).filter(Boolean);if(e.length===0)return"👤";const a=((s=e[0])==null?void 0:s[0])||"",n=e.length>1?e[e.length-1][0]:"";return(a+n).toUpperCase()}function r(t){return String(t||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function h(t){const e=t.student_name||"Aluno",a=t.question||"",n=l(t.created_at),s=Array.isArray(t.answer)?t.answer:[],d=s.length?`
      <div class="answers">
        <div class="answers-title">RESPOSTAS</div>
        ${s.sort((i,c)=>new Date(i.created_at)-new Date(c.created_at)).map(i=>{const c=i.author_name||"Instrutor",p=i.is_instructor!==!1;return`
              <div class="a-card">
                <div class="a-meta">
                  <div class="q-name">
                    <div class="avatar" style="background: rgba(34,197,94,.18); border-color: rgba(34,197,94,.25)">
                      ${r(u(c))}
                    </div>
                    <span>${r(c)}</span>
                  </div>
                  ${p?'<span class="a-pill">Instrutor</span>':""}
                  <span class="a-time">${r(l(i.created_at))}</span>
                </div>
                <div class="q-text">${r(i.content||"")}</div>
              </div>
            `}).join("")}
      </div>
    `:`
      <div class="answers">
        <div class="answers-title">RESPOSTAS</div>
        <div class="empty">Ainda sem resposta do instrutor.</div>
      </div>
    `;return`
    <div class="q-card">
      <div class="q-top">
        <div class="q-meta">
          <div class="q-name">
            <div class="avatar">${r(u(e))}</div>
            <span>${r(e)}</span>
          </div>
          <span>${r(n)}</span>
        </div>
        <div class="q-text">${r(a)}</div>
      </div>
      ${d}
    </div>
  `}async function y(){const{data:t,error:e}=await m.from("questions").select(`
      id,
      student_name,
      question,
      created_at,
      answer (
        id,
        question_id,
        content,
        author_name,
        is_instructor,
        created_at
      )
    `).order("created_at",{ascending:!1});if(e)throw e;return t||[]}async function w(t,e){const a={student_name:t,question:e},{data:n,error:s}=await m.from("questions").insert(a).select("id").single();if(s)throw s;return n}async function v(){const t=o("muralList"),e=o("muralStatus");if(t){t.innerHTML="",e.textContent="Carregando perguntas...";try{const a=await y();if(!a.length){e.textContent="",t.innerHTML='<div class="empty">Nenhuma dúvida enviada ainda.</div>';return}e.textContent="",t.innerHTML=a.map(h).join("")}catch(a){console.error(a),e.textContent="Não foi possível carregar as perguntas.",t.innerHTML='<div class="empty">Erro ao carregar perguntas. Verifique o console (F12).</div>'}}}async function S(){return`
    <section class="page-wrap">
      <div class="card">
        <div class="badge">💬 Comunidade</div>
        <h1 class="title-xl">Comunidade do Desafio</h1>
        <p class="muted">
          Este é o mural oficial de dúvidas do curso. Envie sua pergunta abaixo e ela aparecerá no mural.
        </p>

        <div class="form-grid" style="margin-top:16px;">
          <input id="studentName" class="input" type="text" placeholder="Seu nome" autocomplete="name" />
          <textarea id="studentQuestion" class="textarea" placeholder="Escreva sua dúvida..."></textarea>
          <button id="sendBtn" class="btn btn-primary" type="button">
            ✈️ Enviar dúvida
          </button>
        </div>

        <div id="sendStatus" class="muted" style="margin-top:12px; font-weight:800;"></div>
      </div>

      <div class="card card--soft">
        <div class="mural-header">
          <h2 class="title-lg">📌 Mural de Perguntas</h2>
          <div id="muralStatus" class="muted" style="font-weight:800;"></div>
        </div>

        <div id="muralList" class="mural-list"></div>
      </div>
    </section>
  `}async function b(){const t=o("studentName"),e=o("studentQuestion"),a=o("sendBtn"),n=o("sendStatus");t&&!t.value&&(t.value=localStorage.getItem("dv_student_name")||""),await v(),a&&a.addEventListener("click",async()=>{const s=((t==null?void 0:t.value)||"").trim(),d=((e==null?void 0:e.value)||"").trim();if(!s||s.length<2){n.textContent="Digite seu nome (mínimo 2 letras).";return}if(!d||d.length<5){n.textContent="Escreva sua dúvida (mínimo 5 caracteres).";return}localStorage.setItem("dv_student_name",s);try{a.disabled=!0,a.style.opacity="0.85",n.textContent="Enviando...",await w(s,d),n.textContent="✅ Enviado! Sua dúvida já apareceu no mural.",e&&(e.value=""),await v()}catch(i){console.error(i),n.textContent="❌ Não foi possível enviar. Verifique as Policies (RLS) no Supabase ou o console (F12)."}finally{a.disabled=!1,a.style.opacity="1"}})}export{b as mount,S as render};
