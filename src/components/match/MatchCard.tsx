// src/components/match/MatchCard.tsx
import { useState, CSSProperties } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Match, Question } from '../../types';
import clsx from 'clsx';

interface MatchCardProps {
  match: Match;
  questions: Question[];
  onSwipe: (direction: 'left' | 'right') => void;
  onAddBet: (question: Question, option: any) => void;
  onRemoveBet: (questionId: string) => void;
  isActive: boolean;
  activeBets: any[];
  style?: CSSProperties;
}

export default function MatchCard({ 
  match, 
  questions, 
  onSwipe, 
  onAddBet,
  onRemoveBet,
  isActive, 
  activeBets,
  style 
}: MatchCardProps) {
  const [deltaX, setDeltaX] = useState(0);
  const [showAddAnimation, setShowAddAnimation] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (!isActive) return;
      setDeltaX(eventData.deltaX);
    },
    onSwipedLeft: () => {
      if (!isActive) return;
      onSwipe('left');
      setDeltaX(0);
    },
    onSwipedRight: () => {
      if (!isActive) return;
      onSwipe('right');
      setDeltaX(0);
    },
    onSwiped: () => {
      setDeltaX(0);
    },
    trackMouse: true,
    trackTouch: true,
  });

  const getStatusBadge = () => {
    if (match.status === 'live') {
      return (
        <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-sm font-medium">LIVE {match.minute}'</span>
        </div>
      );
    } else if (match.status === 'upcoming') {
      const kickoffTime = new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return (
        <div className="bg-gray-600 text-white px-3 py-1 rounded-full">
          <span className="text-sm font-medium">{kickoffTime}</span>
        </div>
      );
    }
    return null;
  };

  const question = questions[0]; // Only show first question
  if (!question) return null;

  const getActiveBet = () => {
    return activeBets.find(bet => bet.questionId === question.id);
  };

  const activeBet = getActiveBet();

  const handleOptionClick = (option: any) => {
    const existingBet = getActiveBet();
    
    if (existingBet && existingBet.optionId === option.id) {
      // Remove bet if clicking same option
      onRemoveBet(question.id);
    } else {
      // Add or update bet
      onAddBet(question, option);
      // Show animation
      setShowAddAnimation(true);
      setTimeout(() => setShowAddAnimation(false), 600);
    }
  };

  return (
    <div
      {...handlers}
      className={clsx(
        "relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-5 cursor-grab active:cursor-grabbing card-shadow",
        isActive && "ring-2 ring-purple-500"
      )}
      style={{
        ...style,
        transform: `${style?.transform || ''} translateX(${deltaX}px)`,
      }}
    >
      {/* Match Info Section */}
      <div className="space-y-3 mb-4">
        {/* League and Status */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 text-sm">{match.league}</p>
            <p className="text-gray-500 text-xs">{match.venue}</p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="text-xl font-bold text-white">
              {match.homeTeam.shortName}
            </div>
            <div className="text-gray-400 text-xs">Home</div>
          </div>
          
          <div className="px-3">
            <div className="text-2xl font-bold text-white">
              {match.status === 'upcoming' ? '-' : match.homeTeam.score} : {match.status === 'upcoming' ? '-' : match.awayTeam.score}
            </div>
            {match.status === 'live' && (
              <div className="text-center text-green-400 text-xs mt-1">{match.minute}'</div>
            )}
          </div>
          
          <div className="flex-1 text-center">
            <div className="text-xl font-bold text-white">
              {match.awayTeam.shortName}
            </div>
            <div className="text-gray-400 text-xs">Away</div>
          </div>
        </div>
      </div>

      {/* Single Question Section */}
      <div className="border-t border-gray-700 pt-3">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white mb-2">{question.text}</h3>
          <p className="text-gray-400 text-xs">Make your prediction</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option) => {
            const isSelected = activeBet?.optionId === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className={clsx(
                  "relative p-3 rounded-xl border-2 transition-all duration-200 overflow-hidden",
                  isSelected
                    ? "border-green-400 bg-green-400/20 scale-[1.02]"
                    : "border-gray-600 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-800"
                )}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-1 right-1">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
                
                <div className="text-white font-bold text-xl mb-1">{option.text}</div>
                <div className="text-green-400 font-bold text-lg">{option.odds.toFixed(2)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add to betslip animation */}
      {showAddAnimation && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="bg-green-400 text-gray-900 px-6 py-3 rounded-full font-bold animate-ping">
            ✓ Added!
          </div>
        </div>
      )}

      {/* Swipe hint */}
      {isActive && (
        <div className="text-center text-gray-400 text-xs mt-2">
          ← Swipe left for next • Swipe right for previous →
        </div>
      )}
    </div>
  );
}