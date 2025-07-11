'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressTrackerProps {
  moduleSlug: string;
  topicSlug: string;
  totalTopics: number;
  currentTopicIndex: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  moduleSlug,
  topicSlug,
  totalTopics,
  currentTopicIndex
}) => {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`learn-progress-${moduleSlug}`);
    if (savedProgress) {
      setCompletedTopics(new Set(JSON.parse(savedProgress)));
    }

    // Initialize achievements
    const initialAchievements: Achievement[] = [
      {
        id: 'first-topic',
        title: 'Getting Started',
        description: 'Complete your first topic',
        icon: '🎯',
        unlocked: false,
      },
      {
        id: 'half-way',
        title: 'Halfway There',
        description: 'Complete 50% of topics',
        icon: '🏃‍♂️',
        unlocked: false,
      },
      {
        id: 'quiz-master',
        title: 'Quiz Master',
        description: 'Score 100% on a quiz',
        icon: '🧠',
        unlocked: false,
      },
      {
        id: 'speed-reader',
        title: 'Speed Reader',
        description: 'Spend 30+ minutes learning',
        icon: '⚡',
        unlocked: false,
      },
      {
        id: 'completionist',
        title: 'Completionist',
        description: 'Complete all topics in a module',
        icon: '🏆',
        unlocked: false,
      },
    ];

    setAchievements(initialAchievements);

    // Track reading time
    const startTime = Date.now();
    const interval = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      if (timeSpent > 30) {
        checkAchievement('speed-reader');
      }
    };
  }, [moduleSlug]);

  const markTopicComplete = (topicSlug: string) => {
    const newCompleted = new Set(completedTopics);
    newCompleted.add(topicSlug);
    setCompletedTopics(newCompleted);
    
    // Save to localStorage
    localStorage.setItem(`learn-progress-${moduleSlug}`, JSON.stringify(Array.from(newCompleted)));
    
    // Check achievements
    if (newCompleted.size === 1) {
      checkAchievement('first-topic');
    }
    if (newCompleted.size >= Math.ceil(totalTopics / 2)) {
      checkAchievement('half-way');
    }
    if (newCompleted.size === totalTopics) {
      checkAchievement('completionist');
    }
  };

  const checkAchievement = (achievementId: string) => {
    setAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          setShowAchievement(achievement);
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });
      return updated;
    });
  };

  const progressPercentage = (completedTopics.size / totalTopics) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">Progress</span>
          <span className="text-sm text-slate-500">
            {completedTopics.size} / {totalTopics} topics
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current Topic Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-600">
            Topic {currentTopicIndex + 1} of {totalTopics}
          </span>
        </div>
        <button
          onClick={() => markTopicComplete(topicSlug)}
          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full hover:bg-green-200 transition-colors"
        >
          Mark Complete ✓
        </button>
      </div>

      {/* Mini Achievements */}
      <div className="flex space-x-2 overflow-x-auto">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              achievement.unlocked
                ? 'bg-yellow-100 text-yellow-800 shadow-sm'
                : 'bg-slate-100 text-slate-400'
            }`}
            whileHover={{ scale: 1.1 }}
            title={achievement.title}
          >
            {achievement.icon}
          </motion.div>
        ))}
      </div>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAchievement(null)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-4">{showAchievement.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Achievement Unlocked!
              </h3>
              <h4 className="text-lg font-semibold text-blue-600 mb-2">
                {showAchievement.title}
              </h4>
              <p className="text-slate-600 mb-4">
                {showAchievement.description}
              </p>
              <button
                onClick={() => setShowAchievement(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continue Learning
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressTracker; 