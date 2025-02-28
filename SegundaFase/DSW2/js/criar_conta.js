document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
  
    // Função para buscar o endereço a partir do CEP
    async function buscarEndereco(cep) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
          throw new Error('CEP não encontrado');
        }
        return data;
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('CEP não encontrado. Por favor, verifique o CEP digitado.');
        return null;
      }
    }
  
    // Função para preencher os campos de endereço
    async function preencherEndereco(cep) {
      const endereco = await buscarEndereco(cep);
      if (endereco) {
        document.getElementById('rua').value = endereco.logradouro;
        document.getElementById('cidade').value = endereco.localidade;
        document.getElementById('estado').value = endereco.uf;
      }
    }
  
    // Evento para buscar o endereço quando o CEP for preenchido
    document.getElementById('cep').addEventListener('blur', async (event) => {
      const cep = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
      if (cep.length === 8) {
        await preencherEndereco(cep);
      }
    });
  
    // Evento para enviar o formulário
    formCadastro.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Coletar dados do formulário
      const usuario = {
        nome: formCadastro.querySelector('input[type="text"]').value,
        email: formCadastro.querySelector('input[type="email"]').value,
        tel: formCadastro.querySelector('input[type="tel"]').value,
        senha: formCadastro.querySelector('input[type="password"]').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('rua').value,
        num: document.getElementById('numero').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('estado').value,
      };
  
      // Enviar dados para o JSON Server
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario),
        });
  
        if (response.ok) {
          alert('Cadastro realizado com sucesso!');
          window.location.href = 'login.html'; // Redireciona para a página de login
        } else {
          throw new Error('Erro ao cadastrar usuário');
        }
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao cadastrar usuário. Tente novamente.');
      }
    });
  });

/* VERIFICAR DEPOIS SE REMOVE OU NÃO

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
        window.location.href = "home.html";
    });
}

// Adiciona um evento para buscar o endereço quando o CEP for preenchido
document.getElementById('cep').addEventListener('blur', buscarEnderecoPorCEP);

// Adiciona um evento para o envio do formulário
document.getElementById('form-cadastro').addEventListener('submit', redirecionarParaHome);*/