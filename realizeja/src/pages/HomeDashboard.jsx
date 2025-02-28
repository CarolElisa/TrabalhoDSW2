import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomeDashboard() {
  const [user, setUser] = useState(null);
  const [tarefas, setTarefas] = useState([]);
  const [modoExibicao, setModoExibicao] = useState("contratante"); // "contratante", "prestador" ou "meusServicos"
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("id");

    if (!userId) {
      navigate("/login");
      return;
    }

    // Buscar informações do usuário
    fetch(`http://localhost:5000/usuarios/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Erro ao buscar usuário:", err));

    // Buscar todas as tarefas
    fetch(`http://localhost:5000/tarefas`)
      .then((res) => res.json())
      .then((data) => setTarefas(data))
      .catch((err) => console.error("Erro ao buscar tarefas:", err));
  }, [location.search, navigate]);

  // Filtrar tarefas conforme o modo de exibição
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (!user) return false;

    if (modoExibicao === "contratante") {
      return tarefa.userId !== user.id && tarefa.tipo.toLowerCase() === "oferta";
    }

    if (modoExibicao === "prestador") {
      return tarefa.userId !== user.id && tarefa.tipo.toLowerCase() === "solicitacao";
    }

    if (modoExibicao === "meusServicos") {
      return tarefa.userId === user.id;
    }

    return false;
  });

  // Função para excluir um serviço
  const handleExcluirServico = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este serviço?");
    if (!confirmacao) return;

    try {
      await fetch(`http://localhost:5000/tarefas/${id}`, { method: "DELETE" });
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (err) {
      console.error("Erro ao excluir serviço:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-w-fit">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-900 text-white p-4 w-full">
        <div className="flex items-center font-bold text-lg">
          <img src="/img/logo.png" alt="Logo RealizeJá" className="h-16 mr-10" />
          RealizeJá - Dashboard
        </div>
        <div className="flex">
        <Link to={`/meus-dados?id=${user?.id}`} className="text-white ml-5 font-bold hover:underline"
        >
          Meus Dados
        </Link>
          <Link to="/" className="text-white ml-5 font-bold hover:underline">
            Sair
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
        {user && <h1 className="text-3xl text-blue-900 mb-5">Bem-vindo(a), {user.nome}!</h1>}

        {/* Alternar entre modos */}
        <div className="flex justify-between mb-5">
          <button
            onClick={() => setModoExibicao("contratante")}
            className={`p-3 rounded-md text-lg font-bold w-1/3 mx-1 ${
              modoExibicao === "contratante" ? "bg-orange-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Sou Contratante
          </button>
          <button
            onClick={() => setModoExibicao("prestador")}
            className={`p-3 rounded-md text-lg font-bold w-1/3 mx-1 ${
              modoExibicao === "prestador" ? "bg-orange-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Sou Prestador
          </button>
          <button
            onClick={() => setModoExibicao("meusServicos")}
            className={`p-3 rounded-md text-lg font-bold w-1/3 mx-1 ${
              modoExibicao === "meusServicos" ? "bg-orange-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Meus Serviços
          </button>
        </div>

        {/* Tabela de Serviços */}
        <h2 className="text-2xl text-gray-800 mb-3">
          {modoExibicao === "contratante"
            ? "Serviços Disponíveis"
            : modoExibicao === "prestador"
            ? "Solicitações de Serviço"
            : "Meus Serviços"}
        </h2>

        {tarefasFiltradas.length > 0 ? (
          <table className="w-full border-collapse table-auto mt-2">
            <thead>
              <tr>
                <th className="bg-blue-900 text-white p-2">Serviço</th>
                <th className="bg-blue-900 text-white p-2">Descrição</th>
                <th className="bg-blue-900 text-white p-2">Status</th>
                <th className="bg-blue-900 text-white p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tarefasFiltradas.map((tarefa) => (
                <tr key={tarefa.id} className="text-center border-b border-gray-300">
                  <td className="p-2">{tarefa.nome}</td>
                  <td className="p-2">{tarefa.descricao}</td>
                  <td className="p-2">{tarefa.status}</td>
                  <td className="p-2 flex justify-center space-x-2">
                    {modoExibicao === "meusServicos" ? (
                      <>
                        <Link
                          to={`/editar-servico?id=${tarefa.id}`}
                          className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleExcluirServico(tarefa.id)}
                          className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                        >
                          Excluir
                        </button>
                      </>
                    ) : (
                      <Link
                      to={`/detalhes-servico?tarefaId=${tarefa.id}&userId=${tarefa.userId}`}
                      className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                    >
                      Ver Detalhes
                    </Link>

                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 mt-4">Nenhum serviço encontrado.</p>
        )}

        <Link
          to={`/criar-servico?id=${user?.id}`}
          className="bg-blue-900 text-white p-3 rounded-md mt-4 inline-block hover:bg-blue-800"
        >
          Criar Novo Serviço
        </Link>
      </div>

      <Footer />
    </div>
  );
}
