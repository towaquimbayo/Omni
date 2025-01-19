import { Routes, Route } from "react-router-dom";
import Rooms from "./pages/Rooms";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Automations from "./pages/Automations";
import Devices from "./pages/Devices";
import CreateAutomation from "./pages/CreateAutomation";
import EditAutomation from "./pages/EditAutomation";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Rooms />} />
      <Route path="/automations" element={<Automations />} />
      <Route path="/create-automation" element={<CreateAutomation />} />
      <Route path="/edit-automation/:id" element={<EditAutomation />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
