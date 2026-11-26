'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { QuizQuestion } from '@/data/learn/oncology-101/quiz-data';

interface BlogNotebookQuizProps {
  questions: QuizQuestion[];
  title?: string;
  subtitle?: string;
}

export default function BlogNotebookQuiz({
  questions,
  title = 'Study quiz',
  subtitle = 'Check your understanding of this notebook',
}: BlogNotebookQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  if (!questions.length) return null;

  const handleAnswerChange = (questionId: string, answer: string, isMultiple: boolean) => {
    setAnswers((prev) => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter((a) => a !== answer)
          : [...currentAnswers, answer];
        return { ...prev, [questionId]: newAnswers };
      }
      return { ...prev, [questionId]: [answer] };
    });
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers = Array.isArray(question.correctAnswer)
        ? question.correctAnswer
        : [question.correctAnswer];
      if (question.type === 'single') {
        if (userAnswers.length === 1 && userAnswers[0] === correctAnswers[0]) correctCount++;
      } else {
        const isCorrect =
          correctAnswers.every((a) => userAnswers.includes(a)) &&
          userAnswers.every((a) => correctAnswers.includes(a)) &&
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

  const isAnswerSelected = (questionId: string, option: string) =>
    (answers[questionId] || []).includes(option);

  const getOptionClass = (question: QuizQuestion, option: string) => {
    if (!showResults) {
      return isAnswerSelected(question.id, option)
        ? 'bg-sky-50 border-sky-500 dark:bg-sky-950/40'
        : 'bg-white border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700';
    }
    const isSelected = isAnswerSelected(question.id, option);
    const isCorrect = isAnswerCorrect(question, option);
    if (isCorrect) return 'bg-emerald-50 border-emerald-500 dark:bg-emerald-950/30';
    if (isSelected && !isCorrect) return 'bg-rose-50 border-rose-500 dark:bg-rose-950/30';
    return 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
        ) : null}
      </div>

      <div className="space-y-5">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.05, 0.4) }}
          >
            <h4 className="mb-3 text-base font-semibold text-slate-800 dark:text-slate-100">
              {index + 1}. {question.question}
            </h4>
            <div className="space-y-2">
              {question.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  disabled={showResults}
                  onClick={() =>
                    !showResults &&
                    handleAnswerChange(question.id, option, question.type === 'multiple')
                  }
                  className={`w-full rounded-lg border-2 p-3 text-left transition-colors ${getOptionClass(question, option)}`}
                >
                  <span className="text-sm text-slate-700 dark:text-slate-200">{option}</span>
                </button>
              ))}
            </div>
            {showResults && question.hint ? (
              <p className="mt-3 border-l-2 border-slate-300 pl-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">Hint:</span> {question.hint}
              </p>
            ) : null}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={calculateScore}
          disabled={showResults}
          className="rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-50"
        >
          {showResults ? 'Quiz completed' : 'Check answers'}
        </button>
        {showResults ? (
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Score: {score} / {questions.length}
          </p>
        ) : null}
      </div>
    </div>
  );
}
