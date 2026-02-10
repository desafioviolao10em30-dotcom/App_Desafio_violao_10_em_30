import { supabase } from "../supabase.js";

export function render() {
  return `
    <section class="comunidade-card">
      <h1>💬 Comunidade do Desafio</h1>
      <p class="subtitle">
        Este é o mural oficial de dúvidas do curso. Envie sua pergunta abaixo.
      </p>

      <form id="form-duvida" class="form">
        <input
          type="text"
          id="student_name"
          placeholder="Seu nome"
          required
          class="input"
        />

        <textarea
          id="question"
          placeholder="Digite sua dúvida"
          required
          class="textarea"
        ></textarea>

        <button type="submit" class="button primary">
          Enviar dúvida
        </button>
      </form>
    </section>

    <section class="mural-card">
      <h2>📌 Mural de Perguntas</h2>
      <div id="mural">Carregando perguntas...</div>
    </section>
  `;
}

export async function afterRender() {
  const form = document.getElementById("form-duvida");
  const mural = document.getElementById("mural");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const student_name = document.getElementById("student_name").value.trim();
    const question = document.getElementById("question").value.trim();

    if (!student_name || !question) return;

    const { error } = await supabase
      .from("questions")
      .insert([{ student_name, question }]);

    if (error) {
      alert("Erro ao enviar dúvida.");
      console.error(error);
      return;
    }

    form.reset();
    carregarPerguntas();
  });

  carregarPerguntas();

  async function carregarPerguntas() {
    mural.innerHTML = "Carregando perguntas...";

    // 1️⃣ Buscar perguntas
    const { data: perguntas, error } = await supabase
      .from("questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      mural.innerHTML = "Erro ao carregar perguntas.";
      console.error(error);
      return;
    }

    if (!perguntas.length) {
      mural.innerHTML = "Nenhuma dúvida enviada ainda.";
      return;
    }

    // 2️⃣ Buscar respostas separadamente
    const ids = perguntas.map((p) => p.id);

    const { data: respostas } = await supabase
      .from("answer")
      .select("*")
      .in("id_da_pergunta", ids);

    mural.innerHTML = perguntas
      .map((p) => {
        const resposta = respostas?.find(
          (r) => r.id_da_pergunta === p.id
        );

        return `
          <div class="question-card">
            <strong>${p.student_name}</strong>
            <p>${p.question}</p>

            ${
              resposta
                ? `
                  <div class="answer">
                    <strong>Resposta do instrutor:</strong>
                    <p>${resposta.answer}</p>
                  </div>
                `
                : `
                  <div class="answer pending">
                    Aguardando resposta…
                  </div>
                `
            }
          </div>
        `;
      })
      .join("");
  }
}
