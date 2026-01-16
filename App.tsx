
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { MemberLevel, UserProfile } from './types';
import { BRAND_NAME, SLOGAN } from './constants';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import BusinessHall from './components/BusinessHall';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Register from './components/Register';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sw_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('sw_user');
      }
    }
    setLoading(false);
  }, []);

  const handleRegister = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem('sw_user', JSON.stringify(newUser));
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('sw_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    localStorage.removeItem('sw_user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
                  SW
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  {BRAND_NAME}
                </span>
              </Link>
              
              <nav className="hidden md:flex space-x-8">
                <NavLink to="/">官网首页</NavLink>
                <NavLink to="/dashboard">会员控制台</NavLink>
                <NavLink to="/hall">业务大厅</NavLink>
                <NavLink to="/leaderboard">封神榜</NavLink>
              </nav>

              <div className="flex items-center space-x-4">
                {user ? (
                  <Link to="/profile" className="flex items-center space-x-3 group">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-xs text-slate-400">{user.level} 会员</span>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                        {user.wechat && user.wechat !== '未设置' ? user.wechat : user.phone}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden hover:border-blue-500/50 transition-all">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phone}`} alt="avatar" />
                    </div>
                  </Link>
                ) : (
                  <Link to="/register" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
                    立即注册
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register onRegister={handleRegister} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/register" replace />} />
            <Route path="/hall" element={user ? <BusinessHall user={user} onUpdateUser={handleUpdateUser} /> : <Navigate to="/register" replace />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={user ? <Profile user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} /> : <Navigate to="/register" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 border-t border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{BRAND_NAME}</h2>
            <p className="text-slate-400 mb-6">{SLOGAN}</p>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white p-2 rounded-lg mb-2">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SmartWinLab_Support" alt="WeChat QR" className="w-full h-full" />
                </div>
                <span className="text-sm text-slate-400">客服微信</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 SmartWin Lab. All rights reserved. 投资有风险，交易需谨慎。
            </p>
          </div>
        </footer>

        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around py-3 z-50">
          <MobileLink to="/" icon="🌐" label="首页" />
          <MobileLink to="/dashboard" icon="🏠" label="控制台" />
          <MobileLink to="/hall" icon="💼" label="业务" />
          <MobileLink to="/leaderboard" icon="🏆" label="排行" />
          <MobileLink to="/profile" icon="👤" label="我" />
        </div>
      </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-blue-400 ${
        isActive ? 'text-blue-500' : 'text-slate-400'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileLink: React.FC<{ to: string; icon: string; label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex flex-col items-center space-y-1 ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
      <span className="text-xl">{icon}</span>
      <span className="text-[10px]">{label}</span>
    </Link>
  );
};

export default App;
