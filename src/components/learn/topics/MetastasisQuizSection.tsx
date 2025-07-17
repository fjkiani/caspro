'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Award, Brain } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { metastasisQuizQuestions } from '@/data/learn/oncology-101/metastasis-data';

interface QuizState {
  currentQuestion: number;
  selectedAnswers: number[];
  showResults: boolean;
  score: number;
}

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult,
  questionNumber 
}: {
  question: any;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  showResult: boolean;
  questionNumber: number;
}) => (
  <motion.div
    className="bg-white p-8 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    key={question.id}
  >
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          Question {questionNumber} of {metastasisQuizQuestions.length}
        </span>
        <Brain className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 leading-relaxed">
        {question.question}
      </h3>
    </div>

    <div className="space-y-3">
      {question.options.map((option: string, index: number) => {
        const isSelected = selectedAnswer === index;
        const isCorrect = index === question.correct;
        const isWrong = showResult && isSelected && !isCorrect;
        const shouldShowCorrect = showResult && isCorrect;

        return (
          <button
            key={index}
            onClick={() => !showResult && onAnswerSelect(index)}
            disabled={showResult}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              shouldShowCorrect
                ? 'border-green-500 bg-green-50 text-green-800'
                : isWrong
                ? 'border-red-500 bg-red-50 text-red-800'
                : isSelected
                ? 'border-blue-500 bg-blue-50 text-blue-800'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && (
                <div>
                  {shouldShowCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {isWrong && <XCircle className="w-5 h-5 text-red-600" />}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>

    {showResult && (
      <motion.div
        className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
      >
        <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
        <p className="text-blue-800">{question.explanation}</p>
      </motion.div>
    )}
  </motion.div>
);

const ScoreCard = ({ score, total, onRestart }: {
  score: number;
  total: number;
  onRestart: () => void;
}) => {
  const percentage = Math.round((score / total) * 100);
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent! You have a strong understanding of metastasis.';
    if (percentage >= 60) return 'Good work! Review the areas you missed to strengthen your knowledge.';
    return 'Keep studying! Consider reviewing the module content and try again.';
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Quiz Complete!</h3>
      <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
        {score}/{total}
      </div>
      <div className={`text-xl mb-6 ${getScoreColor()}`}>
        {percentage}% Correct
      </div>
      <p className="text-slate-700 mb-6 max-w-md mx-auto">
        {getScoreMessage()}
      </p>
      <button
        onClick={onRestart}
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Take Quiz Again
      </button>
    </motion.div>
  );
};

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  selectedAnswer, 
  showResult, 
  onNext, 
  onShowResult 
}: {
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showResult: boolean;
  onNext: () => void;
  onShowResult: () => void;
}) => (
  <div className="flex justify-between items-center mt-8">
    <div className="text-sm text-slate-500">
      Question {currentQuestion + 1} of {totalQuestions}
    </div>
    <div className="space-x-4">
      {!showResult && selectedAnswer !== null && (
        <button
          onClick={onShowResult}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          Show Answer
        </button>
      )}
      {showResult && currentQuestion < totalQuestions - 1 && (
        <button
          onClick={onNext}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          Next Question
        </button>
      )}
      {showResult && currentQuestion === totalQuestions - 1 && (
        <button
          onClick={onNext}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          Show Results
        </button>
      )}
    </div>
  </div>
);

const MetastasisQuizSection: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: new Array(metastasisQuizQuestions.length).fill(-1),
    showResults: false,
    score: 0
  });

  const [currentQuestionState, setCurrentQuestionState] = useState({
    selectedAnswer: null as number | null,
    showResult: false
  });

  const handleAnswerSelect = (answer: number) => {
    setCurrentQuestionState({
      ...currentQuestionState,
      selectedAnswer: answer
    });
  };

  const handleShowResult = () => {
    setCurrentQuestionState({
      ...currentQuestionState,
      showResult: true
    });
  };

  const handleNext = () => {
    const newSelectedAnswers = [...quizState.selectedAnswers];
    newSelectedAnswers[quizState.currentQuestion] = currentQuestionState.selectedAnswer!;
    
    if (quizState.currentQuestion === metastasisQuizQuestions.length - 1) {
      // Calculate final score
      const score = newSelectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === metastasisQuizQuestions[index].correct ? 1 : 0);
      }, 0);
      
      setQuizState({
        ...quizState,
        selectedAnswers: newSelectedAnswers,
        showResults: true,
        score
      });
    } else {
      // Move to next question
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        selectedAnswers: newSelectedAnswers
      });
      setCurrentQuestionState({
        selectedAnswer: null,
        showResult: false
      });
    }
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: new Array(metastasisQuizQuestions.length).fill(-1),
      showResults: false,
      score: 0
    });
    setCurrentQuestionState({
      selectedAnswer: null,
      showResult: false
    });
  };

  if (quizState.showResults) {
    return (
      <div className="space-y-12">
        <SectionHeader
          title="Module 2 Quiz Results"
          subtitle="Test your understanding of cancer metastasis"
          color="purple"
        />
        <ScoreCard
          score={quizState.score}
          total={metastasisQuizQuestions.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  const currentQuestion = metastasisQuizQuestions[quizState.currentQuestion];

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Module 2 Knowledge Check"
        subtitle="Test your understanding of cancer metastasis concepts"
        color="purple"
      />

      <ProgressBar 
        current={quizState.currentQuestion + 1} 
        total={metastasisQuizQuestions.length} 
      />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={currentQuestionState.selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        showResult={currentQuestionState.showResult}
        questionNumber={quizState.currentQuestion + 1}
      />

      <QuizNavigation
        currentQuestion={quizState.currentQuestion}
        totalQuestions={metastasisQuizQuestions.length}
        selectedAnswer={currentQuestionState.selectedAnswer}
        showResult={currentQuestionState.showResult}
        onNext={handleNext}
        onShowResult={handleShowResult}
      />

      {/* Quiz Tips */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quiz Tips</h3>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Take your time to read each question carefully
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Review the explanations to reinforce your learning
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            You can retake the quiz as many times as you like
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MetastasisQuizSection; 