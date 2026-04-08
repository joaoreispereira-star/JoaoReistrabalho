// 1. CONFIGURAÇÃO DO BANCO DE DADOS
const supabaseUrl = "https://khkiewnojpelftnsjjop.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtoa2lld25vanBlbGZ0bnNqam9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjM0MDcsImV4cCI6MjA4OTgzOTQwN30.d-6NPeymO8LuZFKFmX5ddYHBHszOIhsQqcBSQ9a1SJg";

// Inicia a conexão
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. FUNÇÃO PARA BUSCAR E DESENHAR OS PRODUTOS
async function carregarCatalogo() {
  // Faz um SELECT * FROM produtos na nuvem
  let { data: produtos, error } = await banco.from("produtos").select("*");

  if (error) {
    console.error("Erro ao buscar dados:", error);
    return;
  }

  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = ""; // Limpa a tela

  // Loop para desenhar cada produto na tela
  produtos.forEach((item) => {
    // --- PASSO 3: A MÁSCARA DE DINHEIRO ---
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
        `;
    vitrine.appendChild(div);
  });
}

// Roda a função assim que o site abrir
carregarCatalogo();
