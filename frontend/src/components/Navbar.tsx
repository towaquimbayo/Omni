import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const isPageActive = (path: string) => {
    if (window.location.pathname === path) {
      return "text-[#3431c7] font-medium transition duration-300 ease-in-out underline underline-offset-8";
    } else {
      return "text-gray-500 hover:text-[#3431c7] transition duration-300 ease-in-out";
    }
  };

  return (
    <nav className="absolute bottom-6 left-16 right-16">
      <div className="w-full bg-[#f8f8f8] shadow-sm rounded-full flex justify-between items-center p-6">
        <h3
          className="text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Omni
        </h3>
        <div className="flex gap-12">
          <Link className={isPageActive("/")} to="/" aria-current="page">
            Rooms
          </Link>
          <Link className={isPageActive("/devices")} to="/devices">
            Devices
          </Link>
          <Link className={isPageActive("/automations")} to="/automations">
            Automations
          </Link>
          {/* @TODO: Fix logout */}
          <button className="text-gray-500" onClick={() => alert("Logout")}>
            Logout
          </button>
        </div>
        <div className="flex justify-between items-center gap-2 px-4 py-2 bg-white rounded-full">
          <img
            src="../assets/profile.jpg"
            alt="Profile Image"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">@elmoworld</span>
            <span className="font-semibold">Elmo World</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
