import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

// 🔥 Standardized single line destructured named imports from the slice file
import { 
  submitNewInspection, 
  toggleCreationForm, 
  type InspectionPayload 
} from '../features/inspections/inspectoionsSlice';

import { Anchor, Users, FileText, ArrowLeft, Calendar, MapPin, UserCheck } from 'lucide-react';

const NewInspectionForm = () => {
  const dispatch = useAppDispatch();
  
  // 🔍 State verification (Agar aapne slice mein property ka naam 'isLoading' rakha hai, to yahan bhi isLoading kar dena)
  const { loading } = useAppSelector((state) => state.inspections);

  // 📑 Core Operational Selection States
  const [vessel, setVessel] = useState('');
  const [client, setClient] = useState('');
  const [inspectionType, setInspectionType] = useState('');
  const [priority, setPriority] = useState('Normal');

  // 🏢 Cluster A: Ship Metadata Fields
  const [shipToInspect, setShipToInspect] = useState('');
  const [port, setPort] = useState('');
  const [shipManager, setShipManager] = useState('');
  const [shipOwner, setShipOwner] = useState('');

  // 🛰️ Cluster B: Agent Logistics Fields
  const [agentName, setAgentName] = useState('');
  const [agentContact, setAgentContact] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [agentWhatsApp, setAgentWhatsApp] = useState('');
  const [agentTelegram, setAgentTelegram] = useState('');
  const [agentOutlookEmail, setAgentOutlookEmail] = useState('');

  // 👥 Cluster C: Person In Charge (PIC) Fields
  const [picName, setPicName] = useState('');
  const [picContact, setPicContact] = useState('');
  const [picWhatsApp, setPicWhatsApp] = useState('');
  const [picTelegram, setPicTelegram] = useState('');
  const [picOutlookEmail, setPicOutlookEmail] = useState('');

  // 👨‍✈️ Cluster D: Superintendent Fields
  const [superName, setSuperName] = useState('');
  const [superContact, setSuperContact] = useState('');
  const [superWhatsApp, setSuperWhatsApp] = useState('');
  const [superTelegram, setSuperTelegram] = useState('');
  const [superOutlookEmail, setSuperOutlookEmail] = useState('');

  // 📝 Cluster E: Additional Meta Information
  const [scheduledDate, setScheduledDate] = useState('');
  const [location, setLocation] = useState('');
  const [scopeOfWork, setScopeOfWork] = useState('');

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vessel || !client || !inspectionType || !shipToInspect || !port) {
      alert('⚠️ Mandatory Fields Violation: Please complete all core marked components.');
      return;
    }

    const trackingPayload: InspectionPayload = {
      vessel,
      client,
      inspectionType,
      priority,
      shipToInspect,
      port,
      shipManager,
      shipOwner,
      agentDetails: {
        name: agentName,
        contact: agentContact,
        email: agentEmail,
        phone: agentPhone,
        whatsApp: agentWhatsApp,
        telegram: agentTelegram,
        outlookEmail: agentOutlookEmail
      },
      picDetails: {
        name: picName,
        contact: picContact,
        whatsApp: picWhatsApp,
        telegram: picTelegram,
        outlookEmail: picOutlookEmail
      },
      superintendentDetails: {
        name: superName,
        contact: superContact,
        whatsApp: superWhatsApp,
        telegram: superTelegram,
        outlookEmail: superOutlookEmail
      },
      scheduledDate,
      location,
      scopeOfWork
    };

