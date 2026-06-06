// src/components/UserProfile.tsx
import React, { useState } from 'react';
import axios from 'axios';
import API from '../../../api/axiosInstance';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { updateLocalUser } from '../../auth/authSlice';



const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Redux store se current logged-in user ki details nikal rahe hain
  const { user } = useAppSelector((state) => state.auth);

  // Form input local states
  const [name, setName] = useState(user?.name ?? '');
  const [role, setRole] = useState(user?.role ?? '');
  const [location, setLocation] = useState(user?.location ?? '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    setMessage(null);

    try {
      // Backend api par profile update query pipeline fire karo
      const response = await API.post('/auth/update-profile', {
        userId: user.id,
        name,
        role,
        location,
      });

      if (response.data.success) {
        // 1. LocalStorage update karo taaki refresh par data na badle
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // 2. Redux state update karo taaki sidebar/navbar mein turant naya naam dikhe
        dispatch(updateLocalUser(response.data.user));
        
        setMessage({ type: 'success', text: 'Terminal profile configuration updated successfully!' });
      }
    } catch (error: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;
      setMessage({ 
        type: 'error', 
        text: message || 'Failed to sync settings with Express server matrix.' 
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-slate-400 text-center bg-slate-800 rounded-xl border border-slate-700">
        No active session matrix detected. Please sign in first.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl text-white">
      <div className="border-b border-slate-700 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-100">🎛️ Terminal Profile Settings</h2>
        <p className="text-xs text-slate-400 mt-1">Manage user authority scopes and deployment regions.</p>
      </div>

      {/* Status Notifications Panel */}
      {message && (
        <div className={`p-3 rounded-lg text-sm text-center mb-5 border ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200' 
            : 'bg-red-500/10 border-red-500 text-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-5">
        {/* Read-Only Account Identity field */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Email (Static Identifier)</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full bg-slate-900/50 border border-slate-700 text-slate-500 rounded-lg px-4 py-2 text-sm cursor-not-allowed"
          />
        </div>

        {/* Changeable Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Operator Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Changeable Role Authority */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Authorization Node (Role)</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Surveyor">Surveyor</option>
              <option value="Inspector">Inspector</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* Changeable Deployment Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Active Region Scope</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="HQ">HQ (Mumbai)</option>
              <option value="Asia Pacific">Asia Pacific</option>
              <option value="Europe">Europe</option>
              <option value="Americas">Americas</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-700 mt-6">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-medium text-sm px-5 py-2 rounded-lg transition-colors shadow-lg shadow-blue-600/15"
          >
            {isUpdating ? 'Saving Configurations...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
