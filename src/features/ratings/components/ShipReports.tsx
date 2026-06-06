import React, { useState } from "react";
import { 
  FileText, Calendar, Clock, AlertCircle, Plus, 
  CheckCircle2, Camera,  Filter, User, Ship 
} from "lucide-react";

// --- Types & Interfaces ---
type ReportTab = "Overview" | "Daily" | "Preliminary" | "Photographic";

interface ReportItem {
  id: string;
  type: "Daily" | "Preliminary" | "Photographic";
  vesselName: string;
  date: string;
  inspector: string;
  status: "Draft" | "Submitted";
  extraField?: string; // Purpose for preliminary, ImageCount for photo
}

// --- INITIAL DUMMY MOCK DATA ---
const INITIAL_REPORTS: ReportItem[] = [
  { id: "REP-001", type: "Daily", vesselName: "Atlantic Explorer", date: "2026-05-20", inspector: "Capt. Rahul Kumar", status: "Submitted" },
  { id: "REP-002", type: "Preliminary", vesselName: "Pacific Titan", date: "2026-05-19", inspector: "S. Johnson", status: "Draft", extraField: "Pre-Vetting Screening" },
  { id: "REP-003", type: "Photographic", vesselName: "Nordic Wave", date: "2026-05-21", inspector: "Capt. Rahul Kumar", status: "Submitted", extraField: "14 Photos Attached" }
];

// =========================================================
// ✅ 1. SUB-VIEWS (DECLARED OUTSIDE TO PREVENT RENDER ERRORS)
// =========================================================

// 1.a Overview View Module
interface OverviewViewProps {
  reports: ReportItem[];
}

