
import React from 'react';
import { UserProfile, MemberLevel } from '../types';
import { LEVEL_CONFIG } from '../constants';

interface ProfileProps {
  user: UserProfile | null;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, onLogout }) => {
  if (!user) return <div className="text-center p-20 text-slate-500">载入中...</div>;

  const currentLevel = LEVEL_CONFIG[user.level];
  const displayName = user.wechat && user.wechat !== '未设置' ? user.wechat : `猎手_${user.phone.slice(-4)}`;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:flex items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-blue-500/30 flex items-center justify-center text-3xl mb-6 md:mb-0 overflow-hidden shadow-2xl">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phone}`} alt="avatar" />
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-white">{displayName}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              user.level === MemberLevel.L3 ? 'border-amber-500 text-amber-500 bg-amber-500/10' :
              user.level === MemberLevel.L2 ? 'border-blue-500 text-blue-500 bg-blue-500/10' : 'border-slate-500 text-slate-500 bg-slate-500/10'
            }`}>
              {currentLevel.name}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-4">手机号：{user.phone}</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-bold mb-1">到期时间</span>
              <span className="text-white mono">{user.expiryDate ? new Date(user.expiryDate).toLocaleDateString() : '永久有效'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase font-bold mb-1">推广收益</span>
              <span className="text-emerald-500 mono font-bold">¥ {user.commission.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-0 flex gap-3">
          <button onClick={onLogout} className="px-6 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-sm font-bold rounded-xl border border-rose-500/30 transition-all">
            退出登录
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Membership Details */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-lg font-bold text-white mb-6">我的权益</h3>
          <ul className="space-y-4">
            {currentLevel.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center text-sm text-slate-300">
                <span className="mr-3 text-blue-500">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        {/* Invitation System */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">我的邀请码</h3>
            <span className="text-xs text-slate-500">推广积分: 0</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center">
            <p className="text-xs text-slate-500 uppercase font-bold mb-3 tracking-widest">永久专属邀请码</p>
            <div className="text-4xl font-black text-blue-500 mono tracking-tighter mb-4">
              {user.invitationCode}
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(user.invitationCode);
                alert('邀请码已复制');
              }}
              className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-all"
            >
              复制分享
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
