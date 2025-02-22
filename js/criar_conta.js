// Substitua pela sua chave de API do Mapbox
const MAPBOX_API_KEY = 'pk.eyJ1IjoiZ3VpZGluaTEiLCJhIjoiY203Z2RxcjZ1MDcyeDJqcHlsYjR2aWo5MiJ9.oJhoRhRSuZGFilAXan8sXw';

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

            // Após preencher os campos, monta o endereço completo e geocodifica
            const enderecoCompleto = montarEnderecoCompleto();
            geocodificarEndereco(enderecoCompleto, function(erro, coordenadas) {
                if (erro) {
                    alert("Erro ao geocodificar endereço: " + erro);
                    return;
                }
                // Aqui você pode enviar as coordenadas para o servidor
                // Exemplo de envio para o servidor (substitua por sua lógica real)
                // fetch('/cadastrar-usuario', {
                //     method: 'POST',
                //     body: JSON.stringify({ coordenadas: coordenadas }),
                //     headers: { 'Content-Type': 'application/json' }
                // });
            });
        })
        .catch(error => {
            alert("Erro ao buscar CEP. Tente novamente.");
        });
}

// Função para montar o endereço completo
function montarEnderecoCompleto() {
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Monta o endereço no formato "Rua, Número, Cidade, Estado, Brasil"
    return `${rua}, ${numero}, ${cidade}, ${estado}, Brasil`;
}

// Função para geocodificar o endereço usando a API do Mapbox
function geocodificarEndereco(endereco, callback) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(endereco)}.json?access_token=${MAPBOX_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                const coordenadas = data.features[0].center; // [longitude, latitude]
                callback(null, { longitude: coordenadas[0], latitude: coordenadas[1] });
            } else {
                callback("Endereço não encontrado. Verifique se o endereço está completo e correto.", null);
            }
        })
        .catch(error => {
            callback("Erro ao geocodificar endereço: " + error.message, null);
        });
}

// Função para redirecionar para a página inicial
function redirecionarParaHome(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Monta o endereço completo
    const enderecoCompleto = montarEnderecoCompleto();

    // Geocodifica o endereço para obter as coordenadas
    geocodificarEndereco(enderecoCompleto, function(erro, coordenadas) {
        if (erro) {
            alert(erro);
            return;
        }

        // Aqui você pode enviar as coordenadas para o servidor
        // Exemplo de envio para o servidor (substitua por sua lógica real)
        // fetch('/cadastrar-usuario', {
        //     method: 'POST',
        //     body: JSON.stringify({ coordenadas: coordenadas }),
        //     headers: { 'Content-Type': 'application/json' }
        // });

        // Redireciona para a página inicial
        window.location.href = "../html/home.html";
    });
}

// Adiciona um evento para buscar o endereço quando o CEP for preenchido
document.getElementById('cep').addEventListener('blur', buscarEnderecoPorCEP);

// Adiciona um evento para o envio do formulário
document.getElementById('form-cadastro').addEventListener('submit', redirecionarParaHome);