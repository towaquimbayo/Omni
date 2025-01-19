import Layout from "../components/Layout";
import { Plus } from "lucide-react";

export default function Devices() {
  return (
    <Layout title="Devices">
      {/* Header Section */}
      <div className="flex justify-between items-center py-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary/30 transform rotate-45 mx-auto"></div>
          <h1 className="text-3xl font-semibold">My Devices</h1>
        </div>
        
        <button
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Device
        </button>
      </div>
    </Layout>
  );
}
