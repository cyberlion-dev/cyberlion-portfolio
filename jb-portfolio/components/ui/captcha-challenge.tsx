// Custom component - Randomized emoji-based captcha challenge

'use client';

import { useEffect, useState } from 'react';

interface CaptchaOption {
  emoji: string;
  label: string;
  isCorrect: boolean;
}

interface CaptchaQuestion {
  question: string;
  options: CaptchaOption[];
  correctAnswer: string;
}

interface CaptchaChallengeProps {
  onAnswerChange: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
  reset?: boolean; // Trigger to reset the captcha
}

export function CaptchaChallenge({ onAnswerChange, disabled = false, reset = false }: CaptchaChallengeProps) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<CaptchaQuestion | null>(null);

  const questions: CaptchaQuestion[] = [
    {
      question: "Which emoji represents a painter's tool?",
      options: [
        { emoji: '🎨', label: 'Palette', isCorrect: true },
        { emoji: '🔨', label: 'Hammer', isCorrect: false },
        { emoji: '🌈', label: 'Rainbow', isCorrect: false },
        { emoji: '🎭', label: 'Masks', isCorrect: false },
      ],
      correctAnswer: '🎨'
    },
    {
      question: "Which emoji represents code/development?",
      options: [
        { emoji: '📱', label: 'Phone', isCorrect: false },
        { emoji: '💻', label: 'Laptop', isCorrect: true },
        { emoji: '📚', label: 'Books', isCorrect: false },
        { emoji: '🎮', label: 'Game', isCorrect: false },
      ],
      correctAnswer: '💻'
    },
    {
      question: "Which emoji is typically used for communication?",
      options: [
        { emoji: '🎯', label: 'Target', isCorrect: false },
        { emoji: '✉️', label: 'Envelope', isCorrect: true },
        { emoji: '🔔', label: 'Bell', isCorrect: false },
        { emoji: '🎪', label: 'Circus', isCorrect: false },
      ],
      correctAnswer: '✉️'
    },
    {
      question: "What's 5 + 3?",
      options: [
        { emoji: '7️⃣', label: 'Seven', isCorrect: false },
        { emoji: '8️⃣', label: 'Eight', isCorrect: true },
        { emoji: '9️⃣', label: 'Nine', isCorrect: false },
        { emoji: '6️⃣', label: 'Six', isCorrect: false },
      ],
      correctAnswer: '8️⃣'
    },
    {
      question: "Which emoji represents creative work?",
      options: [
        { emoji: '⚡', label: 'Lightning', isCorrect: false },
        { emoji: '🎨', label: 'Art', isCorrect: true },
        { emoji: '⚙️', label: 'Gear', isCorrect: false },
        { emoji: '📊', label: 'Chart', isCorrect: false },
      ],
      correctAnswer: '🎨'
    },
    {
      question: "Which comes first in the alphabet?",
      options: [
        { emoji: '🅱️', label: 'B', isCorrect: false },
        { emoji: '🅰️', label: 'A', isCorrect: true },
        { emoji: '©️', label: 'C', isCorrect: false },
        { emoji: '🆔', label: 'D', isCorrect: false },
      ],
      correctAnswer: '🅰️'
    },
    {
      question: "What's 2 × 4?",
      options: [
        { emoji: '6️⃣', label: 'Six', isCorrect: false },
        { emoji: '7️⃣', label: 'Seven', isCorrect: false },
        { emoji: '8️⃣', label: 'Eight', isCorrect: true },
        { emoji: '9️⃣', label: 'Nine', isCorrect: false },
      ],
      correctAnswer: '8️⃣'
    },
    {
      question: "Which emoji represents a successful action?",
      options: [
        { emoji: '❌', label: 'X Mark', isCorrect: false },
        { emoji: '✅', label: 'Check', isCorrect: true },
        { emoji: '⭐', label: 'Star', isCorrect: false },
        { emoji: '💯', label: 'Hundred', isCorrect: false },
      ],
      correctAnswer: '✅'
    },
  ];

  // Select a random question on mount or reset
  const selectRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setSelectedAnswer('');
  };

  useEffect(() => {
    selectRandomQuestion();
  }, []);

  // Reset captcha when reset prop changes
  useEffect(() => {
    if (reset) {
      selectRandomQuestion();
    }
  }, [reset]);

  const handleSelect = (emoji: string) => {
    setSelectedAnswer(emoji);
    const isCorrect = currentQuestion?.correctAnswer === emoji;
    onAnswerChange(emoji, isCorrect);
  };

  if (!currentQuestion) return null;

  return (
    <div className="border border-border rounded-md p-4 bg-muted/20">
      <label className="block text-sm font-medium mb-3">
        {currentQuestion.question}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.emoji}
            type="button"
            onClick={() => handleSelect(option.emoji)}
            disabled={disabled}
            className={`p-4 rounded-md border-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedAnswer === option.emoji
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="text-3xl mb-1">{option.emoji}</div>
            <div className="text-xs text-muted-foreground">{option.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
