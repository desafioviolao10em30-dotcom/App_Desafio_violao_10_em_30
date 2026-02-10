const routes = {};

function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

function router() {
  const hash = location.hash || '#/home';
  const route = hash.replace('#', '');

  const view = document.getElementById('view');
  view.innerHTML = '';

  if (routes[route]) {
    view.innerHTML = routes[route]();
  } else {
    view.innerHTML = `
      <div class="card">
        <h2>Página não encontrada</h2>
        <a href="#/home" class="button">Voltar</a>
      </div>
    `;
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