dispatch(submitNewInspection(trackingPayload))
  .unwrap()
  .then(() => {
    alert('Inspection created successfully.');
  })
  .catch((error) => {
    alert(error || 'Failed to create inspection.');
  });  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-200">
      <div className="p-5 border-b border-gray-100 bg-gray-50/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(toggleCreationForm(false))}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-sm font-black text-gray-900 tracking-tight">New Ship Inspection</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Complete deployment details including vessel metadata, logistics, and personnel targets</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleFormSubmission} className="p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/30 p-4 rounded-xl border border-gray-100">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-wide">Vessel *</label>
            <input type="text" value={vessel} onChange={e => setVessel(e.target.value)} placeholder="Enter vessel name/IMO code" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:border-blue-500 outline-none" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-wide">Client *</label>
            <input type="text" value={client} onChange={e => setClient(e.target.value)} placeholder="Enter client stakeholder allocation" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:border-blue-500 outline-none" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-wide">Inspection Type *</label>
            <input type="text" value={inspectionType} onChange={e => setInspectionType(e.target.value)} placeholder="Regulatory inspection framework type" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:border-blue-500 outline-none" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-wide">Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:border-blue-500 outline-none">
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Ship Details Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-gray-800 tracking-wider flex items-center gap-1.5 border-b pb-2 border-gray-50">
            <Anchor size={12} className="text-gray-400" /> Ship Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Ship to Inspect *</label>
              <input type="text" value={shipToInspect} onChange={e => setShipToInspect(e.target.value)} placeholder="Enter ship target identification parameter details" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Port Location *</label>
              <input type="text" value={port} onChange={e => setPort(e.target.value)} placeholder="Enter terminal destination port info" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Ship Manager Authority</label>
              <input type="text" value={shipManager} onChange={e => setShipManager(e.target.value)} placeholder="Enter technical management office parameter identity" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Ship Owner Legal Entity</label>
              <input type="text" value={shipOwner} onChange={e => setShipOwner(e.target.value)} placeholder="Enter ship holding corporate entity owner stack details" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white" />
            </div>
          </div>
        </div>

        {/* Agent Details Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-gray-800 tracking-wider flex items-center gap-1.5 border-b pb-2 border-gray-50">
            <FileText size={12} className="text-gray-400" /> Agent Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Agent Full Name</label><input type="text" value={agentName} onChange={e => setAgentName(e.target.value)} placeholder="Enter structural agent identity parameters" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white"/></div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Agent Primary Contact</label><input type="text" value={agentContact} onChange={e => setAgentContact(e.target.value)} placeholder="Enter primary office point allocation contact person" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white"/></div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Agent Digital Email</label><input type="email" value={agentEmail} onChange={e => setAgentEmail(e.target.value)} placeholder="Enter formal correspondence address details" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white"/></div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Agent Phone System</label><input type="text" value={agentPhone} onChange={e => setAgentPhone(e.target.value)} placeholder="Enter operational telephone connection number" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white"/></div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Agent WhatsApp Protocol</label><input type="text" value={agentWhatsApp} onChange={e => setAgentWhatsApp(e.target.value)} placeholder="Enter platform contact string sequence" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white"/></div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Agent Telegram Handler</label><input type="text" value={agentTelegram} onChange={e => setAgentTelegram(e.target.value)} placeholder="Enter satellite channel protocol address handle" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white"/></div>
            <div className="col-span-1 md:col-span-2 space-y-1"><label className="text-[10px] font-bold text-gray-500 uppercase">Agent Outlook Identity Address</label><input type="email" value={agentOutlookEmail} onChange={e => setAgentOutlookEmail(e.target.value)} placeholder="Enter outlook framework enterprise endpoint connection" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white"/></div>
          </div>
        </div>

        {/* Key Personnel Section */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase text-gray-800 tracking-wider flex items-center gap-1.5 border-b pb-2 border-gray-50">
            <Users size={12} className="text-gray-400" /> Key Personnel
          </h3>
          
          <div className="space-y-3 bg-gray-50/10 p-4 rounded-xl border border-dashed border-gray-200">
            <span className="text-[10px] font-black text-indigo-600 block uppercase">Person In Charge</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[10px] font-medium text-gray-400">Name</label><input type="text" value={picName} onChange={e => setPicName(e.target.value)} placeholder="Enter operational execution officer name" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
              <div className="space-y-1"><label className="text-[10px] font-medium text-gray-400">Contact Details</label><input type="text" value={picContact} onChange={e => setPicContact(e.target.value)} placeholder="Enter direct tracking terminal parameters" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
              <div className="space-y-1"><label className="text-[10px] font-medium text-gray-400">WhatsApp</label><input type="text" value={picWhatsApp} onChange={e => setPicWhatsApp(e.target.value)} placeholder="Enter active digital endpoint numbers sequence" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
              <div className="space-y-1"><label className="text-[10px] font-medium text-gray-400">Telegram Username</label><input type="text" value={picTelegram} onChange={e => setPicTelegram(e.target.value)} placeholder="Enter communication channel alias identifier" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
              <div className="col-span-1 md:col-span-2 space-y-1"><label className="text-[10px] font-medium text-gray-400">Outlook Email Address</label><input type="email" value={picOutlookEmail} onChange={e => setPicOutlookEmail(e.target.value)} placeholder="Enter corporate system email connection terminal" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
            </div>
          </div>

          <div className="space-y-3 bg-gray-50/10 p-4 rounded-xl border border-dashed border-gray-200">
            <span className="text-[10px] font-black text-purple-600 block uppercase">Superintendent Parameters</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[10px] font-medium text-gray-400">Superintendent Name</label><input type="text" value={superName} onChange={e => setSuperName(e.target.value)} placeholder="Enter verification supervisor identifier name" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
              <div className="space-y-1"><label className="text-[10px] font-medium text-gray-400">Contact Details Reference</label><input type="text" value={superContact} onChange={e => setSuperContact(e.target.value)} placeholder="Enter direct communication identity details" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
              <div className="space-y-1"><label className="text-[10px] font-medium text-gray-400">WhatsApp Connection</label><input type="text" value={superWhatsApp} onChange={e => setSuperWhatsApp(e.target.value)} placeholder="Enter connection platform profile target" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
              <div className="space-y-1"><label className="text-[10px] font-medium text-gray-400">Telegram Username</label><input type="text" value={superTelegram} onChange={e => setSuperTelegram(e.target.value)} placeholder="Enter secure tracking terminal username token" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
              <div className="col-span-1 md:col-span-2 space-y-1"><label className="text-[10px] font-medium text-gray-400">Outlook Email</label><input type="email" value={superOutlookEmail} onChange={e => setSuperOutlookEmail(e.target.value)} placeholder="Enter corporate system mail validation endpoint address" className="w-full p-2.5 border border-gray-200 text-xs font-medium bg-white rounded-lg outline-none"/></div>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-gray-800 tracking-wider flex items-center gap-1.5 border-b pb-2 border-gray-50">
            <UserCheck size={12} className="text-gray-400" /> Additional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Calendar size={10}/> Scheduled Date</label>
              <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><MapPin size={10}/> Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter target coordinates location specifications" className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white" />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Scope of Work</label>
              <textarea value={scopeOfWork} onChange={e => setScopeOfWork(e.target.value)} placeholder="Describe inspection scope rules and target protocols..." rows={4} className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:bg-white resize-none" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => dispatch(toggleCreationForm(false))}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer active:scale-98"
          >
            {loading ? "Saving to Node Cluster..." : "Create Inspection"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewInspectionForm;