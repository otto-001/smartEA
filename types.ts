
export enum MemberLevel {
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3'
}

export interface UserProfile {
  id: string;
  phone: string;
  password?: string;
  wechat?: string; // Changed to optional
  level: MemberLevel;
  expiryDate: string | null;
  invitationCode: string;
  referrerPhone?: string;
  commission: number;
}

export interface PKRecord {
  id: string;
  alias: string;
  profit: number;
  score: number;
  timestamp: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  votes: number;
  author: string;
  status: 'voting' | 'completed';
}

export enum BusinessType {
  L1_FREE = 'L1',
  PURCHASE = '购买',
  ACTIVATION = '激活',
  SUBMIT_PK = '提交PK码',
  PROPOSAL = '提交提案',
  VOTING = '投票'
}
