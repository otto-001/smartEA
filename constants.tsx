
import React from 'react';
import { MemberLevel } from './types';

export const BRAND_NAME = "智赢 · SmartWin Lab";
export const SLOGAN = "AI-Driven Trading Algorithms since 2025. 让智能策略为你持续盈利。";

export const EA_DOWNLOAD_LINKS = {
  [MemberLevel.L1]: "https://example.com/downloads/SW_XAU_L1_PK.ex4",
  [MemberLevel.L2]: "https://example.com/downloads/SW_XAU_L2_PRO.ex4",
  [MemberLevel.L3]: "https://example.com/downloads/SW_XAU_L3_LEGEND.ex4"
};

export const LEVEL_CONFIG = {
  [MemberLevel.L1]: {
    name: 'PK猎手',
    price: '¥0',
    duration: '终身免费',
    benefits: [
      'XAU·免费PK版 EA (L1)',
      '天梯赛参与权',
      '获取专属邀请码',
      '官方资讯',
      '公开社群'
    ],
    color: 'from-emerald-500 to-teal-600'
  },
  [MemberLevel.L2]: {
    name: '精英猎手',
    price: '¥29.9 / 季',
    duration: '季卡 / 年卡 (¥88)',
    benefits: [
      '全部 L1 权益',
      'XAU·考核版 EA (L2)',
      '强制风控模式',
      '专属社群 & 客服',
      '邀请码返佣奖励'
    ],
    color: 'from-blue-500 to-indigo-600'
  },
  [MemberLevel.L3]: {
    name: '传奇猎手',
    price: '¥598',
    duration: '终身会员',
    benefits: [
      '全部 L2 权益',
      'XAU·全能版 EA (L3)',
      '会员投票定制功能',
      '高阶推荐官分成',
      '专属技术顾问'
    ],
    color: 'from-amber-400 to-orange-600'
  }
};
