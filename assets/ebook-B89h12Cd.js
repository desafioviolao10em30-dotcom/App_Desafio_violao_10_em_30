function p(){var s,n,d;const i=window.DESAFIO_DATA||{},r=i.modules||[],c=i.songs||[],a=i.mentoria;let l=localStorage.getItem("ebookActiveModule");function $(e){l=l===String(e)?null:String(e),l?localStorage.setItem("ebookActiveModule",l):localStorage.removeItem("ebookActiveModule"),document.getElementById("ebook-view").innerHTML=p()}function v(e){return c.filter(t=>e==="5+"?t.level>=5:t.level===e).map(t=>`
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
    <section id="ebook-view" class="ebook">

      <header class="ebook-header">
        <span class="badge">📘 Ebook Interativo</span>
        <h1>${((s=i.app)==null?void 0:s.title)||"Desafio Violão 10 em 30"}</h1>
        <p>${((n=i.app)==null?void 0:n.subtitle)||""}</p>
        <button onclick="window.print()">⬇️ Baixar PDF</button>
      </header>

      <div class="modules">
        ${r.map(e=>{var t;return`
          <div class="module">
            <button class="module-header" onclick="(${$})(${e.id})">
              <div>
                <small>Módulo ${e.id}</small>
                <strong>${e.title}</strong>
              </div>
              <span>${l==e.id?"▲":"▼"}</span>
            </button>

            ${l==e.id?`
                  <div class="module-content">

                    ${e.videoUrl?`<iframe src="${e.videoUrl}" allowfullscreen></iframe>`:""}

                    ${e.content?`<div class="text">${e.content}</div>`:""}

                    ${((t=e.infoBoxes)==null?void 0:t.map(o=>`
                      <div class="info-box">
                        <h4>${o.title}</h4>
                        ${o.content?`<p>${o.content}</p>`:""}
                        ${o.items?`
                          <ul>${o.items.map(u=>`<li>${u}</li>`).join("")}</ul>
                        `:""}
                      </div>
                    `).join(""))||""}

                    ${e.id===5?`
                          <h3>Músicas</h3>
                          ${[2,3,4,"5+"].map(o=>`
                            <h4>Nível ${o}</h4>
                            ${v(o)}
                          `).join("")}
                        `:""}

                  </div>
                `:""}
          </div>
        `}).join("")}
      </div>

      ${a?`
            <section class="mentoria">
              <h2>${a.title}</h2>
              <p>${a.description}</p>
              <a href="${a.ctaUrl}" target="_blank" class="cta">
                ${a.ctaText}
              </a>
            </section>
          `:""}

      <footer class="ebook-footer">
        ${((d=i.app)==null?void 0:d.slogan)||""}
      </footer>

    </section>
  `}export{p as render};
