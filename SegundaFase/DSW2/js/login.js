document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
  
    // Função para validar o login
    async function validarLogin(email, senha) {
      try {
        // Busca todos os usuários no JSON Server
        const response = await fetch('http://localhost:3000/usuarios');
        const usuarios = await response.json();
  
        // Verifica se há um usuário com o email e senha fornecidos
        const usuario = usuarios.find(
          (user) => user.email === email && user.senha === senha
        );
  
        if (usuario) {
          // Login bem-sucedido: redireciona para a página home.html com o ID do usuário
          window.location.href = `../html/home.html?id=${usuario.id}`;
        } else {
          // Exibe mensagem de erro
          errorMessage.classList.remove('hidden');
          errorMessage.textContent = 'E-mail ou senha inválidos.';
        }
      } catch (error) {
        console.error('Erro ao validar login:', error);
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = 'Erro ao tentar fazer login. Tente novamente.';
      }
    }
  
    // Evento de envio do formulário
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Coleta os dados do formulário
      const email = document.getElementById('email').value;
      const senha = document.getElementById('password').value;
  
      // Valida o login
      await validarLogin(email, senha);
    });
  });