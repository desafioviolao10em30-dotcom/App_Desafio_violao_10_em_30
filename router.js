// router.js (VANILLA HASH ROUTER)

const routes = {
  '/home': () => import('./pages/home.js'),
  '/ebook': () => import('./pages/ebook.js'),
  '/comunidade': () => import('./pages/comunidade.js'),
  '/mentoria': () => import('./pages/mentoria.js'),
  '/obrigado': () => import('./pages/obrigado.js'),
};

const view = () => document.getElementById('view');

async function loadRoute() {
  const hash = window.location.hash || '#/home';
  const path = hash.replace('#', '');

  const loader = routes[path] || routes['/home'];

  try {
    const page = await loader();
    view().innerHTML = page.render();
  } catch (err) {
    console.error('Erro ao carregar rota:', err);
    view().innerHTML = `<h2>Erro ao carregar página</h2>`;
  }
}

export function initRouter() {
  window.addEventListener('hashchange', loadRoute);
  loadRoute(); // inicial
}
