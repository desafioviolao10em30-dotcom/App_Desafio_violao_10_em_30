// router.js (VANILLA HASH ROUTER com suporte a mount())

const routes = {
  "/home": () => import("./pages/home.js"),
  "/ebook": () => import("./pages/ebook.js"),
  "/comunidade": () => import("./pages/comunidade.js"),
  "/mentoria": () => import("./pages/mentoria.js"),
  "/obrigado": () => import("./pages/obrigado.js"),
  import { render as adminRender, mount as adminMount } from "./pages/admin.js";

registerRoute("/admin", adminRender, adminMount);

};

const view = () => document.getElementById("view");

function setActiveNav(path) {
  const links = document.querySelectorAll(".app-nav a[data-route]");
  links.forEach((a) => {
    const route = a.getAttribute("data-route");
    if (route === path) a.classList.add("active");
    else a.classList.remove("active");
  });
}

async function loadRoute() {
  const hash = window.location.hash || "#/home";
  const path = hash.replace("#", "") || "/home";

  const loader = routes[path] || routes["/home"];

  try {
    const pageModule = await loader();

    // render()
    if (typeof pageModule.render !== "function") {
      throw new Error(`Página "${path}" não exporta render()`);
    }

    const html = await pageModule.render();
    view().innerHTML = html;

    // menu ativo
    setActiveNav(path);

    // mount() opcional (para bind de eventos, fetch etc.)
    if (typeof pageModule.mount === "function") {
      await pageModule.mount();
    }
  } catch (err) {
    console.error("Erro ao carregar rota:", err);
    view().innerHTML = `
      <section class="page-wrap">
        <div class="card card--soft">
          <h1 class="title-xl">Erro ao carregar página</h1>
          <p class="muted">Abra o console (F12) para ver detalhes.</p>
        </div>
      </section>
    `;
  }
}

export function initRouter() {
  window.addEventListener("hashchange", loadRoute);
  loadRoute(); // inicial
}
