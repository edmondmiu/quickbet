// src/modules/core/interfaces/index.ts

import { Match, Question, Bet, BetOption, User, SportType } from '../../../types';

// Data Provider Interface
export interface IDataProvider {
  getMatches(filters?: MatchFilters): Promise<Match[]>;
  getMatch(matchId: string): Promise<Match>;
  subscribeToMatch(matchId: string, callback: (match: Match) => void): () => void;
}

export interface MatchFilters {
  sport?: SportType;
  league?: string;
  status?: string;
  limit?: number;
}

// Question Engine Interface
export interface IQuestionEngine {
  generateQuestions(match: Match): Question[];
  getActiveQuestions(matchId: string): Question[];
  validateQuestion(questionId: string): boolean;
}

export interface IQuestionGenerator {
  sport: SportType;
  generate(match: Match): Question[];
}

// Odds Engine Interface
export interface IOddsEngine {
  calculateOdds(question: Question, option: BetOption): number;
  updateOdds(questionId: string, marketData?: any): void;
  getImpliedProbability(odds: number): number;
}

// Bet Manager Interface
export interface IBetManager {
  placeBet(bet: Omit<Bet, 'id' | 'placedAt' | 'status'>): Promise<Bet>;
  getBets(userId: string, filters?: BetFilters): Promise<Bet[]>;
  getBet(betId: string): Promise<Bet>;
  settleBet(betId: string, won: boolean): Promise<Bet>;
}

export interface BetFilters {
  status?: string;
  matchId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// User Manager Interface
export interface IUserManager {
  getUser(userId: string): Promise<User>;
  updateBalance(userId: string, amount: number): Promise<User>;
  getUserStats(userId: string): Promise<UserStats>;
}

export interface UserStats {
  totalBets: number;
  totalWon: number;
  totalLost: number;
  winRate: number;
  profitLoss: number;
  favoriteTeam?: string;
  favoriteSport?: SportType;
}

// Content Manager Interface
export interface IContentManager {
  getContent(key: string, locale?: string): string;
  getQuestionTemplate(type: string, sport: SportType): string;
  formatCurrency(amount: number, currency: string): string;
}