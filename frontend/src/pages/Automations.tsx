import Layout from "../components/Layout";
import { Plus, Zap, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Temporary mock data
const automations = [
  {
    id: 1,
    name: "Daily Report",
    trigger: "Every day at 9:00 AM",
    actions: 3,
    enabled: true,
  },
  {
    id: 2,
    name: "New Lead Follow-up",
    trigger: "When new lead is created",
    actions: 2,
    enabled: false,
  },
  {
    id: 3,
    name: "Feedback Request",
    trigger: "After 1 week of purchase",
    actions: 1,
    enabled: true,
  },
  {
    id: 4,
    name: "Abandoned Cart Reminder",
    trigger: "After 1 hour of abandonment",
    actions: 2,
    enabled: true,
  },
];

export default function Automations() {
  const [enabledAutomations, setEnabledAutomations] = useState(
    new Set(automations.filter(a => a.enabled).map(a => a.id))
  );

  const toggleAutomation = (id: number) => {
    setEnabledAutomations(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Layout title="Automations">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Automations</h1>
        <Link
          to="/create-automation"
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Automation
        </Link>
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map((automation) => (
          <div key={automation.id} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{automation.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Zap className="w-4 h-4 mr-1" />
                  {automation.trigger}
                </div>
              </div>
              <button
                onClick={() => toggleAutomation(automation.id)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  enabledAutomations.has(automation.id) ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    enabledAutomations.has(automation.id) ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Play className="w-4 h-4 mr-1" />
              {automation.actions} actions
            </div>

            <div className="mt-4 flex space-x-2">
              <Link 
                to={`/edit-automation/${automation.id}`}
                className="text-sm text-primary hover:text-primary/80">
                  Edit
              </Link>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-red-600 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
