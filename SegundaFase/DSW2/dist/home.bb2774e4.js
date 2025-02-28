document.addEventListener('DOMContentLoaded', ()=>{
    const userInfo = document.querySelector('h1'); // Elemento que exibe o nome do usuário
    const contratanteSection = document.getElementById('contratante-section');
    const prestadorSection = document.getElementById('prestador-section');
    const btnContratante = document.getElementById('btn-contratante');
    const btnPrestador = document.getElementById('btn-prestador');
    const contratanteTableBody = contratanteSection.querySelector('tbody');
    const prestadorTableBody = prestadorSection.querySelector('tbody');
    let usuario; // Armazena os dados do usuário logado
    let tarefas; // Armazena as tarefas do JSON Server
    // Obtém o ID do usuário da URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    // Função para buscar informações do usuário
    async function buscarUsuario(id) {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`);
            usuario = await response.json();
            if (usuario) {
                userInfo.textContent = `Bem-vindo(a), ${usuario.nome}!`;
                carregarTarefas();
            } else {
                alert("Usu\xe1rio n\xe3o encontrado.");
                window.location.href = 'login.html';
            }
        } catch (error) {
            console.error("Erro ao buscar usu\xe1rio:", error);
            alert("Erro ao carregar informa\xe7\xf5es do usu\xe1rio.");
        }
    }
    // Função para buscar tarefas do JSON Server
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
    // Função para exibir tarefas como contratante
    function exibirTarefasContratante() {
        contratanteTableBody.innerHTML = tarefas.filter((tarefa)=>tarefa.tipo === "Solicita\xe7\xe3o de Servi\xe7o").map((tarefa)=>`
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
          `).join('');
    }
    // Função para exibir tarefas como prestador
    function exibirTarefasPrestador() {
        prestadorTableBody.innerHTML = tarefas.filter((tarefa)=>tarefa.tipo === "Oferta de Servi\xe7o").map((tarefa)=>`
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
          `).join('');
    }
    // Função para editar uma tarefa
    window.editarTarefa = (tarefaId)=>{
        window.location.href = `criar_servico.html?tipo=editar&id=${tarefaId}&userId=${userId}`;
    };
    // Função para excluir uma tarefa
    window.excluirTarefa = async (tarefaId)=>{
        try {
            const response = await fetch(`http://localhost:3000/tarefas/${tarefaId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Tarefa exclu\xedda com sucesso!");
                carregarTarefas(); // Recarrega as tarefas após exclusão
            } else throw new Error('Erro ao excluir tarefa');
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            alert('Erro ao excluir tarefa.');
        }
    };
    // Evento para alternar para a visão de contratante
    btnContratante.addEventListener('click', ()=>{
        contratanteSection.classList.remove('hidden');
        prestadorSection.classList.add('hidden');
        exibirTarefasContratante();
    });
    // Evento para alternar para a visão de prestador
    btnPrestador.addEventListener('click', ()=>{
        prestadorSection.classList.remove('hidden');
        contratanteSection.classList.add('hidden');
        exibirTarefasPrestador();
    });
    // Inicialização
    if (userId) buscarUsuario(userId);
    else {
        alert("ID do usu\xe1rio n\xe3o fornecido.");
        window.location.href = 'login.html';
    }
}); /* VERIFICAR DEPOIS

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

//# sourceMappingURL=home.bb2774e4.js.map
