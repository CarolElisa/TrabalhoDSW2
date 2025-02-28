import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/usuarios");
      const users = await response.json();
      const user = users.find((u) => u.email === email);

      if (user) {
        setMessage("Um link de redefinição de senha foi enviado para seu e-mail.");
        // Aqui você pode simular o envio de e-mail
      } else {
        setMessage("E-mail não encontrado.");
      }
    } catch (err) {
      console.error("Erro ao conectar ao servidor:", err);
      setMessage("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="bg-blue-900 flex justify-center items-center h-screen flex-col">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80 text-center">
        <h2 className="text-2xl text-blue-900 font-bold mb-5">Recuperar Senha</h2>
        <form onSubmit={handlePasswordReset} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:border-orange-500"
          />
          <button type="submit" className="bg-orange-500 text-white p-3 w-full rounded font-bold hover:bg-orange-600">
            Recuperar Senha
          </button>
        </form>

        {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}

        <div className="mt-5 text-sm">
          <Link to="/login" className="text-blue-900 font-bold hover:text-orange-500">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}
