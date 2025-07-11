'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import { quizQuestions, QuizQuestion } from '@/data/learn/oncology-101/quiz-data';

const QuizSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId: string, answer: string, isMultiple: boolean) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [answer] };
      }
    });
  };

  const calculateScore = () => {
    let correctCount = 0;
    
    quizQuestions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      
      if (question.type === 'single') {
        if (userAnswers.length === 1 && userAnswers[0] === correctAnswers[0]) {
          correctCount++;
        }
      } else {
        // Handle multiple choice - check if all correct answers are selected and no incorrect ones
        const isCorrect = correctAnswers.every(answer => userAnswers.includes(answer)) &&
                         userAnswers.every(answer => correctAnswers.includes(answer)) &&
                         userAnswers.length === correctAnswers.length;
        if (isCorrect) correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
  };

  const isAnswerCorrect = (question: QuizQuestion, option: string) => {
    if (!showResults) return false;
    const correctAnswers = Array.isArray(question.correctAnswer) 
      ? question.correctAnswer 
      : [question.correctAnswer];
    return correctAnswers.includes(option);
  };

  const isAnswerSelected = (questionId: string, option: string) => {
    return (answers[questionId] || []).includes(option);
  };

  const getOptionClass = (question: QuizQuestion, option: string) => {
    if (!showResults) {
      return isAnswerSelected(question.id, option) 
        ? 'bg-blue-100 border-blue-500' 
        : 'bg-white border-slate-200 hover:bg-slate-50';
    }
    
    const isSelected = isAnswerSelected(question.id, option);
    const isCorrect = isAnswerCorrect(question, option);
    
    if (isCorrect) {
      return 'bg-green-100 border-green-500';
    } else if (isSelected && !isCorrect) {
      return 'bg-red-100 border-red-500';
    } else {
      return 'bg-white border-slate-200';
    }
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Part 12: Knowledge Check"
        subtitle="Test your understanding of oncology fundamentals"
        color="yellow"
      />

      <div className="space-y-6">
        {quizQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            className="bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-slate-800 mb-2">
                {index + 1}. {question.question}
              </h4>
              <div className="text-xs text-slate-500 mb-4">
                Category: {question.category} | Type: {question.type === 'single' ? 'Single Choice' : 'Multiple Choice'}
              </div>
            </div>

            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <motion.div
                  key={optionIndex}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${getOptionClass(question, option)}`}
                  onClick={() => !showResults && handleAnswerChange(question.id, option, question.type === 'multiple')}
                  whileHover={!showResults ? { scale: 1.01 } : {}}
                  whileTap={!showResults ? { scale: 0.99 } : {}}
                >
                  <div className="flex items-center">
                    <input
                      type={question.type === 'single' ? 'radio' : 'checkbox'}
                      name={question.id}
                      value={option}
                      checked={isAnswerSelected(question.id, option)}
                      onChange={() => {}} // Handled by onClick
                      className="mr-3 h-4 w-4"
                      disabled={showResults}
                    />
                    <label className="text-slate-700 cursor-pointer">
                      {option}
                    </label>
                  </div>
                </motion.div>
              ))}
            </div>

            {showResults && (
              <motion.div
                className="mt-4 p-3 bg-slate-100 rounded-lg border-l-4 border-slate-500"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-sm text-slate-600">
                  <strong>Hint:</strong> {question.hint}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <motion.button
          onClick={calculateScore}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={showResults}
          whileHover={{ scale: showResults ? 1 : 1.05 }}
          whileTap={{ scale: showResults ? 1 : 0.95 }}
        >
          {showResults ? 'Quiz Completed' : 'Check Answers'}
        </motion.button>

        {showResults && (
          <motion.div
            className={`text-xl font-bold ${score === quizQuestions.length ? 'text-green-600' : 'text-slate-700'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your Score: {score} / {quizQuestions.length}
            {score === quizQuestions.length && (
              <div className="text-sm text-green-600 mt-1">Perfect! 🎉</div>
            )}
          </motion.div>
        )}
      </div>

      {showResults && (
        <motion.div
          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-yellow-800 mb-3">
            Quiz Complete!
          </h3>
          <p className="text-slate-700">
            You've completed the Oncology 101 knowledge check. Review the hints above for any questions you missed, 
            and consider revisiting the relevant sections to strengthen your understanding.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default QuizSection; 