// src/types/index.ts

export type SportType = 'football' | 'basketball' | 'tennis';
export type MatchStatus = 'upcoming' | 'live' | 'finished';
export type BetStatus = 'pending' | 'won' | 'lost' | 'void';
export type QuestionType = 'goals' | 'points' | 'corners' | 'cards' | 'player' | 'time';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  score: number;
}

export interface Match {
  id: string;
  sport: SportType;
  league: string;
  homeTeam: Team;
  awayTeam: Team;
  status: MatchStatus;
  minute: number;
  period: string;
  startTime: string;
  venue: string;
}

export interface Question {
  id: string;
  matchId: string;
  type: QuestionType;
  text: string;
  options: BetOption[];
  expiresAt: string;
  category: string;
}

export interface BetOption {
  id: string;
  text: string;
  odds: number;
  probability?: number;
}

export interface Bet {
  id: string;
  userId: string;
  questionId: string;
  matchId: string;
  optionId: string;
  amount: number;
  potentialWin: number;
  status: BetStatus;
  placedAt: string;
  settledAt?: string;
}

export interface User {
  id: string;
  username: string;
  balance: number;
  currency: string;
  level: number;
  totalBets: number;
  winRate: number;
}