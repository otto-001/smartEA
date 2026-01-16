import React, { useState, useEffect } from 'react';
// Ensured clean import of useSearchParams from react-router-dom
import { useSearchParams } from 'react-router-dom';
import { UserProfile, BusinessType, MemberLevel } from '../types';
import { LEVEL_CONFIG } from '../constants';

interface BusinessHallProps {
  user: UserProfile | null;
  onUpdateUser: (user: UserProfile) => void;
}

const BusinessHall: React.FC<BusinessHallProps> = ({ user, onUpdateUser }) => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as BusinessType) || BusinessType.L1_FREE;
  
  const [activeTab, setActiveTab] = useState<BusinessType>(initialTab);
  const [formData, setFormData] = useState({
    mt4Account: '',
    platform: 'MT4',
    product: '猎人会员L2-季卡',
    alias: '',
    pkCode: '',
    proposalTitle: '',
    proposalDesc: '',
  });
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logic simulation of formulas from the instruction set
    if (activeTab === BusinessType.L1_FREE) {
      if (!formData.mt4Account) return alert('请填写MT4/5账号');
      
      const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
      const code = `SW-0-${user?.phone.slice(-4) || '8888'}-${formData.mt4Account}-${dateStr}`;
      setResult(`您的专属授权码: ${code}`);
    } else if (activeTab === BusinessType.PURCHASE) {
      alert('已提交支付审核。模拟支付中...');
      setTimeout(() => {
        const newLevel = formData.product.includes('L3') ? MemberLevel.L3 : MemberLevel.L2;
        const newExpiry = new Date();
        newExpiry.setFullYear(newExpiry.getFullYear() + (formData.product.includes('年卡') ? 1 : formData.product.includes('季卡') ? 0.25 : 99));
        
        if (user) {
          onUpdateUser({
            ...user,
            level: newLevel,
            expiryDate: newExpiry.toISOString()
          });
        }
        setResult('支付核验成功！会员权限已更新。');
      }, 1500);
    } else {
      setResult('提交成功，管理员将在24小时内处理。');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">综合业务大厅</h1>
        <p className="text-slate-400">办理您的会员权益与策略授权</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-1 space-y-2">
          {Object.values(BusinessType).map((type) => (
            <button
              key={type}
              onClick={() => { setActiveTab(type); setResult(null); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === type 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {type === BusinessType.L1_FREE && '🟢 领取L1版'}
              {type === BusinessType.PURCHASE && '🔴 购买/续费'}
              {type === BusinessType.ACTIVATION && '🔵 申请激活'}
              {type === BusinessType.SUBMIT_PK && '🏆 提交PK码'}
              {type === BusinessType.PROPOSAL && '💡 提交提案'}
              {type === BusinessType.VOTING && '🗳️ 功能投票'}
            </button>
          ))}
        </div>

        {/* Right Form Area */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4 mb-6">
              {activeTab} - 业务办理
            </h2>

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">手机号</label>
                <input 
                  type="text" 
                  value={user?.phone || ''} 
                  disabled 
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-400 cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">邀请码 (可选)</label>
                <input 
                  type="text" 
                  placeholder="填写邀请码可获积分"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                />
              </div>
            </div>

            {/* Dynamic Branch Fields */}
            {activeTab === BusinessType.L1_FREE && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">绑定 MT4/5 账号</label>
                  <input 
                    type="number" 
                    required
                    placeholder="请输入您的交易账号数字"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.mt4Account}
                    onChange={e => setFormData({...formData, mt4Account: e.target.value})}
                  />
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="text-xs text-emerald-400 font-medium leading-relaxed">
                    温馨提示：L1 PK版支持账户体检及PK码生成。完成绑定后即可在下方获得专属授权码。
                  </p>
                </div>
              </div>
            )}

            {activeTab === BusinessType.PURCHASE && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">请选择产品版本</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.product}
                    onChange={e => setFormData({...formData, product: e.target.value})}
                  >
                    <option>猎人会员L2-季卡 (¥29.9)</option>
                    <option>猎人会员L2-年卡 (¥88.0)</option>
                    <option>猎人会员L3-终身全能版 (¥598.0)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">支付凭证 (截图)</label>
                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors cursor-pointer">
                    <span className="text-slate-500 text-sm">点击上传或拖拽支付凭证图片</span>
                    <input type="file" className="hidden" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === BusinessType.ACTIVATION && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">交易平台</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none">
                      <option>MT4</option>
                      <option>MT5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">待激活账号</label>
                    <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none" placeholder="1234567" />
                  </div>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400">
                    注意：激活申请仅限 L2/L3 会员提交。提交后管理员将生成正式激活码并同步至您的档案。
                  </p>
                </div>
              </div>
            )}

            {activeTab === BusinessType.SUBMIT_PK && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">您的花名/代号</label>
                  <input 
                    type="text" 
                    placeholder="展示在天梯赛的称呼"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none"
                    value={formData.alias}
                    onChange={e => setFormData({...formData, alias: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">粘贴 PK 码</label>
                  <textarea 
                    rows={4}
                    placeholder="从 EA 中生成的 PK 字符串..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none"
                    value={formData.pkCode}
                    onChange={e => setFormData({...formData, pkCode: e.target.value})}
                  ></textarea>
                </div>
              </div>
            )}

            {activeTab === BusinessType.PROPOSAL && (
              <div className="space-y-4 animate-fadeIn">
                {user?.level === MemberLevel.L3 ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">提案标题</label>
                      <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none" placeholder="例如：增加RSI背离过滤" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">详细描述</label>
                      <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none" placeholder="描述您的功能设想..."></textarea>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
                    <p className="text-slate-400">此功能仅限 <span className="text-amber-500 font-bold">L3 传奇猎手</span> 开启</p>
                    <button onClick={() => setActiveTab(BusinessType.PURCHASE)} className="mt-4 text-sm text-blue-400 hover:underline">立即升级权限</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === BusinessType.VOTING && (
              <div className="space-y-4 animate-fadeIn">
                {user?.level === MemberLevel.L1 ? (
                  <div className="p-8 text-center bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
                    <p className="text-slate-400">此功能仅限 <span className="text-blue-500 font-bold">L2/L3 会员</span> 开启</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">进行中的提案</label>
                    <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">增加移动止损功能</p>
                        <p className="text-xs text-slate-500">已获得 42 票</p>
                      </div>
                      <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg">投他一票</button>
                    </div>
                    <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">优化凌晨时段波动过滤</p>
                        <p className="text-xs text-slate-500">已获得 28 票</p>
                      </div>
                      <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg">投他一票</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Results Display */}
            {result && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl animate-bounce-short">
                <p className="text-blue-400 font-bold flex items-center">
                  <span className="mr-2">🎉</span> {result}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
            >
              提交办理申请
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessHall;