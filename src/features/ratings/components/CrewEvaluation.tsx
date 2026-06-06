import React, { useState, useMemo } from 'react';
import {Users, UserPlus, ClipboardCheck, ShieldAlert, ShieldCheck, Zap, Plus, User} from 'lucide-react';

type TabType = 'Overview' | 'CrewMembers' | 'Evaluations' | 'Analytics';

interface CrewMember {
  id: string;
  name: string;
  rank: string;
  department: 'Deck' | 'Engine' | 'Safety';
  safetyScore: number; 
  pifRating: number; 
}

interface EvaluationRecord {
  id: string;
  crewId: string;
  crewName: string;
  factor: string;
  score: number;
  assessedBy: string;
  date: string;
}

const INITIAL_CREW: CrewMember[] = [
  { id: "CRW-101", name: "Capt. Rahul Kumar", rank: "Master", department: "Deck", safetyScore: 94, pifRating: 4.8 },
  { id: "CRW-102", name: "S. Johnson", rank: "Chief Engineer", department: "Engine", safetyScore: 89, pifRating: 4.2 },
  { id: "CRW-103", name: "Amit Sharma", rank: "Second Officer", department: "Deck", safetyScore: 78, pifRating: 3.9 },
];

const INITIAL_EVALUATIONS: EvaluationRecord[] = [
  { id: "EV-901", crewId: "CRW-101", crewName: "Capt. Rahul Kumar", factor: "Recognition of Safety Criticality of the Task", score: 5, assessedBy: "Port Auditor", date: "2026-05-18" },
  { id: "EV-902", crewId: "CRW-102", crewName: "S. Johnson", factor: "Procedures Accessible, Helpful, Understood", score: 4, assessedBy: "Technical Supt", date: "2026-05-19" },
  { id: "EV-903", crewId: "CRW-103", crewName: "Amit Sharma", factor: "Team Dynamics & Coordination", score: 3, assessedBy: "Master", date: "2026-05-20" },
];

const PIF_FACTORS = [
  "Recognition of Safety Criticality of the Task",
  "Procedures Accessible, Helpful, Understood, and Accurate",
  "Custom and Practice Surrounding Use of Procedures",
  "Team Dynamics, Communications, and Coordination",
  "Human-Machine Interface (HMI)"
];

