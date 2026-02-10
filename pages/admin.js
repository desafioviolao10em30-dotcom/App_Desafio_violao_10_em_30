import { requireAdmin } from "../auth.js";

export async function render() {
  try {
    await requireAdmin();

    return `
      <section class="page-wrap">

        <div class="card admin-card">

          <h1 class="title-xl gold">Painel Administrativo</h1>
          <p class="muted">
            Área exclusiva para gerenciamento do sistema.
          </p>

          <div class="admin-grid">

            <div class="admin-box">
              <h3>💬 Dúvidas</h3>
              <p>Responder perguntas dos alunos</p>
              <a href="#/admin/questions" class="btn btn-primary">
                Gerenciar
              </a>
            </div>

            <div class="admin-box">
              <h3>🛒 Loja</h3>
              <p>Produtos afiliados</p>
              <a href="#/admin/store" class="btn btn-primary">
                Abrir Loja
              </a>
            </div>

            <div class="admin-box">
              <h3>📚 Conteúdos</h3>
              <p>Materiais do curso</p>
              <button class="btn btn-disabled">
                Em breve
              </button>
            </div>

          </div>

        </div>

      </section>
    `;
  } catch (err) {
    return `
      <section class="page-wrap">
        <div class="card error-card">
          <h2>🚫 Acesso negado</h2>
          <p>Você não tem permissão para acessar esta área.</p>
          <a href="#/home" class="btn btn-primary">Voltar</a>
        </div>
      </section>
    `;
  }
}

export function mount() {}
