// CONFIGURAÇÃO DO BANCO DE DADOS
const supabaseUrl = "https://khkiewnojpelftnsjjop.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtoa2lld25vanBlbGZ0bnNqam9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjM0MDcsImV4cCI6MjA4OTgzOTQwN30.d-6NPeymO8LuZFKFmX5ddYHBHszOIhsQqcBSQ9a1SJg";

const banco = window.supabase.createClient(supabaseUrl, supabaseKey);
let carrinho = JSON.parse(localStorage.getItem("meu_carrinho")) || [];

async function carregarCatalogo() {
  let { data: produtos, error } = await banco.from("produtos").select("*");

  if (error) {
    console.error("Erro ao buscar dados:", error);
    return;
  }

  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = "";

  produtos.forEach((item) => {
    let precoFormatado = Number(item.preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    let div = document.createElement("div");
    div.className = "card-produto";
    div.innerHTML = `
            <img src="${item.imagem_url}" width="150">
            <h3>${item.nome}</h3>
            <p class="preco-destaque">${precoFormatado}</p>   
            <button onclick="adicionarAoCarrinho('${item.nome}', ${item.preco})">
                Adicionar ao Carrinho
            </button>
        `;
    vitrine.appendChild(div);
  });
}

function adicionarAoCarrinho(nome, preco) {
  const item = { nome, preco };
  carrinho.push(item);
  atualizarCarrinho();
}

// DESAFIO 1: Função para remover item específico
function removerItem(index) {
  carrinho.splice(index, 1); // Remove 1 item na posição index
  atualizarCarrinho(); // Redesenha a tela
}

function atualizarCarrinho() {
  const listaHtml = document.getElementById("lista-carrinho");
  const totalHtml = document.getElementById("valor-total");

  listaHtml.innerHTML = "";
  let somaTotal = 0;

  carrinho.forEach((item, index) => {
    somaTotal += item.preco;
    // Adicionado o botão ❌ chamando removerItem(index)
    listaHtml.innerHTML += `
            <li>
                <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
                <button class="btn-remover" onclick="removerItem(${index})">❌</button>
            </li>`;
  });

  totalHtml.innerText = somaTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  localStorage.setItem("meu_carrinho", JSON.stringify(carrinho));
}

function esvaziarCarrinho() {
  if (confirm("Deseja realmente limpar todo o carrinho?")) {
    carrinho = [];
    atualizarCarrinho();
  }
}

atualizarCarrinho();
carregarCatalogo();
