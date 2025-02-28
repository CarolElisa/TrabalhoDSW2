import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-900 text-white p-4">
        <div className="flex items-center font-bold text-base max-w-[calc(100%-5rem)]">
          <img src="public\img\logo.png" alt="Logo Realizejá" className="h-16 mr-10" />
          Conectando profissionais e tarefas pendentes
        </div>
        <div className="flex flex-col items-center mt-5">
          <Link to="/login" className="font-bold text-white mb-3">Entrar</Link>
          <Link to="/criar-conta" className="bg-orange-500 text-white rounded p-2 hover:bg-orange-600 font-bold whitespace-nowrap">Cadastre-se</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 m-12 max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Parte Esquerda */}
        <div className="flex flex-col justify-center items-center text-center p-5">
          <h1 className="text-2xl text-blue-900 mb-5">
            O SITE nº 1 em conectar quem tem tarefas pendentes com os profissionais certos!
          </h1>
          <img src="public\img\calendar.jpg" alt="Agenda digital" className="w-full h-auto" />
        </div>

        {/* Parte Direita */}
        <div className="flex flex-col justify-center items-center text-center p-5">
          <h2 className="text-2xl text-blue-900 mb-5">Tire suas tarefas do papel!</h2>
          <h2 className="text-2xl text-blue-900 mb-5">Conquiste novos clientes!</h2>
          <img src="public\img\tasks.jpg" alt="Gestão de tarefas" className="w-full h-auto" />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-900 text-white text-center p-4 mt-20">
        © 2024 <span className="text-orange-500 font-bold">Realizejá</span> - Todos os direitos reservados
      </div>
    </div>
  );
}
