import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { addNotification, setActiveInspections } from "./dashboardSlice";
import StatCard from "../../components/StatCard";
import { NotebookText, Star, Users, Bell } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger)

interface Tp {
  id?: number;
  SurveyorId?: string;
  Country?: string;
  rating?: number;
}

// 🎬 Framer Motion Animation Settings Definitions
const dashboardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const individualElementVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Dashboard: React.FC<Tp> = () => {
  const TopPerformer = [
    { id: 1, SurveyorId: "Ef44S", Country: "Australia", rating: 4.3 },
    { id: 2, SurveyorId: "Tg48S", Country: "Malaysia", rating: 5.3 },
    { id: 3, SurveyorId: "Mk24e", Country: "India", rating: 4.9 },
  ];

  const dispatch = useAppDispatch();
  const { activeInspections, availableSurveyors, notifications } =
    useAppSelector((state) => state.dashboard);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setActiveInspections(Math.floor(Math.random() * 50)));
      dispatch(addNotification("Live sync completed"));
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Setting Real Time
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Setting Real Date
  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;

  return (
    // ✨ Container wrapped in motion.div for coordinated step entry drops
    <motion.div 
      variants={dashboardContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 p-4 max-w-400 mx-auto text-slate-900 antialiased"
    >
      {/* 🔹 Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-100 bg-white p-5 rounded-2xl ">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text ">
            Live Operations Center
          </h2>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <span>Real-Time Maritime Monitoring Infrastructure</span>
            <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </p>
        </div>
        
        {/* ⏰ Live Status Clock */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-2.5 shadow-xs flex items-center justify-center">
          <span className="text-emerald-600 text-sm font-bold tracking-wider font-mono">
            {time} <span className="text-slate-300 mx-1.5">|</span> {date}
          </span>
        </div>
      </div>

      {/* 📊 StatCard Cards Grid Row */}
      <motion.div 
        variants={individualElementVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard title="Active Inspections" value={activeInspections} trend="+12%" />
        <StatCard title="Available Surveyors" value={availableSurveyors} />
        <StatCard title="Fleet Status" value={activeInspections} />
        <StatCard title="Revenue Pipeline" value="$0" trend="-80%" />
      </motion.div>

      {/* 📦 Inspection Infrastructure Analytics Segment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 📝 Card Panel 1: Current Inspection Matrix */}
        <motion.div 
          variants={individualElementVariants}
          whileHover={{ y: -2 }}
          className="lg:col-span-2 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
        >
          <div className="p-6 border-b border-slate-50">
            <div className="text-lg font-bold text-slate-800 flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <NotebookText size={18} />
              </div>
              <span>Current Active Inspections</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Real-time status updates from terminal pipelines.</p>
          </div>

          {/* Graph Sandbox Container placeholder */}
          <div className="p-6 flex items-center justify-center min-h-55 bg-slate-50/30">
            <div className="text-center space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 animate-spin border-2 border-slate-300 border-t-blue-600" />
              <p className="text-xs text-slate-400 font-medium">Synchronizing live operational feeds...</p>
            </div>
          </div>
        </motion.div>

        {/* 👥 Card Panel 2: Surveyor Network Status */}
        <motion.div 
          variants={individualElementVariants}
          whileHover={{ y: -2 }}
          className="rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300"
        >
          {/* Upper Header */}
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-slate-800 flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Users size={18} />
                </div>
                <span>Surveyor Network Status</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Global performance metrics allocation pool.</p>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              3-Table
            </span>
          </div>

          {/* Lower Dynamic Matrix Items Details */}
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 hover:bg-blue-50 transition-all cursor-pointer">
                <p className="text-xl text-blue-600 font-black">10</p>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mt-0.5">Available</p>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 hover:bg-emerald-50 transition-all cursor-pointer">
                <p className="text-xl text-emerald-600 font-black">12</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-0.5">Assigned</p>
              </div>
              <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 hover:bg-amber-50 transition-all cursor-pointer">
                <p className="text-xl text-amber-600 font-black">3</p>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mt-0.5">Stand By</p>
              </div>
            </div>

            {/* Top Performers Nested Table mapping list */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Top Performers</h4>

              {/* Table Metric Column Title Row Headers */}
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-1 border-b pb-1 border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="w-5 text-center">S.N</span>
                  <span className="w-16">Surveyor ID</span>
                  <span>Region / Country</span>
                </div>
                <div className="flex items-center gap-6 pr-4">
                  <span>Rating</span>
                  <span>Status</span>
                </div>
              </div>

              {/* Controlled Data Mapping Loop */}
              <div className="space-y-1.5">
                {TopPerformer.map((top) => (
                  <div key={top.id} className="flex items-center justify-between text-xs font-semibold text-slate-700 bg-slate-50/40 hover:bg-slate-50 p-2 rounded-xl border border-slate-100/40 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="w-5 h-5 bg-slate-100 text-slate-500 rounded-md flex items-center justify-center text-[10px] font-bold">
                        {top.id}
                      </span>
                      <span className="w-16 font-mono text-slate-900">{top.SurveyorId}</span>
                      <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 rounded-md text-[10px]">
                        {top.Country}
                      </span>
                    </div>

                    <div className="flex items-center gap-5">
                      <span className="text-amber-600 flex items-center gap-1 font-bold">
                        <Star size={12} className="fill-amber-500 text-amber-500" />
                        {top.rating}
                      </span>
                      <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-xs animate-pulse mr-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🔔 Card Panel 3: Live System Alerts Feed (Full Width Bottom Tray Row) */}
      <motion.div 
        variants={individualElementVariants}
        className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs"
      >
        <div className="flex items-center gap-2.5 mb-4 border-b border-slate-50 pb-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Bell size={18} />
          </div>
          <h3 className="text-base font-bold text-slate-800">Live Activity Terminal</h3>
        </div>

        {/* Dynamic Notification Tray Entry Elements Loop with AnimatePresence */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {notifications.slice(0, 5).map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="p-3 bg-slate-50/80 border-l-4 border-blue-500 text-slate-700 text-xs font-semibold rounded-r-xl flex items-center justify-between shadow-xs hover:bg-slate-50 transition-colors"
              >
                <span>{notification.message}</span>
                <span className="text-[10px] text-slate-400 font-mono font-medium">Just Now</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Dashboard;