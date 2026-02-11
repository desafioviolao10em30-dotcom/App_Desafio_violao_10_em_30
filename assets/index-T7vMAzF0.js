import{createClient as m}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const p="https://npxgzneiemntoedhdbca.supabase.co",h="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weGd6bmVpZW1udG9lZGhkYmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDI4NjYsImV4cCI6MjA4NjI3ODg2Nn0.10hOtJVelqlbhrQhiq6Ua27dA5ARlRjDrUlGYyegIns",d=m(p,h),u={};function c(s,n,o){u[s]={render:n,mount:o}}function l(){const s=document.getElementById("app"),n=location.hash.replace("#","")||"/inicio",o=u[n];if(!o){s.innerHTML="<h2>Página não encontrada</h2>";return}s.innerHTML=o.render(),o.mount&&o.mount()}window.addEventListener("hashchange",l);window.addEventListener("load",l);c("/inicio",()=>`
  <section>
    <h1 style="font-size:42px;font-weight:800;margin-bottom:16px;">
      Desafio Violão 10 em 30
    </h1>
    <p style="max-width:600px;font-size:18px;opacity:.9;">
      Do zero às suas primeiras 10 músicas em 30 dias.
    </p>
  </section>
`);c("/comunidade",()=>`
  <section class="card">
    <h2 class="gold">💬 Comunidade do Desafio</h2>
    <p>Envie sua dúvida. Ela aparecerá no mural.</p>

    <input id="studentName" placeholder="Seu nome" />
    <textarea id="questionText" placeholder="Digite sua dúvida..."></textarea>
    <button id="sendQuestion">Enviar dúvida</button>

    <hr style="margin:30px 0" />

    <h3 class="gold">📌 Mural de Perguntas</h3>
    <div id="questionsList">Carregando...</div>
  </section>
`,()=>{const s=document.getElementById("studentName"),n=document.getElementById("questionText"),o=document.getElementById("sendQuestion"),r=document.getElementById("questionsList");async function e(){const{data:t,error:i}=await d.from("questions").select("*").order("created_at",{ascending:!1});if(i){r.innerHTML="Erro ao carregar perguntas";return}r.innerHTML=t.map(a=>`
          <div class="question-card">
            <strong>${a.student_name||"Aluno"}</strong>
            <span>${new Date(a.created_at).toLocaleDateString()}</span>
            <p>${a.question}</p>
          </div>
        `).join("")}o.onclick=async()=>{const t=s.value.trim(),i=n.value.trim();if(!t||!i){alert("Preencha nome e dúvida");return}const{error:a}=await d.from("questions").insert([{student_name:t,question:i}]);if(a){alert("Erro ao enviar dúvida");return}n.value="",e()},e()});c("/mentoria",()=>`
  <section class="card">
    <h2 class="gold">🎸 Mentoria Violão Sem Travar</h2>
    <p>Acompanhamento direto com o instrutor.</p>
    <a href="https://wa.me/SEUNUMERO" target="_blank">Falar no WhatsApp</a>
  </section>
`);c("/admin",()=>`
  <section class="card">
    <h2 class="gold">⚙️ Painel Admin</h2>
    <p>Área administrativa (responder dúvidas, loja, conteúdos).</p>
  </section>
`);
