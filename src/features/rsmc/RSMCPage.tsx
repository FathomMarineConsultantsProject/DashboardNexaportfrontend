import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../app/store"; // Adjust this path to point to your main store file
import {
  fetchRsicResponses,
  saveRsicProgress,
  updateStatus,
  updateComment,
} from "./rsmcSlice";
import {
  Info,
  ShieldCheck,
  Compass,
  Anchor,
  Droplet,
  Layers,
  Fuel,
  Box,
  HelpCircle,
  Radio,
  ShieldAlert,
  Cpu,
  Eye,
  Heart,
  Snowflake,
  RefreshCw,
  Save,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

// Types Declarations
interface Question {
  id: string;
  text: string;
}

interface Section {
  id: number;
  title: string;
  icon: React.ReactNode;
  questions: Question[];
}

const RSMCPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // 🌟 1. Grab state and loaders from the global Redux Store
  const dispatch = useDispatch<AppDispatch>();
  const { responses, loading, saving } = useSelector(
    (state: RootState) => state.rsic,
  );

  // 17 Complete Sections Configuration Grid with Domain Questions
  const sections: Section[] = [
    {
      id: 1,
      title: "General Vessel Information",
      icon: <Info size={18} />,
      questions: [
        {
          id: "q1_1",
          text: "Vessel name, IMO number, and signaling flags currently clearly displayed?",
        },
        {
          id: "q1_2",
          text: "Flag state registry matching certificates and port documentation?",
        },
        {
          id: "q1_3",
          text: "Vessel's gross tonnage and deadweight verification records updated?",
        },
        {
          id: "q1_4",
          text: "Year built and shipyard master data correctly signed by surveyor?",
        },
        {
          id: "q1_5",
          text: "Classification society status active without any outstanding notes?",
        },
      ],
    },
    {
      id: 2,
      title: "Certification & Personnel Management",
      icon: <ShieldCheck size={18} />,
      questions: [
        {
          id: "q2_1",
          text: "Minimum Safe Manning Document specifications fully satisfied?",
        },
        {
          id: "q2_2",
          text: "Master and officer licenses verified with issuing flag administration?",
        },
        {
          id: "q2_3",
          text: "STCW endorsement records for dangerous cargo operations present?",
        },
        {
          id: "q2_4",
          text: "Medical logs, fitness certificates, and watchkeeping limits checked?",
        },
      ],
    },
    {
      id: 3,
      title: "Navigation",
      icon: <Compass size={18} />,
      questions: [
        {
          id: "q3_1",
          text: "ECDIS performance standards and backup arrangements optimized?",
        },
        {
          id: "q3_2",
          text: "Latest notice to mariners applied to chart update logs?",
        },
        {
          id: "q3_3",
          text: "Bridge checklist executed properly prior to port entry/departure?",
        },
        {
          id: "q3_4",
          text: "Magnetic and gyrocompass error logs recorded within tolerance thresholds?",
        },
      ],
    },
    {
      id: 4,
      title: "ISM Navigation",
      icon: <Anchor size={18} />,
      questions: [
        {
          id: "q4_1",
          text: "Safety Management System (SMS) manuals readily accessible on bridge?",
        },
        {
          id: "q4_2",
          text: "Master's standing orders reviewed, signed, and understood by crew?",
        },
        {
          id: "q4_3",
          text: "Emergency steering drill logs recorded for the past quarter?",
        },
        {
          id: "q4_4",
          text: "Bridge Navigational Watch Alarm System (BNWAS) operational settings verified?",
        },
      ],
    },
    {
      id: 5,
      title: "Pollution Prevention & Control",
      icon: <Droplet size={18} />,
      questions: [
        {
          id: "q5_1",
          text: "Oily Water Separator (OWS) 15ppm monitor alarm test functional?",
        },
        {
          id: "q5_2",
          text: "Oil Record Book Part I records matched with physical tank capacities?",
        },
        {
          id: "q5_3",
          text: "SOPEP gear lock-up storage fully equipped with clean-up agents?",
        },
        {
          id: "q5_4",
          text: "Garbage Management Plan logs updated with shore receipts?",
        },
      ],
    },
    {
      id: 6,
      title: "Ship's Structure",
      icon: <Layers size={18} />,
      questions: [
        {
          id: "q6_1",
          text: "Ballast water tank structural integrity records free from corrosion active notes?",
        },
        {
          id: "q6_2",
          text: "Main deck plating visual scan free from cracks or structural stress deformations?",
        },
        {
          id: "q6_3",
          text: "Draft marks forward, aft, and midships clean and legible?",
        },
        {
          id: "q6_4",
          text: "Anode protection depletion rates monitored inside dry-dock parameters?",
        },
      ],
    },
    {
      id: 7,
      title: "Fuel Management Systems",
      icon: <Fuel size={18} />,
      questions: [
        {
          id: "q7_1",
          text: "Low sulfur fuel changeover procedures documented before ECA entry?",
        },
        {
          id: "q7_2",
          text: "Bunker delivery notes (BDN) retained for a period of three years?",
        },
        {
          id: "q7_3",
          text: "Fuel spill emergency containment valves under manual deployment drill tested?",
        },
        {
          id: "q7_4",
          text: "High-pressure fuel line leak monitoring system fully operational?",
        },
      ],
    },
    {
      id: 8,
      title: "Cargo Operations",
      icon: <Box size={18} />,
      questions: [
        {
          id: "q8_1",
          text: "Cargo monitoring consoles tracking pressures and temperatures correctly?",
        },
        {
          id: "q8_2",
          text: "Intrinsically safe cargo area lighting systems functionality intact?",
        },
        {
          id: "q8_3",
          text: "High-level cargo tank alarms tested and operating independently?",
        },
        {
          id: "q8_4",
          text: "Cargo manifold pressure gauges validated within calibration intervals?",
        },
      ],
    },
    {
      id: 9,
      title: "Hatch Covers & Gantry Cranes",
      icon: <HelpCircle size={18} />,
      questions: [
        {
          id: "q9_1",
          text: "Hatch cover rubber packing seals free from gaps or structural decay?",
        },
        {
          id: "q9_2",
          text: "Securing cleats and wedges functioning without seizing under load?",
        },
        {
          id: "q9_3",
          text: "Hatch ultrasonic tests or hose tests confirming complete weather tightness?",
        },
        {
          id: "q9_4",
          text: "Gantry crane safety limit switches and wire rope lubes structurally sound?",
        },
      ],
    },
    {
      id: 10,
      title: "Mooring Operations",
      icon: <Anchor size={18} />,
      questions: [
        {
          id: "q10_1",
          text: "Mooring winch brakes testing records verified within standard dynamic loads?",
        },
        {
          id: "q10_2",
          text: "Mooring ropes, tails, and shackles tagged with certificates?",
        },
        {
          id: "q10_3",
          text: "Deadman anchor assemblies and windlass operational checks secure?",
        },
        {
          id: "q10_4",
          text: "Snap-back zone caution paint layout clearly defined around bitts?",
        },
      ],
    },
    {
      id: 11,
      title: "Radio & Communication",
      icon: <Radio size={18} />,
      questions: [
        {
          id: "q11_1",
          text: "GMDSS station reserve power batteries operating on peak load?",
        },
        {
          id: "q11_2",
          text: "VHF, MF/HF radios functional with recent daily/weekly test logs?",
        },
        {
          id: "q11_3",
          text: "EPIRB and SART hydro-static release unit expiry tracking active?",
        },
        {
          id: "q11_4",
          text: "Satellite emergency communication loop verified with external testing?",
        },
      ],
    },
    {
      id: 12,
      title: "Security",
      icon: <ShieldAlert size={18} />,
      questions: [
        {
          id: "q12_1",
          text: "ISPS code security level updates aligned with port terminal parameters?",
        },
        {
          id: "q12_2",
          text: "Access control log at gangway checked with visitor pass tracking?",
        },
        {
          id: "q12_3",
          text: "Vessel Ship Security Alert System (SSAS) discrete activation loop tested?",
        },
        {
          id: "q12_4",
          text: "Restricted area door locks and perimeter tracking systems secure?",
        },
      ],
    },
    {
      id: 13,
      title: "Machinery Space",
      icon: <Cpu size={18} />,
      questions: [
        {
          id: "q13_1",
          text: "Main engine emergency stop triggers tested from local control room?",
        },
        {
          id: "q13_2",
          text: "Bilge high-level switches operational across all structural wells?",
        },
        {
          id: "q13_3",
          text: "Emergency generator auto-start response test logging sub-10 seconds?",
        },
        {
          id: "q13_4",
          text: "Purifier room fire damper ventilation dampening flaps tested?",
        },
      ],
    },
    {
      id: 14,
      title: "General Appearance",
      icon: <Eye size={18} />,
      questions: [
        {
          id: "q14_1",
          text: "Accommodation corridors, galley spaces maintained in hygienic layout?",
        },
        {
          id: "q14_2",
          text: "Decks clear of oil residues, trip hazards, or paint peel accumulations?",
        },
        {
          id: "q14_3",
          text: "Superstructure structural paint integrity clear of running rust streaks?",
        },
        {
          id: "q14_4",
          text: "Lighting tracks inside emergency escape routes functioning reliably?",
        },
      ],
    },
    {
      id: 15,
      title: "Health & Welfare of Seafarers",
      icon: <Heart size={18} />,
      questions: [
        {
          id: "q15_1",
          text: "MLC 2006 compliance insurance certificates posted in public mess?",
        },
        {
          id: "q15_2",
          text: "Freshwater testing parameter files updated with biological scanning?",
        },
        {
          id: "q15_3",
          text: "Provisions locker and deep-freeze tracking at appropriate temperatures?",
        },
        {
          id: "q15_4",
          text: "Crew working hours log entries matching actual physical rotation rosters?",
        },
      ],
    },
    {
      id: 16,
      title: "Ice/Polar Operations",
      icon: <Snowflake size={18} />,
      questions: [
        {
          id: "q16_1",
          text: "Polar Code manual updates verified against route planning parameters?",
        },
        {
          id: "q16_2",
          text: "De-icing heating systems on bridge windows and deck machinery active?",
        },
        {
          id: "q16_3",
          text: "Low-temperature specialized winterized oils present in machinery sumps?",
        },
        {
          id: "q16_4",
          text: "Immersion suits count matching personnel listing with thermal linings?",
        },
      ],
    },
    {
      id: 17,
      title: "Ship-to-Ship Transfer Operations",
      icon: <RefreshCw size={18} />,
      questions: [
        {
          id: "q17_1",
          text: "STS operations checklist aligned with OCIMF guidelines?",
        },
        {
          id: "q17_2",
          text: "Fendering line dampening shackles structural integrity certified?",
        },
        {
          id: "q17_3",
          text: "Quick-release coupling mechanisms on cargo hoses emergency tested?",
        },
        {
          id: "q17_4",
          text: "Communication radio links sync established between vessel masters?",
        },
      ],
    },
  ];

  // 🌟 2. Load answers from database using Redux Thunk action on mount
  useEffect(() => {
    dispatch(fetchRsicResponses());
  }, [dispatch]);

  // 🌟 3. Submit current state via Redux Save Thunk
  const handleSaveProgress = async () => {
    try {
      await dispatch(saveRsicProgress(responses)).unwrap();
      alert("RightShip verification metrics updated successfully!");
    } catch (error) {
      console.error("Failed executing batch checklist sync:", error); // 🌟 Now it's being used!
      alert("Error syncing checklist indicators to database server.");
    }
  };

  // Metrics computation blocks
  const getAllQuestions = () => sections.flatMap((s) => s.questions);

  const getCountByStatus = (
    statusType: "Compliant" | "Non-Compliant" | "N/A",
  ) => {
    return getAllQuestions().filter(
      (q) => responses[q.id]?.status === statusType,
    ).length;
  };

  const totalQuestionsCount = getAllQuestions().length;
  const answeredQuestionsCount = getAllQuestions().filter(
    (q) => responses[q.id]?.status,
  ).length;
  const pendingQuestionsCount = totalQuestionsCount - answeredQuestionsCount;
  const overallProgressPercentage =
    totalQuestionsCount > 0
      ? Math.round((answeredQuestionsCount / totalQuestionsCount) * 100)
      : 0;

  const currentSectionData = sections.find((s) => s.id === activeSection);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-sm font-semibold text-gray-500 animate-pulse">
          Loading inspection database records...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Top Banner Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Right Ship Inspection Checklist
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Comprehensive 17-section vessel vetting and survey platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all cursor-pointer shadow-xs"
          >
            <FileText size={16} /> Export PDF
          </button>
          <button
            type="button"
            onClick={handleSaveProgress}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-all cursor-pointer shadow-xs"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save Progress"}
          </button>
        </div>
      </div>

      {/* Progress Metric Panel Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
              Compliant
            </p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">
              {getCountByStatus("Compliant")}
            </h3>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
              Non-Compliant
            </p>
            <h3 className="text-2xl font-bold text-rose-600 mt-1">
              {getCountByStatus("Non-Compliant")}
            </h3>
          </div>
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
              Pending
            </p>
            <h3 className="text-2xl font-bold text-amber-500 mt-1">
              {pendingQuestionsCount}
            </h3>
          </div>
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
              Overall Progress
            </p>
            <h3 className="text-2xl font-bold text-blue-600 mt-1">
              {overallProgressPercentage}%
            </h3>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <RefreshCw size={20} />
          </div>
        </div>
      </div>

      {/* Main Layout Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar Sections List */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 bg-gray-50/70 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-800">
              Inspection Sections
            </h2>
          </div>
          <div className="p-2 max-h-160 overflow-y-auto divide-y divide-gray-100 custom-scrollbar">
            {sections.map((section) => {
              const secQuestions = section.questions.map((q) => q.id);
              const secAnsweredCount = secQuestions.filter(
                (id) => responses[id]?.status,
              ).length;
              const secProgressPercent = Math.round(
                (secAnsweredCount / secQuestions.length) * 100,
              );

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between p-3.5 my-0.5 rounded-xl text-left transition-all cursor-pointer group ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className={`${activeSection === section.id ? "text-white" : "text-gray-400 group-hover:text-blue-500"} transition-colors`}
                    >
                      {section.icon}
                    </div>
                    <span className="text-sm font-semibold truncate">
                      {section.id}. {section.title}
                    </span>
                  </div>

                  <div className="flex items-center ml-2 shrink-0">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        activeSection === section.id
                          ? "bg-blue-700 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {secProgressPercent}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Dynamic Survey Panel */}
        <div className="lg:col-span-8 space-y-4">
          {currentSectionData && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-5 bg-gray-50/80 border-b border-gray-200 flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                  {currentSectionData.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Section {currentSectionData.id}: {currentSectionData.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Evaluate structural parameters and check active statuses
                    below
                  </p>
                </div>
              </div>

              <div className="p-6 divide-y divide-gray-100 space-y-6">
                {currentSectionData.questions.map((question, idx) => {
                  const currentResponse = responses[question.id] || {
                    status: null,
                    comment: "",
                  };

                  return (
                    <div
                      key={question.id}
                      className={`pt-4 ${idx === 0 ? "pt-0" : ""} space-y-3`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-mono font-bold text-gray-400 mt-0.5">
                          {currentSectionData.id}.{idx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-gray-800 leading-relaxed">
                          {question.text}{" "}
                          <span className="text-rose-500">*</span>
                        </h4>
                      </div>

                      {/* Three Status Option Toggles via Redux Actions */}
                      <div className="grid grid-cols-3 gap-3 max-w-md ml-5">
                        {(["Compliant", "Non-Compliant", "N/A"] as const).map(
                          (statusOption) => {
                            const isChecked =
                              currentResponse.status === statusOption;

                            const optionStyle = {
                              Compliant: isChecked
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                              "Non-Compliant": isChecked
                                ? "border-rose-500 bg-rose-50 text-rose-700"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                              "N/A": isChecked
                                ? "border-gray-500 bg-gray-50 text-gray-700"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                            }[statusOption];

                            return (
                              <button
                                key={statusOption}
                                type="button"
                                // 🌟 4. Dispatch the status change right to Redux
                                onClick={() =>
                                  dispatch(
                                    updateStatus({
                                      questionId: question.id,
                                      status: statusOption,
                                    }),
                                  )
                                }
                                className={`w-full text-center p-2 text-xs font-bold border rounded-xl transition-all active:scale-98 cursor-pointer ${optionStyle}`}
                              >
                                {statusOption}
                              </button>
                            );
                          },
                        )}
                      </div>

                      {/* Comments and Evidence Input Text Area fields */}
                      <div className="ml-5 space-y-1">
                        <label className="text-[11px] font-bold text-gray-400 tracking-wide uppercase">
                          Comments / Evidence Documentation
                        </label>
                        <textarea
                          rows={2}
                          value={currentResponse.comment}
                          // 🌟 5. Dispatch comment text field edits to Redux
                          onChange={(e) =>
                            dispatch(
                              updateComment({
                                questionId: question.id,
                                comment: e.target.value,
                              }),
                            )
                          }
                          className="w-full p-3 text-xs border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                          placeholder="Add comments, record evidence trackers, or note observations..."
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Pagination Actions Bar */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <button
                  type="button"
                  disabled={activeSection === 1}
                  onClick={() => setActiveSection((prev) => prev - 1)}
                  className="px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                >
                  Previous Section
                </button>
                <span className="text-xs font-bold text-gray-500 font-mono">
                  Section {activeSection} of 17
                </span>
                <button
                  type="button"
                  disabled={activeSection === 17}
                  onClick={() => setActiveSection((prev) => prev + 1)}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                >
                  Next Section
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RSMCPage;
