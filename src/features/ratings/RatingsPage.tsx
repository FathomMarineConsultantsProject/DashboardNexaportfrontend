import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, FileBarChart, Users } from "lucide-react";

// Sub-Tab Leaf Layer Components (Same folder logic)
import ShipReports from "./components/ShipReports";
import TrainingCenter from "./components/TraningCenter";
import CrewEvaluation from "./components/CrewEvaluation";
const RatingsPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>("Training");

  const subTabs = [
    {
      id: "Training",
      name: "Training & Briefing Center",
      icon: <GraduationCap size={18} />,
    },
    {
      id: "Reports",
      name: "Ship Reports & Management",
      icon: <FileBarChart size={18} />,
    },
    { id: "Crew", name: "Crew Performance", icon: <Users size={18} /> },
  ];

  const renderSubTabWorkspace = () => {
    switch (activeSubTab) {
      case "Training":
        return <TrainingCenter />; 
      case "Reports":
        return <ShipReports/>;
      case "Crew":
        return <CrewEvaluation/>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-400 mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-stone-950">
          Professional Rating Management
        </h2>
        <p className="text-sm text-stone-500">
          Analyze performance matrix, fleet logs and verification workflows
        </p>
      </div>

      {/* Horizontal Sub-Tabs Container Block */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2 cursor-pointer
              ${
                activeSubTab === tab.id
                  ? "border-blue-600 text-blue-600 bg-blue-50/40"
                  : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
              }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Animated Active Tab Mounting */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15 }}
          >
            {renderSubTabWorkspace()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RatingsPage;
