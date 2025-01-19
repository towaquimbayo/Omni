import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const isPageActive = (path: string) => {
    if (window.location.pathname === path) {
      return "text-primary font-medium transition duration-300 ease-in-out border-b-2 border-primary/30 pb-1";
    } else {
      return "text-gray-500 hover:text-primary transition duration-300 ease-in-out";
    }
  };

  return (
    <nav className="absolute bottom-6 left-16 right-16">
      <div className="w-full bg-[#f8f8f8] shadow-sm rounded-full flex justify-between items-center p-2">
        <img
          src="../assets/primary_logo_dark.svg"
          alt="Omni"
          className="h-6 pl-6 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
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
          <Link className={isPageActive("/login")} to="/login">
            Logout
          </Link>
          {/* @TODO: Fix logout */}
          {/* <button className="text-gray-500" onClick={() => alert("Logout")}>
            Logout
          </button> */}
        </div>
        <div className="flex justify-between items-center gap-2 p-2 pr-4 bg-white rounded-full">
          <img
            src="https://api.dicebear.com/8.x/avataaars/svg?seed=Whiskers"
            alt="Profile Image"
            className="w-10 h-10 rounded-full bg-[#f8f8f8]"
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
