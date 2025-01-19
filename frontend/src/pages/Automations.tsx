import Layout from "../components/Layout";
import { Plus, Zap, Play, Trash } from "lucide-react";
import { useState } from "react";

// Types
interface Action {
  id: string;
  type: string;
}

interface Trigger {
  id: string;
  type: string;
}

interface Automation {
  id: number;
  name: string;
  trigger: Trigger;
  actions: Action[];
  enabled: boolean;
}

// Mock Data
const TRIGGER_OPTIONS = [
  "When bathroom light is turned on",
  "When bathroom light is turned off",
  "Every day at 7:00 AM",
  "When someone arrives home",
  "Every day at 10:00 PM",
  "When everyone leaves home",
];

const ACTION_OPTIONS = [
  "Turn on lights",
  "Turn off lights",
  "Adjust thermostat",
  "Lock doors",
  "Unlock doors",
  "Send notification",
  "Play music",
  "Play welcome message",
];

const automations: Automation[] = [
  {
    id: 1,
    name: "Morning Routine",
    trigger: { id: "1", type: "Every day at 7:00 AM" },
    actions: [
      { id: "1", type: "Turn on lights" },
    ],
    enabled: true,
  },
  {
    id: 2,
    name: "Welcome Home",
    trigger: { id: "1", type: "When someone arrives home" },
    actions: [
      { id: "1", type: "Turn on lights" },
      { id: "2", type: "Unlock doors" },
      { id: "3", type: "Play welcome message" },
    ],
    enabled: true,
  },
  {
    id: 3,
    name: "Good Night",
    trigger: { id: "1", type: "Every day at 10:00 PM" },
    actions: [
      { id: "1", type: "Turn off lights" },
      { id: "3", type: "Adjust thermostat" },
    ],
    enabled: false,
  },
];

console.log(import.meta.env.VITE_HOME_ASSISTANT_URL);
console.log(import.meta.env.VITE_HOME_ASSISTANT_TOKEN);

const HOME_ASSISTANT_URL = import.meta.env.VITE_HOME_ASSISTANT_URL;
const HOME_ASSISTANT_TOKEN = import.meta.env.VITE_HOME_ASSISTANT_TOKEN;

