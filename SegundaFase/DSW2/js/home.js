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