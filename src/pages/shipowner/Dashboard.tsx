
import React from 'react';
import { Ship, Anchor, Award, AlertCircle, MapPin } from 'lucide-react';

const ShipownerDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shipowner Fleet Operations</h1>
          <p className="text-slate-400 text-sm mt-1">Track active marine hulls, manage port documentation, and review inspector compliance logs.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl text-indigo-400 text-sm font-medium">
          <Anchor className="h-4 w-4" /> Active Fleet Master
        </div>
      </div>

      {/* Operational Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400"><Ship className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-bold">6</div>
            <div className="text-slate-400 text-xs">Registered Vessels</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400"><Award className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-bold">100%</div>
            <div className="text-slate-400 text-xs">IMO Class Compliance</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 rounded-lg text-rose-400"><AlertCircle className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-slate-400 text-xs">Active Deficiencies</div>
          </div>
        </div>
      </div>

      {/* Fleet Tracking Table Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Ship className="h-5 w-5 text-indigo-400" /> Vessel Manifest Status
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-3">Vessel Name</th>
                <th className="pb-3">IMO Number</th>
                <th className="pb-3">Last Survey</th>
                <th className="pb-3">Position Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-3 font-semibold text-slate-200">Pacific Voyager</td>
                <td className="py-3 text-slate-400 font-mono">IMO 9412354</td>
                <td className="py-3 text-emerald-400">Passed (May 2026)</td>
                <td className="py-3 flex items-center gap-1 text-slate-400"><MapPin className="h-3 w-3 text-indigo-400" /> In Transit</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-200">Atlantic Titan</td>
                <td className="py-3 text-slate-400 font-mono">IMO 9876543</td>
                <td className="py-3 text-amber-400">Audit Due Soon</td>
                <td className="py-3 flex items-center gap-1 text-slate-400"><MapPin className="h-3 w-3 text-emerald-400" /> Docked (Mumbai)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipownerDashboard;