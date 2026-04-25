"use client";

interface SidebarProps {
  view: string;
  setView: (view: string) => void;
}

interface ItemProps {
  id: string;
  label: string;
  currentView: string;
  setView: (view: string) => void;
}

const SidebarItem = ({ id, label, currentView, setView }: ItemProps) => (
  <div
    onClick={() => setView(id)}
    className={`px-4 py-3 cursor-pointer transition-colors ${
      currentView === id ? "bg-white text-black font-medium" : "text-gray-400 hover:text-white hover:bg-gray-900"
    }`}
  >
    {label}
  </div>
);

export default function Sidebar({ view, setView }: SidebarProps) {
  return (
    <div className="w-48 bg-black border-r border-gray-800 flex flex-col">
      <div className="p-6 font-bold text-white tracking-wider border-b border-gray-800 mb-2">AEGIS</div>
      <SidebarItem id="dashboard" label="Dashboard" currentView={view} setView={setView} />
      <SidebarItem id="incidents" label="Incidents" currentView={view} setView={setView} />
      <SidebarItem id="agents" label="Agent Fleet" currentView={view} setView={setView} />
      <SidebarItem id="response" label="Response" currentView={view} setView={setView} />
      <div className="mt-auto p-4 text-[10px] text-gray-600 uppercase tracking-widest">
        v2.4.0-STABLE
      </div>
    </div>
  );
}