const OverviewView: React.FC<OverviewViewProps> = ({ reports }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
    {/* Left Block: Recent Daily Reports Container */}
    <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between min-h-95">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Recent Daily Reports</h3>
        <p className="text-xs text-gray-400 mt-0.5">Latest daily inspection reports processed across fleet</p>
        
        <div className="mt-4 space-y-3 max-h-65 overflow-y-auto pr-1">
          {reports.filter(r => r.type === "Daily").length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">No recent daily reports available.</p>
          ) : (
            reports.filter(r => r.type === "Daily").map(rep => (
              <div key={rep.id} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={16}/></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{rep.vesselName}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{rep.id} • By {rep.inspector}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${rep.status === 'Submitted' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{rep.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

    {/* Right Block: Regulatory Compliance Overview */}
    <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between min-h-95">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Regulatory Compliance Overview</h3>
        <p className="text-xs text-gray-400 mt-0.5">Current fleet vetting readiness indicators</p>
        
        <div className="mt-6 space-y-4">
          {[
            { label: "SOLAS Compliance", pct: "95%", variant: "success" },
            { label: "MARPOL Compliance", pct: "98%", variant: "success" },
            { label: "MLC Compliance", pct: "87%", variant: "warning" },
            { label: "Class Requirements", pct: "92%", variant: "success" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2.5">
                {item.variant === "success" ? (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={16} className="text-amber-500" />
                )}
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${item.variant === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{item.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 1.b Dynamic Card List Grid View for Reports Tabs
interface CustomTabProps {
  type: "Daily" | "Preliminary" | "Photographic";
  reports: ReportItem[];
  onOpenModal: () => void;
}

const CustomReportTabGrid: React.FC<CustomTabProps> = ({ type, reports, onOpenModal }) => {
  const filteredList = reports.filter(r => r.type === type);
  
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Search Actions Line Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{type} Database Matrix ({filteredList.length})</span>
        <button 
          onClick={onOpenModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
        >
          <Plus size={14}/> Create {type} Report
        </button>
      </div>

      {/* Grid Canvas */}
      {filteredList.length === 0 ? (
        <div className="bg-white p-16 rounded-2xl border border-gray-100 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 mb-3">
            {type === "Photographic" ? <Camera size={22}/> : <FileText size={22}/>}
          </div>
          <h4 className="text-sm font-bold text-gray-700">No {type} Reports logged</h4>
          <p className="text-xs text-gray-400 max-w-xs mt-1">Click the action layout toggle button above to inject a live master report tracker node.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((report) => (
            <div key={report.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border-l-4 border-l-blue-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-gray-100 rounded-md text-gray-600">{report.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${report.status === 'Submitted' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {report.status}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-base font-bold text-gray-800 flex items-center gap-2"><Ship size={16} className="text-gray-400"/> {report.vesselName}</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1.5"><User size={12}/> Inspector: {report.inspector}</p>
                </div>

                {report.extraField && (
                  <div className="text-[11px] bg-gray-50 text-gray-500 p-2 rounded-xl border border-gray-100/60 font-medium">
                    {type === "Photographic" ? "📸 " : "📋 Scope: "}{report.extraField}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1"><Calendar size={12}/> {report.date}</span>
                <span className="text-blue-600 font-bold hover:underline cursor-pointer">Review Details &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================================
// ✅ 2. CORE MASTER DASHBOARD WRAPPER COMPONENT
// =========================================================

const ShipReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>("Overview");
  const [reportsList, setReportsList] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Form Processing States
  const [vesselName, setVesselName] = useState("");
  const [inspector, setInspector] = useState("");
  const [extraInput, setExtraInput] = useState("");
  const [formStatus, setFormStatus] = useState<"Draft" | "Submitted">("Submitted");

  // Dynamic Metrics Handlers
  const dailyCount = reportsList.filter(r => r.type === "Daily").length;
  const prelimCount = reportsList.filter(r => r.type === "Preliminary").length;
  const photoCount = reportsList.filter(r => r.type === "Photographic").length;
  const pendingSubmissionCount = reportsList.filter(r => r.status === "Draft").length;

  // Form submission dispatcher function
  const handleCreateReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vesselName || !inspector) return alert("Please fill all core monitoring nodes.");

    const activeMappingType: "Daily" | "Preliminary" | "Photographic" = 
      activeTab === "Overview" ? "Daily" : activeTab;

    const newReport: ReportItem = {
      id: `REP-${Math.floor(100 + Math.random() * 900)}`,
      type: activeMappingType,
      vesselName,
      inspector,
      date: new Date().toISOString().split('T')[0], // Capture present layout date timestamp
      status: formStatus,
      extraField: activeMappingType === "Photographic" 
        ? `${extraInput || '1'} Photos Attached` 
        : extraInput || undefined
    };

    setReportsList(prev => [newReport, ...prev]);
    
    // Clear Input Parameters
    setVesselName("");
    setInspector("");
    setExtraInput("");
    setFormStatus("Submitted");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Description Panel Layout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Ship Reports Management</h2>
          <p className="text-xs text-gray-500 mt-0.5">Daily, Preliminary, and Photographic Reports with Regulatory Vetting Logs</p>
        </div>
        <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-2">
          <Filter size={14} className="text-gray-400"/>
          <select className="text-xs font-bold text-gray-600 bg-transparent outline-none cursor-pointer"><option>All Vessels</option></select>
        </div>
      </div>

      {/* 4 Analytics Counter Matrix Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
        {[
          { title: "Daily Reports", val: dailyCount, sub: "0 for selected vessel", icon: <Calendar size={18}/> },
          { title: "Preliminary Reports", val: prelimCount, sub: "0 for selected vessel", icon: <FileText size={18}/> },
          { title: "Photographic Reports", val: photoCount, sub: "0 for selected vessel", icon: <Camera size={18}/> },
          { title: "Pending Reports", val: pendingSubmissionCount, sub: "Awaiting final submission", icon: <Clock size={18}/> }
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-start hover:shadow-md text-gray-400 hover:text-gray-800 ">
            <div className="space-y-1 ">
              <span className="text-xs font-semibold  tracking-wide ">{item.title}</span>
              <h3 className="text-2xl font-black text-gray-900">{item.val}</h3>
              <p className="text-[10px] ">{item.sub}</p>
            </div>
            <div className="p-2.5 bg-gray-50 text-gray-400 rounded-xl border border-gray-100/80">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Horizontal Nav Tabs Selection Bar */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-100 w-fit shadow-xs">
        {(["Overview", "Daily", "Preliminary", "Photographic"] as ReportTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === tab 
                ? "bg-gray-50 text-blue-600 shadow-2xs" 
                : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/40"
            }`}
          >
            {tab === "Overview" ? "📋 Overview" : tab + " Reports"}
          </button>
        ))}
      </div>

      {/* Dynamic Content Switching Matrix */}
      <div className="min-h-95">
        {activeTab === "Overview" && <OverviewView reports={reportsList} />}
        {activeTab === "Daily" && <CustomReportTabGrid type="Daily" reports={reportsList} onOpenModal={() => setIsModalOpen(true)} />}
        {activeTab === "Preliminary" && <CustomReportTabGrid type="Preliminary" reports={reportsList} onOpenModal={() => setIsModalOpen(true)} />}
        {activeTab === "Photographic" && <CustomReportTabGrid type="Photographic" reports={reportsList} onOpenModal={() => setIsModalOpen(true)} />}
      </div>

      {/* =========================================================
          🚀 FORM CREATE ENGINE DIALOG WINDOW MODAL OVERLAY
          ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl border border-gray-100 p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-2 border-b border-gray-50">
              <h3 className="text-base font-black text-gray-900">Create New {activeTab !== "Overview" ? activeTab : "Daily"} Report</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-full flex items-center justify-center font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReportSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Vessel Identification Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Orion Neptune" 
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Lead Marine Surveyor / Inspector</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Capt. Alex Mercer" 
                  value={inspector}
                  onChange={(e) => setInspector(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold"
                />
              </div>

              {/* Context Sensitive Conditional Extra Monitoring Input */}
              {activeTab === "Photographic" ? (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Image Attachments Count</label>
                  <input 
                    type="number" 
                    min="1"
                    placeholder="e.g., 12" 
                    value={extraInput}
                    onChange={(e) => setExtraInput(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold"
                  />
                </div>
              ) : activeTab === "Preliminary" ? (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Scope / Target Intention</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Pre-Charter Assessment" 
                    value={extraInput}
                    onChange={(e) => setExtraInput(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold"
                  />
                </div>
              ) : null}

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Initial Document Lifecycle Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Submitted", "Draft"] as const).map((statusVal) => (
                    <button
                      type="button"
                      key={statusVal}
                      onClick={() => setFormStatus(statusVal)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        formStatus === statusVal
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {statusVal === "Submitted" ? "🚀 Finalized" : "💾 Keep Draft"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 p-2.5 bg-gray-50 border border-gray-200 text-gray-600 font-bold text-xs rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Cancel Execution
                </button>
                <button 
                  type="submit"
                  className="w-1/2 p-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 shadow-md transition-all cursor-pointer"
                >
                  Save Entry Card
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ShipReports;