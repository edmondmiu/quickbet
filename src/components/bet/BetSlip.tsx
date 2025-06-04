// src/components/bet/BetSlip.tsx
import { useState } from 'react';
import clsx from 'clsx';

interface BetSlipProps {
  activeBets: any[];
  onRemoveBet: (betId: string) => void;
  onPlaceBets: (amount: number) => void;
}

export default function BetSlip({ activeBets, onRemoveBet, onPlaceBets }: BetSlipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [showSuccess, setShowSuccess] = useState(false);

  const potentialWin = activeBets.reduce((sum, bet) => sum + (betAmount * bet.odds), 0);

  const handlePlaceBet = () => {
    // Show success animation
    setShowSuccess(true);
    
    // Trigger confetti or celebration
    setTimeout(() => {
      onPlaceBets(betAmount);
      setIsOpen(false);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating Bet Button */}
      {activeBets.length > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <div className="relative p-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
              {activeBets.length}
            </span>
          </div>
        </button>
      )}

      {/* Bet Slip Panel */}
      <div className={clsx(
        "fixed inset-x-0 bottom-0 bg-gray-900 rounded-t-3xl shadow-2xl transition-transform duration-300 z-50",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="p-6 max-w-md mx-auto max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Your Bets</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Active Bets */}
          {activeBets.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No bets added yet</p>
          ) : (
            <div className="space-y-3 mb-6">
              {activeBets.map((bet, index) => (
                <div 
                  key={bet.id} 
                  className="bg-gray-800 rounded-lg p-4 animate-slideIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">{bet.match}</p>
                      <p className="text-white font-medium">{bet.question}</p>
                      <p className="text-green-400 mt-1 font-semibold">{bet.selection}</p>
                    </div>
                    <button 
                      onClick={() => onRemoveBet(bet.id)}
                      className="text-gray-500 hover:text-red-400 ml-2 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Odds</span>
                    <span className="text-white font-bold text-lg">{bet.odds.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeBets.length > 0 && !showSuccess && (
            <>
              {/* Bet Amount */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">Bet Amount per Selection</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBetAmount(Math.max(1, betAmount - 5))}
                    className="bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
                    className="bg-gray-800 text-white text-center font-bold text-xl px-4 py-2 rounded-lg flex-1"
                  />
                  <button
                    onClick={() => setBetAmount(betAmount + 5)}
                    className="bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      className="flex-1 bg-gray-800 text-white py-2 rounded hover:bg-gray-700 text-sm font-medium transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-gray-700 pt-4 mb-4">
                <div className="flex justify-between text-lg mb-2">
                  <span className="text-gray-400">Total Stake ({activeBets.length} bets)</span>
                  <span className="text-white font-bold">${(betAmount * activeBets.length).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl">
                  <span className="text-gray-400">Potential Win</span>
                  <span className="text-green-400 font-bold text-2xl">${potentialWin.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Bet Button */}
              <button 
                onClick={handlePlaceBet}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all text-lg"
              >
                Place {activeBets.length} Bet{activeBets.length > 1 ? 's' : ''}
              </button>
            </>
          )}

          {/* Success Animation */}
          {showSuccess && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-400 rounded-full mb-4 animate-bounce">
                <svg className="w-16 h-16 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Bets Placed!</h3>
              <p className="text-gray-400">Good luck! 🎉</p>
              <div className="mt-4 flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-green-400 rounded-full animate-ping"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}