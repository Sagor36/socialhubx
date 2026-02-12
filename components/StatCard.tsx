
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => (
  <div className="glass-panel p-6 flex items-center justify-between group hover:border-white/20 transition-all cursor-default">
    <div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}/10 border border-${color}/20 group-hover:scale-110 transition-transform`}>
      <i className={`fa-solid ${icon} text-${color}`}></i>
    </div>
  </div>
);

export default StatCard;
