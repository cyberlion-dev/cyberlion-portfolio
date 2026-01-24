/**
 * AI Impact Finder - Scoring Engine
 *
 * This module implements transparent, heuristic-based scoring for AI use cases.
 * No machine learning, no black boxes - just explainable rules.
 */

export interface UseCase {
  id: string;
  title: string;
  description: string;
  baseImpact: number;           // 1-10: inherent value of this use case
  customerTrustRisk: number;    // 0-5: risk to customer trust
  maturityRequired: number;     // 1-5: technical capability needed
  customerFacing: boolean;
  requiresOptIn: boolean;
  examples: string[];
}

export interface QuestionnaireAnswer {
  questionId: string;
  answerId: string;
  capabilityLevel?: number;     // Only present for technical-capability question
}

export interface QuestionOption {
  id: string;
  label: string;
  capabilityLevel?: number;
  signals?: Record<string, number | undefined>;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface QuestionnaireData {
  questions: Question[];
}

export interface ScoredUseCase {
  useCase: UseCase;
  opportunityScore: number;     // 1-10: how valuable this is for the user
  trustPenalty: number;         // 0-5: trust risk
  maturityPenalty: number;      // 0+: capability gap penalty
  netValue: number;             // final score for ranking
  signals: number;              // count of reinforcing signals
  confidence: 'high' | 'medium' | 'low';
  shouldSuppress: boolean;      // true if maturity requirements not met
  suppressionReason?: string;
}

/**
 * Main scoring function
 * Evaluates all use cases against user's questionnaire answers
 */
export function scoreUseCases(
  useCases: UseCase[],
  answers: QuestionnaireAnswer[],
  questionnaireData: QuestionnaireData
): ScoredUseCase[] {
  // Extract user's capability level
  const userCapability = extractCapabilityLevel(answers, questionnaireData);

  // Build signal map: which use cases got which boosts
  const signalMap = buildSignalMap(answers, questionnaireData);

  const scoredCases = useCases.map(useCase => {
    return scoreUseCase(useCase, signalMap, userCapability);
  });

  // Sort by net value (highest first)
  return scoredCases.sort((a, b) => b.netValue - a.netValue);
}

/**
 * Extract the user's technical capability level from answers
 */
function extractCapabilityLevel(
  answers: QuestionnaireAnswer[],
  questionnaireData: QuestionnaireData
): number {
  const capabilityAnswer = answers.find(a => a.questionId === 'technical-capability');
  if (!capabilityAnswer) return 2; // Default to intermediate

  const question = questionnaireData.questions.find(q => q.id === 'technical-capability');
  const option = question?.options.find(o => o.id === capabilityAnswer.answerId);

  return option?.capabilityLevel || 2;
}

/**
 * Build a map of signal boosts for each use case
 * Signal = a questionnaire answer that indicates this use case is relevant
 */
function buildSignalMap(
  answers: QuestionnaireAnswer[],
  questionnaireData: QuestionnaireData
): Map<string, { totalBoost: number; signalCount: number }> {
  const signalMap = new Map<string, { totalBoost: number; signalCount: number }>();

  answers.forEach(answer => {
    const question = questionnaireData.questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find(o => o.id === answer.answerId);
    if (!option || !option.signals) return;

    // Add signals from this answer
    Object.entries(option.signals).forEach(([useCaseId, boost]) => {
      if (boost === undefined) return;

      const current = signalMap.get(useCaseId) || { totalBoost: 0, signalCount: 0 };

      signalMap.set(useCaseId, {
        totalBoost: current.totalBoost + boost,
        signalCount: boost !== 0 ? current.signalCount + 1 : current.signalCount
      });
    });
  });

  return signalMap;
}

/**
 * Score a single use case
 * Step 3.1: Calculate opportunity score
 * Step 3.2: Apply trust and maturity penalties
 * Step 3.3: Calculate net value
 */
function scoreUseCase(
  useCase: UseCase,
  signalMap: Map<string, { totalBoost: number; signalCount: number }>,
  userCapability: number
): ScoredUseCase {
  const signals = signalMap.get(useCase.id);
  const totalBoost = signals?.totalBoost || 0;
  const signalCount = Math.max(0, signals?.signalCount || 0);

  // Step 3.1: Raw Opportunity Score
  // baseImpact + sum(answerBoosts) + goalAlignmentBonus
  // We normalize boosts and add goal alignment as part of the boost
  const rawOpportunity = useCase.baseImpact + totalBoost;

  // Normalize to 1-10 range
  // Empirically, boosts typically range from -10 to +12, baseImpact is 1-10
  // So raw scores might be -5 to 22. Let's normalize intelligently.
  const opportunityScore = normalizeScore(rawOpportunity, -5, 22, 1, 10);

  // Step 3.2: Trust and Maturity Penalties
  const trustPenalty = useCase.customerTrustRisk;

  const maturityGap = useCase.maturityRequired - userCapability;
  const maturityPenalty = maturityGap > 0 ? maturityGap * 2 : 0;

  // Step 3.3: Net Value Calculation
  const netValue = opportunityScore - trustPenalty - maturityPenalty;

  // Confidence based on signal count
  const confidence = determineConfidence(signalCount);

  // Task 4: Customer-Facing AI Gating
  // Suppress if maturity required exceeds capability AND it's customer-facing without opt-in
  const shouldSuppress =
    maturityGap > 0 &&
    useCase.customerFacing &&
    !useCase.requiresOptIn;

  const suppressionReason = shouldSuppress
    ? "High-quality implementation required. Not recommended without expert support."
    : undefined;

  return {
    useCase,
    opportunityScore,
    trustPenalty,
    maturityPenalty,
    netValue,
    signals: signalCount,
    confidence,
    shouldSuppress,
    suppressionReason
  };
}

/**
 * Normalize a score from one range to another
 */
function normalizeScore(
  value: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
): number {
  // Clamp to old range
  const clamped = Math.max(oldMin, Math.min(oldMax, value));

  // Normalize to 0-1
  const normalized = (clamped - oldMin) / (oldMax - oldMin);

  // Scale to new range
  return newMin + normalized * (newMax - newMin);
}

/**
 * Task 5: Determine confidence based on number of reinforcing signals
 */
function determineConfidence(signalCount: number): 'high' | 'medium' | 'low' {
  if (signalCount >= 3) return 'high';
  if (signalCount === 2) return 'medium';
  return 'low';
}

/**
 * Get top recommendations (excluding suppressed items)
 */
export function getTopRecommendations(
  scoredCases: ScoredUseCase[],
  count: number = 2
): ScoredUseCase[] {
  return scoredCases
    .filter(sc => !sc.shouldSuppress && sc.netValue > 0)
    .slice(0, count);
}

/**
 * Get items to show in "Use Cautiously" section
 * These are either suppressed OR have low net value but some signals
 */
export function getCautionaryItems(
  scoredCases: ScoredUseCase[],
  count: number = 2
): ScoredUseCase[] {
  const suppressed = scoredCases.filter(sc => sc.shouldSuppress);
  const lowValue = scoredCases.filter(
    sc => !sc.shouldSuppress && sc.signals > 0 && sc.netValue <= 0
  );

  return [...suppressed, ...lowValue].slice(0, count);
}

/**
 * Generate explanation for why a use case was recommended
 * This supports the principle that every recommendation must be explainable
 */
export function explainRecommendation(scored: ScoredUseCase): string {
  const parts: string[] = [];

  if (scored.signals >= 3) {
    parts.push("Multiple aspects of your business align with this use case");
  } else if (scored.signals === 2) {
    parts.push("Your answers indicate this could be valuable");
  } else if (scored.signals === 1) {
    parts.push("Based on your responses, this shows some alignment");
  }

  if (scored.useCase.customerFacing === false) {
    parts.push("This is a back-office improvement with low risk");
  }

  if (scored.maturityPenalty === 0) {
    parts.push("It matches your current technical capability");
  } else if (scored.maturityPenalty > 0) {
    parts.push("Implementation may require technical support");
  }

  if (scored.trustPenalty === 0) {
    parts.push("There's minimal risk to customer trust");
  } else if (scored.trustPenalty > 0 && scored.trustPenalty <= 2) {
    parts.push("With proper implementation, trust risk is manageable");
  } else {
    parts.push("Requires careful implementation to maintain customer trust");
  }

  return parts.join('. ') + '.';
}
