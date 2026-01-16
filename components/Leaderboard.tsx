
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Leaderboard: React.FC = () => {
  const data = [
    { name: '金色闪光', profit: 12450, score: 985 },
    { name: '量化行者', profit: 8940, score: 842 },
    { name: 'Hunter_X', profit: 5420, score: 710 },
    { name: '趋势之王', profit: 3210, score: 650 },
    { name: '复利奇迹', profit: 2100, score: 580 },
    { name: '暗影猎手', profit: 1800, score: 520 },
    { name: '星空交易', profit: 1500, score: 480 },
  ];

  const colors = ['#f59e0b', '#94a3b8', '#b45309', '#3b82f6', '#10b981', '#6366f1', '#8b5cf6'];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">🏆 XAU·名人堂天梯赛</h1>
        <p className="text-slate-400">见证量化之巅的荣耀时刻</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Statistics Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">收益排行榜分布 ($)</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">实时天梯明细</h3>
          <div className="space-y-4">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-center space-x-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    idx === 0 ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-white font-bold">{item.name}</p>
                    <p className="text-xs text-slate-500">考核积分: {item.score}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-500 font-bold mono">+${item.profit.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Weekly Gain</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rewards Info */}
      <section className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-3xl p-8 text-center">
        <h4 className="text-xl font-bold text-white mb-4">争夺周冠，赢取实盘基金账户</h4>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          天梯赛排名前三的猎手将获得由“智赢实验室”提供的实盘测试资金，所有盈利按 80% 比例提成。
        </p>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg">
          立即参赛
        </button>
      </section>
    </div>
  );
};

export default Leaderboard;
