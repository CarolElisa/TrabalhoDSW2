import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CriarConta from "./pages/CriarConta";
import CriarServico from "./pages/CriarServico";
import DetalhesServico from "./pages/DetalhesServico";
import EditarServico from "./pages/EditarServico";
import Home from "./pages/Home";
import HomeDashboard from "./pages/HomeDashboard";
import Login from "./pages/Login";
import MeusDados from "./pages/MeusDados";
import RecuperarSenha from "./pages/RecuperarSenha";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/senha" element={<RecuperarSenha />} />
        <Route path="/detalhes-servico" element={<DetalhesServico />} />
        <Route path="/criar-servico" element={<CriarServico />} />
        <Route path="/editar-servico" element={<EditarServico />} />
        <Route path="/meus-dados" element={<MeusDados />} />
        <Route path="/home" element={<HomeDashboard />} />

      </Routes>
    </Router>
  );
}


