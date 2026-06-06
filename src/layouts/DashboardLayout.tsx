import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  DollarSign,
  Menu,
  FileImage,
  CalendarIcon,
  X,
  Settings,
  User,
  ClipboardCheck,
  Star,
  ChevronRight,
} from "lucide-react";
import { useAppSelector } from "../hooks/reduxHooks";
// import { useInactivityTimeout } from "../hooks/useInactivityTimeout"; // ❌ Comment out for now to stop automated logouts

const DashboardLayout = () => {
  // ❌ COMMNETED OUT THE REDIRECT TRAP: This hook was automatically logging you out when tabs changed
  // useInactivityTimeout(); 

  const [ifSidebarOpen, setIfSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  // 📝 FIXED PATHS: Appended /dashboard prefix to match your App.tsx routes exactly!
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Inspections", path: "/dashboard/inspections", icon: ClipboardList },
    { label: "Expenses", path: "/dashboard/expenses", icon: DollarSign },
    { label: "Photos", path: "/dashboard/photos", icon: FileImage },
    { label: "Calendar", path: "/dashboard/calendar", icon: CalendarIcon },
    { label: "Ratings", path: "/dashboard/ratings", icon: Star },
    { label: "RSIC Checklist", path: "/dashboard/rsmc", icon: ClipboardCheck }, // Fixed path name to match rsmc
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased">
      {/* 🌫️ Smooth Mobile Sidebar Background Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${
          ifSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIfSidebarOpen(false)}
      />

      {/* 🧭 Enterprise Premium Sidebar Container */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-68 bg-white border-r border-slate-100 
          flex flex-col justify-between shadow-xs transform transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
          ${ifSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Brand Header */}
        <div>
          <div className="h-20 px-6 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-black text-lg tracking-wider">N</span>
              </div>
              <span className="text-2xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                NexPort-
              </span>
            </div>
            
            <button
              type="button"
              onClick={() => setIfSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Dynamic Link Elements Section */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Checks if the active item matches the target tab path string exactly
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIfSidebarOpen(false)}
                  className={`
                    group flex items-center justify-between p-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon 
                      size={22} 
                      className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} 
                    />
                    <span className="text-[15px]">{item.label}</span>
                  </div>
                  
                  {/* Subtle chevron prompt on hover for inactive links */}
                  <ChevronRight 
                    size={18} 
                    className={`transition-all duration-200 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                      isActive ? "hidden" : "text-slate-400"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 👤 Premium Floating Profile Info Card widget */}
        <div className="p-4 border-t border-slate-50">
          <div className="flex items-center gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors duration-200">
            <div className="relative">
              <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-sm">
                <User size={18} className="text-white" />
              </div>
              <span className="absolute bottom-[-2px] right-[-2px] w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            
            <div className="overflow-hidden">
              <h5 className="font-black text-xs text-slate-900 truncate">
                {user?.name || "Captain Surveyor"}
              </h5>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 truncate">
                {user?.role || "Marine Agent"} &bull; <span className="text-blue-600">{user?.location || "HQ"}</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Workspace App Context Wrapper View area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 📱 Mobile UI Top Header Navigation Bar */}
        <header className="lg:hidden h-16 min-h-16 px-4 bg-white border-b border-slate-100 flex items-center shadow-xs">
          <button
            type="button"
            onClick={() => setIfSidebarOpen(true)}
            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <Menu size={20} />
          </button>
          <span className="ml-3 text-sm font-black text-slate-900 tracking-tight">Dashboard Terminal</span>
        </header>

        {/* 🎬 Main View Workspace Canvas */}
        <main className="flex-1 overflow-auto p-6 md:p-8 focus:outline-hidden">
          <div className="animate-fade-in-up transition-all duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;