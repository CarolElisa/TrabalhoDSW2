// Função para buscar endereço pelo CEP usando a API do ViaCEP
function buscarEnderecoPorCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length !== 8) {
        alert("CEP inválido. O CEP deve ter 8 dígitos.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            // Preenche os campos com os dados do CEP
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
        })
        .catch(error => {
            console.error("Erro ao buscar CEP:", error);
            alert("Erro ao buscar CEP. Tente novamente.");
        });
}

// Função para redirecionar para a página inicial
function redirecionarParaHome(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Aqui você pode adicionar a lógica para enviar os dados atualizados para o servidor
    // Exemplo de envio para o servidor (substitua por sua lógica real)
    // fetch('/atualizar-dados', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         nome: document.getElementById('nome').value,
    //         email: document.getElementById('email').value,
    //         celular: document.getElementById('celular').value,
    //         senha: document.getElementById('senha').value,
    //         cep: document.getElementById('cep').value,
    //         rua: document.getElementById('rua').value,
    //         numero: document.getElementById('numero').value,
    //         cidade: document.getElementById('cidade').value,
    //         estado: document.getElementById('estado').value
    //     }),
    //     headers: { 'Content-Type': 'application/json' }
    // });

    // Redireciona para a página inicial
    window.location.href = "../html/home.html";
}

// Adiciona um evento para buscar o endereço quando o CEP for preenchido
document.getElementById('cep').addEventListener('blur', buscarEnderecoPorCEP);

// Adiciona um evento para o envio do formulário
document.getElementById('form-meus-dados').addEventListener('submit', redirecionarParaHome);

// Adiciona um evento para o botão "Voltar"
document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = "../html/home.html";
});