// src/App.tsx
import { useState, useEffect } from 'react';
import { Match, Question } from './types';
import MatchCard from './components/match/MatchCard';
import BetSlip from './components/bet/BetSlip';
import { loadMatches, loadQuestions } from './utils/dataLoader';
import clsx from 'clsx';

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [activeBets, setActiveBets] = useState<any[]>([]);

  useEffect(() => {
    // Load mock data
    loadMatches().then(async (matchData) => {
      setMatches(matchData);
      
      // Load questions for all matches
      const questionsMap: Record<string, Question[]> = {};
      for (const match of matchData) {
        const matchQuestions = await loadQuestions(match.id);
        questionsMap[match.id] = matchQuestions;
      }
      setQuestions(questionsMap);
    });
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    // Swipe left = next card, swipe right = previous card (natural mobile pattern)
    if (direction === 'left' && currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else if (direction === 'right' && currentMatchIndex > 0) {
      setCurrentMatchIndex(currentMatchIndex - 1);
    }
  };

  const handleAddBet = (match: Match, question: Question, selectedOption: any) => {
    // Remove existing bet for this question if any
    const filteredBets = activeBets.filter(bet => bet.questionId !== question.id);
    
    const newBet = {
      id: `bet_${Date.now()}`,
      matchId: match.id,
      match: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
      question: question.text,
      selection: selectedOption.text,
      odds: selectedOption.odds,
      optionId: selectedOption.id,
      questionId: question.id
    };
    
    setActiveBets([...filteredBets, newBet]);
  };

  const handleRemoveBet = (questionId: string) => {
    setActiveBets(activeBets.filter(bet => bet.questionId !== questionId));
  };

  const handleRemoveBetById = (betId: string) => {
    setActiveBets(activeBets.filter(bet => bet.id !== betId));
  };

  const handlePlaceBets = (amount: number) => {
    // In a real app, this would submit to backend
    console.log('Placing bets:', activeBets, 'Amount:', amount);
    setActiveBets([]); // Clear after placing
    
    // Show success animation/notification here
  };

  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black">
        <div className="text-white text-xl">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black">
      {/* Progress indicator at top like Stories */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent p-3">
        <div className="flex gap-1.5 max-w-md mx-auto">
          {matches.map((_, index) => (
            <div key={index} className="relative h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className={clsx(
                  "absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300",
                  index < currentMatchIndex && "w-full",
                  index === currentMatchIndex && "w-full animate-pulse",
                  index > currentMatchIndex && "w-0"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <header className="p-4 text-center pt-10">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-pink-500">
          QuickBet
        </h1>
        <p className="text-gray-300 text-sm mt-1">Tap to predict • Swipe to explore</p>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        <div className="relative h-[520px]">
          {/* Match cards */}
          <div className="relative h-full">
            {matches.slice(Math.max(0, currentMatchIndex - 1), currentMatchIndex + 3).map((match, relativeIndex) => {
              const actualIndex = Math.max(0, currentMatchIndex - 1) + relativeIndex;
              const isActive = actualIndex === currentMatchIndex;
              const matchQuestions = questions[match.id] || [];
              const offset = actualIndex - currentMatchIndex;
              
              return (
                <MatchCard
                  key={match.id}
                  match={match}
                  questions={matchQuestions}
                  onSwipe={handleSwipe}
                  onAddBet={(question, option) => handleAddBet(match, question, option)}
                  onRemoveBet={handleRemoveBet}
                  isActive={isActive}
                  activeBets={activeBets}
                  style={{
                    position: 'absolute',
                    top: Math.abs(offset) * 20,
                    left: Math.abs(offset) * 8,
                    right: Math.abs(offset) * 8,
                    opacity: isActive ? 1 : 0.6,
                    transform: `scale(${isActive ? 1 : 0.92 - Math.abs(offset) * 0.03})`,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: 'all 0.3s ease',
                    zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Navigation hints */}
        <div className="flex justify-between items-center mt-4 px-4">
          <button
            onClick={() => handleSwipe('right')}
            disabled={currentMatchIndex === 0}
            className={clsx(
              "flex items-center gap-1 px-3 py-2 rounded-lg transition-all",
              currentMatchIndex > 0
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-600 cursor-not-allowed"
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <span className="text-white font-medium bg-gray-800 px-3 py-1 rounded-full">
            {currentMatchIndex + 1} / {matches.length}
          </span>
          
          <button
            onClick={() => handleSwipe('left')}
            disabled={currentMatchIndex === matches.length - 1}
            className={clsx(
              "flex items-center gap-1 px-3 py-2 rounded-lg transition-all",
              currentMatchIndex < matches.length - 1
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-600 cursor-not-allowed"
            )}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      <BetSlip 
        activeBets={activeBets}
        onRemoveBet={handleRemoveBetById}
        onPlaceBets={handlePlaceBets}
      />
    </div>
  );
}

export default App;