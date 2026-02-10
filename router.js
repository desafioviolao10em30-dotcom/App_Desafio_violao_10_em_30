// router.js

import { render as homeRender, mount as homeMount } from "./pages/home.js";
import { render as comunidadeRender, mount as comunidadeMount } from "./pages/comunidade.js";
import { render as mentoriaRender, mount as mentoriaMount } from "./pages/mentoria.js";
import { render as obrigadoRender, mount as obrigadoMount } from "./pages/obrigado.js";
import { render as adminRender, mount as adminMount } from "./pages/admin.js";

/* ============================
   REGISTRO DE ROTAS
============================ */

const routes = {
  "/": { render: homeRender, mount: homeMount },
  "/home": { render: homeRender, mount: homeMount },
  "/comunidade": { render: comunidadeRender, mount: comunidadeMount },
  "/mentoria": { render: mentoriaRender, mount: mentoriaMount },
  "/obrigado": { render: obrigadoRender, mount: obrigadoMount },
  "/admin": { render: adminRender, mount: adminMount }
};

/* ============================
   RENDERIZAÇÃO
============================ */

export function router() {
  const path = location.hash.replace("#", "") || "/";
  const route = routes[path];

  const app = document.getElementById("app");

  if (!route) {
    app.innerHTML = `<h1 style="color:white">Página não encontrada</h1>`;
    return;
  }

  app.innerHTML = route.render();
  route.mount?.();
}

/* ============================
   LISTENERS
============================ */

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
