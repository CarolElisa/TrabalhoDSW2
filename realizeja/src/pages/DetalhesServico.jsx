import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function DetalhesServico() {
  const [servico, setServico] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tarefaId = searchParams.get("tarefaId");
    const userId = searchParams.get("userId");

    if (!tarefaId || !userId) {
      navigate("/home");
      return;
    }

    // Buscar informações do serviço
    fetch(`http://localhost:5000/tarefas/${tarefaId}`)
      .then((res) => res.json())
      .then((data) => {
        setServico(data);
        return fetch(`http://localhost:5000/usuarios/${userId}`);
      })
      .then((res) => res.json())
      .then((userData) => setUsuario(userData))
      .catch((err) => console.error("Erro ao buscar detalhes do serviço:", err));
  }, [searchParams, navigate]);

  if (!servico || !usuario) {
    return <p className="text-center text-lg font-bold mt-10">Carregando...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl text-blue-900 font-bold mb-4">{servico.nome}</h1>
        <p className="text-gray-700 mb-3"><strong>Descrição:</strong> {servico.descricao}</p>
        <h2 className="text-xl text-blue-900 font-bold mt-6">Criado por {usuario.nome}</h2>
        <div className="mt-6 flex space-x-4">
          <Link to="/home" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Voltar
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
