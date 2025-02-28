document.addEventListener('DOMContentLoaded', () => {
  const formServico = document.getElementById('servico-form');

  let usuario; // Armazena os dados do usuário logado
  let tarefas; // Armazena as tarefas do JSON Server

  const urlParams = new URLSearchParams(window.location.search);
  const tipo = urlParams.get('tipo'); // Obtém o tipo de serviço (oferta ou solicitação)
  const userId = urlParams.get('userId'); // Obtém o ID do usuário

  // Função para criar uma nova tarefa
  async function criarTarefa(tarefa) {
      try {
          const response = await fetch('http://localhost:3000/tarefas', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(tarefa),
          });

          if (response.ok) {
              alert('Tarefa criada com sucesso!');
              window.location.href = `home.html?id=${userId}`;
          } else {
              throw new Error('Erro ao criar tarefa');
          }
      } catch (error) {
          console.error('Erro ao criar tarefa:', error);
          alert('Erro ao criar tarefa. Tente novamente.');
      }
  }

  // Evento de envio do formulário
  formServico.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Coletar dados do formulário
      const tarefa = {
          tipo: document.getElementById('tipo').value === 'oferta' ? 'Oferta de Serviço' : 'Solicitação de Serviço',
          nome: document.getElementById('nome').value,
          descricao: document.getElementById('descricao').value,
          categoria: document.getElementById('categoria').value,
          preco: document.getElementById('preco').value || null,
          status: 'Pendente', // Status padrão para novas tarefas
          userId: userId, // Associa a tarefa ao usuário logado
      };

      // Criar a tarefa
      await criarTarefa(tarefa);
  });

  // Define o valor padrão do tipo, se especificado na URL
  if (tipo) {
      document.getElementById('tipo').value = tipo;
  } else {
      alert('Tipo de serviço não especificado.');
      window.location.href = `home.html?id=${userId}`;
  }
});
