import { motion } from "framer-motion";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 5 }}
      whileHover={{
        scale: 0.99, // ✅ Reduced from 1.11 for subtlety
      }}
      className="group  p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/30 dark:border-gray-700/50  rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 "
    >
      
    
      <h3 className="text-sm flex justify-between items-center   font-semibold text-gray-600 dark:text-gray-300 mb-2 tracking-wide">

        {title}
        <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse " />
      </h3>

      <div className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-white bg-clip-text text-transparent mb-2 leading-tight ml-5 ">
        {value}
      </div>

      {/* Trend */}
      {trend && (
        <motion.p
          className="text-sm font-bold px-3 py-1 rounded-full inline-flex items-center gap-1q bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300
                     shadow-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs">📈</span>
          {trend}
        </motion.p>
      )}
    </motion.div>
  );
};

export default StatCard;
