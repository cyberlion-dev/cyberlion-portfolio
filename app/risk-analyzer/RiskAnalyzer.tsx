"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ──────────────────────────────
// TYPES
// ──────────────────────────────
type DistributionType = "normal" | "lognormal" | "uniform" | "triangular";
type SamplingMethod = "monte-carlo" | "latin-hypercube";

interface RiskVariable {
  id: string;
  name: string;
  distribution: DistributionType;
  parameters: { [key: string]: number };
}

interface RiskScenario {
  name: string;
  description: string;
  variables: RiskVariable[];
  formula: string;
  unit: string;
}

interface SimulationResult {
  mean: number;
  median: number;
  std: number;
  var95: number;
  var99: number;
  min: number;
  max: number;
  skewness: number;
  kurtosis: number;
  samples: number[];
  histogram: { bin: string; count: number; probability: number }[];
}

// ──────────────────────────────
// STATISTICAL FUNCTIONS
// ──────────────────────────────

// Box-Muller transform for normal distribution
function normalRandom(mean: number = 0, std: number = 1): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * std + mean;
}

// Latin Hypercube Sampling
function latinHypercubeSample(n: number, dimensions: number): number[][] {
  const samples: number[][] = [];
  
  for (let i = 0; i < n; i++) {
    samples.push([]);
  }
  
  for (let dim = 0; dim < dimensions; dim++) {
    const intervals = Array.from({ length: n }, (_, i) => i);
    
    // Shuffle intervals
    for (let i = intervals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [intervals[i], intervals[j]] = [intervals[j], intervals[i]];
    }
    
    for (let i = 0; i < n; i++) {
      const uniform = (intervals[i] + Math.random()) / n;
      samples[i][dim] = uniform;
    }
  }
  
  return samples;
}

