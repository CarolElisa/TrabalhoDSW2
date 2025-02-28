document.addEventListener('DOMContentLoaded', () => {
      const userInfo = document.querySelector('h1');
      const contratanteSection = document.getElementById('contratante-section');
      const prestadorSection = document.getElementById('prestador-section');
      const btnContratante = document.getElementById('btn-contratante');
      const btnPrestador = document.getElementById('btn-prestador');
      const btnCriarSolicitacao = document.getElementById('btn-criar-solicitacao');
      const btnCriarOferta = document.getElementById('btn-criar-oferta');
      const contratanteTableBody = contratanteSection.querySelector('tbody');
      const prestadorTableBody = prestadorSection.querySelector('tbody');
      
      let usuario; // Armazena os dados do usuário logado
      let tarefas; // Armazena as tarefas do JSON Server
    
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('id');
    
      async function buscarUsuario(id) {
        try {
          const response = await fetch(`http://localhost:3000/usuarios/${id}`);
          usuario = await response.json();
          if (usuario) {
            userInfo.textContent = `Bem-vindo(a), ${usuario.nome}!`;
            carregarTarefas();
          } else {
            alert('Usuário não encontrado.');
            window.location.href = 'login.html';
          }
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          alert('Erro ao carregar informações do usuário.');
        }
      }
    
      async function carregarTarefas() {
        try {
          const response = await fetch('http://localhost:3000/tarefas');
          tarefas = await response.json();
          exibirTarefasContratante();
        } catch (error) {
          console.error('Erro ao buscar tarefas:', error);
          alert('Erro ao carregar tarefas.');
        }
      }
    
      function exibirTarefasContratante() {
        contratanteTableBody.innerHTML = tarefas
          .filter((tarefa) => tarefa.tipo === 'Solicitação de Serviço')
          .map(
            (tarefa) => `
              <tr>
                <td class="p-2 border text-center">${tarefa.nome}</td>
                <td class="p-2 border text-center">${tarefa.descricao}</td>
                <td class="p-2 border text-center">${tarefa.distancia || 'N/A'}</td>
                <td class="p-2 border text-center">${tarefa.status || 'Pendente'}</td>
                <td class="p-2 border text-center">
                  <button class="bg-blue-900 text-white p-1 rounded hover:bg-blue-800" onclick="editarTarefa(${tarefa.id})">Editar</button>
                </td>
              </tr>
            `
          )
          .join('');
      }
    
      function exibirTarefasPrestador() {
        prestadorTableBody.innerHTML = tarefas
          .filter((tarefa) => tarefa.tipo === 'Oferta de Serviço')
          .map(
            (tarefa) => `
              <tr>
                <td class="p-2 border text-center">${tarefa.nome}</td>
                <td class="p-2 border text-center">${tarefa.descricao}</td>
                <td class="p-2 border text-center">${tarefa.distancia || 'N/A'}</td>
                <td class="p-2 border text-center">${tarefa.status || 'Pendente'}</td>
                <td class="p-2 border text-center">
                  <button class="bg-blue-900 text-white p-1 rounded hover:bg-blue-800" onclick="editarTarefa(${tarefa.id})">Editar</button>
                  <button class="bg-red-500 text-white p-1 rounded hover:bg-red-600" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                </td>
              </tr>
            `
          )
          .join('');
      }
    
      window.editarTarefa = (tarefaId) => {
        window.location.href = `editar_servico.html?tipo=editar&id=${tarefaId}&userId=${userId}`;
      };
    
      window.excluirTarefa = async (tarefaId) => {
        try {
          const response = await fetch(`http://localhost:3000/tarefas/${tarefaId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            alert('Tarefa excluída com sucesso!');
            carregarTarefas();
          } else {
            throw new Error('Erro ao excluir tarefa');
          }
        } catch (error) {
          console.error('Erro ao excluir tarefa:', error);
          alert('Erro ao excluir tarefa.');
        }
      };
    
      btnContratante.addEventListener('click', () => {
        contratanteSection.classList.remove('hidden');
        prestadorSection.classList.add('hidden');
        exibirTarefasContratante();
      });
    
      btnPrestador.addEventListener('click', () => {
        prestadorSection.classList.remove('hidden');
        contratanteSection.classList.add('hidden');
        exibirTarefasPrestador();
      });
    
      btnCriarSolicitacao.addEventListener('click', () => {
        window.location.href = `criar_servico.html?tipo=solicitacao&userId=${userId}`;
      });
    
      btnCriarOferta.addEventListener('click', () => {
        window.location.href = `criar_servico.html?tipo=oferta&userId=${userId}`;
      });
    
      if (userId) {
        buscarUsuario(userId);
      } else {
        alert('ID do usuário não fornecido.');
        window.location.href = 'login.html';
      }
  });
  

/* VERIFICAR DEPOIS

// Coordenadas do usuário (substitua pelas coordenadas reais do usuário)
const usuarioCoordenadas = {
    latitude: -23.5505, // Exemplo: Latitude de São Paulo
    longitude: -46.6333 // Exemplo: Longitude de São Paulo
};

// Serviços solicitados (Contratante)
const servicosSolicitados = [
    {
        id: "distancia-solicitado-1",
        latitude: -23.5615, // Exemplo: Latitude de um serviço solicitado
        longitude: -46.6553 // Exemplo: Longitude de um serviço solicitado
    },
    // Adicione mais serviços solicitados aqui
];

// Serviços oferecidos (Prestador)
const servicosOfertados = [
    {
        id: "distancia-ofertado-1",
        latitude: -23.5700, // Exemplo: Latitude de um serviço oferecido
        longitude: -48.6400 // Exemplo: Longitude de um serviço oferecido
    },
    // Adicione mais serviços oferecidos aqui
];

// Função para calcular a distância entre duas coordenadas (fórmula de Haversine)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
}

// Função para exibir a distância dos serviços
function exibirDistancias() {
    // Serviços solicitados (Contratante)
    servicosSolicitados.forEach(servico => {
        const distancia = calcularDistancia(
            usuarioCoordenadas.latitude,
            usuarioCoordenadas.longitude,
            servico.latitude,
            servico.longitude
        );
        const distanciaFormatada = distancia.toFixed(2) + " km"; // Formata para 2 casas decimais
        document.getElementById(servico.id).textContent = distanciaFormatada;
    });

    // Serviços oferecidos (Prestador)
    servicosOfertados.forEach(servico => {
        const distancia = calcularDistancia(
            usuarioCoordenadas.latitude,
            usuarioCoordenadas.longitude,
            servico.latitude,
            servico.longitude
        );
        const distanciaFormatada = distancia.toFixed(2) + " km"; // Formata para 2 casas decimais
        document.getElementById(servico.id).textContent = distanciaFormatada;
    });
}

// Função para alternar entre contratante e prestador
function toggleRole(role) {
    const contratanteSection = document.getElementById('contratante-section');
    const prestadorSection = document.getElementById('prestador-section');
    const btnContratante = document.getElementById('btn-contratante');
    const btnPrestador = document.getElementById('btn-prestador');

    if (role === 'contratante') {
        contratanteSection.style.display = 'block';
        prestadorSection.style.display = 'none';
        btnContratante.classList.add('bg-orange-600');
        btnPrestador.classList.remove('bg-orange-600');
    } else {
        contratanteSection.style.display = 'none';
        prestadorSection.style.display = 'block';
        btnContratante.classList.remove('bg-orange-600');
        btnPrestador.classList.add('bg-orange-600');
    }
}

// Adiciona eventos aos botões de alternância
document.getElementById('btn-contratante').addEventListener('click', () => toggleRole('contratante'));
document.getElementById('btn-prestador').addEventListener('click', () => toggleRole('prestador'));

// Exibe as distâncias ao carregar a página
exibirDistancias();

*/