function CrewEvaluation() {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [crew, setCrew] = useState<CrewMember[]>(INITIAL_CREW);
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>(INITIAL_EVALUATIONS);
  
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);

  const [newCrewName, setNewCrewName] = useState("");
  const [newCrewRank, setNewCrewRank] = useState("");
  const [newCrewDept, setNewCrewDept] = useState<'Deck' | 'Engine' | 'Safety'>("Deck");
  
  const [selectedCrewId, setSelectedCrewId] = useState("");
  const [selectedFactor, setSelectedFactor] = useState(PIF_FACTORS[0]);
  const [selectedScore, setSelectedScore] = useState(5);

  const globalMetrics = useMemo(() => {
    const totalCrew = crew.length;
    const completedEvals = evaluations.length;
    const avgRating = crew.reduce((acc, c) => acc + c.pifRating, 0) / (totalCrew || 1);
    const lowPerformanceCount = crew.filter(c => c.safetyScore < 80).length;

    return { totalCrew, completedEvals, avgRating: avgRating.toFixed(1), lowPerformanceCount };
  }, [crew, evaluations]);

  const handleAddCrew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrewName || !newCrewRank) return;

    const newMember: CrewMember = {
      id: `CRW-${Math.floor(104 + Math.random() * 890)}`,
      name: newCrewName,
      rank: newCrewRank,
      department: newCrewDept,
      safetyScore: 85, 
      pifRating: 4.0   
    };

    setCrew(prev => [...prev, newMember]);
    setNewCrewName("");
    setNewCrewRank("");
    setIsCrewModalOpen(false);
  };

  const handleAddEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCrew = crew.find(c => c.id === selectedCrewId);
    if (!targetCrew) return;

    const newEval: EvaluationRecord = {
      id: `EV-${Math.floor(904 + Math.random() * 890)}`,
      crewId: selectedCrewId,
      crewName: targetCrew.name,
      factor: selectedFactor,
      score: selectedScore,
      assessedBy: "Fleet Manager",
      date: new Date().toISOString().split('T')[0]
    };

    const updatedEvals = [newEval, ...evaluations];
    setEvaluations(updatedEvals);

    const crewSpecificEvals = updatedEvals.filter(ev => ev.crewId === selectedCrewId);
    const dynamicPifAvg = crewSpecificEvals.reduce((acc, curr) => acc + curr.score, 0) / crewSpecificEvals.length;
    const calculatedSafetyPct = Math.min(100, Math.floor((dynamicPifAvg / 5) * 100));

    setCrew(prevCrew => prevCrew.map(c => {
      if (c.id === selectedCrewId) {
        return { ...c, pifRating: parseFloat(dynamicPifAvg.toFixed(1)), safetyScore: calculatedSafetyPct };
      }
      return c;
    }));

    setIsEvalModalOpen(false);
  };

  return (
    <div className="w-full space-y-6 text-gray-800 antialiased">
      
      {/* 🚀 Top Header Title Structure */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Crew Performance Evaluation</h2>
          <p className="text-xs text-gray-500 mt-0.5">Performance Influencing Factors (PIFs) Assessment Engine</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsCrewModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
          >
            <UserPlus size={14}/> Add Crew Member
          </button>
          <button 
            onClick={() => setIsEvalModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-xs hover:bg-gray-50 transition-all shadow-sm cursor-pointer"
          >
            <Plus size={14}/> Log PIF Evaluation
          </button>
        </div>
      </div>

      {/* 📊 Matrix Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Crew", val: globalMetrics.totalCrew, sub: "Active crew members onboard", icon: <Users size={18}/> },
          { title: "Evaluations", val: globalMetrics.completedEvals, sub: "Completed parameter assessments", icon: <ClipboardCheck size={18}/> },
          { title: "Average Rating", val: `${globalMetrics.avgRating}/5`, sub: "Overall performance factors metrics", icon: <Zap size={18} className="text-amber-500"/> },
          { title: "Pending Actions", val: globalMetrics.lowPerformanceCount, sub: "Awaiting watch compliance reviews", icon: <ShieldAlert size={18} className="text-rose-500"/> }
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 tracking-wide">{item.title}</span>
              <h3 className="text-2xl font-black text-gray-900">{item.val}</h3>
              <p className="text-[10px] text-gray-400">{item.sub}</p>
            </div>
            <div className="p-2.5 bg-gray-50 text-gray-400 rounded-xl border border-gray-100/80">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* 🎛️ Navigation Switch SubTabs Bar */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-100 w-fit shadow-xs">
        {[
          { id: 'Overview', label: '📋 Overview' },
          { id: 'CrewMembers', label: '👥 Crew Members' },
          { id: 'Evaluations', label: '📝 Evaluations Matrix' },
          { id: 'Analytics', label: '📊 Live Analytics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === tab.id 
                ? "bg-gray-50 text-blue-600 shadow-2xs" 
                : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🔮 Component Container Switching Slot */}
      <div className="min-h-100">
        
        {/* ==================== 1. TAB: OVERVIEW ==================== */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between min-h-95">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Recent Evaluations</h3>
                <p className="text-xs text-gray-400 mt-0.5">Latest crew performance assessments logged</p>
                <div className="mt-4 space-y-3">
                  {evaluations.slice(0, 3).map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100/70 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold font-mono">{(ev.score).toFixed(1)}</div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{ev.crewName}</h4>
                          <p className="text-[10px] text-gray-400 truncate max-w-60 mt-0.5">{ev.factor}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">{ev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs min-h-95">
              <h3 className="text-lg font-bold text-gray-900">Performance Influencing Factors</h3>
              <p className="text-xs text-gray-400 mt-0.5">Key assessment areas</p>
              
              <div className="mt-4 space-y-2.5">
                {PIF_FACTORS.map((factor, i) => (
                  <div key={i} className="p-3.5 bg-white border border-gray-100 rounded-xl hover:border-blue-100 transition-all shadow-2xs">
                    <h4 className="text-xs font-bold text-gray-800 tracking-tight">{factor}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Assesses compliance protocols and systemic risk control index values.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. TAB: CREW MEMBERS ==================== */}
        {activeTab === 'CrewMembers' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            
            {/* 🆕 ADD BUTTON INJECTED INSIDE THE CREW DATABASE PANEL LINE */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Crew Matrix database ({crew.length})</span>
              <button 
                onClick={() => setIsCrewModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
              >
                <UserPlus size={14}/> Add New Crew Member
              </button>
            </div>

            {/* Crew Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crew.map((member) => (
                <div key={member.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4 border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gray-50 text-gray-400 rounded-xl"><User size={16}/></div>
                      <div>
                        <h3 className="text-base font-black text-gray-900">{member.name}</h3>
                        <p className="text-xs font-bold text-gray-400 mt-0.5">{member.rank} • <span className="text-blue-600 font-medium">{member.department} Dept</span></p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-500">{member.id}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-400">PIF Competency Index</span>
                      <span className="text-gray-900">{member.pifRating} / 5.0</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-400">Safety Compliance Matrix</span>
                      <span className={member.safetyScore >= 80 ? "text-emerald-600" : "text-amber-600"}>{member.safetyScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${member.safetyScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${member.safetyScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 3. TAB: EVALUATIONS MATRIX ==================== */}
        {activeTab === 'Evaluations' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden animate-in fade-in duration-200">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Historical Operational Vetting Logs ({evaluations.length})</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[11px] uppercase font-bold tracking-wider bg-gray-50/20">
                    <th className="p-4">Crew Identity Node</th>
                    <th className="p-4">PIF Core Dimension Pillar</th>
                    <th className="p-4 text-center">Score Metric</th>
                    <th className="p-4">Assessed Official</th>
                    <th className="p-4 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold divide-y divide-gray-50">
                  {evaluations.map((ev) => (
                    <tr key={ev.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{ev.crewName}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{ev.crewId}</div>
                      </td>
                      <td className="p-4 text-gray-700 max-w-xs truncate">{ev.factor}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded-md font-mono font-bold ${
                          ev.score >= 4 ? 'bg-emerald-50 text-emerald-700' : ev.score === 3 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {ev.score}.0 / 5.0
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{ev.assessedBy}</td>
                      <td className="p-4 text-right text-gray-400 font-mono">{ev.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== 4. TAB: LIVE ANALYTICS ==================== */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
              <div>
                <h3 className="text-base font-bold text-gray-900">Safety Index Distribution</h3>
                <p className="text-xs text-gray-400 mt-0.5">Real-time metrics reacting instantly to crew dynamic profile variables</p>
              </div>

              <div className="space-y-4">
                {crew.map((member) => (
                  <div key={member.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-800">{member.name} ({member.rank})</span>
                      <span className="text-blue-600 font-mono">{member.safetyScore}% Factor</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-lg overflow-hidden border border-gray-200/20">
                      <div 
                        className="h-full bg-blue-600 rounded-lg transition-all duration-700 ease-out"
                        style={{ width: `${member.safetyScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Pillar Assessment Ratios</h3>
                <p className="text-xs text-gray-400 mt-0.5">Statistical metrics computed against operational logs</p>
                
                <div className="mt-5 space-y-4">
                  {PIF_FACTORS.map((factor, index) => {
                    const countMatches = evaluations.filter(e => e.factor === factor).length;
                    const distributionPct = evaluations.length ? Math.floor((countMatches / evaluations.length) * 100) : 0;
                    
                    return (
                      <div key={index} className="flex items-center justify-between text-xs font-semibold text-gray-600">
                        <span className="truncate max-w-60 text-gray-700">{factor}</span>
                        <span className="font-mono bg-gray-50 px-2 py-0.5 rounded font-bold text-blue-600">{distributionPct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 p-3.5 bg-blue-50/50 border border-blue-100/60 rounded-xl flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                  Analytics layout automatically updates when crew registrations or evaluations are injected.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================
          📌 OVERLAY DIALOG 1: CREW MEMBERS REGISTRATION MODAL
          ========================================================= */}
      {isCrewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-2xl border border-gray-100 p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-100">
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <h3 className="text-sm font-black text-gray-900">Add New Fleet Crew Member</h3>
              <button onClick={() => setIsCrewModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-mono text-xs cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddCrew} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" required placeholder="e.g., Officer John Doe" value={newCrewName}
                  onChange={e => setNewCrewName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:border-blue-500 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Rank/Designation</label>
                <input 
                  type="text" required placeholder="e.g., Third Engineer" value={newCrewRank}
                  onChange={e => setNewCrewRank(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:border-blue-500 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Operational Vessel Department</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Deck', 'Engine', 'Safety'] as const).map(dept => (
                    <button
                      type="button" key={dept} onClick={() => setNewCrewDept(dept)}
                      className={`p-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${newCrewDept === dept ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-white text-gray-600 border-gray-200'}`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button type="button" onClick={() => setIsCrewModalOpen(false)} className="w-1/2 py-2.5 bg-gray-50 text-gray-600 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:bg-blue-700">Save Crew</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          📌 OVERLAY DIALOG 2: LOG PIF EVALUATION MODAL
          ========================================================= */}
      {isEvalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl border border-gray-100 p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-100">
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <h3 className="text-sm font-black text-gray-900">Log Performance Assessment Record</h3>
              <button onClick={() => setIsEvalModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-mono text-xs cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddEvaluation} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Select Crew Target Node</label>
                <select 
                  required value={selectedCrewId} onChange={e => setSelectedCrewId(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white font-bold text-gray-700 cursor-pointer"
                >
                  <option value="">-- Choose onboard crew member --</option>
                  {crew.map(c => <option key={c.id} value={c.id}>{c.name} ({c.rank})</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Target PIF Factor Dimension</label>
                <select 
                  value={selectedFactor} onChange={e => setSelectedFactor(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white font-bold text-gray-700 cursor-pointer"
                >
                  {PIF_FACTORS.map((f, idx) => <option key={idx} value={f}>{f}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Assigned Parameter Score Value</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button" key={num} onClick={() => setSelectedScore(num)}
                      className={`p-2 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${selectedScore === num ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                    >
                      {num}.0
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button type="button" onClick={() => setIsEvalModalOpen(false)} className="w-1/2 py-2.5 bg-gray-50 text-gray-600 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:bg-blue-700">Submit Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default CrewEvaluation;