// --- CONFIGURAÇÃO DO SUPABASE ---
const supabaseUrl = "https://khkiewnojpelftnsjjop.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtoa2lld25vanBlbGZ0bnNqam9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjM0MDcsImV4cCI6MjA4OTgzOTQwN30.d-6NPeymO8LuZFKFmX5ddYHBHszOIhsQqcBSQ9a1SJg";
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- DESAFIO 1: ATALHO DO TECLADO ---
// Selecionamos o campo de senha e adicionamos o ouvinte para a tecla "Enter"
document
  .getElementById("password")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita comportamentos estranhos do navegador
      fazerLogin(); // Dispara a função de login
    }
  });

// --- FUNÇÃO DE LOGIN ---
async function fazerLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("mensagem");
  const btn = document.getElementById("btn-entrar");

  // Validação básica para não enviar campos vazios
  if (!email || !password) {
    msg.innerText = "Por favor, preencha todos os campos.";
    msg.style.color = "orange";
    return;
  }

  // Efeito de carregamento (Feedback visual)
  btn.innerText = "Verificando...";
  btn.disabled = true;

  // Comando que tenta logar no Supabase
  const { data, error } = await banco.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    msg.innerText = "Acesso Negado: " + error.message;
    msg.style.color = "red";
    btn.innerText = "Entrar no Painel";
    btn.disabled = false; // Libera o botão novamente
  } else {
    msg.innerText = "Acesso concedido! Carregando painel...";
    msg.style.color = "green";

    // Pequena pausa para o usuário ler a mensagem de sucesso
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);
  }
}

// --- UTILITÁRIO: MOSTRAR/ESCONDER SENHA ---
function mostrarSenha() {
  let inputSenha = document.getElementById("password");
  let btnOlho = document.getElementById("btn-olho");

  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    btnOlho.innerText = "🙈"; // Troca o emoji para indicar que vai esconder
  } else {
    inputSenha.type = "password";
    btnOlho.innerText = "👁️"; // Troca o emoji para indicar que vai mostrar
  }
}
