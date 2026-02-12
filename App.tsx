
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import ArchitectureView from './components/ArchitectureView';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { View, Service, User, Category, ReferralTransaction, BroadcastNotification } from './types';
import { LOGO_SVG, CATEGORIES as INITIAL_CATEGORIES, PAYMENT_METHODS } from './constants';
import { supabase } from './services/supabase';
import { sendOrderNotification, sendPaymentNotification } from './services/telegramService';

const LogoLoader = () => (
  <div className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center overflow-hidden">
    <div className="relative">
      <div className="absolute inset-[-40px] border-2 border-neonCyan/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
      <div className="absolute inset-[-40px] border-t-2 border-neonCyan rounded-full animate-[spin_1.5s_linear_infinite]"></div>
      <div className="relative z-10 scale-[2.5] drop-shadow-[0_0_20px_rgba(0,245,255,0.6)] animate-bounce">
        {LOGO_SVG}
      </div>
    </div>
    <div className="mt-24 text-center">
      <h2 className="text-3xl font-black text-white tracking-[0.4em] uppercase italic">
        SOCIAL HUB <span className="text-neonCyan">X</span>
      </h2>
      <p className="text-gray-500 text-[9px] mt-6 font-black uppercase tracking-[0.6em] animate-pulse">Establishing Secure Node Link...</p>
    </div>
  </div>
);

