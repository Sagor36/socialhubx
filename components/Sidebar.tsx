
import React from 'react';
import { View } from '../types';
import { LOGO_SVG } from '../constants';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isAdmin: boolean;
  username: string;
  balance: number;
  avatarUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isAdmin, username, balance, avatarUrl, isOpen, onClose }) => {
  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-house' },
    { id: 'new-order', label: 'New Order', icon: 'fa-cart-plus' },
    { id: 'services', label: 'Services', icon: 'fa-list-ul' },
    { id: 'orders', label: 'Orders', icon: 'fa-clock-rotate-left' },
    { id: 'add-funds', label: 'Add Funds', icon: 'fa-wallet' },
    { id: 'funds-history', label: 'Funds History', icon: 'fa-receipt' },
    { id: 'refer-earn', label: 'Refer & Earn', icon: 'fa-users-viewfinder' },
    { id: 'profile', label: 'My Profile', icon: 'fa-user-circle' },
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Control Room', icon: 'fa-gauge-high' },
    { id: 'admin-orders', label: 'Order Manager', icon: 'fa-box-open' },
    { id: 'admin-broadcast', label: 'Broadcast Hub', icon: 'fa-bullhorn' },
    { id: 'admin-categories', label: 'Category Hub', icon: 'fa-layer-group' },
    { id: 'admin-services', label: 'API & Services', icon: 'fa-server' },
    { id: 'admin-users', label: 'User Directory', icon: 'fa-users-gear' },
    { id: 'admin-payments', label: 'Finance Logs', icon: 'fa-file-invoice-dollar' },
    { id: 'admin-settings', label: 'System Config', icon: 'fa-gears' },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleNav = (view: View) => {
    setView(view);
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed lg:static inset-y-0 left-0 w-72 lg:w-64 glass-panel flex flex-col m-0 lg:m-4 transition-transform duration-300 z-50 border-r lg:border border-white/10 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            {LOGO_SVG}
            <h1 className="text-xl font-black tracking-tight text-white uppercase italic">
              HUB<span className="text-neonCyan">X</span>
            </h1>
          </div>
          {/* FIX: Changed onClose to onClick to correct the type error on button element */}
          <button onClick={onClose} className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-4 font-black">
            {isAdmin ? 'Commander Terminal' : 'Navigation'}
          </p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id as View)}
              className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-bold ${
                currentView === item.id 
                  ? isAdmin 
                    ? 'bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]' 
                    : 'bg-neonCyan/10 text-neonCyan shadow-[0_0_20px_rgba(0,245,255,0.15)]'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center text-base`}></i>
              <span className="tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div 
            onClick={() => handleNav('profile')}
            className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all hover:border-white/30 ${isAdmin ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/10'}`}
          >
            <img 
              src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${isAdmin ? 'ef4444' : '00F5FF'}&color=0A0A0B&bold=true`} 
              className="rounded-full w-10 h-10 border-2 border-white/20 object-cover" 
              alt="Profile" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black truncate text-white uppercase tracking-tighter">{username}</p>
              <p className={`text-[10px] font-black font-mono ${isAdmin ? 'text-red-400' : 'text-neonCyan'}`}>
                {isAdmin ? 'MASTER ADMIN' : `৳${balance.toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
