import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CriarConta() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    tel: "",
    senha: "",
    cep: "",
    logradouro: "",
    num: "",
    cidade: "",
    uf: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
            uf: data.uf,
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
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        setError("Erro ao criar conta. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao conectar ao servidor:", err);
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <Header />

      {/* Container */}
      <div className="bg-white rounded-lg shadow-md p-8 text-center w-11/12 max-w-md mx-auto mt-10">
        <h2 className="text-2xl text-blue-900 mb-5">Crie a sua conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="nome" placeholder="Nome completo" required onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />
          <input type="email" name="email" placeholder="E-mail" required onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />
          <input type="tel" name="tel" placeholder="Celular (WhatsApp)" required onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />
          <input type="password" name="senha" placeholder="Senha" required onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />

          {/* Campos de Endereço */}
          <input type="text" name="cep" placeholder="CEP" required value={formData.cep} onChange={handleCepChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />
          <input type="text" name="logradouro" placeholder="Rua" required value={formData.logradouro} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />
          <input type="text" name="num" placeholder="Número" required onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />
          <input type="text" name="cidade" placeholder="Cidade" required value={formData.cidade} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />
          <input type="text" name="uf" placeholder="Estado (ex: SP)" required value={formData.uf} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-orange-500" />

          <button type="submit" className="bg-orange-500 text-white p-3 w-full rounded font-bold hover:bg-orange-600">
            Criar conta
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {message && <p className="text-green-500 text-sm mt-2">{message}</p>}

          <button onClick={() => navigate("/")} className="bg-gray-300 text-gray-700 p-3 w-full rounded font-bold mt-4 hover:bg-gray-400">
            Voltar
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
