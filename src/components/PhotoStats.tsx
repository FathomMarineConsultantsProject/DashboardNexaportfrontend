import React from 'react';

interface PhotoStatsProps {
  stats: {
    total: number;
    ok: number;
    minor: number;
    major: number;
    critical: number;
  };
}

const PhotoStats: React.FC<PhotoStatsProps> = ({ stats }) => {
  const statCards = [
    {value:stats.total, label:'Total Photos', color: 'cyan'},
    { value: stats.ok, label: 'OK Status', color: 'green' },
    { value: stats.minor, label: 'Minor Issues', color: 'blue' },
    { value: stats.major, label: 'Major Issues', color: 'orange' },
    { value: stats.critical, label: 'Critical Issues', color: 'red' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-8">
      
      {/* Individual Status Cards */}
      {statCards.map((stat, index) => (
        <div 
          key={index}
          className="p-2 bg-white rounded-md shadow-xs border border-gray-200 text-center hover:shadow-md transition-shadow"
        >
          
          <div className={`text-2xl font-bold mb-1 ${
            stat.color === 'cyan' ? 'text-cyan-600':
            stat.color === 'green' ? 'text-green-600' :
            stat.color === 'blue' ? 'text-blue-600' :
            stat.color === 'orange' ? 'text-orange-600' : 'text-red-600'
          }`}>
            {stat.value}
          </div>
          <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoStats;
