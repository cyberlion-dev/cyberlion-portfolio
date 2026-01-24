'use client';

import { useState } from 'react';
import useCasesData from '@/data/ai-use-cases.json';
import questionnaireData from '@/data/questionnaire.json';
import {
  scoreUseCases,
  getTopRecommendations,
  getCautionaryItems,
  explainRecommendation,
  type QuestionnaireAnswer,
  type ScoredUseCase
} from '@/lib/ai-impact-scoring';

/**
 * AI Impact Finder Component
 *
 * A transparent, heuristic-based tool to help business owners identify
 * high-value AI opportunities while discouraging poorly-implemented
 * customer-facing AI.
 */
export default function AIImpactFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswer[]>([]);
  const [results, setResults] = useState<ScoredUseCase[] | null>(null);

  const questions = questionnaireData.questions;

  const handleAnswer = (questionId: string, answerId: string) => {
    const newAnswers = [...answers.filter(a => a.questionId !== questionId), {
      questionId,
      answerId
    }];
    setAnswers(newAnswers);

    // Auto-advance to next question
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleSubmit = () => {
    // Score all use cases
    const scored = scoreUseCases(
      useCasesData.useCases,
      answers,
      questionnaireData
    );
    setResults(scored);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResults(null);
  };

  // Show results page if completed
  if (results) {
    return <ResultsPage results={results} onRestart={handleRestart} />;
  }

  // Show questionnaire
  return (
    <div className="ai-impact-finder">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Impact Finder</h1>
          <p className="text-muted-foreground">
            Identify where AI can provide real value for your business
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`transition-opacity duration-300 ${
                index === currentStep ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = answers.find(
                    a => a.questionId === question.id && a.answerId === option.id
                  );

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(question.id, option.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary"
          >
            Previous
          </button>

          {currentStep === questions.length - 1 && answers.length === questions.length ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
            >
              See Results
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(Math.min(questions.length - 1, currentStep + 1))}
              disabled={currentStep === questions.length - 1}
              className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Results Page Component
 * Displays scored recommendations with full transparency
 */
function ResultsPage({
  results,
  onRestart
}: {
  results: ScoredUseCase[];
  onRestart: () => void;
}) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const topRecommendations = getTopRecommendations(results, 2);
  const cautionaryItems = getCautionaryItems(results, 2);

  // Generate text version of results
  const generateResultsText = (): string => {
    let text = '=== AI IMPACT FINDER RESULTS ===\n\n';
    text += 'Generated by Cyberlion.dev AI Impact Finder\n';
    text += `Date: ${new Date().toLocaleDateString()}\n\n`;

    text += '--- TOP RECOMMENDATIONS ---\n\n';
    topRecommendations.forEach((scored, index) => {
      text += `${index + 1}. ${scored.useCase.title}\n`;
      text += `   ${scored.useCase.description}\n\n`;
      text += `   Why this works for you:\n   ${explainRecommendation(scored)}\n\n`;
      text += `   Example uses:\n`;
      scored.useCase.examples.forEach(ex => {
        text += `   • ${ex}\n`;
      });
      text += `\n   Type: ${scored.useCase.customerFacing ? 'Customer-facing' : 'Internal'}\n`;
      text += `   Confidence: ${scored.confidence}\n`;
      text += `   Maturity Required: ${getMaturityLabel(scored.useCase.maturityRequired)}\n\n`;
    });

    if (cautionaryItems.length > 0) {
      text += '--- USE CAUTIOUSLY ---\n\n';
      cautionaryItems.forEach(scored => {
        text += `⚠ ${scored.useCase.title}\n`;
        text += `  ${scored.useCase.description}\n`;
        if (scored.suppressionReason) {
          text += `  WARNING: ${scored.suppressionReason}\n`;
        }
        text += `  Trust Risk: ${scored.useCase.customerTrustRisk}/5\n\n`;
      });
    }

    text += '--- PHILOSOPHY ---\n\n';
    text += 'Customer-facing AI can be extremely effective when it is explicit,\n';
    text += 'opt-in, and well-supported. Poorly implemented AI tends to frustrate\n';
    text += 'customers and damage trust. We recommend starting with back-office\n';
    text += 'improvements that deliver value without customer-facing risk.\n\n';

    text += '--- NEXT STEPS ---\n\n';
    text += 'Want help implementing the highest-impact item?\n';
    text += 'Get a practical AI fit check: https://cyberlion.dev/contact\n';

    return text;
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      const text = generateResultsText();
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Download as text file
  const handleDownload = () => {
    const text = generateResultsText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-impact-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ai-impact-results max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold">Your AI Impact Report</h1>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-secondary transition-colors"
              title="Copy results to clipboard"
            >
              {copyStatus === 'copied' ? '✓ Copied!' : '📋 Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-secondary transition-colors"
              title="Download results as text file"
            >
              💾 Download
            </button>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Start over
        </button>
      </div>

      {/* Section A: Summary */}
      <section className="mb-12 p-6 bg-secondary/30 rounded-lg border border-border">
        <h2 className="text-lg font-semibold mb-3">How These Results Were Determined</h2>
        <p className="text-muted-foreground leading-relaxed">
          These recommendations are based on transparent scoring rules, not algorithms or guesswork.
          Each use case starts with a base impact score, then receives boosts based on how your
          answers align with that use case. We then subtract penalties for customer trust risk and
          technical maturity requirements that exceed your current capability. The result is a
          ranked list focused on real value for your specific situation.
        </p>
      </section>

      {/* Section B: Top Recommendations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Recommendations</h2>
        <div className="space-y-6">
          {topRecommendations.map((scored, index) => (
            <RecommendationCard
              key={scored.useCase.id}
              scored={scored}
              rank={index + 1}
            />
          ))}

          {topRecommendations.length === 0 && (
            <div className="p-6 border border-border rounded-lg">
              <p className="text-muted-foreground">
                Based on your responses, we couldn&apos;t identify clear high-value opportunities
                at your current technical capability level. Consider starting with simpler
                back-office tools or consulting with an AI implementation specialist.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section C: Use Cautiously */}
      {cautionaryItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Use Cautiously</h2>
          <div className="space-y-6">
            {cautionaryItems.map((scored) => (
              <CautionaryCard key={scored.useCase.id} scored={scored} />
            ))}
          </div>
        </section>
      )}

      {/* Section D: Philosophy Footer */}
      <section className="mt-12 p-6 bg-primary/5 border-l-4 border-primary rounded">
        <p className="text-sm leading-relaxed">
          <strong>Our Philosophy:</strong> Customer-facing AI can be extremely effective when
          it is explicit, opt-in, and well-supported. Poorly implemented AI tends to frustrate
          customers and damage trust. We recommend starting with back-office improvements that
          deliver value without customer-facing risk.
        </p>
      </section>

      {/* CTA Section */}
      <section className="mt-12 text-center p-8 border border-border rounded-lg">
        <h3 className="text-xl font-semibold mb-3">
          Want help implementing the highest-impact item?
        </h3>
        <p className="text-muted-foreground mb-6">
          Get a practical AI fit check to understand what&apos;s realistic for your business
        </p>
        <a
          href="https://cyberlion.dev/contact"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Get a Practical AI Fit Check
        </a>
      </section>
    </div>
  );
}

/**
 * Recommendation Card Component
 * Displays a top recommendation with full context
 */
function RecommendationCard({
  scored,
  rank
}: {
  scored: ScoredUseCase;
  rank: number;
}) {
  const { useCase, confidence } = scored;

  return (
    <div className="p-6 border-2 border-primary/20 rounded-lg bg-card">
      {/* Rank badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
            {rank}
          </span>
          <h3 className="text-xl font-semibold">{useCase.title}</h3>
        </div>
        <ConfidenceBadge confidence={confidence} />
      </div>

      {/* Description */}
      <p className="mb-4 text-muted-foreground">{useCase.description}</p>

      {/* Explanation */}
      <div className="mb-4 p-4 bg-secondary/50 rounded">
        <p className="text-sm">
          <strong>Why this works for you:</strong> {explainRecommendation(scored)}
        </p>
      </div>

      {/* Examples */}
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Example uses:</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          {useCase.examples.map((example, i) => (
            <li key={i}>{example}</li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          useCase.customerFacing
            ? 'bg-orange-500/10 text-orange-700 dark:text-orange-400'
            : 'bg-green-500/10 text-green-700 dark:text-green-400'
        }`}>
          {useCase.customerFacing ? 'Customer-facing' : 'Internal'}
        </span>

        {useCase.customerFacing && useCase.requiresOptIn && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-400">
            Requires opt-in
          </span>
        )}

        <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          Maturity: {getMaturityLabel(useCase.maturityRequired)}
        </span>
      </div>
    </div>
  );
}

