
import React, { useState } from 'react';
import { UserProfile, MemberLevel } from '../types';
import { BRAND_NAME } from '../constants';

interface RegisterProps {
  onRegister: (user: UserProfile) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    inviteCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 11) return alert('请输入有效的 11 位手机号');
    if (formData.password.length < 6) return alert('为了您的账户安全，密码长度不能少于 6 位');
    if (formData.password !== formData.confirmPassword) return alert('两次输入的密码不一致，请检查');
    
    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      phone: formData.phone,
      password: formData.password,
      wechat: '未设置',
      level: MemberLevel.L1,
      expiryDate: null,
      invitationCode: 'SW-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      commission: 0
    };
    
    onRegister(newUser);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
              <span className="text-2xl font-black text-white">SW</span>
            </div>
            <h1 className="text-2xl font-bold text-white">猎手入驻</h1>
            <p className="text-slate-400 text-sm mt-2">加入 {BRAND_NAME}，开启量化之旅</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">手机号码</label>
              <input 
                type="tel" 
                required
                maxLength={11}
                placeholder="请输入11位手机号"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">登录密码</label>
              <input 
                type="password" 
                required
                minLength={6}
                placeholder="设置 6 位以上登录密码"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">确认密码</label>
              <input 
                type="password" 
                required
                minLength={6}
                placeholder="请再次输入密码"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">邀请码 (选填)</label>
              <input 
                type="text" 
                placeholder="如果有的话..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all uppercase"
                value={formData.inviteCode}
                onChange={e => setFormData({...formData, inviteCode: e.target.value.toUpperCase()})}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
            >
              立即注册并登录
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            注册即代表您同意我们的 <span className="text-blue-500 cursor-pointer">服务协议</span> 与 <span className="text-blue-500 cursor-pointer">风险声明</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
