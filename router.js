// router.js
const routes = {
  "/home": () => import("./pages/home.js"),
  "/ebook": () => import("./pages/ebook.js"),
  "/comunidade": () => import("./pages/comunidade.js"),
  "/mentoria": () => import("./pages/mentoria.js"),
  "/obrigado": () => import("./pages/obrigado.js"),
};

const view = () => document.getElementById("view");

async function loadRoute() {
  const hash = window.location.hash || "#/home";
  const path = hash.replace("#", "");

  const loader = routes[path] || routes["/home"];

  try {
    const page = await loader();

    // 👇 AQUI ESTÁ A CORREÇÃO PRINCIPAL
    const html = await page.render();
    view().innerHTML = html;

    if (page.afterRender) {
      page.afterRender();
    }
  } catch (err) {
    console.error(err);
    view().innerHTML = `<h2>Erro ao carregar página</h2>`;
  }
}

export function initRouter() {
  window.addEventListener("hashchange", loadRoute);
  loadRoute();
}
