import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const isPageActive = (path: string) => {
    if (window.location.pathname === path) {
      return "text-primary font-semibold transition duration-300 ease-in-out border-b-2 border-primary/30 pb-1";
    } else {
      return "text-gray-500 hover:text-primary transition duration-300 ease-in-out";
    }
  };

  return (
    <nav className="sticky bottom-6 max-w-[1800px] mx-auto px-4 md:px-8">
      <div className="w-full bg-[#f8f8f8]/70 backdrop-blur-sm shadow-sm rounded-full flex justify-center items-center p-2 sm:justify-between">
        <img
          src="../assets/primary_logo_dark.svg"
          alt="Omni"
          className="hidden h-4 md:h-6 pl-6 w-auto cursor-pointer sm:block"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-4 md:gap-12">
          <Link className={isPageActive("/")} to="/">
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
        </div>
        <div className="hidden justify-between items-center gap-4 p-2 md:pr-4 bg-white rounded-full sm:flex sm:gap-2">
          <img
            src="https://api.dicebear.com/8.x/avataaars/svg?seed=Whiskers"
            alt="Profile Image"
            className="w-10 h-10 rounded-full bg-[#f8f8f8]"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-sm text-gray-500">@elmoworld</span>
            <span className="font-semibold">Elmo World</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
