import React, { useState } from 'react'; // 👈 useEffect hata diya
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { 
  updateItemStatus, 
  updateItemComments, 
  type InspectionSection, 
  type InspectionItem 
} from '../features/inspections/inspectoionsSlice';
import { Clipboard, AlertCircle, CheckCircle } from 'lucide-react';

const InspectionTemplate: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTemplate, progress } = useAppSelector((state) => state.inspections);
  
  // ✨ FIX: useEffect ki jagah directly initial state mein hi pehli section ID set kar do!
  const [activeSectionId, setActiveSectionId] = useState<string>(
    currentTemplate && currentTemplate.length > 0 ? currentTemplate[0].id : ''
  );

  // Agar activeSectionId empty hai (manlo initial render pe), toh automatic pehle template par fall back karein
  const activeSection = currentTemplate.find(s => s.id === activeSectionId) || currentTemplate[0];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
      
      {/* 📊 Progress Banner */}
      <div className="xl:col-span-4 p-5 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h4 className="text-sm font-black tracking-tight">Vessel Inspection Progression Loop</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Real-time verification logs tracking criteria metrics</p>
        </div>
        <div className="grid grid-cols-4 gap-2 w-full md:w-auto text-center">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl"><div className="text-sm font-black text-green-400">{progress?.compliant || 0}</div><div className="text-[9px] font-bold text-slate-400 uppercase">Compliant</div></div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl"><div className="text-sm font-black text-rose-400">{progress?.nonCompliant || 0}</div><div className="text-[9px] font-bold text-slate-400 uppercase">Non-Comp</div></div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl"><div className="text-sm font-black text-amber-400">{progress?.pending || 0}</div><div className="text-[9px] font-bold text-slate-400 uppercase">Pending</div></div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl"><div className="text-sm font-black text-slate-300">{progress?.na || 0}</div><div className="text-[9px] font-bold text-slate-400 uppercase">N/A</div></div>
        </div>
      </div>

      {/* 🧭 Left Column - Segment Navigation */}
      <div className="space-y-2 bg-white border border-gray-100 p-3 rounded-2xl">
        <span className="text-[10px] font-black tracking-wider uppercase text-gray-400 px-2 block mb-2">Inspection Templates</span>
        {currentTemplate?.map((section: InspectionSection) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveSectionId(section.id)}
            className={`w-full text-left p-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
              activeSectionId === section.id || (!activeSectionId && currentTemplate[0]?.id === section.id)
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs font-black'
                : 'bg-white border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Clipboard size={14} className="shrink-0" />
              <span className="truncate">{section.title}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${activeSectionId === section.id || (!activeSectionId && currentTemplate[0]?.id === section.id) ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {section.items?.length || 0}
            </span>
          </button>
        ))}
      </div>

      {/* 📝 Right Column - Questions Framework Layout */}
      <div className="xl:col-span-3 space-y-4">
        {activeSection && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gray-50/40 border-b border-gray-50">
              <h3 className="text-sm font-black text-gray-900 tracking-tight">{activeSection.title}</h3>
            </div>

            <div className="divide-y divide-gray-50">
              {activeSection.items?.map((item: InspectionItem) => (
                <div key={item.id} className="p-6 space-y-4 hover:bg-gray-50/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-bold text-gray-900 leading-relaxed">{item.question}</p>
                    {item.status === 'pending' && <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />}
                    {item.status === 'compliant' && <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />}
                  </div>

                  {/* Status Buttons Grid */}
                  <div className="flex flex-wrap gap-2">
                    {([
                      { key: 'compliant', label: 'Compliant', activeStyle: 'bg-green-600 text-white border-green-600 shadow-xs' },
                      { key: 'non-compliant', label: 'Non-Compliant', activeStyle: 'bg-rose-600 text-white border-rose-600 shadow-xs' },
                      { key: 'n/a', label: 'N/A', activeStyle: 'bg-slate-500 text-white border-slate-500 shadow-xs' },
                      { key: 'pending', label: 'Pending Assessment', activeStyle: 'bg-amber-500 text-white border-amber-500 shadow-xs' }
                    ] as const).map((btn) => (
                      <button
                        key={btn.key}
                        type="button"
                        onClick={() => dispatch(updateItemStatus({ sectionId: activeSection.id, itemId: item.id, status: btn.key }))}
                        className={`px-4 py-2 border text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                          item.status === btn.key
                            ? btn.activeStyle
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Comments Area */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Comments / Verifiable Evidence</label>
                    <textarea
                      value={item.comments || ''}
                      onChange={(e) => dispatch(updateItemComments({ sectionId: activeSection.id, itemId: item.id, comments: e.target.value }))}
                      placeholder="Input item audit tracking markers..."
                      className="w-full p-3 text-xs font-medium bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default InspectionTemplate;