const LandingPage = ({ onNav }: { onNav: (mode: 'login' | 'signup') => void }) => (
  <div className="w-full bg-charcoal selection:bg-neonCyan/30">
    <nav className="fixed top-0 left-0 w-full z-50 bg-charcoal/20 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {LOGO_SVG}
        <h1 className="text-xl font-black text-white uppercase italic tracking-tighter">
          SOCIAL HUB <span className="text-neonCyan">X</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => onNav('login')} className="text-sm font-bold text-gray-400 hover:text-white uppercase transition-colors">Login</button>
        <button onClick={() => onNav('signup')} className="px-6 py-2.5 bg-neonCyan text-charcoal font-black rounded-xl text-sm uppercase italic shadow-glow-cyan hover:scale-105 transition-all">Signup</button>
      </div>
    </nav>

    <section className="relative min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neonCyan/10 blur-[120px] rounded-full -z-10"></div>
      <div className="max-w-4xl text-center space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-neonCyan uppercase tracking-[0.3em] mb-4">
          The World's Fastest SMM Panel
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white italic leading-[1.1] uppercase tracking-tighter">
          Dominate Social <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-electricBlue">Presence Instantly</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Unlock high-speed growth for Facebook, Instagram, YouTube, and TikTok. Real users, instant delivery, and the lowest prices in Bangladesh.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={() => onNav('signup')} className="w-full sm:w-auto px-12 py-6 bg-neonCyan text-charcoal font-black rounded-2xl text-lg uppercase italic shadow-glow-cyan hover:scale-110 transition-all">Signup</button>
          <button onClick={() => onNav('login')} className="w-full sm:w-auto px-12 py-6 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-lg uppercase tracking-widest hover:bg-white/10 transition-all italic">Login</button>
        </div>
      </div>
      
      <div className="mt-32 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 animate-in fade-in duration-1000 delay-500">
        {[
          { label: 'Total Orders', val: '2.4M+' },
          { label: 'Active Users', val: '12K+' },
          { label: 'Services', val: '1.5K+' },
          { label: 'Uptime', val: '99.9%' }
        ].map((stat, i) => (
          <div key={i} className="text-center space-y-2">
            <h4 className="text-3xl md:text-4xl font-black text-white italic">{stat.val}</h4>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>

    <footer className="py-24 text-center border-t border-white/5">
      <div className="flex items-center justify-center space-x-3 opacity-60">
        {LOGO_SVG}
        <span className="text-white font-black uppercase italic tracking-tighter text-2xl">HUBX BD</span>
      </div>
      <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mt-4">© 2024 SOCIAL HUB X BD - ALL NODES RESERVED</p>
    </footer>
  </div>
);

const BroadcastModal = ({ broadcast, onClose }: { broadcast: BroadcastNotification; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-lg glass-panel overflow-hidden border border-neonCyan/20 animate-in zoom-in-95 duration-300 shadow-glow-cyan">
        <div className="absolute top-0 left-0 w-full h-1 bg-neonCyan"></div>
        {broadcast.image_url && (
          <div className="w-full h-64 overflow-hidden">
            <img src={broadcast.image_url} alt="Broadcast" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-8 space-y-6 text-center">
          <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">{broadcast.title}</h3>
          <p className="text-gray-400 font-medium leading-relaxed whitespace-pre-wrap">{broadcast.message}</p>
          <div className="flex flex-col gap-4">
            {broadcast.redirect_link && (
              <a 
                href={broadcast.redirect_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-neonCyan text-charcoal font-black rounded-xl uppercase italic shadow-glow-cyan hover:scale-105 transition-all text-center"
              >
                Action Now
              </a>
            )}
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  localStorage.setItem(`SHX_BROADCAST_DISMISSED_${broadcast.id}`, 'true');
                  onClose();
                }}
                className="flex-1 py-3 text-xs font-black text-gray-500 uppercase tracking-widest hover:text-white border border-white/5 rounded-xl hover:bg-white/5"
              >
                Don't show again
              </button>
              <button 
                onClick={onClose}
                className="flex-1 py-3 text-xs font-black text-white uppercase tracking-widest border border-white/10 rounded-xl hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeBroadcast, setActiveBroadcast] = useState<BroadcastNotification | null>(null);
  
  const [globalServices, setGlobalServices] = useState<Service[]>([]);
  const [globalOrders, setGlobalOrders] = useState<any[]>([]);
  const [globalPayments, setGlobalPayments] = useState<any[]>([]);
  const [globalUsers, setGlobalUsers] = useState<any[]>([]);
  const [globalCategories, setGlobalCategories] = useState<Category[]>([]);
  const [referralHistory, setReferralHistory] = useState<ReferralTransaction[]>([]);
  const [referralCount, setReferralCount] = useState(0);
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);

  const [sysRefEnabled, setSysRefEnabled] = useState(true);
  const [sysRefPercentage, setSysRefPercentage] = useState(30);

  const [adminMetrics, setAdminMetrics] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingSyncs: 0,
    liveDeployments: 0,
    netProfit: 0,        
    globalNetworkCapital: 0,
    totalCosts: 0
  });
  
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    loginIdentifier: '',
    password: '',
    username: '',
    email: '',
    inviteCode: '' 
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    image_url: '',
    redirect_link: ''
  });

  const [newCatName, setNewCatName] = useState('');
  const [newSvc, setNewSvc] = useState({
    name: '',
    category: '',
    ratePer1000: 0,
    min: 10,
    max: 10000,
    description: ''
  });

  const [orderCategory, setOrderCategory] = useState('All');
  const [orderServiceId, setOrderServiceId] = useState<number>(0);
  const [orderQuantity, setOrderQuantity] = useState<number>(0);
  const [orderLink, setOrderLink] = useState('');
  
  const [selectedMethodId, setSelectedMethodId] = useState('bkash');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [transactionId, setTransactionId] = useState('');

  const fetchSystemConfig = useCallback(async () => {
    const { data } = await supabase.from('system_config').select('*');
    if (data) {
      const enabled = data.find(i => i.key === 'ref_enabled')?.value === 'true';
      const percentage = parseInt(data.find(i => i.key === 'ref_percentage')?.value || '30');
      setSysRefEnabled(enabled);
      setSysRefPercentage(percentage);
    }
  }, []);

  const fetchBroadcast = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        const isDismissed = localStorage.getItem(`SHX_BROADCAST_DISMISSED_${data.id}`);
        if (!isDismissed) {
          setActiveBroadcast(data);
        }
      }
    } catch (err) {}
  }, []);

  const fetchGlobalServices = useCallback(async () => {
    try {
      const { data } = await supabase.from('services').select('*').order('id', { ascending: true });
      if (data) {
        const formattedServices: Service[] = data.map(s => ({
          id: s.id,
          name: s.name,
          category: s.category,
          ratePer1000: Number(s.rate_per_1000),
          originalRate: Number(s.original_rate),
          min: s.min,
          max: s.max,
          avgTime: s.avg_time || 'N/A',
          description: s.description || ''
        }));
        setGlobalServices(formattedServices);
        return formattedServices;
      }
      return [];
    } catch (err) { return []; }
  }, []);

  const fetchGlobalCategories = useCallback(async () => {
    try {
      const { data } = await supabase.from('categories').select('*').order('name', { ascending: true });
      if (data) {
        setGlobalCategories(data);
        setCategories(['All', ...data.map(c => c.name)]);
      }
    } catch (err) {}
  }, []);

  const fetchGlobalOrders = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('orders').select('*').order('id', { ascending: false });
      if (error) throw error;
      if (data) setGlobalOrders(data);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
    }
  }, []);

  const fetchGlobalPayments = useCallback(async () => {
    try {
      const { data } = await supabase.from('payments').select('*').order('id', { ascending: false });
      if (data) setGlobalPayments(data);
    } catch (err) {}
  }, []);

  const fetchAllUsers = useCallback(async () => {
    try {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (data) setGlobalUsers(data);
    } catch (err) {}
  }, []);

  const refreshAdminData = useCallback(async () => {
    if (user?.role !== 'admin') return;
    await Promise.all([
      fetchGlobalServices(),
      fetchGlobalCategories(),
      fetchGlobalOrders(),
      fetchGlobalPayments(),
      fetchAllUsers()
    ]);

    const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { data: allOrders } = await supabase.from('orders').select('*');
    const { count: pendingCount } = await supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
    const { data: completedPayments } = await supabase.from('payments').select('amount').eq('status', 'Completed');
    
    const revenue = completedPayments?.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) || 0;
    
    setAdminMetrics(prev => ({
      ...prev,
      totalUsers: userCount || 0,
      totalOrders: allOrders?.length || 0,
      totalRevenue: revenue,
      pendingSyncs: pendingCount || 0,
      liveDeployments: allOrders?.filter(o => o.status === 'Processing' || o.status === 'Pending').length || 0,
    }));
  }, [user, fetchGlobalServices, fetchGlobalCategories, fetchGlobalOrders, fetchGlobalPayments, fetchAllUsers]);

  const fetchReferralData = useCallback(async (userId: string) => {
    if (!userId) return;
    try {
      const { data: transactions } = await supabase
        .from('referral_transactions')
        .select('*')
        .eq('referrer_id', userId)
        .order('created_at', { ascending: false });
        
      const { count, error } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .eq('referred_by', userId);
        
      if (!error) {
        setReferralHistory(transactions || []);
        setReferralCount(count || 0);
      }
    } catch (err) {
      console.error("Referral fetch error:", err);
    }
  }, []);

  useEffect(() => {
    if (currentView.startsWith('admin-') && user?.role === 'admin') {
      refreshAdminData();
    } else if (currentView === 'orders') {
      fetchGlobalOrders();
    } else if (currentView === 'refer-earn' && user) {
      fetchReferralData(user.id || '');
    }
    
    if (user) {
      fetchBroadcast();
    }
  }, [currentView, user, refreshAdminData, fetchGlobalOrders, fetchReferralData, fetchBroadcast]);

  const loadUserProfile = async (userId: string, email?: string, metadata?: any) => {
    setIsGlobalLoading(true);
    try {
      let { data: profile, error: profileErr } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
      if (profileErr) throw profileErr;

      const isAdminEmail = email?.toLowerCase() === 'sagor@socialhubx.com';
      const codeToUse = metadata?.inviteCode || formData.inviteCode;

      if (!profile) {
        const username = isAdminEmail ? 'Sagor_X' : (metadata?.username || email?.split('@')[0] || `User_${userId.substring(0, 5)}`);
        let referrerId = null;
        
        if (codeToUse && !isAdminEmail) {
          const { data: refUser = null } = await supabase.from('profiles').select('id').eq('invitation_code', codeToUse).maybeSingle();
          if (refUser && refUser.id !== userId) {
            referrerId = refUser.id;
          }
        }

        const numericCode = Math.floor(100000 + Math.random() * 900000).toString();
        const { data: newProfile, error: upsertError } = await supabase.from('profiles').upsert([{
          id: userId,
          username: username,
          balance: isAdminEmail ? 999999 : 0,
          role: isAdminEmail ? 'admin' : 'user',
          referred_by: referrerId,
          invitation_code: numericCode
        }], { onConflict: 'id' }).select().single();
        
        if (upsertError) throw upsertError;
        profile = newProfile;
      } else {
        let needsUpdate = false;
        const updatePayload: any = {};

        if (!profile.invitation_code) {
          updatePayload.invitation_code = Math.floor(100000 + Math.random() * 900000).toString();
          needsUpdate = true;
        }

        if (!profile.referred_by && codeToUse && !isAdminEmail) {
          const { data: refUser = null } = await supabase.from('profiles').select('id').eq('invitation_code', codeToUse).maybeSingle();
          if (refUser && refUser.id !== userId) {
            updatePayload.referred_by = refUser.id;
            needsUpdate = true;
          }
        }

        if (needsUpdate) {
          const { data: updatedProfile, error: updateErr } = await supabase.from('profiles').update(updatePayload).eq('id', userId).select().single();
          if (!updateErr && updatedProfile) {
            profile = updatedProfile;
          }
        }
      }

      if (profile) {
        setUser({
          id: profile.id,
          username: profile.username,
          balance: Number(profile.balance) || 0,
          totalSpent: Number(profile.total_spent) || 0,
          activeOrders: profile.active_orders || 0,
          role: (profile.role as 'admin' | 'user') || 'user',
          email: email,
          avatar_url: profile.avatar_url,
          referred_by: profile.referred_by,
          referral_earnings: Number(profile.referral_earnings) || 0,
          invitation_code: profile.invitation_code
        });
        await Promise.all([fetchGlobalServices(), fetchGlobalCategories(), fetchSystemConfig()]);
        if (profile.role === 'admin') {
          if (currentView === 'landing' || currentView === 'auth') setView('admin-dashboard');
        } else {
          if (currentView === 'landing' || currentView === 'auth') setView('dashboard');
        }
      }
    } catch (err: any) { 
      console.error("Profile sync error:", err);
      setAuthError("Profile synchronization failed. Please refresh."); 
    } finally { 
      setIsGlobalLoading(false); 
    }
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) loadUserProfile(session.user.id, session.user.email, session.user.user_metadata);
    };
    init();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        loadUserProfile(session.user.id, session.user.email, session.user.user_metadata);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setView('landing');
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsGlobalLoading(true);
    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { 
            data: { 
              username: formData.username, 
              inviteCode: formData.inviteCode.trim() 
            } 
          }
        });
        if (error) throw error;
        if (data.user && !data.session) {
          alert("Account created! If email confirmation is enabled, please check your inbox.");
          setAuthMode('login');
        }
      } else {
        const identifier = formData.loginIdentifier.trim();
        const loginEmail = identifier.includes('@') ? identifier : `${identifier}@socialhubx.com`;
        const { error } = await supabase.auth.signInWithPassword({ 
          email: loginEmail, 
          password: formData.password 
        });
        if (error) throw error;
      }
    } catch (err: any) { 
      setAuthError(err.message || "Authentication failed."); 
    } finally { 
      setIsGlobalLoading(false); 
    }
  };

  const handleBroadcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.message) {
      alert("Title and message are required!");
      return;
    }
    setIsGlobalLoading(true);
    try {
      await supabase.from('notifications').update({ is_active: false }).eq('is_active', true);
      const { error } = await supabase.from('notifications').insert([{
        ...broadcastForm,
        is_active: true
      }]);
      if (error) throw error;
      alert("Broadcast message published!");
      setBroadcastForm({ title: '', message: '', image_url: '', redirect_link: '' });
      setView('admin-dashboard');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const { error } = await supabase.from('categories').insert([{ name: newCatName }]);
      if (error) throw error;
      setNewCatName('');
      refreshAdminData();
    } catch (err: any) { alert(err.message); }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Delete this category?')) return;
    try {
      await supabase.from('categories').delete().eq('id', id);
      refreshAdminData();
    } catch (err: any) { alert(err.message); }
  };

  const handleAddService = async () => {
    if (!newSvc.name || !newSvc.category) { alert("Name and Category required"); return; }
    try {
      const { error } = await supabase.from('services').insert([{
        name: newSvc.name,
        category: newSvc.category,
        rate_per_1000: newSvc.ratePer1000,
        min: newSvc.min,
        max: newSvc.max,
        description: newSvc.description
      }]);
      if (error) throw error;
      setNewSvc({ name: '', category: '', ratePer1000: 0, min: 10, max: 10000, description: '' });
      refreshAdminData();
    } catch (err: any) { alert(err.message); }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    try {
      await supabase.from('services').delete().eq('id', id);
      refreshAdminData();
    } catch (err: any) { alert(err.message); }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    setIsGlobalLoading(true);
    try {
      await supabase.from('orders').update({ status }).eq('id', id);
      await fetchGlobalOrders();
    } finally { setIsGlobalLoading(false); }
  };

  const approvePayment = async (p: any) => {
    setIsGlobalLoading(true);
    try {
      await supabase.from('payments').update({ status: 'Completed' }).eq('id', p.id);
      const { data: profile } = await supabase.from('profiles').select('balance').eq('username', p.username).single();
      if (profile) {
        await supabase.from('profiles').update({ balance: Number(profile.balance) + Number(p.amount) }).eq('username', p.username);
      }
      await refreshAdminData();
    } finally { setIsGlobalLoading(false); }
  };

  const updateUserBalance = async (username: string, amount: number) => {
    const { data: profile } = await supabase.from('profiles').select('balance').eq('username', username).single();
    if (profile) {
      await supabase.from('profiles').update({ balance: Number(profile.balance) + amount }).eq('username', username);
      await refreshAdminData();
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !activeOrderService) return;
    
    const rate = activeOrderService.ratePer1000 || 0;
    const charge = (orderQuantity / 1000) * rate;

    if (user.role !== 'admin' && (user.balance <= 0 || user.balance < charge)) { 
      alert("আপনার অ্যাকাউন্ট এ টাকা নাই দয়া করে টাকা অ্যাড করে আবার চেষ্টা করুন | যেকোন সমস্যা হলে আমাদের সাথে হোয়াটসঅ্যাপ এ যোগাযোগ করুন ধন্যবাদ।"); 
      return; 
    }

    if (orderQuantity <= 0) { alert("দয়া করে সঠিক পরিমাণ লিখুন।"); return; }
    if (!orderLink.trim()) { alert("দয়া করে লিঙ্কটি দিন।"); return; }
    if (orderQuantity < activeOrderService.min) { alert(`Minimum quantity is ${activeOrderService.min}`); return; }

    setIsGlobalLoading(true);
    try {
      const { error: orderError } = await supabase.from('orders').insert([{ 
        link: orderLink, 
        charge: charge, 
        quantity: orderQuantity, 
        service_name: activeOrderService.name, 
        status: 'Pending', 
        username: user.username 
      }]);
      
      if (orderError) throw orderError;

      if (sysRefEnabled && user.referred_by) {
        const commission = (charge * (sysRefPercentage / 100));
        const { data: referrer, error: refFetchErr } = await supabase
          .from('profiles')
          .select('balance, referral_earnings')
          .eq('id', user.referred_by)
          .maybeSingle();
          
        if (referrer && !refFetchErr) {
           const updatedBalance = Number(referrer.balance) + commission;
           const updatedEarnings = Number(referrer.referral_earnings) + commission;
           
           await supabase.from('profiles').update({ 
             balance: updatedBalance, 
             referral_earnings: updatedEarnings 
           }).eq('id', user.referred_by);
           
           await supabase.from('referral_transactions').insert([{ 
             referrer_id: user.referred_by, 
             referee_username: user.username, 
             order_amount: charge, 
             commission_amount: commission 
           }]);
        }
      }

      if (user.role !== 'admin') {
        const newBalance = user.balance - charge;
        const newSpent = user.totalSpent + charge;
        const newActive = (user.activeOrders || 0) + 1;
        
        await supabase.from('profiles').update({ 
          balance: newBalance, 
          total_spent: newSpent,
          active_orders: newActive
        }).eq('id', user.id);
        
        setUser({ ...user, balance: newBalance, totalSpent: newSpent, activeOrders: newActive });
      }

      await sendOrderNotification({
        username: user.username,
        service_name: activeOrderService.name,
        category: orderCategory,
        link: orderLink,
        quantity: orderQuantity,
        amount: charge
      });

      setOrderLink('');
      setOrderQuantity(0);
      await fetchGlobalOrders();
      alert("Order Successfully Placed!");
      setView('orders');
      
    } catch (err: any) { 
      console.error("Order Failure Trace:", err);
      alert("সিস্টেম ত্রুটি। আপনার ইন্টারনেট কানেকশন চেক করুন অথবা অ্যাডমিনের সাথে যোগাযোগ করুন।"); 
    } finally { 
      setIsGlobalLoading(false); 
    }
  };

  const activeOrderService = useMemo(() => globalServices.find(s => s.id === orderServiceId) || globalServices[0], [orderServiceId, globalServices]);
  const servicesForCategory = useMemo(() => globalServices.filter(s => orderCategory === 'All' || s.category === orderCategory), [orderCategory, globalServices]);
  const activePaymentMethod = useMemo(() => PAYMENT_METHODS.find(m => m.id === selectedMethodId) || PAYMENT_METHODS[0], [selectedMethodId]);

  const renderContent = () => {
    if (currentView === 'landing') return (
      <LandingPage onNav={(mode) => { setAuthMode(mode); setView('auth'); }} />
    );

    if (currentView === 'auth') return (
      <div className="min-h-screen w-full flex overflow-hidden bg-[#0A0A0B]">
        <div className="hidden lg:flex w-1/2 relative items-center justify-center border-r border-white/5 bg-mesh">
          <div className="relative z-10 text-center p-20 scale-[1.5]">
            <div className="inline-block p-10 rounded-[3rem] bg-neonCyan/5 border border-neonCyan/20">{LOGO_SVG}</div>
            <h2 className="text-4xl font-black text-white italic uppercase mt-6 tracking-tighter">SOCIAL HUB <span className="text-neonCyan">X</span></h2>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-charcoal">
          <div className="w-full max-w-md space-y-10 animate-in slide-in-from-right-12 duration-700">
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">
              {authMode === 'login' ? 'Login' : 'Registration'}
            </h2>
            <form onSubmit={handleAuthSubmit} className="space-y-6">
              {authMode === 'signup' && (
                <>
                  <input type="text" required value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold placeholder-gray-600 focus:border-neonCyan outline-none" placeholder="FULL NAME / USERNAME" />
                  <div className="relative">
                    <input type="text" value={formData.inviteCode} onChange={(e) => setFormData({...formData, inviteCode: e.target.value})} className="w-full bg-white/5 border border-neonCyan/20 rounded-2xl p-5 text-neonCyan font-bold placeholder-neonCyan/30 focus:border-neonCyan outline-none tracking-widest" placeholder="INVITATION CODE" />
                    <i className="fa-solid fa-hashtag absolute right-6 top-1/2 -translate-y-1/2 text-neonCyan/30"></i>
                  </div>
                </>
              )}
              <input type="text" required value={authMode === 'signup' ? formData.email : formData.loginIdentifier} onChange={(e) => authMode === 'signup' ? setFormData({...formData, email: e.target.value}) : setFormData({...formData, loginIdentifier: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold placeholder-gray-600 focus:border-neonCyan outline-none" placeholder="EMAIL ADDRESS" />
              <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold placeholder-gray-600 focus:border-neonCyan outline-none" placeholder="SECURE PASSWORD" />
              {authError && <div className="text-red-500 text-[10px] font-black uppercase text-center bg-red-500/10 p-4 rounded-xl border border-red-500/20">{authError}</div>}
              <button type="submit" className="w-full bg-neonCyan text-charcoal font-black py-6 rounded-2xl uppercase shadow-glow-cyan italic tracking-widest text-lg hover:scale-[1.02] transition-transform">
                {authMode === 'login' ? 'Login' : 'Signup'}
              </button>
            </form>
            <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="w-full text-xs font-black text-gray-600 uppercase hover:text-white transition-colors">{authMode === 'login' ? "Register New Account?" : "Already Have An Account?"}</button>
          </div>
        </div>
      </div>
    );

    switch (currentView) {
      case 'dashboard':
      case 'admin-dashboard': return (
        <div className="space-y-10 animate-in fade-in duration-1000">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label={user?.role === 'admin' ? "Total Agents" : "Balance"} value={user?.role === 'admin' ? adminMetrics.totalUsers : `৳${user?.balance?.toLocaleString()}`} icon="fa-users" color="neonCyan" />
            <StatCard label={user?.role === 'admin' ? "Global Orders" : "Spent"} value={user?.role === 'admin' ? adminMetrics.totalOrders : `৳${user?.totalSpent?.toLocaleString()}`} icon="fa-box" color="green-500" />
            <StatCard label={user?.role === 'admin' ? "Total Yield" : "Passive Earn"} value={user?.role === 'admin' ? `৳${adminMetrics.totalRevenue.toLocaleString()}` : `৳${user?.referral_earnings?.toLocaleString() || '0'}`} icon="fa-chart-line" color="orange-400" />
            <StatCard label={user?.role === 'admin' ? "Pending Syncs" : "Sub-Nodes"} value={user?.role === 'admin' ? adminMetrics.pendingSyncs : referralCount} icon="fa-network-wired" color="red-500" />
          </div>
          <div className="glass-panel p-8 h-96">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-8">System Pulse Analytics</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[ { name: '00', val: 400 }, { name: '04', val: 300 }, { name: '08', val: 500 }, { name: '12', val: 800 }, { name: '16', val: 450 }, { name: '20', val: 900 }, { name: '24', val: 340 } ]}>
                <Tooltip contentStyle={{ backgroundColor: '#0b0e11', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="val" stroke="#00F5FF" fillOpacity={0.1} fill="#00F5FF" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

      case 'new-order': return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
          <div className="glass-panel p-10 border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-neonCyan"></div>
            <h3 className="text-3xl font-black text-white italic uppercase mb-10"><i className="fa-solid fa-cart-plus text-neonCyan mr-4"></i> Create Mission</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Segment</label>
                  <select value={orderCategory} onChange={(e) => { setOrderCategory(e.target.value); }} className="w-full bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold appearance-none uppercase outline-none">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Asset</label>
                  <select value={orderServiceId} onChange={(e) => setOrderServiceId(Number(e.target.value))} className="w-full bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold appearance-none uppercase outline-none">
                    {servicesForCategory.map(svc => <option key={svc.id} value={svc.id}>{svc.name} - ৳{svc.ratePer1000}/1K</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Target Link</label>
                  <input type="url" placeholder="URL node..." value={orderLink} onChange={(e) => setOrderLink(e.target.value)} className="w-full bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Volume</label>
                  <input type="number" placeholder="Quantity" value={orderQuantity || ''} onChange={(e) => setOrderQuantity(Number(e.target.value))} className="w-full bg-charcoal border border-white/10 rounded-xl p-5 text-white font-black text-xl outline-none" />
                </div>
              </div>
              <div className="p-8 bg-neonCyan/5 border border-neonCyan/10 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] text-neonCyan font-black uppercase mb-6 tracking-widest">Mission Specs</h4>
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 font-bold uppercase">Time: <span className="text-white ml-2">{activeOrderService?.avgTime || 'Instant'}</span></p>
                    <p className="text-xs text-gray-400 font-bold uppercase">Range: <span className="text-white ml-2">{activeOrderService?.min?.toLocaleString()} - {activeOrderService?.max?.toLocaleString()}</span></p>
                  </div>
                </div>
                <div className="pt-10 border-t border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-black">Final Charge</p>
                  <p className="text-3xl font-black text-neonCyan italic">৳{((orderQuantity/1000) * (activeOrderService?.ratePer1000 || 0)).toFixed(2)}</p>
                  <button onClick={handlePlaceOrder} className="w-full mt-6 py-4 bg-neonCyan text-charcoal font-black rounded-xl uppercase italic shadow-glow-cyan active:scale-95 transition-all">Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      case 'services': return (
        <div className="space-y-8 animate-in fade-in duration-700">
           <div className="glass-panel p-10 flex flex-wrap gap-4 items-center justify-between">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Asset Hub</h3>
              <div className="flex flex-wrap gap-2">
                 {categories.map(cat => (
                   <button key={cat} onClick={() => setOrderCategory(cat)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${orderCategory === cat ? 'bg-neonCyan text-charcoal' : 'bg-white/5 text-gray-500 hover:text-white'}`}>{cat}</button>
                 ))}
              </div>
           </div>
           <div className="glass-panel overflow-hidden border-white/5">
              <table className="w-full text-left">
                 <thead className="bg-white/5 text-[10px] uppercase font-black text-gray-500 tracking-widest">
                    <tr><th className="px-8 py-6">Mission Asset</th><th className="px-8 py-6">Rate/1K</th><th className="px-8 py-6">Range</th><th className="px-8 py-6">Control</th></tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {globalServices.filter(s => orderCategory === 'All' || s.category === orderCategory).map(svc => (
                       <tr key={svc.id} className="hover:bg-white/[0.02]">
                          <td className="px-8 py-6"><p className="text-white font-black text-xs uppercase">{svc.name}</p></td>
                          <td className="px-8 py-6 font-black text-neonCyan">৳{svc.ratePer1000}</td>
                          <td className="px-8 py-6 text-[10px] font-mono opacity-50">{svc.min.toLocaleString()} - {svc.max.toLocaleString()}</td>
                          <td className="px-8 py-6"><button onClick={() => { setOrderServiceId(svc.id); setOrderCategory(svc.category); setView('new-order'); }} className="px-6 py-2 bg-neonCyan/10 text-neonCyan border border-neonCyan/20 rounded-lg text-[10px] font-black uppercase italic hover:bg-neonCyan hover:text-charcoal transition-all">Order</button></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      );

      case 'orders': return (
        <div className="glass-panel overflow-hidden border-white/5 animate-in fade-in duration-700">
          <div className="p-10 border-b border-white/5 bg-white/[0.01]">
            <h3 className="text-2xl font-black text-white italic uppercase">Mission Logs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase font-black text-gray-500 tracking-widest">
                <tr><th className="px-10 py-7">Asset Type</th><th className="px-10 py-7">Vol</th><th className="px-10 py-7">State</th><th className="px-10 py-7">Sync Time</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {globalOrders.filter(o => o.username === user?.username).map(order => (
                  <tr key={order.id} className="hover:bg-white/[0.02]">
                    <td className="px-10 py-8 text-white font-black uppercase italic text-xs">{order.service_name}</td>
                    <td className="px-10 py-8 text-neonCyan font-black">{order.quantity.toLocaleString()}</td>
                    <td className="px-10 py-8"><span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase ${order.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>{order.status}</span></td>
                    <td className="px-10 py-8 text-[10px] font-mono opacity-50">{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      case 'add-funds': return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Establish Financial Node</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Securely add credits to your account</p>
          </div>

           <div className="glass-panel p-10 border-white/5">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-10 flex items-center">
                <i className="fa-solid fa-layer-group text-neonCyan mr-4"></i>
                Select Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PAYMENT_METHODS.filter(m => m.type === 'local').map((method) => (
                  <button 
                    key={method.id} 
                    onClick={() => setSelectedMethodId(method.id)} 
                    className={`relative group p-8 rounded-[2rem] border-2 transition-all overflow-hidden ${
                      selectedMethodId === method.id 
                        ? 'border-neonCyan bg-neonCyan/5 shadow-[0_0_40px_rgba(0,245,255,0.15)] scale-[1.02]' 
                        : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                    }`}
                  >
                    {selectedMethodId === method.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-neonCyan text-charcoal rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                        <i className="fa-solid fa-check text-[10px] font-black"></i>
                      </div>
                    )}
                    <i className={`fa-solid ${method.icon} text-5xl mb-6 transition-colors duration-300`} style={{ color: method.color }}></i>
                    <p className="text-lg font-black uppercase text-white tracking-widest italic">{method.name}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Automatic Node Sync</p>
                  </button>
                ))}
              </div>
           </div>

           <div className="grid lg:grid-cols-2 gap-10">
              <div className="glass-panel p-10 bg-charcoal/80 border-neonCyan/20 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-neonCyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center">
                  <i className="fa-solid fa-circle-info text-neonCyan mr-4"></i>
                  Instructions
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-neonCyan/10 border border-neonCyan/30 flex items-center justify-center text-neonCyan font-black text-xs shrink-0 mt-1">1</div>
                    <p className="text-sm font-bold text-gray-300 leading-relaxed">
                      Copy the number <span className="text-neonCyan italic font-black text-lg ml-1 font-mono tracking-tighter">{activePaymentMethod.phone}</span> and go to your <span className="text-white font-black italic">{activePaymentMethod.name}</span> app.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-neonCyan/10 border border-neonCyan/30 flex items-center justify-center text-neonCyan font-black text-xs shrink-0 mt-1">2</div>
                    <p className="text-sm font-bold text-gray-300">Use <span className="text-white font-black uppercase italic">Send Money</span> option.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-neonCyan/10 border border-neonCyan/30 flex items-center justify-center text-neonCyan font-black text-xs shrink-0 mt-1">3</div>
                    <p className="text-sm font-bold text-gray-300">Enter Amount and your <span className="text-white font-black uppercase italic">Secret Pin</span>.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-neonCyan/10 border border-neonCyan/30 flex items-center justify-center text-neonCyan font-black text-xs shrink-0 mt-1">4</div>
                    <p className="text-sm font-bold text-gray-300Leading-relaxed">
                      After successful payment, enter the <span className="text-neonCyan font-black italic">Transaction ID (TrxID)</span> and <span className="text-neonCyan font-black italic">Amount</span> below to verify.
                    </p>
                  </div>
                </div>
                
                <div className="mt-10 p-6 bg-neonCyan/5 rounded-2xl border border-neonCyan/10 text-center">
                   <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Target Node Identity</p>
                   <p className="text-3xl font-black text-white font-mono tracking-widest italic">{activePaymentMethod.phone}</p>
                   <button 
                     onClick={() => { navigator.clipboard.writeText(activePaymentMethod.phone || ''); alert('Number stored in buffer.'); }} 
                     className="mt-4 px-8 py-3 bg-neonCyan text-charcoal rounded-xl font-black text-xs uppercase shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:scale-105 active:scale-95 transition-all"
                   >
                     COPY NUMBER
                   </button>
                </div>
              </div>

              <div className="glass-panel p-10 border-white/10 relative">
                <h3 className="text-2xl font-black text-white uppercase italic mb-10 flex items-center">
                  <i className="fa-solid fa-shield-check text-neonCyan mr-4"></i>
                  Verification Form
                </h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!user) return;
                  if (!paymentAmount || paymentAmount <= 0) { alert('Enter valid amount'); return; }
                  if (!transactionId.trim()) { alert('Enter TrxID'); return; }
                  setIsGlobalLoading(true);
                  try {
                    await supabase.from('payments').insert([{ method: activePaymentMethod.name, amount: paymentAmount, tx_id: transactionId, username: user.username, status: 'Pending' }]);
                    await sendPaymentNotification({ payment_method: activePaymentMethod.name, username: user.username, amount_taka: paymentAmount, transaction_id: transactionId });
                    alert("Verification signal sent to master admin. Please wait for manual authorization.");
                    setView('funds-history');
                  } finally { setIsGlobalLoading(false); }
                }} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Transaction ID (TrxID)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. BKW82910XJ" 
                      value={transactionId} 
                      onChange={(e) => setTransactionId(e.target.value.toUpperCase())} 
                      className="w-full bg-charcoal border border-white/10 rounded-[1.5rem] p-6 text-white font-black text-2xl outline-none focus:border-neonCyan focus:shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all placeholder:text-gray-800" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Amount (BDT)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="0.00" 
                      value={paymentAmount || ''} 
                      onChange={(e) => setPaymentAmount(Number(e.target.value))} 
                      className="w-full bg-charcoal border border-white/10 rounded-[1.5rem] p-6 text-white font-black text-2xl outline-none focus:border-neonCyan focus:shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all placeholder:text-gray-800" 
                    />
                  </div>
                  <button type="submit" className="w-full bg-neonCyan text-charcoal font-black py-7 rounded-[2rem] uppercase italic shadow-[0_0_30px_rgba(0,245,255,0.5)] text-xl hover:scale-[1.02] active:scale-95 transition-all mt-4">
                    Verify Payment Node
                  </button>
                </form>
              </div>
           </div>
        </div>
      );

      case 'funds-history': return (
        <div className="glass-panel overflow-hidden border-white/5 animate-in fade-in duration-700">
          <div className="p-10 border-b border-white/5 bg-white/[0.01]">
            <h3 className="text-2xl font-black text-white italic uppercase text-center">Finance Trace</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase font-black text-gray-500 tracking-widest">
                <tr><th className="px-10 py-7">Channel</th><th className="px-10 py-7">Volume</th><th className="px-10 py-7">State</th><th className="px-10 py-7">Date</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {globalPayments.filter(p => p.username === user?.username).map(p => (
                  <tr key={p.id}>
                    <td className="px-10 py-8 text-white font-bold uppercase text-xs">{p.method}</td>
                    <td className="px-10 py-8 text-neonCyan font-black">৳{p.amount.toLocaleString()}</td>
                    <td className="px-10 py-8"><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${p.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{p.status}</span></td>
                    <td className="px-10 py-8 text-[10px] font-mono opacity-50">{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      case 'refer-earn': return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">
          <div className="glass-panel p-20 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden border-white/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-neonCyan"></div>
            <div className="w-32 h-32 rounded-full bg-neonCyan/5 border border-neonCyan/20 flex items-center justify-center animate-pulse">
              <i className="fa-solid fa-hourglass-start text-5xl text-neonCyan"></i>
            </div>
            <div className="space-y-4">
              <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">Coming Soon</h3>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm max-w-md mx-auto">
                Our elite referral protocol is currently being optimized for maximum yield extraction. 
                Get ready for the most powerful passive income node in the social hub.
              </p>
            </div>
            <div className="pt-8 flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-neonCyan">Protocol: Optimization</span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-neonCyan">Status: Encrypting</span>
            </div>
          </div>
        </div>
      );

      case 'profile': return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
          <div className="glass-panel p-10 border-white/5 text-center">
            <div className="w-24 h-24 rounded-full bg-neonCyan/10 border-2 border-neonCyan/30 mx-auto flex items-center justify-center mb-6">
               <i className="fa-solid fa-user-shield text-4xl text-neonCyan"></i>
            </div>
            <h2 className="text-3xl font-black text-white italic uppercase mb-2">{user?.username}</h2>
            <p className="text-neonCyan font-mono uppercase text-[10px] tracking-widest mb-8">{user?.role} NODE ACTIVATED</p>
            <div className="p-8 bg-white/5 rounded-3xl text-left space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="p-5 bg-charcoal rounded-2xl border border-white/5">
                    <p className="text-[9px] text-gray-600 uppercase font-black">Account Balance</p>
                    <p className="text-xl font-black text-white italic">৳{user?.balance.toLocaleString()}</p>
                  </div>
                  <div className="p-5 bg-charcoal rounded-2xl border border-white/5">
                    <p className="text-[9px] text-gray-600 uppercase font-black">Network Capacity</p>
                    <p className="text-xl font-black text-white italic">৳{user?.totalSpent.toLocaleString()}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      );

      case 'admin-broadcast': return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
          <div className="glass-panel p-10 border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-neonCyan"></div>
            <h3 className="text-3xl font-black text-white italic uppercase mb-10"><i className="fa-solid fa-bullhorn text-neonCyan mr-4"></i> Create Image Broadcast</h3>
            <form onSubmit={handleBroadcastSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-black uppercase">Notification Title</label>
                    <input type="text" required value={broadcastForm.title} onChange={(e) => setBroadcastForm({...broadcastForm, title: e.target.value})} className="w-full bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-neonCyan" placeholder="e.g., 20% Bonus Active!" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-black uppercase">Broadcast Image URL</label>
                    <input type="url" value={broadcastForm.image_url} onChange={(e) => setBroadcastForm({...broadcastForm, image_url: e.target.value})} className="w-full bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-neonCyan" placeholder="https://example.com/banner.jpg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-black uppercase">Redirect Link (Call to Action)</label>
                    <input type="url" value={broadcastForm.redirect_link} onChange={(e) => setBroadcastForm({...broadcastForm, redirect_link: e.target.value})} className="w-full bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-neonCyan" placeholder="https://wa.me/..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase">Broadcast Message</label>
                  <textarea required rows={8} value={broadcastForm.message} onChange={(e) => setBroadcastForm({...broadcastForm, message: e.target.value})} className="w-full bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-neonCyan resize-none" placeholder="Write your announcement details here..."></textarea>
                </div>
              </div>
              <button type="submit" className="w-full bg-neonCyan text-charcoal font-black py-6 rounded-2xl uppercase shadow-glow-cyan italic tracking-widest text-lg hover:scale-[1.01] transition-transform mt-4">Publish Elite Broadcast</button>
            </form>
          </div>
        </div>
      );
      
      case 'admin-orders': return (
        <div className="glass-panel overflow-hidden border-white/5 animate-in fade-in duration-700">
          <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className="text-2xl font-black text-white italic uppercase">Order Manager</h3>
            <button onClick={refreshAdminData} className="px-6 py-2 bg-neonCyan/10 text-neonCyan rounded-xl font-black text-[10px] uppercase italic">Refresh</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase font-black text-gray-500 tracking-widest">
                <tr><th className="px-10 py-7">User</th><th className="px-10 py-7">Service</th><th className="px-10 py-7">Vol</th><th className="px-10 py-7">State</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {globalOrders.map(order => (
                  <tr key={order.id}>
                    <td className="px-10 py-8 text-white font-bold uppercase text-xs">{order.username}</td>
                    <td className="px-10 py-8 text-white font-black italic text-xs">{order.service_name}</td>
                    <td className="px-10 py-8 text-neonCyan font-black">{order.quantity.toLocaleString()}</td>
                    <td className="px-10 py-8">
                      <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="bg-charcoal border border-white/10 rounded-xl p-2 text-[10px] font-black text-white outline-none">
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Partial">Partial</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      case 'admin-categories': return (
        <div className="space-y-10 animate-in fade-in duration-700">
          <div className="glass-panel p-10 border-white/10">
             <h3 className="text-3xl font-black text-white italic uppercase mb-10">Category Hub</h3>
             <div className="flex gap-4 mb-10">
               <input type="text" placeholder="Category Name" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none" />
               <button onClick={handleAddCategory} className="px-10 py-5 bg-neonCyan text-charcoal font-black rounded-2xl uppercase italic">Add</button>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {globalCategories.map(cat => (
                 <div key={cat.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center group">
                   <span className="text-xs font-black text-white uppercase">{cat.name}</span>
                   <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-500 hover:text-red-500"><i className="fa-solid fa-trash-can"></i></button>
                 </div>
               ))}
             </div>
          </div>
        </div>
      );

      case 'admin-services': return (
        <div className="space-y-10 animate-in fade-in duration-700">
          <div className="glass-panel p-10 border-white/10">
             <h3 className="text-3xl font-black text-white italic uppercase mb-10">API & Services</h3>
             <div className="grid md:grid-cols-3 gap-6 mb-10 p-8 bg-white/5 rounded-3xl border border-white/5">
                <input type="text" placeholder="Name" value={newSvc.name} onChange={(e) => setNewSvc({...newSvc, name: e.target.value})} className="bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold" />
                <select value={newSvc.category} onChange={(e) => setNewSvc({...newSvc, category: e.target.value})} className="bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold">
                  <option value="">Select Category</option>
                  {globalCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <input type="number" placeholder="Rate/1K" value={newSvc.ratePer1000 || ''} onChange={(e) => setNewSvc({...newSvc, ratePer1000: Number(e.target.value)})} className="bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold" />
                <input type="number" placeholder="Min" value={newSvc.min || ''} onChange={(e) => setNewSvc({...newSvc, min: Number(e.target.value)})} className="bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold" />
                <input type="number" placeholder="Max" value={newSvc.max || ''} onChange={(e) => setNewSvc({...newSvc, max: Number(e.target.value)})} className="bg-charcoal border border-white/10 rounded-xl p-4 text-white font-bold" />
                <button onClick={handleAddService} className="bg-neonCyan text-charcoal font-black rounded-xl uppercase h-14">Add Asset</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] uppercase font-black text-gray-500 tracking-widest">
                    <tr><th className="px-8 py-6">Asset Name</th><th className="px-8 py-6">Category</th><th className="px-8 py-6">Rate</th><th className="px-8 py-6">Control</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {globalServices.map(svc => (
                       <tr key={svc.id}>
                          <td className="px-8 py-6 font-black text-white text-xs uppercase">{svc.name}</td>
                          <td className="px-8 py-6 text-gray-400 text-[10px] uppercase">{svc.category}</td>
                          <td className="px-8 py-6 text-neonCyan font-black">৳{svc.ratePer1000}</td>
                          <td className="px-8 py-6"><button onClick={() => handleDeleteService(svc.id)} className="text-gray-500 hover:text-red-500"><i className="fa-solid fa-trash-can"></i></button></td>
                       </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      );

      case 'admin-users': return (
        <div className="glass-panel overflow-hidden border-white/5 animate-in fade-in duration-700">
          <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className="text-2xl font-black text-white italic uppercase">User Directory</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase font-black text-gray-500 tracking-widest">
                <tr><th className="px-10 py-7">Username</th><th className="px-10 py-7">Balance</th><th className="px-10 py-7">Spent</th><th className="px-10 py-7">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {globalUsers.map(u => (
                  <tr key={u.id}>
                    <td className="px-10 py-8"><p className="text-white font-black uppercase text-xs">{u.username}</p></td>
                    <td className="px-10 py-8 text-neonCyan font-black">৳{Number(u.balance).toLocaleString()}</td>
                    <td className="px-10 py-8 text-white font-black">৳{Number(u.total_spent).toLocaleString()}</td>
                    <td className="px-10 py-8">
                       <div className="flex gap-2">
                          <button onClick={() => { const amt = prompt("Credit Amount:"); if(amt) updateUserBalance(u.username, Number(amt)); }} className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-[10px] font-black uppercase">Add</button>
                          <button onClick={() => { const amt = prompt("Deduct Amount:"); if(amt) updateUserBalance(u.username, -Number(amt)); }} className="px-3 py-1 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-black uppercase">Sub</button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      case 'admin-payments': return (
        <div className="glass-panel overflow-hidden border-white/5 animate-in fade-in duration-700">
          <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className="text-2xl font-black text-white italic uppercase">Finance Logs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase font-black text-gray-500 tracking-widest">
                <tr><th className="px-10 py-7">Agent</th><th className="px-10 py-7">Method</th><th className="px-10 py-7">Amount</th><th className="px-10 py-7">Status</th><th className="px-10 py-7">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {globalPayments.map(p => (
                  <tr key={p.id}>
                    <td className="px-10 py-8 text-white font-bold uppercase text-xs">{p.username}</td>
                    <td className="px-10 py-8 text-gray-400 text-xs">{p.method}</td>
                    <td className="px-10 py-8 text-neonCyan font-black">৳{p.amount.toLocaleString()}</td>
                    <td className="px-10 py-8"><span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${p.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{p.status}</span></td>
                    <td className="px-10 py-8">
                       {p.status === 'Pending' && (
                         <button onClick={() => approvePayment(p)} className="px-6 py-2 bg-neonCyan text-charcoal rounded-xl font-black text-[10px] uppercase italic">Approve</button>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      case 'admin-settings': return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">
          <div className="glass-panel p-12 border-white/10">
             <h3 className="text-3xl font-black text-white italic uppercase mb-12">System Config</h3>
             <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <p className="text-[10px] text-gray-500 uppercase font-black">Referral System</p>
                   <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl">
                      <span className="text-white font-bold uppercase text-xs">Enabled</span>
                      <button onClick={() => { const val = !sysRefEnabled; setSysRefEnabled(val); supabase.from('system_config').upsert([{ key: 'ref_enabled', value: val.toString() }]); }} className={`w-14 h-8 rounded-full relative ${sysRefEnabled ? 'bg-neonCyan' : 'bg-gray-800'}`}>
                         <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${sysRefEnabled ? 'left-7' : 'left-1'}`}></div>
                      </button>
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-[10px] text-gray-500 uppercase font-black">Yield (%)</p>
                   <div className="flex gap-4">
                      <input type="number" value={sysRefPercentage} onChange={(e) => setSysRefPercentage(Number(e.target.value))} className="flex-1 bg-charcoal border border-white/10 rounded-2xl p-6 text-white font-black" />
                      <button onClick={() => { supabase.from('system_config').upsert([{ key: 'ref_percentage', value: sysRefPercentage.toString() }]); alert("Updated."); }} className="px-8 bg-neonCyan text-charcoal font-black rounded-2xl uppercase">Save</button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      );

      case 'architecture': return <ArchitectureView />;

      default: return <div className="p-32 text-center opacity-30 uppercase tracking-[0.6em] font-black italic">Synchronizing Node...</div>;
    }
  };

  const isAuthPage = currentView === 'landing' || currentView === 'auth';

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-charcoal text-white selection:bg-neonCyan/30">
      {isGlobalLoading && <LogoLoader />}
      {activeBroadcast && <BroadcastModal broadcast={activeBroadcast} onClose={() => setActiveBroadcast(null)} />}
      {!isAuthPage && (
        <Sidebar 
          currentView={currentView} 
          setView={setView} 
          isAdmin={user?.role === 'admin'} 
          username={user?.username || 'Guest'} 
          balance={user?.balance || 0} 
          avatarUrl={user?.avatar_url} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
      <main className={`flex-1 flex flex-col h-full overflow-hidden ${isAuthPage ? 'w-full' : ''}`}>
        {!isAuthPage && (
          <header className="h-20 lg:h-24 flex items-center justify-between px-6 lg:px-12 border-b border-white/5 bg-charcoal/50 backdrop-blur-3xl z-40">
            <div className="flex items-center">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden w-10 h-10 mr-4 flex items-center justify-center bg-white/5 rounded-xl text-white border border-white/10">
                <i className="fa-solid fa-bars-staggered"></i>
              </button>
              <div className="hidden sm:flex items-center text-gray-600 text-[10px] font-black uppercase tracking-widest">
                <span className={user?.role === 'admin' ? 'text-red-500' : 'text-neonCyan'}>{user?.role === 'admin' ? 'ROOT CONTROL' : 'OPERATIVE'}</span>
                <i className="fa-solid fa-chevron-right text-[7px] mx-4 lg:mx-6"></i>
                <span className="text-white">{currentView.replace('-', ' ')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 lg:space-x-6">
               <div className="px-4 lg:px-6 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] lg:text-xs font-black uppercase tracking-widest text-neonCyan">৳ {user?.balance.toLocaleString()}</div>
               <button onClick={async () => { await supabase.auth.signOut(); }} className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 text-gray-500 hover:text-red-500 border border-white/5 transition-all"><i className="fa-solid fa-power-off"></i></button>
            </div>
          </header>
        )}
        <section className={`flex-1 overflow-y-auto ${!isAuthPage ? 'p-6 lg:p-12' : ''} custom-scrollbar relative`}>{renderContent()}</section>
      </main>
      <a href="https://wa.me/8801408461902" className="fixed bottom-6 right-6 lg:bottom-12 lg:right-12 w-16 h-16 lg:w-20 lg:h-20 bg-[#25D366] text-white rounded-[2rem] flex items-center justify-center shadow-2xl whatsapp-btn-pulse z-[60] transition-transform hover:scale-110"><i className="fa-brands fa-whatsapp text-3xl lg:text-4xl"></i></a>
    </div>
  );
};

export default App;
