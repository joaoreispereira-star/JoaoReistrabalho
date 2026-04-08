const supabaseUrl = "https://khkiewnojpelftnsjjop.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtoa2lld25vanBlbGZ0bnNqam9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjM0MDcsImV4cCI6MjA4OTgzOTQwN30.d-6NPeymO8LuZFKFmX5ddYHBHszOIhsQqcBSQ9a1SJg";

const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

async function verificarAcesso() {
  // Pergunta ao Supabase: Tem alguém logado?
  const {
    data: { user },
  } = await banco.auth.getUser();

  if (!user) {
    alert("Área restrita! Faça login primeiro.");
    window.location.href = "login.html"; // Expulsa o invasor
  } else {
    // Se estiver logado, mostra quem é
    document.getElementById("nome-usuario").innerText = user.email;
  }
}

verificarAcesso();

// Função para o Desafio 2 (15 Itens)

async function cadastrarProduto() {
  let nome = document.getElementById("input-nome").value;
  let preco = document.getElementById("input-preco").value;
  let imagem = document.getElementById("input-imagem").value;

  const { error } = await banco
    .from("produtos")
    .insert([{ nome, preco, imagem_url: imagem }]);
  if (error) alert("Erro ao salvar");
  else {
    alert("Sucesso!");
    location.reload();
  }
}
async function sairDoSistema() {
  await banco.auth.signOut();
  window.location.href = "index.html"; // Manda de volta para a vitrine pública
}
