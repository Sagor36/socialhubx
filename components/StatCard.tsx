
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => (
  <div className="glass-panel p-4 md:p-6 flex items-center justify-between group hover:border-white/20 transition-all cursor-default">
    <div className="min-w-0">
      <p className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-1 truncate">{label}</p>
      <h3 className="text-lg md:text-2xl font-black text-white italic truncate">{value}</h3>
    </div>
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shrink-0`}>
      <i className={`fa-solid ${icon} text-sm md:text-base text-neonCyan`}></i>
    </div>
  </div>
);

export default StatCard;
