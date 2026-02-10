// router.js — HASH ROUTER COM SUPORTE A ASYNC (ESTÁVEL)

const routes = {};

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

async function loadRoute() {
  const view = document.getElementById('view');
  const hash = window.location.hash || '#/home';
  const path = hash.replace('#', '');

  const render = routes[path] || routes['/home'];

  try {
    const result = render();
    view.innerHTML = result instanceof Promise ? await result : result;
  } catch (err) {
    console.error(err);
    view.innerHTML = `
      <div class="card">
        <h2>Erro ao carregar página</h2>
      </div>
    `;
  }
}

export function initRouter() {
  window.addEventListener('hashchange', loadRoute);
  loadRoute();
}
