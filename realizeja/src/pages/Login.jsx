import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/usuarios");
      const users = await response.json();

      const user = users.find((u) => u.email === email && u.senha === password);

      if (user) {
        navigate(`/home?id=${user.id}`);
      } else {
        setError("E-mail ou senha inválidos.");
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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center w-11/12 max-w-sm">
          <div className="text-2xl font-bold text-blue-900 mb-6">Realizejá</div>
          <h2 className="text-xl text-gray-800 mb-6">Fazer login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded focus:border-orange-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded focus:border-orange-500"
            />
            <button type="submit" className="bg-orange-500 text-white p-3 w-full rounded font-bold hover:bg-orange-600">
              Entrar
            </button>
          </form>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Link to="/senha" className="text-sm text-gray-600 hover:text-blue-900 mt-6 inline-block">
            Esqueceu a senha?
          </Link>

          <button onClick={() => navigate("/")} className="bg-gray-300 text-gray-700 p-3 w-full rounded font-bold mt-6 hover:bg-gray-400">
            Voltar
          </button>

          <div className="mt-6 text-sm">
            Ainda não tem uma conta?{" "}
            <Link to="/criar-conta" className="text-orange-500 font-bold hover:text-orange-600">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
