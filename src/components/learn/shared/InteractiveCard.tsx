'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveCardProps {
  title: string;
  frontContent: string;
  backContent?: string;
  type?: 'flip' | 'expand' | 'hover';
  color?: string;
  icon?: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  index?: number;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  frontContent,
  backContent,
  type = 'flip',
  color = 'blue',
  icon,
  quiz,
  index = 0
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const getColorClasses = (colorName: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-white',
      teal: 'from-teal-500 to-teal-600 text-white',
      cyan: 'from-cyan-500 to-cyan-600 text-white',
      red: 'from-red-500 to-red-600 text-white',
      green: 'from-green-500 to-green-600 text-white',
      purple: 'from-purple-500 to-purple-600 text-white',
      amber: 'from-amber-500 to-amber-600 text-white',
      indigo: 'from-indigo-500 to-indigo-600 text-white',
    };
    return colors[colorName as keyof typeof colors] || colors.blue;
  };

  const handleCardClick = () => {
    if (type === 'flip') {
      setIsFlipped(!isFlipped);
    } else if (type === 'expand') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
  };

  return (
    <motion.div
      className="relative w-full h-auto min-h-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`card-flip-container ${isFlipped && type === 'flip' ? 'flipped' : ''}`}
        onClick={handleCardClick}
        style={{ minHeight: quiz ? '350px' : '300px' }}
      >
        {/* Front of Card */}
        <motion.div 
          className={`card-face front shadow-lg bg-gradient-to-br ${getColorClasses(color)} p-6 cursor-pointer`}
          whileHover={{ scale: type === 'hover' ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col justify-between h-full min-h-[288px]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {icon && (
                <div className="text-3xl mb-4">{icon}</div>
              )}
              <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-center leading-relaxed text-white" 
                   dangerouslySetInnerHTML={{ __html: frontContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
                />
              </div>
            </div>
            {(backContent || quiz) && (
              <div className="text-center text-sm opacity-90 mt-4 text-white">
                {type === 'flip' ? '🔄 Click to flip' : '📖 Click to expand'}
              </div>
            )}
          </div>
        </motion.div>

        {/* Back of Card (for flip type) */}
        {type === 'flip' && (backContent || quiz) && (
          <div className="card-face back shadow-lg bg-white border-2 border-gray-200 p-4 cursor-pointer">
            <div className="flex flex-col h-full min-h-[288px]">
              <h3 className="text-lg font-bold mb-3 text-center text-gray-800">{title}</h3>
              
              {quiz ? (
                <div className="flex-1 flex flex-col">
                  <p className="text-gray-700 mb-3 font-medium text-sm">{quiz.question}</p>
                  <div className="space-y-2 mb-3 flex-1">
                    {quiz.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuizAnswer(idx);
                        }}
                        className={`w-full p-2 text-left rounded border transition-colors text-xs leading-tight ${
                          showAnswer
                            ? idx === quiz.correctAnswer
                              ? 'bg-green-100 border-green-500 text-green-800 font-medium'
                              : idx === selectedAnswer && idx !== quiz.correctAnswer
                              ? 'bg-red-100 border-red-500 text-red-800'
                              : 'bg-gray-50 border-gray-200 text-gray-600'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                        }`}
                        disabled={showAnswer}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-blue-50 p-2 rounded border border-blue-200 mb-2"
                    >
                      <p className="text-xs text-blue-800 leading-tight">{quiz.explanation}</p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-700 leading-relaxed text-center text-sm" 
                     dangerouslySetInnerHTML={{ __html: backContent?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} 
                  />
                </div>
              )}
              
              <div className="text-center text-xs opacity-70 mt-2 text-gray-500">
                🔄 Click to flip back
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Content (for expand type) */}
      <AnimatePresence>
        {isExpanded && type === 'expand' && (backContent || quiz) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white rounded-lg shadow-lg border border-gray-200 p-6"
          >
            {quiz ? (
              <div>
                <p className="text-gray-700 mb-4 font-medium">{quiz.question}</p>
                <div className="space-y-2 mb-4">
                  {quiz.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full p-2 text-left rounded border transition-colors ${
                        showAnswer
                          ? idx === quiz.correctAnswer
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : idx === selectedAnswer && idx !== quiz.correctAnswer
                            ? 'bg-red-100 border-red-500 text-red-800'
                            : 'bg-gray-50 border-gray-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      disabled={showAnswer}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-blue-50 p-3 rounded border border-blue-200"
                  >
                    <p className="text-sm text-blue-800">{quiz.explanation}</p>
                  </motion.div>
                )}
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: backContent?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveCard; 