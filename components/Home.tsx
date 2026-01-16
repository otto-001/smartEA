
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, SLOGAN, LEVEL_CONFIG } from '../constants';
import { MemberLevel } from '../types';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-blue-400 text-sm font-bold mb-8 animate-fade-in-down">
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
            <span>智赢实验室 · 2.0 时代开启</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight animate-fade-in">
            释放 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">AI 量化</span><br />
            的复利潜能
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            {SLOGAN} 依托深度学习算法与全时自动风控，为全球交易员提供极具竞争力的策略支持体系。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link to="/dashboard" className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-blue-500/30 text-lg">
              进入控制台
            </Link>
            <Link to="/hall?tab=L1" className="w-full sm:w-auto px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700 text-lg">
              免费试用 L1 策略
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">智赢核心价值体系</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🤖" 
              title="AI 驱动决策" 
              desc="基于 Transformer 架构的实时行情分析模型，毫秒级感知市场情绪波动与趋势转折。"
            />
            <FeatureCard 
              icon="🛡️" 
              title="极致风险管控" 
              desc="内置多层级强制止损与账户体检机制，优先保护本金安全，让盈利可持续。"
            />
            <FeatureCard 
              icon="🤝" 
              title="社区共创生态" 
              desc="L3 会员拥有功能定制提案权，通过去中心化投票决定策略迭代方向。"
            />
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">选择您的猎手等级</h2>
            <p className="text-slate-400">从初级体验到终身合伙人，全方位赋能您的交易之路</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TierCard level={MemberLevel.L1} />
            <TierCard level={MemberLevel.L2} featured />
            <TierCard level={MemberLevel.L3} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem value="15,000+" label="全球活跃猎手" />
            <StatItem value="$2.4M+" label="累计为用户回测收益" />
            <StatItem value="99.9%" label="系统在线稳定性" />
            <StatItem value="12" label="AI 策略模型矩阵" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">准备好开启智能交易时代了吗？</h2>
          <p className="text-blue-100 mb-10 text-lg relative z-10">立即加入智赢实验室，与数万名交易猎手共同进化。</p>
          <Link to="/register" className="inline-block px-12 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all text-xl shadow-lg relative z-10">
            免费注册并下载 EA
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-3xl hover:border-blue-500/50 transition-all hover:translate-y-[-4px]">
    <span className="text-4xl mb-6 block">{icon}</span>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

const TierCard: React.FC<{ level: MemberLevel; featured?: boolean }> = ({ level, featured }) => {
  const config = LEVEL_CONFIG[level];
  return (
    <div className={`relative p-8 rounded-3xl border transition-all ${
      featured 
      ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/10 scale-105 z-10' 
      : 'bg-slate-800/40 border-slate-800'
    }`}>
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          最受欢迎
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">{config.name}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-black text-white">{config.price}</span>
          <span className="text-slate-500 text-sm">{config.duration}</span>
        </div>
      </div>
      <ul className="space-y-4 mb-10 text-left">
        {config.benefits.map((benefit, i) => (
          <li key={i} className="flex items-center text-sm text-slate-300">
            <span className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mr-3 text-xs">✓</span>
            {benefit}
          </li>
        ))}
      </ul>
      <Link 
        to={`/register`} 
        className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
          featured ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
        }`}
      >
        立即加入
      </Link>
    </div>
  );
};

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="text-3xl md:text-4xl font-black text-white mb-1 mono">{value}</span>
    <span className="text-xs text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

export default Home;
