import Layout from "../components/Layout";
import { Plus, Zap, Play, Trash } from "lucide-react";
import { useState } from "react";

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
];

export default function Automations() {
  const [enabledAutomations, setEnabledAutomations] = useState(
    new Set(automations.filter(a => a.enabled).map(a => a.id))
  );
  const [expandedAutomation, setExpandedAutomation] = useState<number | null>(null);
  const [newActions, setNewActions] = useState<string[]>([""]);
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
      updated[index] = value;
      return updated;
    });
  };

  const addAction = () => {
    setNewActions(prev => [...prev, ""]);
  };

  const removeAction = (index: number) => {
    setNewActions(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateAutomation = (e: React.FormEvent) => {
    e.preventDefault();
    const newAutomation = {
      id: automationList.length + 1,
      name: "New Automation",
      trigger: "Every day at 9:00 AM",
      actions: newActions.length,
      enabled: true,
    };
    setAutomationList([newAutomation, ...automationList]);
    setExpandedAutomation(null);
    setNewActions([""]);
  };

  const handleDeleteAutomation = (id: number) => {
    setAutomationList(prev => prev.filter(automation => automation.id !== id));
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
      <div className="space-y-4">
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
                    <option>Every day at 9:00 AM</option>
                    <option>When new lead is created</option>
                    <option>After 1 week of purchase</option>
                    <option>After 1 hour of abandonment</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Actions</label>
                  {newActions.map((action, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <select
                        value={action}
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
                        <option>Send Email</option>
                        <option>Create Task</option>
                        <option>Send Notification</option>
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
                  {automation.trigger}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Play className="w-4 h-4 mr-1" />
                  {automation.actions} Actions
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
                      <option>Every day at 9:00 AM</option>
                      <option>When new lead is created</option>
                      <option>After 1 week of purchase</option>
                      <option>After 1 hour of abandonment</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Actions</label>
                    {newActions.map((action, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <select
                          value={action}
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
                          <option>Send Email</option>
                          <option>Create Task</option>
                          <option>Send Notification</option>
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
