"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";
import Incidents from "./Incidents";
import Agents from "./Agents";
import Response from "./Response";

export default function Platform() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="flex h-[700px] border border-gray-800 rounded-2xl overflow-hidden bg-black">

      <Sidebar setView={setView} view={view} />

      <div className="flex-1 bg-[#0f1117] flex flex-col">
        <Topbar />

        <div className="p-6 flex-1 overflow-auto">
          {view === "dashboard" && <Dashboard setView={setView} />}
          {view === "incidents" && <Incidents setView={setView} />}
          {view === "agents" && <Agents />}
          {view === "response" && <Response />}
        </div>
      </div>

    </div>
  );
}
