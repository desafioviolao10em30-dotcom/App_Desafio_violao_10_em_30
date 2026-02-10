// pages/ebook.js

export function render() {
  const data = window.DESAFIO_DATA || {};
  const modules = data.modules || [];
  const songs = data.songs || [];
  const mentoria = data.mentoria;

  let activeModule = localStorage.getItem("ebookActiveModule");

  function toggleModule(id) {
    activeModule = activeModule === String(id) ? null : String(id);

    if (activeModule) {
      localStorage.setItem("ebookActiveModule", activeModule);
    } else {
      localStorage.removeItem("ebookActiveModule");
    }

    document.getElementById("ebook-view").innerHTML = render();
  }

  function renderSongs(level) {
    return songs
      .filter(s => level === "5+" ? s.level >= 5 : s.level === level)
      .map(song => `
        <div class="song-card">
          <strong>${song.title}</strong>
          <div class="artist">${song.artist}</div>
          <div class="chords">Acordes: ${song.chords.join(", ")}</div>
          <div class="links">
            ${song.videoUrl ? `<a href="${song.videoUrl}" target="_blank">Vídeo</a>` : ""}
            ${song.pdfUrl ? `<a href="${song.pdfUrl}" target="_blank">PDF</a>` : ""}
          </div>
        </div>
      `)
      .join("");
  }

  return `
    <section id="ebook-view" class="ebook">

      <header class="ebook-header">
        <span class="badge">📘 Ebook Interativo</span>
        <h1>${data.app?.title || "Desafio Violão 10 em 30"}</h1>
        <p>${data.app?.subtitle || ""}</p>
        <button onclick="window.print()">⬇️ Baixar PDF</button>
      </header>

      <div class="modules">
        ${modules.map(m => `
          <div class="module">
            <button class="module-header" onclick="(${toggleModule})(${m.id})">
              <div>
                <small>Módulo ${m.id}</small>
                <strong>${m.title}</strong>
              </div>
              <span>${activeModule == m.id ? "▲" : "▼"}</span>
            </button>

            ${
              activeModule == m.id
                ? `
                  <div class="module-content">

                    ${m.videoUrl ? `<iframe src="${m.videoUrl}" allowfullscreen></iframe>` : ""}

                    ${m.content ? `<div class="text">${m.content}</div>` : ""}

                    ${m.infoBoxes?.map(box => `
                      <div class="info-box">
                        <h4>${box.title}</h4>
                        ${box.content ? `<p>${box.content}</p>` : ""}
                        ${box.items ? `
                          <ul>${box.items.map(i => `<li>${i}</li>`).join("")}</ul>
                        ` : ""}
                      </div>
                    `).join("") || ""}

                    ${
                      m.id === 5
                        ? `
                          <h3>Músicas</h3>
                          ${[2,3,4,"5+"].map(l => `
                            <h4>Nível ${l}</h4>
                            ${renderSongs(l)}
                          `).join("")}
                        `
                        : ""
                    }

                  </div>
                `
                : ""
            }
          </div>
        `).join("")}
      </div>

      ${
        mentoria
          ? `
            <section class="mentoria">
              <h2>${mentoria.title}</h2>
              <p>${mentoria.description}</p>
              <a href="${mentoria.ctaUrl}" target="_blank" class="cta">
                ${mentoria.ctaText}
              </a>
            </section>
          `
          : ""
      }

      <footer class="ebook-footer">
        ${data.app?.slogan || ""}
      </footer>

    </section>
  `;
}
