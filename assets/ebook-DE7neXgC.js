let n=null;function u(o){n=n===o?null:o;const s=document.getElementById("view");s.innerHTML=p()}window.toggleModule=u;function p(){var a,d,r;const o=window.DESAFIO_DATA||{},s=o.modules||[],c=o.songs||[],l=o.mentoria;function $(e){return c.filter(t=>e==="5+"?t.level>=5:t.level===e).map(t=>`
        <div class="song-card">
          <strong>${t.title}</strong>
          <div class="artist">${t.artist}</div>
          <div class="chords">Acordes: ${t.chords.join(", ")}</div>
          <div class="links">
            ${t.videoUrl?`<a href="${t.videoUrl}" target="_blank">Vídeo</a>`:""}
            ${t.pdfUrl?`<a href="${t.pdfUrl}" target="_blank">PDF</a>`:""}
          </div>
        </div>
      `).join("")}return`
    <section class="ebook">

      <header class="ebook-header">
        <span class="badge">📘 Ebook Interativo</span>
        <h1>${((a=o.app)==null?void 0:a.title)||"Desafio Violão 10 em 30"}</h1>
        <p>${((d=o.app)==null?void 0:d.subtitle)||""}</p>
        <button onclick="window.print()">⬇️ Baixar PDF</button>
      </header>

      <div class="modules">
        ${s.map(e=>{var t;return`
          <div class="module">
            <button class="module-header" onclick="window.toggleModule(${e.id})">
              <div>
                <small>Módulo ${e.id}</small>
                <strong>${e.title}</strong>
              </div>
              <span>${n===e.id?"▲":"▼"}</span>
            </button>

            ${n===e.id?`
                  <div class="module-content">

                    ${e.videoUrl?`
                      <iframe src="${e.videoUrl}" allowfullscreen></iframe>
                    `:""}

                    ${e.content?`
                      <div class="text">${e.content}</div>
                    `:""}

                    ${((t=e.infoBoxes)==null?void 0:t.map(i=>`
                      <div class="info-box">
                        <h4>${i.title}</h4>
                        ${i.content?`<p>${i.content}</p>`:""}
                        ${i.items?`
                          <ul>
                            ${i.items.map(v=>`<li>${v}</li>`).join("")}
                          </ul>
                        `:""}
                      </div>
                    `).join(""))||""}

                    ${e.id===5?`
                          <h3>Músicas</h3>
                          ${[2,3,4,"5+"].map(i=>`
                            <h4>Nível ${i}</h4>
                            ${$(i)}
                          `).join("")}
                        `:""}

                  </div>
                `:""}
          </div>
        `}).join("")}
      </div>

      ${l?`
            <section class="mentoria">
              <h2>${l.title}</h2>
              <p>${l.description}</p>
              <a href="${l.ctaUrl}" target="_blank" class="cta">
                ${l.ctaText}
              </a>
            </section>
          `:""}

      <footer class="ebook-footer">
        ${((r=o.app)==null?void 0:r.slogan)||""}
      </footer>

    </section>
  `}export{p as render};