export default function Automations() {
  const [enabledAutomations, setEnabledAutomations] = useState(
    new Set(automations.filter(a => a.enabled).map(a => a.id))
  );
  const [expandedAutomation, setExpandedAutomation] = useState<number | null>(null);
  const [newActions, setNewActions] = useState<Action[]>([{ id: "new", type: "" }]);
  const [automationList, setAutomationList] = useState(automations);

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

  const toggleExpand = (id: number | null) => {
    setExpandedAutomation(prev => (prev === id ? null : id));
  };

  const handleActionChange = (index: number, value: string) => {
    setNewActions(prev => {
      const updated = [...prev];
      updated[index].type = value;
      return updated;
    });
  };

  const addAction = () => {
    setNewActions(prev => [...prev, { id: `new-${prev.length + 1}`, type: "" }]);
  };

  const removeAction = (index: number) => {
    setNewActions(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateAutomation = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAutomation = {
      id: automationList.length + 1,
      name: "New Automation",
      trigger: { id: "1", type: "When bathroom light is turned on" },
      actions: newActions,
      enabled: true,
    };

    setAutomationList([newAutomation, ...automationList]);
    setExpandedAutomation(null);
    setNewActions([{ id: "new", type: "" }]);
  
    const randomIntId = Math.floor(Math.random() * 100000000);
    const requestBody = {
      description: "",
      mode: "single",
      triggers: [
        {
          trigger: "state",
          entity_id: ["switch.bathroom_light"],
          from: "off",
          to: "on",
        },
      ],
      conditions: [],
      actions: [
        {
          type: "turn_on",
          device_id: "807a1f94ce3e1c71be582ab52cd6d99d",
          entity_id: "0821671c0dbcd04e7ca33b2378c9ba47",
          domain: "switch",
        },
      ],
      alias: "test noufil automation api from app",
    };
  
    try {
      await fetch(`${HOME_ASSISTANT_URL}/api/config/automation/config/${randomIntId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HOME_ASSISTANT_TOKEN}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.error("Error creating automation:", error);
    }
  };

  const handleDeleteAutomation = (id: number) => {
    setAutomationList(prev => prev.filter(automation => automation.id !== id));
  };

  const handleActionEdit = (automationId: number, index: number, value: string) => {
    setAutomationList(prev => {
      const updated = prev.map(automation => {
        if (automation.id === automationId) {
          const updatedActions = [...automation.actions];
          updatedActions[index].type = value;
          return { ...automation, actions: updatedActions };
        }
        return automation;
      });
      return updated;
    });
  };

  const handleActionAdd = (automationId: number) => {
    setAutomationList(prev => {
      const updated = prev.map(automation => {
        if (automation.id === automationId) {
          return { ...automation, actions: [...automation.actions, { id: `new-${automation.actions.length + 1}`, type: "" }] };
        }
        return automation;
      });
      return updated;
    });
  };

  const handleActionRemove = (automationId: number, index: number) => {
    setAutomationList(prev => {
      const updated = prev.map(automation => {
        if (automation.id === automationId) {
          return { ...automation, actions: automation.actions.filter((_, i) => i !== index) };
        }
        return automation;
      });
      return updated;
    });
  };

  return (
    <Layout title="Automations">
      {/* Header Section */}
      <div className="flex justify-between items-center py-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c4dbf3] transform rotate-45 mx-auto"></div>
          <h1 className="text-3xl font-semibold">My Automations</h1>
        </div>
        
        <button
          onClick={() => toggleExpand(-1)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Automation
        </button>
      </div>

      {/* Automations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {expandedAutomation === -1 && (
          <div className="border border-gray-200 rounded-3xl">
            <div className="p-6">
              <form onSubmit={handleCreateAutomation}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="mt-1 block w-full px-4 py-2.5
                      bg-white border border-gray-300 
                      rounded-xl shadow-sm
                      text-gray-700
                      appearance-none
                      cursor-pointer
                      hover:border-primary/50
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Trigger</label>
                  <select className="mt-1 block w-full px-4 py-2.5
                      bg-white border border-gray-300 
                      rounded-xl shadow-sm
                      text-gray-700
                      appearance-none
                      cursor-pointer
                      hover:border-primary/50
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {TRIGGER_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Actions</label>
                  {newActions.map((action, index) => (
                    <div key={action.id} className="flex items-center mb-2">
                      <select
                        value={action.type}
                        onChange={(e) => handleActionChange(index, e.target.value)}
                        className="mt-1 block w-full px-4 py-2.5
                          bg-white border border-gray-300 
                          rounded-xl shadow-sm
                          text-gray-700
                          appearance-none
                          cursor-pointer
                          hover:border-primary/50
                          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">Select action</option>
                        {ACTION_OPTIONS.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeAction(index)}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAction}
                    className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Add Action
                  </button>
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => toggleExpand(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {automationList.map((automation) => (
          <div key={automation.id} className="border border-gray-200 rounded-3xl">
            <div className="p-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{automation.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Zap className="w-4 h-4 mr-1" />
                  {automation.trigger.type}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Play className="w-4 h-4 mr-1" />
                  {automation.actions.length} Actions
                </div>
                <div className="flex space-x-2 pt-4">
                  <button onClick={() => toggleExpand(automation.id)} className="text-sm text-primary hover:text-primary/80">
                    Edit
                  </button>
                  <span className="text-gray-300">|</span>
                  <button onClick={() => handleDeleteAutomation(automation.id)} className="text-sm text-red-600 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
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
            </div>
            {expandedAutomation === automation.id && (
              <div className="p-6 border-t border-gray-200 bg-secondary/60 rounded-b-3xl">
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Trigger</label>
                    <select className="mt-1 block w-full px-4 py-2.5
                        bg-white border border-gray-300 
                        rounded-xl shadow-sm
                        text-gray-700
                        appearance-none
                        cursor-pointer
                        hover:border-primary/50
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      {TRIGGER_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Actions</label>
                    {automation.actions.map((action, index) => (
                      <div key={action.id} className="flex items-center mb-2">
                        <select
                          value={action.type}
                          onChange={(e) => handleActionEdit(automation.id, index, e.target.value)}
                          className="mt-1 block w-full px-4 py-2.5
                            bg-white border border-gray-300 
                            rounded-xl shadow-sm
                            text-gray-700
                            appearance-none
                            cursor-pointer
                            hover:border-primary/50
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">Select action</option>
                          {ACTION_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => handleActionRemove(automation.id, index)}
                          className="ml-2 text-red-600 hover:text-red-700"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleActionAdd(automation.id)}
                      className="mt-2 px-1 py-2 flex text-sm text-primary rounded-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Action
                    </button>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={() => toggleExpand(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
