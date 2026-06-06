import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Calendar, BookOpen, Megaphone, FileCheck, Video, Plus, BarChart3, Clock, MoreHorizontal, PlayCircle, FileText, Search} from 'lucide-react';

type SubTab = 'Overview' | 'Calendar' | 'Training' | 'Briefings' | 'Debriefing';

// ==========================================
// ✅ 1. SUB-COMPONENTS DECLARED OUTSIDE MAIN COMPONENT
// ==========================================

const OverviewView: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Today's Sessions", val: "0", sub: "0 scheduled", icon: <Video size={20}/>, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Training Progress", val: "0/0", sub: "No active modules", icon: <BookOpen size={20}/>, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Average Score", val: "0.0%", sub: "Based on 0 modules", icon: <BarChart3 size={20}/>, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Pending Reviews", val: "0", sub: "Post-inspection reports", icon: <FileCheck size={20}/>, color: "text-amber-600", bg: "bg-amber-50" },
      ].map((card, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-500">{card.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{card.val}</h3>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
            <div className={`p-2.5 rounded-xl ${card.bg} ${card.color}`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs min-h-100">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Today's Sessions</h3>
        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20}/></button>
      </div>
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Video size={32} className="text-gray-200" />
        </div>
        <h4 className="text-lg font-bold text-gray-800">No sessions scheduled for today</h4>
        <p className="text-gray-400 text-sm max-w-xs mt-1">Upcoming briefings and training sessions will appear here.</p>
      </div>
    </div>
  </div>
);

const CalendarView: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-150">
    {/* 2.a Left side */}
    <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">May 2026</h3>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">&lt;</button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-center text-xs font-bold text-gray-400 pb-2">{d}</div>
        ))}
        {Array.from({length: 31}).map((_, i) => (
          <div key={i} className={`h-20 border border-gray-50 rounded-xl p-2 text-sm font-medium hover:bg-blue-50 cursor-pointer transition-colors ${i+1 === 21 ? 'bg-blue-50 border-blue-200 text-blue-600' : 'text-gray-700'}`}>
            {i+1}
          </div>
        ))}
      </div>
    </div>
    
    {/* 2.b Right side */}
    <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col">
      <h3 className="font-bold text-gray-900 mb-4">Upcoming Sessions</h3>
      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {[
          { title: "Bridge Resource Management", time: "10:30 AM", date: "Tomorrow", type: "Training" },
          { title: "Pre-Vetting Briefing", time: "02:00 PM", date: "May 22", type: "Briefing" },
          { title: "Safety Drill Review", time: "09:00 AM", date: "May 24", type: "Debriefing" }
        ].map((session, i) => (
          <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all group">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{session.type}</span>
            <h4 className="font-bold text-gray-800 mt-2 group-hover:text-blue-600">{session.title}</h4>
            <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs">
              <span className="flex items-center gap-1"><Clock size={12}/> {session.time}</span>
              <span className="flex items-center gap-1"><Calendar size={12}/> {session.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TrainingView: React.FC = () => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs min-h-125]">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-gray-900">Training Modules</h3>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
        <input type="text" placeholder="Search modules..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { t: "Port State Control (PSC) Prep", dur: "45 mins", progress: 80 },
        { t: "Advanced Firefighting", dur: "120 mins", progress: 0 },
        { t: "MARPOL Compliance V2", dur: "60 mins", progress: 35 },
      ].map((m, i) => (
        <div key={i} className="p-5 rounded-2xl border border-gray-100 hover:shadow-xs transition-all">
          <div className="p-3 bg-blue-50 text-blue-600 w-fit rounded-xl mb-4"><PlayCircle size={24}/></div>
          <h4 className="font-bold text-gray-800">{m.t}</h4>
          <p className="text-xs text-gray-400 mt-1">Duration: {m.dur}</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase"><span>Progress</span><span>{m.progress}%</span></div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{width: `${m.progress}%`}} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface ReportViewProps {
  title: string;
  btnText: string;
}

const ReportView: React.FC<ReportViewProps> = ({ title, btnText }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center justify-center text-center min-h-100">
    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
      <FileText size={28}/>
    </div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-gray-400 text-sm max-w-xs mt-2">No active reports found. Start by creating a new session or importing data.</p>
    <button className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer">
      <Plus size={18}/> {btnText}
    </button>
  </div>
);


// ==========================================
// ✅ 2. MAIN CORE COMPONENT
// ==========================================

const TrainingCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('Overview');

  return (
    <div className="max-w-400 mx-auto space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Training & Briefing Center</h2>
          <p className="text-sm text-gray-500">Manage crew education, session planning and reports</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition-all cursor-pointer">
            <Video size={18}/> Schedule Session
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer">
            <Plus size={18}/> Create Training
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-100 w-fit">
        {[
          { id: 'Overview', icon: <Layout size={18}/> },
          { id: 'Calendar', icon: <Calendar size={18}/> },
          { id: 'Training', icon: <BookOpen size={18}/> },
          { id: 'Briefings', icon: <Megaphone size={18}/> },
          { id: 'Debriefing', icon: <FileCheck size={18}/> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as SubTab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-gray-50 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
            }`}
          >
            {tab.icon} {tab.id}
          </button>
        ))}
      </div>

      {/* CONTENT AREA WITH ANIMATIONS */}
      <div className="min-h-150">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* ✅ Sub-Components correctly mapped as independent entities */}
            {activeTab === 'Overview' && <OverviewView />}
            {activeTab === 'Calendar' && <CalendarView />}
            {activeTab === 'Training' && <TrainingView />}
            {activeTab === 'Briefings' && <ReportView title="Briefing Sessions" btnText="New Briefing" />}
            {activeTab === 'Debriefing' && <ReportView title="Debriefing Reports" btnText="Generate Report" />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrainingCenter;