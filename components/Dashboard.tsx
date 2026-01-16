import React from 'react';
// Ensured clean import of Link from react-router-dom
import { Link } from 'react-router-dom';
import { UserProfile, MemberLevel } from '../types';
import { BRAND_NAME, SLOGAN, EA_DOWNLOAD_LINKS } from '../constants';

interface DashboardProps {
  user: UserProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navButtons = [
    { label: '免费领取 L1 PK版', sub: '新人福利', icon: '🟢', to: '/hall?tab=L1', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' },
    { label: '申请 EA 激活码', sub: '正式授权', icon: '🔵', to: '/hall?tab=激活', color: 'bg-blue-500/10 border-blue-500/20 text-blue-500' },
    { label: '购买/续费 VIP', sub: '权限升级', icon: '🔴', to: '/hall?tab=购买', color: 'bg-rose-500/10 border-rose-500/20 text-rose-500' },
    { label: '提交 PK 码', sub: '冲击周榜', icon: '🏆', to: '/hall?tab=提交PK码', color: 'bg-amber-500/10 border-amber-500/20 text-amber-500' },
    { label: '我的邀请码', sub: '查看奖励', icon: '✉️', to: '/profile', color: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500' },
    { label: '功能定制提案', sub: '共创生态', icon: '💡', to: '/hall?tab=提交提案', color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' },
  ];

  const handleDownload = () => {
    const link = user ? EA_DOWNLOAD_LINKS[user.level] : EA_DOWNLOAD_LINKS[MemberLevel.L1];
    alert(`正在为您准备 ${user?.level} 版 EA 文件...\n由于这是演示环境，我们将触发一个模拟下载链接：\n${link}`);
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Version 2.0 Now Live</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {BRAND_NAME} <span className="text-blue-500">会员控制台</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            欢迎回来，猎手 {user?.phone}！当前权限：<span className="text-white font-semibold underline decoration-blue-500">{user?.level || 'L1'}</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={handleDownload} className="px-8 py-3 bg-white text-slate-900 hover:bg-slate-200 font-black rounded-xl transition-all shadow-lg flex items-center">
              <span className="mr-2">📥</span> 立即下载您的专属 EA
            </button>
            <Link to="/hall?tab=购买" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all border border-blue-500/30">
              升级更高权限
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
      </section>

      {/* Navigation Grid */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
          核心功能导航
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {navButtons.map((btn, idx) => (
            <Link key={idx} to={btn.to} className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] flex flex-col items-start ${btn.color}`}>
              <span className="text-3xl mb-3">{btn.icon}</span>
              <span className="text-sm font-bold text-slate-100 mb-1">{btn.label}</span>
              <span className="text-xs opacity-70">{btn.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hall of Fame / Leaderboard */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-white flex items-center">
            <span className="text-2xl mr-3">🏆</span>
            XAU·名人堂天梯赛
          </h2>
          <Link to="/leaderboard" className="text-blue-500 hover:text-blue-400 text-sm font-semibold">
            查看全部 →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs border-b border-slate-800 uppercase tracking-wider">
                <th className="pb-4 font-semibold">排名</th>
                <th className="pb-4 font-semibold">花名/代号</th>
                <th className="pb-4 font-semibold">等级</th>
                <th className="pb-4 font-semibold text-right">盈利金额 ($)</th>
                <th className="pb-4 font-semibold text-right">考核积分</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { alias: '金色闪光', profit: 12450.2, score: 985, level: 'L3' },
                { alias: '量化行者', profit: 8940.5, score: 842, level: 'L2' },
                { alias: 'Hunter_X', profit: 5420.0, score: 710, level: 'L1' }
              ].map((item, idx) => (
                <tr key={idx} className="group hover:bg-slate-800/50 transition-colors">
                  <td className="py-4">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      idx === 0 ? 'bg-amber-500 text-white' : 
                      idx === 1 ? 'bg-slate-400 text-white' : 'bg-amber-700 text-white'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-4 font-medium text-slate-200">{item.alias}</td>
                  <td className="py-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">{item.level}</span>
                  </td>
                  <td className="py-4 text-right mono text-emerald-500 font-bold">+{item.profit.toLocaleString()}</td>
                  <td className="py-4 text-right mono text-white">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;