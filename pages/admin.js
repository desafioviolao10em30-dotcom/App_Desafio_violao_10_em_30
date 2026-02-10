import { supabase } from "../supabase.js";

export function render() {
  return `
    <section class="page-wrap">

      <h1 class="title-xl gold">Painel Admin</h1>

      <div class="card">
        <h2 class="title-md">📌 Perguntas da Comunidade</h2>
        <div id="admin-questions"></div>
      </div>

      <div class="card" style="margin-top:30px;">
        <h2 class="title-md">🛒 Produtos da Loja</h2>

        <form id="product-form" class="form">
          <input id="product-title" placeholder="Título do produto" />
          <textarea id="product-desc" placeholder="Descrição"></textarea>
          <input id="product-price" placeholder="Preço" type="number" />
          <input id="product-link" placeholder="Link de compra" />
          <button class="btn gold">Salvar Produto</button>
        </form>

        <div id="product-list"></div>
      </div>

    </section>
  `;
}
export async function mount() {
  loadQuestions();
  loadProducts();

  document
    .getElementById("product-form")
    .addEventListener("submit", saveProduct);
}

/* ========================= */
/* PERGUNTAS */
/* ========================= */

async function loadQuestions() {
  const { data } = await supabase
    .from("questions")
    .select(`
      id,
      student_name,
      question,
      answer ( id, answer )
    `)
    .order("created_at", { ascending: false });

  document.getElementById("admin-questions").innerHTML =
    data.map(renderAdminQuestion).join("");
}

function renderAdminQuestion(q) {
  return `
    <div class="admin-question">
      <strong>${q.student_name}</strong>
      <p>${q.question}</p>

      <textarea id="answer-${q.id}" placeholder="Responder..."></textarea>
      <button onclick="sendAnswer('${q.id}')" class="btn small">
        Responder
      </button>
    </div>
  `;
}

window.sendAnswer = async function (questionId) {
  const text = document.getElementById(`answer-${questionId}`).value;

  if (!text) return;

  await supabase.from("answer").insert({
    question_id: questionId,
    answer: text,
  });

  loadQuestions();
};

/* ========================= */
/* PRODUTOS */
/* ========================= */

async function saveProduct(e) {
  e.preventDefault();

  await supabase.from("products").insert({
    title: productTitle.value,
    description: productDesc.value,
    price: productPrice.value,
    link: productLink.value,
    active: true,
  });

  e.target.reset();
  loadProducts();
}

async function loadProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  document.getElementById("product-list").innerHTML =
    data.map(
      (p) => `
        <div class="product-row">
          <strong>${p.title}</strong> — R$ ${p.price}
        </div>
      `
    ).join("");
}
