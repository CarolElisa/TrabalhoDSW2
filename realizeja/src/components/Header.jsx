import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-blue-900 text-white p-4 w-full">
      <div className="flex items-center font-bold text-lg">
        <img src="/img/logo.png" alt="Logo RealizeJá" className="h-16 mr-10" />
        RealizeJá - Dashboard
      </div>
      <div className="flex">

        <Link to="/" className="text-white ml-5 font-bold hover:underline">
          Sair
        </Link>
      </div>
    </div>
  );
}
