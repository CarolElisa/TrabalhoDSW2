document.addEventListener('DOMContentLoaded', () => {
  const formMeusDados = document.getElementById('form-meus-dados');
  const btnVoltar = document.getElementById('btn-voltar');

  // Obtém o ID do usuário da URL
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  // Função para buscar os dados do usuário
  async function buscarUsuario(id) {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`);
      const usuario = await response.json();
      if (usuario) {
        preencherFormulario(usuario);
      } else {
        alert('Usuário não encontrado.');
        window.location.href = 'login.html';
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      alert('Erro ao carregar informações do usuário.');
    }
  }

  // Função para preencher o formulário com os dados do usuário
  function preencherFormulario(usuario) {
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;
    document.getElementById('celular').value = usuario.tel;
    document.getElementById('cep').value = usuario.cep;
    document.getElementById('rua').value = usuario.logradouro;
    document.getElementById('numero').value = usuario.num;
    document.getElementById('cidade').value = usuario.cidade;
    document.getElementById('estado').value = usuario.uf;
  }

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

  // Evento para buscar o endereço quando o CEP for preenchido
  document.getElementById('cep').addEventListener('blur', async (event) => {
    const cep = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
      const endereco = await buscarEndereco(cep);
      if (endereco) {
        document.getElementById('rua').value = endereco.logradouro;
        document.getElementById('cidade').value = endereco.localidade;
        document.getElementById('estado').value = endereco.uf;
      }
    }
  });

  // Evento para enviar o formulário de atualização
  formMeusDados.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Coletar dados do formulário
    const dadosAtualizados = {
      email: document.getElementById('email').value,
      tel: document.getElementById('celular').value,
      senha: document.getElementById('senha').value || undefined, // Senha é opcional
      cep: document.getElementById('cep').value,
      logradouro: document.getElementById('rua').value,
      num: document.getElementById('numero').value,
      cidade: document.getElementById('cidade').value,
      uf: document.getElementById('estado').value,
    };

    // Enviar dados atualizados para o JSON Server
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: 'PATCH', // Usamos PATCH para atualizar apenas os campos fornecidos
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados),
      });

      if (response.ok) {
        alert('Dados atualizados com sucesso!');
        window.location.href = `home.html?id=${userId}`; // Redireciona para a página home
      } else {
        throw new Error('Erro ao atualizar dados');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      alert('Erro ao atualizar dados. Tente novamente.');
    }
  });

  // Evento para voltar à página home
  btnVoltar.addEventListener('click', () => {
    window.location.href = `home.html?id=${userId}`;
  });

  // Inicialização
  if (userId) {
    buscarUsuario(userId);
  } else {
    alert('ID do usuário não fornecido.');
    window.location.href = 'login.html';
  }
});


/*
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
    window.location.href = "home.html";
}

// Adiciona um evento para buscar o endereço quando o CEP for preenchido
document.getElementById('cep').addEventListener('blur', buscarEnderecoPorCEP);

// Adiciona um evento para o envio do formulário
document.getElementById('form-meus-dados').addEventListener('submit', redirecionarParaHome);

// Adiciona um evento para o botão "Voltar"
document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = "home.html";
});

*/