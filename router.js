// router.js (VANILLA HASH ROUTER + LOADING)

const routes = {
  '/home': () => import('./pages/home.js'),
  '/ebook': () => import('./pages/ebook.js'),
  '/comunidade': () => import('./pages/comunidade.js'),
  '/mentoria': () => import('./pages/mentoria.js'),
  '/obrigado': () => import('./pages/obrigado.js'),
};

const view = () => document.getElementById('view');
const loader = () => document.getElementById('app-loading');

function showLoading() {
  loader().classList.remove('hidden');
}

function hideLoading() {
  setTimeout(() => loader().classList.add('hidden'), 250);
}

async function loadRoute() {
  const hash = window.location.hash || '#/home';
  const path = hash.replace('#', '');

  const pageLoader = routes[path] || routes['/home'];

  showLoading();

  try {
    const page = await loader();
view().innerHTML = await page.render();

if (page.afterRender) {
  await page.afterRender();
}

  }

  hideLoading();
}

export function initRouter() {
  window.addEventListener('hashchange', loadRoute);
  loadRoute();
}
