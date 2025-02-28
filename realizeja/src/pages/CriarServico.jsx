import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CriarServico() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const [formData, setFormData] = useState({
    tipo: "",
    nome: "",
    descricao: "",
    categoria: "",
    preco: "",
    status: "Pendente",
    userId: userId || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tipo || !formData.nome || !formData.descricao || !formData.categoria) {
      setError("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate(`/home?id=${userId}`);
      } else {
        setError("Erro ao criar serviço. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao conectar ao servidor:", err);
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="bg-blue-900 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
        <h1 className="text-blue-900 text-center text-2xl mb-5">Criar Serviço</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="font-bold">Tipo de Serviço</label>
          <select
            name="tipo"
            required
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione o tipo de serviço</option>
            <option value="oferta">Oferta de Serviço</option>
            <option value="solicitacao">Solicitação de Serviço</option>
          </select>

          <label className="font-bold">Nome do Serviço</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome do serviço"
            required
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />

          <label className="font-bold">Descrição</label>
          <textarea
            name="descricao"
            placeholder="Descreva o serviço em detalhes"
            required
            rows="4"
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />

          <label className="font-bold">Categoria</label>
          <select
            name="categoria"
            required
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione a categoria</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="construcao">Construção</option>
            <option value="limpeza">Limpeza</option>
            <option value="saude">Saúde</option>
            <option value="outros">Outros</option>
          </select>

          <label className="font-bold">Preço (opcional)</label>
          <input
            type="text"
            name="preco"
            placeholder="Digite o valor, se aplicável"
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />

          <div className="flex justify-between">
            <button type="submit" className="bg-orange-500 text-white p-2 rounded font-bold hover:bg-orange-600">
              Salvar Serviço
            </button>
            <Link to={`/home?id=${userId}`} className="bg-gray-300 text-gray-700 p-2 rounded font-bold hover:bg-gray-400">
              Voltar
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
