import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function MeusDados() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    tel: "",
    senha: "",
    cep: "",
    logradouro: "",
    num: "",
    cidade: "",
    uf: ""
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/usuarios/${userId}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Erro ao buscar usuário:", err));
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setFormData({ ...formData, cep });

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            logradouro: data.logradouro,
            cidade: data.localidade,
            uf: data.uf
          }));
          setMessage("Endereço preenchido automaticamente.");
          setError("");
        } else {
          setMessage("");
          setError("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setError("Erro ao buscar CEP.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/usuarios/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Dados atualizados com sucesso!");
        setError("");
      } else {
        setError("Erro ao atualizar dados. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao conectar ao servidor:", err);
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="bg-blue-900 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
        <h1 className="text-blue-900 text-center text-2xl mb-5">Meus Dados</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="font-bold">Nome Completo</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="p-2 border border-gray-300 rounded" />

          <label className="font-bold">E-mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="p-2 border border-gray-300 rounded" />

          <label className="font-bold">Celular (WhatsApp)</label>
          <input type="tel" name="tel" value={formData.tel} onChange={handleChange} required className="p-2 border border-gray-300 rounded" />

          <label className="font-bold">Alterar Senha</label>
          <input type="password" name="senha" placeholder="Nova senha" onChange={handleChange} className="p-2 border border-gray-300 rounded" />

          <label className="font-bold">CEP</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleCepChange}
            required
            className="p-2 border border-gray-300 rounded"
          />

          <label className="font-bold">Rua</label>
          <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} required className="p-2 border border-gray-300 rounded" />

          <label className="font-bold">Número</label>
          <input type="text" name="num" value={formData.num} onChange={handleChange} required className="p-2 border border-gray-300 rounded" />

          <label className="font-bold">Cidade</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} required className="p-2 border border-gray-300 rounded" />

          <label className="font-bold">Estado</label>
          <input type="text" name="uf" value={formData.uf} onChange={handleChange} required className="p-2 border border-gray-300 rounded" />

          <div className="flex justify-between">
            <button type="submit" className="bg-orange-500 text-white p-2 rounded font-bold hover:bg-orange-600">
              Atualizar Dados
            </button>
            <Link to={`/home?id=${userId}`} className="bg-gray-300 text-gray-700 p-2 rounded font-bold hover:bg-gray-400">
              Voltar
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}