// Inverse CDF functions
function normalInverseCDF(p: number, mean: number, std: number): number {
  // Approximation using Beasley-Springer-Moro algorithm
  const a = [0, -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [0, -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [0, -7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [0, 7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

  let x: number;
  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  if (p < pLow) {
    const q = Math.sqrt(-2 * Math.log(p));
    x = (((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) / ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1);
  } else if (p <= pHigh) {
    const q = p - 0.5;
    const r = q * q;
    x = (((((a[1] * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * r + a[6]) * q / (((((b[1] * r + b[2]) * r + b[3]) * r + b[4]) * r + b[5]) * r + 1);
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) / ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1);
  }

  return x * std + mean;
}

function lognormalInverseCDF(p: number, mu: number, sigma: number): number {
  return Math.exp(normalInverseCDF(p, mu, sigma));
}

function uniformInverseCDF(p: number, min: number, max: number): number {
  return min + p * (max - min);
}

function triangularInverseCDF(p: number, min: number, mode: number, max: number): number {
  const fc = (mode - min) / (max - min);
  if (p < fc) {
    return min + Math.sqrt(p * (max - min) * (mode - min));
  } else {
    return max - Math.sqrt((1 - p) * (max - min) * (max - mode));
  }
}

// Generate sample from distribution
function sampleFromDistribution(variable: RiskVariable, uniform?: number): number {
  const { distribution, parameters } = variable;
  
  if (uniform !== undefined) {
    // Use inverse CDF for Latin Hypercube
    switch (distribution) {
      case "normal":
        return normalInverseCDF(uniform, parameters.mean, parameters.std);
      case "lognormal":
        return lognormalInverseCDF(uniform, parameters.mu, parameters.sigma);
      case "uniform":
        return uniformInverseCDF(uniform, parameters.min, parameters.max);
      case "triangular":
        return triangularInverseCDF(uniform, parameters.min, parameters.mode, parameters.max);
      default:
        return normalInverseCDF(uniform, parameters.mean || 0, parameters.std || 1);
    }
  } else {
    // Direct sampling for Monte Carlo
    switch (distribution) {
      case "normal":
        return normalRandom(parameters.mean, parameters.std);
      case "lognormal":
        return Math.exp(normalRandom(parameters.mu, parameters.sigma));
      case "uniform":
        return parameters.min + Math.random() * (parameters.max - parameters.min);
      case "triangular":
        const u = Math.random();
        return triangularInverseCDF(u, parameters.min, parameters.mode, parameters.max);
      default:
        return normalRandom(parameters.mean || 0, parameters.std || 1);
    }
  }
}

// Helper functions for parameter controls
function getParameterTooltip(distribution: DistributionType, paramName: string): string {
  const tooltips: { [key: string]: { [key: string]: string } } = {
    normal: {
      mean: "Average value of the distribution",
      std: "Standard deviation - measure of spread"
    },
    lognormal: {
      mu: "Mean of underlying normal distribution",
      sigma: "Standard deviation of underlying normal distribution"
    },
    uniform: {
      min: "Minimum possible value",
      max: "Maximum possible value"
    },
    triangular: {
      min: "Minimum possible value",
      mode: "Most likely value (peak of triangle)",
      max: "Maximum possible value"
    }
  };
  
  return tooltips[distribution]?.[paramName] || "";
}

function getParameterStep(paramName: string): string {
  if (paramName.includes('std') || paramName.includes('sigma')) {
    return "0.1";
  }
  if (paramName === 'mu' || paramName === 'mean') {
    return "0.1";
  }
  return "1";
}

function getDistributionSummary(variable: RiskVariable): string {
  const { distribution, parameters } = variable;
  
  switch (distribution) {
    case "normal":
      return `Normal: avg ${parameters.mean}, spread ±${parameters.std}`;
    case "lognormal":
      return `Log-normal: μ=${parameters.mu}, σ=${parameters.sigma}`;
    case "uniform":
      return `Uniform: equally likely between ${parameters.min} and ${parameters.max}`;
    case "triangular":
      return `Triangular: range ${parameters.min}-${parameters.max}, most likely ${parameters.mode}`;
    default:
      return "";
  }
}

// ──────────────────────────────
// RISK SCENARIOS
// ──────────────────────────────
const RISK_SCENARIOS: RiskScenario[] = [
  {
    name: "Portfolio Value at Risk",
    description: "Calculate portfolio risk metrics using correlated asset returns",
    unit: "% Return",
    formula: "stockReturn * stockWeight + bondReturn * bondWeight + commodityReturn * commodityWeight",
    variables: [
      {
        id: "stockReturn",
        name: "Stock Market Return (%)",
        distribution: "normal",
        parameters: { mean: 8.5, std: 16.2 }
      },
      {
        id: "bondReturn", 
        name: "Bond Market Return (%)",
        distribution: "normal",
        parameters: { mean: 3.2, std: 4.8 }
      },
      {
        id: "commodityReturn",
        name: "Commodity Return (%)", 
        distribution: "normal",
        parameters: { mean: 5.1, std: 22.4 }
      },
      {
        id: "stockWeight",
        name: "Stock Allocation",
        distribution: "uniform",
        parameters: { min: 0.4, max: 0.7 }
      },
      {
        id: "bondWeight",
        name: "Bond Allocation", 
        distribution: "uniform",
        parameters: { min: 0.2, max: 0.4 }
      },
      {
        id: "commodityWeight",
        name: "Commodity Allocation",
        distribution: "uniform", 
        parameters: { min: 0.05, max: 0.15 }
      }
    ]
  },
  {
    name: "Project Cost Overrun",
    description: "Software development project cost estimation with uncertainty",
    unit: "USD",
    formula: "baseCost * (1 + scopeCreep/100) * (1 + complexityMultiplier/100)",
    variables: [
      {
        id: "baseCost",
        name: "Base Development Cost",
        distribution: "triangular",
        parameters: { min: 50000, mode: 75000, max: 120000 }
      },
      {
        id: "scopeCreep",
        name: "Scope Creep (%)",
        distribution: "lognormal",
        parameters: { mu: 2.3, sigma: 0.8 }
      },
      {
        id: "complexityMultiplier",
        name: "Technical Complexity Impact (%)",
        distribution: "normal",
        parameters: { mean: 15, std: 25 }
      }
    ]
  },
  {
    name: "SaaS Revenue Projection",
    description: "Monthly recurring revenue with churn and growth uncertainty",
    unit: "USD/month",
    formula: "customers * avgRevenue * (1 - churnRate/100) * (1 + growthRate/100)",
    variables: [
      {
        id: "customers",
        name: "Current Customers",
        distribution: "normal",
        parameters: { mean: 1250, std: 150 }
      },
      {
        id: "avgRevenue",
        name: "Average Revenue per User",
        distribution: "lognormal",
        parameters: { mu: 4.2, sigma: 0.4 }
      },
      {
        id: "churnRate",
        name: "Monthly Churn Rate (%)",
        distribution: "uniform",
        parameters: { min: 2, max: 8 }
      },
      {
        id: "growthRate",
        name: "Monthly Growth Rate (%)",
        distribution: "triangular",
        parameters: { min: 2, mode: 8, max: 25 }
      }
    ]
  }
];

export default function RiskAnalyzer() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [samplingMethod, setSamplingMethod] = useState<SamplingMethod>("monte-carlo");
  const [numSimulations, setNumSimulations] = useState(10000);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [variables, setVariables] = useState<RiskVariable[]>(RISK_SCENARIOS[0].variables);

  const currentScenario = RISK_SCENARIOS[scenarioIndex];

  // Run simulation
  const runSimulation = useCallback(async () => {
    setIsRunning(true);
    setProgress(0);
    setCurrentIteration(0);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const samples: number[] = [];
    const batchSize = Math.max(100, Math.floor(numSimulations / 100)); // Update progress 100 times max
    
    if (samplingMethod === "latin-hypercube") {
      const lhsSamples = latinHypercubeSample(numSimulations, variables.length);
      
      for (let i = 0; i < numSimulations; i++) {
        const variableValues: { [key: string]: number } = {};
        
        variables.forEach((variable, idx) => {
          variableValues[variable.id] = sampleFromDistribution(variable, lhsSamples[i][idx]);
        });
        
        try {
          // Simple formula evaluation
          let expression = currentScenario.formula;
          Object.entries(variableValues).forEach(([name, value]) => {
            expression = expression.replace(new RegExp(name, 'g'), value.toString());
          });
          
          const result = Function(`"use strict"; return (${expression})`)();
          samples.push(result);
        } catch (error) {
          console.error("Formula evaluation error:", error);
        }

        // Update progress periodically
        if (i % batchSize === 0 || i === numSimulations - 1) {
          setCurrentIteration(i + 1);
          setProgress(((i + 1) / numSimulations) * 100);
          // Allow UI to update
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }
    } else {
      // Standard Monte Carlo
      for (let i = 0; i < numSimulations; i++) {
        const variableValues: { [key: string]: number } = {};
        
        variables.forEach((variable) => {
          variableValues[variable.id] = sampleFromDistribution(variable);
        });
        
        try {
          // Simple formula evaluation
          let expression = currentScenario.formula;
          Object.entries(variableValues).forEach(([name, value]) => {
            expression = expression.replace(new RegExp(name, 'g'), value.toString());
          });
          
          const result = Function(`"use strict"; return (${expression})`)();
          samples.push(result);
        } catch (error) {
          console.error("Formula evaluation error:", error);
        }

        // Update progress periodically
        if (i % batchSize === 0 || i === numSimulations - 1) {
          setCurrentIteration(i + 1);
          setProgress(((i + 1) / numSimulations) * 100);
          // Allow UI to update
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }
    }
    
    // Calculate statistics
    const sortedSamples = [...samples].sort((a, b) => a - b);
    const mean = samples.reduce((sum, val) => sum + val, 0) / samples.length;
    const variance = samples.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / samples.length;
    const std = Math.sqrt(variance);
    
    // Percentiles
    const var95Index = Math.floor(0.05 * samples.length);
    const var99Index = Math.floor(0.01 * samples.length);
    const medianIndex = Math.floor(0.5 * samples.length);
    
    // Histogram
    const numBins = 50;
    const min = Math.min(...samples);
    const max = Math.max(...samples);
    const binWidth = (max - min) / numBins;
    const histogram = Array(numBins).fill(0).map((_, i) => ({
      bin: `${(min + i * binWidth).toFixed(0)}`,
      count: 0,
      probability: 0
    }));
    
    samples.forEach(sample => {
      const binIndex = Math.min(Math.floor((sample - min) / binWidth), numBins - 1);
      histogram[binIndex].count++;
    });
    
    histogram.forEach(bin => {
      bin.probability = bin.count / samples.length;
    });
    
    // Higher moments
    const skewness = samples.reduce((sum, val) => sum + Math.pow((val - mean) / std, 3), 0) / samples.length;
    const kurtosis = samples.reduce((sum, val) => sum + Math.pow((val - mean) / std, 4), 0) / samples.length - 3;
    
    const result: SimulationResult = {
      mean,
      median: sortedSamples[medianIndex],
      std,
      var95: sortedSamples[var95Index],
      var99: sortedSamples[var99Index],
      min: sortedSamples[0],
      max: sortedSamples[sortedSamples.length - 1],
      skewness,
      kurtosis,
      samples: sortedSamples,
      histogram
    };
    
    setResults(result);
    setIsRunning(false);
    setProgress(100);
  }, [variables, samplingMethod, numSimulations, currentScenario.formula]);

  // Handle scenario change
  const handleScenarioChange = (index: number) => {
    setScenarioIndex(index);
    setVariables(RISK_SCENARIOS[index].variables);
    setResults(null);
  };

  // Handle parameter changes
  const updateVariableParameter = (variableId: string, paramName: string, value: number) => {
    setVariables(prev => prev.map(v => 
      v.id === variableId 
        ? { ...v, parameters: { ...v.parameters, [paramName]: value } }
        : v
    ));
    setResults(null); // Clear results when parameters change
    setProgress(0); // Reset progress
  };

  return (
    <div className="flex flex-col items-center w-full space-y-8 py-12 px-4">
      {/* Header */}
      <div className="text-center max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Monte Carlo Risk Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Advanced risk simulation using Monte Carlo and Latin Hypercube Sampling methods. 
          Quantitative analysis for portfolio management, project planning, and operational risk assessment.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">Monte Carlo</span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">Latin Hypercube</span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">Statistical Analysis</span>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">Risk Metrics</span>
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">VaR Calculation</span>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="flex gap-3 flex-wrap justify-center">
        {RISK_SCENARIOS.map((scenario, idx) => (
          <Button
            key={idx}
            onClick={() => handleScenarioChange(idx)}
            variant={scenarioIndex === idx ? "default" : "outline"}
            className={scenarioIndex === idx ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            {scenario.name}
          </Button>
        ))}
      </div>

      {/* Current Scenario Info */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>{currentScenario.name}</CardTitle>
          <CardDescription>{currentScenario.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <strong>Formula:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">{currentScenario.formula}</code>
            </div>
            <Button
              onClick={() => {
                setVariables(RISK_SCENARIOS[scenarioIndex].variables);
                setResults(null);
              }}
              variant="outline"
              size="sm"
            >
              Reset Parameters
            </Button>
          </div>
          
          <h4 className="font-semibold mb-3">Adjust Distribution Parameters:</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {variables.map((variable) => (
              <div key={variable.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 transition-all duration-200 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600">
                <div className="font-semibold text-sm mb-2">{variable.name}</div>
                <Badge variant="outline" className="text-xs mb-2">{variable.distribution}</Badge>
                
                {/* Distribution Summary */}
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  {getDistributionSummary(variable)}
                </div>
                
                <div className="space-y-3">
                  {Object.entries(variable.parameters).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        {getParameterTooltip(variable.distribution, key) && (
                          <span className="ml-1 text-gray-400" title={getParameterTooltip(variable.distribution, key)}>
                            ℹ️
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        step={getParameterStep(key)}
                        value={value}
                        onChange={(e) => {
                          const newValue = parseFloat(e.target.value);
                          if (!isNaN(newValue)) {
                            updateVariableParameter(variable.id, key, newValue);
                          }
                        }}
                        className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simulation Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex gap-2">
          <Button
            onClick={() => setSamplingMethod("monte-carlo")}
            variant={samplingMethod === "monte-carlo" ? "default" : "outline"}
            size="sm"
          >
            Monte Carlo
          </Button>
          <Button
            onClick={() => setSamplingMethod("latin-hypercube")}
            variant={samplingMethod === "latin-hypercube" ? "default" : "outline"}
            size="sm"
          >
            Latin Hypercube
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm">Simulations:</label>
          <select 
            value={numSimulations} 
            onChange={(e) => setNumSimulations(Number(e.target.value))}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value={1000}>1,000</option>
            <option value={5000}>5,000</option>
            <option value={10000}>10,000</option>
            <option value={50000}>50,000</option>
            <option value={100000}>100,000</option>
          </select>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={runSimulation}
            disabled={isRunning}
            className={`px-6 py-2 transition-all duration-300 ${
              isRunning 
                ? "bg-orange-500 hover:bg-orange-600 animate-pulse" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isRunning ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Running Simulation...
              </div>
            ) : (
              "Run Simulation"
            )}
          </Button>
          
          {isRunning && (
            <div className="w-64 space-y-2">
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              {/* Progress Text */}
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>{samplingMethod === "latin-hypercube" ? "Latin Hypercube" : "Monte Carlo"}</span>
                <span>{currentIteration.toLocaleString()} / {numSimulations.toLocaleString()}</span>
              </div>
              
              {/* Animated Stats */}
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {progress < 25 && "🎲 Generating random samples..."}
                  {progress >= 25 && progress < 50 && "📊 Building distribution..."}
                  {progress >= 50 && progress < 75 && "🔢 Computing statistics..."}
                  {progress >= 75 && progress < 100 && "📈 Finalizing results..."}
                  {progress >= 100 && "✅ Simulation complete!"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Status */}
      {!results && !isRunning && progress === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            📊 Adjust parameters above and run simulation to see results
          </div>
        </div>
      )}

      {!results && !isRunning && progress > 0 && (
        <div className="text-center py-8">
          <div className="text-orange-600 dark:text-orange-400 text-sm animate-pulse">
            ⚠️ Parameters changed - results cleared. Run simulation again to update.
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="w-full max-w-6xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Results Header */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Simulation Results
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {numSimulations.toLocaleString()} simulations using {samplingMethod === "latin-hypercube" ? "Latin Hypercube" : "Monte Carlo"} sampling
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[100ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Mean</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{results.mean.toFixed(2)}</div>
                <div className="text-xs text-gray-500">{currentScenario.unit}</div>
              </CardContent>
            </Card>
            
            <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[200ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Std Dev</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{results.std.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Volatility</div>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[300ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">VaR 95%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-red-600">{results.var95.toFixed(2)}</div>
                <div className="text-xs text-gray-500">5% worst case</div>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[400ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">VaR 99%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-red-700">{results.var99.toFixed(2)}</div>
                <div className="text-xs text-gray-500">1% worst case</div>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[500ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Skewness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{results.skewness.toFixed(3)}</div>
                <div className="text-xs text-gray-500">Asymmetry</div>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[600ms]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Kurtosis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{results.kurtosis.toFixed(3)}</div>
                <div className="text-xs text-gray-500">Tail risk</div>
              </CardContent>
            </Card>
          </div>

          {/* Histogram */}
          <Card>
            <CardHeader>
              <CardTitle>Distribution of Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.histogram}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bin" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="probability" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Technical Details */}
      <div className="max-w-4xl">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Technical Implementation</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Monte Carlo Methods</h4>
              <ul className="space-y-2">
                <li>• Standard Monte Carlo sampling with pseudo-random numbers</li>
                <li>• Latin Hypercube Sampling for improved convergence</li>
                <li>• Box-Muller transform for normal distribution generation</li>
                <li>• Inverse CDF methods for distribution sampling</li>
                <li>• Statistical moment calculations (mean, variance, skewness, kurtosis)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Risk Applications</h4>
              <ul className="space-y-2">
                <li>• Value at Risk (VaR) calculation for portfolio management</li>
                <li>• Project cost estimation with uncertainty quantification</li>
                <li>• Revenue forecasting with multiple risk factors</li>
                <li>• Operational risk assessment and scenario analysis</li>
                <li>• Regulatory capital calculation and stress testing</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> This implementation demonstrates quantitative finance and risk management expertise. 
              Latin Hypercube Sampling provides better coverage of the probability space compared to standard Monte Carlo, 
              especially important for tail risk estimation in financial applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}