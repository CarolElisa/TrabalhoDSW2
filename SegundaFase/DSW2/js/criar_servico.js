  document.addEventListener('DOMContentLoaded', () => {
    const formServico = document.getElementById('servico-form');

    let usuario; // Armazena os dados do usuário logado
    let tarefas; // Armazena as tarefas do JSON Server

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId'); // Obtém o ID do usuário

    if (!userId || !tipo) {
        alert('Informações incompletas para criar um serviço.');
        window.location.href = 'home.html';
        return;
    }

    // Define o tipo no formulário automaticamente
    document.getElementById('tipo').value = tipo;

    // Evento de envio do formulário
    formServico.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Coletar dados do formulário
        const tarefa = {
            tipo: tipo === 'oferta' ? 'Oferta de Serviço' : 'Solicitação de Serviço',
            nome: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            categoria: document.getElementById('categoria').value,
            preco: document.getElementById('preco').value || null,
            status: 'Pendente', // Status padrão para novas tarefas
            userId: userId, // Associa a tarefa ao usuário logado
        };

        try {
            const response = await fetch('http://localhost:3000/tarefas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tarefa),
            });

            if (response.ok) {
                alert('Serviço criado com sucesso!');
                window.location.href = `home.html?id=${userId}`;
            } else {
                throw new Error('Erro ao criar serviço');
            }
        } catch (error) {
            console.error('Erro ao criar serviço:', error);
            alert('Erro ao criar serviço. Tente novamente.');
        }
    });
});
