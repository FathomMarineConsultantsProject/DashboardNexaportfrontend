import React, { useMemo, useState } from 'react';
import { Settings, LogOut, User, Camera, ShieldCheck, MapPin, Briefcase } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { logout } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axiosInstance';
import { updateLocalUser } from '../auth/authSlice';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const profileMeta = useMemo(() => {
    const savedMeta = localStorage.getItem('user_profile_metadata');
    if (savedMeta) {
      try {
        return JSON.parse(savedMeta);
      } catch (e) {
        console.error("Error parsing profile metadata", e);
      }
    }
    return null;
  }, []);

  const [name, setName] = useState(profileMeta?.name || user?.name || '');
  const [role, setRole] = useState(profileMeta?.role || user?.role || '');
  const [location, setLocation] = useState(profileMeta?.location || user?.location || '');
  
  const [preview, setPreview] = useState<string>(() => {
    return localStorage.getItem('user_avatar') || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";
  });
  
  const [saving, setSaving] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        localStorage.setItem('user_avatar', base64String);
        
        // 🚀 Broadcast custom global event to instantly sync sidebar avatar
        window.dispatchEvent(new Event("avatar_updated"));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user) return;
  setSaving(true);
  
  try {
    // Pipeline data directly to the new Express server API endpoint
    const response = await API.post('/auth/update-profile', {
      userId: user.id,
      name,
      role,
      location,
      avatar: preview.startsWith('data:image/') ? preview : undefined // Send base64 structure only if altered
    });

    if (response.data.success) {
      // Synchronize changes permanently back into local storage structure references and global Redux nodes
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(updateLocalUser(response.data.user));
      
      // Keep your sidebar reactivity synchronization alerts live
      window.dispatchEvent(new Event("profile_metadata_updated"));
      window.dispatchEvent(new Event("avatar_updated"));
      
      alert('✅ Settings and profile preferences synced permanently!');
    }
  } catch (error: unknown) {
    console.error(error);
    alert('❌ Failed to update settings profile configuration on server.');
  } finally {
    setSaving(false);  
  }
};

  const handleLogout = () => {
    localStorage.removeItem('user_avatar');
    localStorage.removeItem('user_profile_metadata');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 antialiased text-gray-800 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-xs">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100/50">
          <Settings size={24} className="animate-spin" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Configure your marine platform identity and core parameters</p>
        </div>
      </div>

      {/* Main Dashboard Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-50 bg-gray-50/30 flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <h2 className="text-xs font-black uppercase text-gray-400 tracking-wider">Profile Authentication Parameters</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="p-6 lg:p-8 space-y-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            
            {/* Photo Uploader */}
            <div className="flex flex-col items-center shrink-0 space-y-3">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <img 
                  src={preview} 
                  alt="Profile Avatar" 
                  className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl ring-4 ring-gray-50 ring-offset-1 object-cover shadow-xs group-hover:scale-102 transition-transform duration-300"
                />
                <label className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl text-white shadow-md cursor-pointer border border-blue-500 hover:bg-blue-700 active:scale-90 transition-all">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </label>
              </div>
              <span className="text-[10px] font-bold text-gray-400 tracking-tight uppercase">Click badge to upload</span>
            </div>

            {/* Input Form Fields */}
            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">
                    Full Name Identifier
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter legal name"
                    className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide flex items-center gap-1">
                    <Briefcase size={10} /> Authorized Command Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Master Mariner"
                    className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide flex items-center gap-1">
                  <MapPin size={10} /> Primary Base Station Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Port of Rotterdam"
                  className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-gray-50 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Syncing Logs...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={14} />
                  <span>Save Profile Parameters</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Breakout Sign Out Row */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-[11px] font-semibold text-gray-400">Terminate current terminal instance session nodes safety loop.</p>
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto px-5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100/60 rounded-xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <LogOut size={13} />
          <span>Sign Out Session</span>
        </button>
      </div>

    </div>
  );
}
