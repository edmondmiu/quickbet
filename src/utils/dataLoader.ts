// src/utils/dataLoader.ts
import { Match, Question, User } from '../types';

export async function loadMatches(): Promise<Match[]> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/matches.json`);
    const data = await response.json();
    return data.matches;
  } catch (error) {
    console.error('Error loading matches:', error);
    return [];
  }
}

export async function loadQuestions(matchId: string): Promise<Question[]> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/questions.json`);
    const data = await response.json();
    
    // Map specific questions to specific matches
    const questionMapping: Record<string, string[]> = {
      'match_001': ['q_001'],
      'match_002': ['q_002'],
      'match_003': ['q_003'],
      'match_004': ['q_004'],
      'match_005': ['q_005'],
      'match_006': ['q_006'],
      'match_007': ['q_007'],
      'match_008': ['q_008']
    };
    
    const questionIds = questionMapping[matchId] || [];
    const matchQuestions = data.questions.filter((q: Question) => 
      questionIds.includes(q.id)
    );
    
    // Make sure each question has the correct matchId
    return matchQuestions.map((q: Question) => ({
      ...q,
      matchId: matchId
    }));
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}

export async function loadUser(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/users.json`);
    const data = await response.json();
    return data.users.find((u: User) => u.id === userId) || null;
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
}