/**
 * Cautionary Card Component
 * Shows suppressed or low-value items with clear warnings
 */
function CautionaryCard({ scored }: { scored: ScoredUseCase }) {
  const { useCase, suppressionReason } = scored;

  return (
    <div className="p-6 border border-orange-500/30 rounded-lg bg-orange-500/5">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>

          {suppressionReason && (
            <div className="p-3 bg-orange-500/10 rounded border border-orange-500/20 mb-3">
              <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">
                {suppressionReason}
              </p>
            </div>
          )}

          {!suppressionReason && (
            <p className="text-sm text-muted-foreground">
              While this showed some alignment with your needs, the combination of implementation
              complexity and trust risk suggests starting with simpler options first.
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-700 dark:text-orange-400">
              Customer-facing
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-700 dark:text-red-400">
              Trust risk: {useCase.customerTrustRisk}/5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              Requires: {getMaturityLabel(useCase.maturityRequired)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Confidence Badge Component
 */
function ConfidenceBadge({ confidence }: { confidence: 'high' | 'medium' | 'low' }) {
  const config = {
    high: { label: 'High confidence', className: 'bg-green-500/10 text-green-700 dark:text-green-400' },
    medium: { label: 'Medium confidence', className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' },
    low: { label: 'Low confidence', className: 'bg-gray-500/10 text-gray-700 dark:text-gray-400' }
  };

  const { label, className } = config[confidence];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

/**
 * Get human-readable maturity label
 */
function getMaturityLabel(level: number): string {
  const labels = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
    5: 'Professional'
  };
  return labels[level as keyof typeof labels] || 'Unknown';
}
