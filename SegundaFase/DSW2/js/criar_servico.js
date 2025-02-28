document.addEventListener('DOMContentLoaded', () => {
    const formServico = document.getElementById('servico-form');
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo'); // Obtém o tipo de serviço (oferta ou solicitação)
    const tarefaId = urlParams.get('id'); // Obtém o ID da tarefa (se estiver editando)
    const userId = urlParams.get('userId'); // Obtém o ID do usuário
  
    // Função para carregar os dados da tarefa (se estiver editando)
    async function carregarTarefa(id) {
      try {
        const response = await fetch(`http://localhost:3000/tarefas/${id}`);
        const tarefa = await response.json();
        if (tarefa) {
          preencherFormulario(tarefa);
        } else {
          alert('Tarefa não encontrada.');
          window.location.href = `home.html?id=${userId}`;
        }
      } catch (error) {
        console.error('Erro ao carregar tarefa:', error);
        alert('Erro ao carregar tarefa. Tente novamente.');
      }
    }
  
    // Função para preencher o formulário com os dados da tarefa
    function preencherFormulario(tarefa) {
      document.getElementById('tipo').value = tarefa.tipo === 'Oferta de Serviço' ? 'oferta' : 'solicitacao';
      document.getElementById('nome').value = tarefa.nome;
      document.getElementById('descricao').value = tarefa.descricao;
      document.getElementById('categoria').value = tarefa.categoria;
      document.getElementById('preco').value = tarefa.preco || '';
    }
  
    // Função para criar ou atualizar uma tarefa
    async function salvarTarefa(tarefa) {
      try {
        let url = 'http://localhost:3000/tarefas';
        let method = 'POST'; // Método padrão para criar uma nova tarefa
  
        if (tarefaId) {
          url = `http://localhost:3000/tarefas/${tarefaId}`;
          method = 'PUT'; // Método para atualizar uma tarefa existente
        }
  
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tarefa),
        });
  
        if (response.ok) {
          alert(tarefaId ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!');
          window.location.href = `home.html?id=${userId}`;
        } else {
          throw new Error('Erro ao salvar tarefa');
        }
      } catch (error) {
        console.error('Erro ao salvar tarefa:', error);
        alert('Erro ao salvar tarefa. Tente novamente.');
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
  
      // Salvar a tarefa
      await salvarTarefa(tarefa);
    });
  
    // Inicialização
    if (tarefaId) {
      // Se houver um ID de tarefa, carrega os dados para edição
      carregarTarefa(tarefaId);
    } else if (tipo) {
      // Se houver um tipo de serviço, define o valor padrão no formulário
      document.getElementById('tipo').value = tipo;
    } else {
      alert('Tipo de serviço não especificado.');
      window.location.href = `home.html?id=${userId}`;
    }
  });