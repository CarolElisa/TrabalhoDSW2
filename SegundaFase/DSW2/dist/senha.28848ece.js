document.addEventListener('DOMContentLoaded', ()=>{
    const formRecuperarSenha = document.querySelector('form');
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    // Se o ID do usuário estiver na URL, exibe o formulário de redefinição de senha
    if (userId) exibirFormularioRedefinicao();
    // Função para exibir o formulário de redefinição de senha
    function exibirFormularioRedefinicao() {
        formRecuperarSenha.innerHTML = `
      <h2 class="text-blue-900 mb-5 text-2xl">Redefinir Senha</h2>
      <p class="text-gray-700 mb-5">Digite sua nova senha abaixo.</p>
      <input type="password" id="nova-senha" placeholder="Nova Senha" required class="p-2 border border-gray-300 rounded-md mb-4">
      <input type="password" id="confirmar-senha" placeholder="Confirmar Nova Senha" required class="p-2 border border-gray-300 rounded-md mb-4">
      <button type="submit" class="btn-primary bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600">Redefinir Senha</button>
    `;
        // Adiciona o evento de envio do formulário de redefinição de senha
        formRecuperarSenha.addEventListener('submit', async (event)=>{
            event.preventDefault();
            // Coleta as senhas do formulário
            const novaSenha = document.getElementById('nova-senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;
            // Valida se as senhas coincidem
            if (novaSenha !== confirmarSenha) {
                alert("As senhas n\xe3o coincidem. Tente novamente.");
                return;
            }
            // Envia a nova senha para o JSON Server
            try {
                const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        senha: novaSenha
                    })
                });
                if (response.ok) {
                    alert('Senha redefinida com sucesso!');
                    window.location.href = '../html/login.html'; // Redireciona para a página de login
                } else throw new Error('Erro ao redefinir senha');
            } catch (error) {
                console.error('Erro ao redefinir senha:', error);
                alert('Erro ao redefinir senha. Tente novamente.');
            }
        });
    }
    // Se o ID do usuário não estiver na URL, exibe o formulário de recuperação de senha
    if (!userId) formRecuperarSenha.addEventListener('submit', async (event)=>{
        event.preventDefault();
        // Coleta o e-mail do formulário
        const email = formRecuperarSenha.querySelector('input[type="email"]').value;
        // Valida o e-mail
        await validarEmail(email);
    });
    // Função para validar o e-mail e redirecionar
    async function validarEmail(email) {
        try {
            // Busca todos os usuários no JSON Server
            const response = await fetch('http://localhost:3000/usuarios');
            const usuarios = await response.json();
            // Verifica se há um usuário com o e-mail fornecido
            const usuario = usuarios.find((user)=>user.email === email);
            if (usuario) // E-mail válido: redireciona para a mesma página com o ID do usuário
            window.location.href = `../html/senha.html?id=${usuario.id}`;
            else // Exibe mensagem de erro
            alert("E-mail n\xe3o encontrado. Verifique o e-mail digitado.");
        } catch (error) {
            console.error('Erro ao validar e-mail:', error);
            alert('Erro ao tentar recuperar senha. Tente novamente.');
        }
    }
});

//# sourceMappingURL=senha.28848ece.js.map
