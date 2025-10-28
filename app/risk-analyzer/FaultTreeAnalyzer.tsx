"use client";

import { useState, useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Position,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";

// ──────────────────────────────
// TYPES
// ──────────────────────────────
type GateType = "AND" | "OR";

interface BasicEvent {
  id: string;
  label: string;
  probability: number;
}

interface Gate {
  id: string;
  label: string;
  type: GateType;
  inputs: string[]; // IDs of child events or gates
}

interface FaultTreeScenario {
  name: string;
  topEvent: string;
  basicEvents: BasicEvent[];
  gates: Gate[];
}

// ──────────────────────────────
// DAGRE CONFIG
// ──────────────────────────────
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 220;
const nodeHeight = 80;

function getLayoutedElements(nodes: Node[], edges: Edge[], direction = "TB") {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 150 });

  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  );
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    };
    return node;
  });

  return { nodes: layoutedNodes, edges };
}

// ──────────────────────────────
// SOFTWARE-FOCUSED SCENARIOS
// ──────────────────────────────
const SCENARIOS: FaultTreeScenario[] = [
  {
    name: "Large Company vs Small Team Risk",
    topEvent: "Project Failure / Poor Outcome",
    basicEvents: [
      { id: "account-manager", label: "Account Manager Turnover", probability: 0.25 },
      { id: "project-manager", label: "Project Manager Reassignment", probability: 0.20 },
      { id: "developer-rotation", label: "Developer Team Rotation", probability: 0.30 },
      { id: "deprioritized", label: "Project Deprioritized (Small Client)", probability: 0.40 },
      { id: "enterprise-client", label: "Enterprise Client Takes Priority", probability: 0.35 },
      { id: "approval-chain", label: "Multi-Layer Approval Delays", probability: 0.50 },
      { id: "rigid-process", label: "Rigid Process Prevents Quick Fix", probability: 0.45 },
      { id: "offshore-handoff", label: "Offshore Handoff Communication Gap", probability: 0.38 },
      { id: "context-loss", label: "Knowledge Loss in Handoffs", probability: 0.42 },
      { id: "template-mismatch", label: "Template Solution Doesn't Fit Needs", probability: 0.35 },
      { id: "upsell-focus", label: "Sales Upsell Over Delivery Focus", probability: 0.28 },
    ],
    gates: [
      { id: "team-continuity-loss", label: "Team Continuity Lost", type: "OR", inputs: ["account-manager", "project-manager", "developer-rotation"] },
      { id: "client-deprioritization", label: "Small Client Deprioritized", type: "OR", inputs: ["deprioritized", "enterprise-client"] },
      { id: "bureaucracy-overhead", label: "Bureaucratic Overhead", type: "OR", inputs: ["approval-chain", "rigid-process"] },
      { id: "communication-breakdown", label: "Communication Breakdown", type: "OR", inputs: ["offshore-handoff", "context-loss", "team-continuity-loss"] },
      { id: "poor-fit-solution", label: "Poor-Fit Solution", type: "OR", inputs: ["template-mismatch", "upsell-focus"] },
      { id: "large-company-risks", label: "Large Company Structural Risks", type: "OR", inputs: ["client-deprioritization", "bureaucracy-overhead"] },
      { id: "root", label: "Project Failure / Poor Outcome", type: "OR", inputs: ["large-company-risks", "communication-breakdown", "poor-fit-solution"] },
    ],
  },
  {
    name: "Payment Processing Failure",
    topEvent: "Transaction Failed / Financial Loss",
    basicEvents: [
      { id: "stripe-down", label: "Stripe API Outage", probability: 0.005 },
      { id: "paypal-down", label: "PayPal Gateway Down", probability: 0.008 },
      { id: "fraud-detection-fail", label: "Fraud Detection Service Timeout", probability: 0.015 },
      { id: "insufficient-funds", label: "Insufficient Funds Check Failed", probability: 0.02 },
      { id: "db-lock", label: "Transaction DB Lock/Timeout", probability: 0.012 },
      { id: "race-condition", label: "Double-Spend Race Condition", probability: 0.003 },
      { id: "crypto-validation", label: "Payment Token Validation Error", probability: 0.01 },
      { id: "retry-exhausted", label: "Retry Logic Exhausted", probability: 0.025 },
    ],
    gates: [
      { id: "payment-gateways", label: "All Payment Gateways Down", type: "AND", inputs: ["stripe-down", "paypal-down"] },
      { id: "validation-failure", label: "Payment Validation Failed", type: "OR", inputs: ["fraud-detection-fail", "insufficient-funds", "crypto-validation"] },
      { id: "data-integrity", label: "Data Integrity Issue", type: "OR", inputs: ["db-lock", "race-condition"] },
      { id: "processing-error", label: "Processing Error", type: "OR", inputs: ["payment-gateways", "validation-failure", "data-integrity"] },
      { id: "root", label: "Transaction Failed / Financial Loss", type: "OR", inputs: ["processing-error", "retry-exhausted"] },
    ],
  },
  {
    name: "Microservices API Outage",
    topEvent: "API Service Unavailable",
    basicEvents: [
      { id: "k8s-pod-crash", label: "Kubernetes Pod CrashLoopBackOff", probability: 0.03 },
      { id: "hpa-fail", label: "Horizontal Pod Autoscaler Failure", probability: 0.015 },
      { id: "redis-cache-down", label: "Redis Cache Cluster Down", probability: 0.02 },
      { id: "postgres-primary", label: "PostgreSQL Primary Failure", probability: 0.01 },
      { id: "postgres-replica", label: "PostgreSQL Replica Failure", probability: 0.015 },
      { id: "rate-limit-bug", label: "Rate Limiter Bug (False Rejects)", probability: 0.025 },
      { id: "circuit-breaker", label: "Circuit Breaker Stuck Open", probability: 0.018 },
      { id: "auth-service-down", label: "Auth Service Unavailable", probability: 0.022 },
      { id: "nginx-config", label: "NGINX Misconfiguration", probability: 0.01 },
    ],
    gates: [
      { id: "orchestration-fail", label: "Container Orchestration Fail", type: "AND", inputs: ["k8s-pod-crash", "hpa-fail"] },
      { id: "db-complete-fail", label: "Database Completely Down", type: "AND", inputs: ["postgres-primary", "postgres-replica"] },
      { id: "data-layer-fail", label: "Data Layer Failure", type: "OR", inputs: ["redis-cache-down", "db-complete-fail"] },
      { id: "gateway-issues", label: "API Gateway Issues", type: "OR", inputs: ["rate-limit-bug", "circuit-breaker", "nginx-config"] },
      { id: "infrastructure-fail", label: "Infrastructure Failure", type: "OR", inputs: ["orchestration-fail", "data-layer-fail"] },
      { id: "root", label: "API Service Unavailable", type: "OR", inputs: ["infrastructure-fail", "gateway-issues", "auth-service-down"] },
    ],
  },
  {
    name: "CI/CD Pipeline Failure",
    topEvent: "Failed Production Deployment",
    basicEvents: [
      { id: "unit-tests-fail", label: "Unit Tests Failed", probability: 0.08 },
      { id: "integration-tests-fail", label: "Integration Tests Failed", probability: 0.12 },
      { id: "security-scan", label: "Security Scan Blocked (Vulnerabilities)", probability: 0.06 },
      { id: "docker-build", label: "Docker Build Failure", probability: 0.04 },
      { id: "registry-push", label: "Container Registry Push Failed", probability: 0.015 },
      { id: "github-actions-down", label: "GitHub Actions Runner Down", probability: 0.01 },
      { id: "terraform-plan-fail", label: "Terraform Plan Failed", probability: 0.05 },
      { id: "health-check-fail", label: "Post-Deploy Health Check Failed", probability: 0.07 },
      { id: "rollback-fail", label: "Automatic Rollback Failed", probability: 0.02 },
    ],
    gates: [
      { id: "test-gate-fail", label: "Test Gate Failed", type: "OR", inputs: ["unit-tests-fail", "integration-tests-fail"] },
      { id: "build-artifact-fail", label: "Build Artifact Failed", type: "OR", inputs: ["docker-build", "registry-push"] },
      { id: "quality-gate", label: "Quality Gate Failed", type: "OR", inputs: ["test-gate-fail", "security-scan"] },
      { id: "build-phase-fail", label: "Build Phase Failed", type: "OR", inputs: ["quality-gate", "build-artifact-fail", "github-actions-down"] },
      { id: "deploy-phase-fail", label: "Deploy Phase Failed", type: "OR", inputs: ["terraform-plan-fail", "health-check-fail"] },
      { id: "deployment-issue", label: "Deployment Issue", type: "OR", inputs: ["build-phase-fail", "deploy-phase-fail"] },
      { id: "root", label: "Failed Production Deployment", type: "OR", inputs: ["deployment-issue", "rollback-fail"] },
    ],
  },
];

export default function FaultTreeAnalyzer() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [basicEvents, setBasicEvents] = useState<BasicEvent[]>(SCENARIOS[0].basicEvents);
  const [showProbabilities, setShowProbabilities] = useState(false);

  const currentScenario = SCENARIOS[scenarioIndex];

  // ──────────────────────────────
  // PROBABILITY CALCULATION
  // ──────────────────────────────
  const calculateProbability = (nodeId: string, memo: Map<string, number> = new Map()): number => {
    if (memo.has(nodeId)) return memo.get(nodeId)!;

    // Check if it's a basic event
    const basicEvent = basicEvents.find(e => e.id === nodeId);
    if (basicEvent) {
      memo.set(nodeId, basicEvent.probability);
      return basicEvent.probability;
    }

    // It's a gate
    const gate = currentScenario.gates.find(g => g.id === nodeId);
    if (!gate) return 0;

    const inputProbs = gate.inputs.map(inputId => calculateProbability(inputId, memo));

    let probability = 0;
    if (gate.type === "AND") {
      // All inputs must fail: P = P1 × P2 × ... × Pn
      probability = inputProbs.reduce((acc, p) => acc * p, 1);
    } else if (gate.type === "OR") {
      // At least one input fails: P = 1 - (1-P1) × (1-P2) × ... × (1-Pn)
      probability = 1 - inputProbs.reduce((acc, p) => acc * (1 - p), 1);
    }

    memo.set(nodeId, probability);
    return probability;
  };

  // ──────────────────────────────
  // HANDLERS
  // ──────────────────────────────
  const handleScenarioChange = (index: number) => {
    setScenarioIndex(index);
    setBasicEvents(SCENARIOS[index].basicEvents);
    setShowProbabilities(false);
  };

  const handleProbabilityChange = (id: string, value: number) => {
    setBasicEvents(prev =>
      prev.map(e => e.id === id ? { ...e, probability: value } : e)
    );
  };

  // ──────────────────────────────
  // BUILD & LAYOUT NODES
  // ──────────────────────────────
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const probMemo = new Map<string, number>();

    // Build gates (intermediate events)
    currentScenario.gates.forEach((gate) => {
      const prob = calculateProbability(gate.id, probMemo);
      const isRoot = gate.id === "root";

      nodes.push({
        id: gate.id,
        data: {
          label: (
            <div className="text-center">
              <div className="font-bold text-sm mb-1">{gate.label}</div>
              <div className="text-xs bg-blue-500 text-white px-2 py-1 rounded">{gate.type} Gate</div>
              {showProbabilities && (
                <div className="text-xs font-mono mt-1 text-blue-600 dark:text-blue-400">
                  P = {(prob * 100).toFixed(2)}%
                </div>
              )}
            </div>
          )
        },
        position: { x: 0, y: 0 },
        style: {
          border: isRoot ? "3px solid #ef4444" : "2px solid #3b82f6",
          background: "var(--background)",
          color: "var(--foreground)",
          borderRadius: 8,
          padding: 12,
          minWidth: 200,
        },
      });

      // Create edges from gate to inputs (showing decomposition)
      gate.inputs.forEach((inputId) => {
        edges.push({
          id: `edge-${gate.id}-${inputId}`,
          source: gate.id,
          target: inputId,
          animated: isRoot,
          type: "smoothstep",
          style: { stroke: isRoot ? "#ef4444" : "#3b82f6" },
        });
      });
    });

    // Build basic events (leaf nodes)
    basicEvents.forEach((event) => {
      nodes.push({
        id: event.id,
        data: {
          label: (
            <div className="text-center">
              <div className="text-xs font-semibold mb-1">{event.label}</div>
              {showProbabilities && (
                <div className="text-xs font-mono text-green-600 dark:text-green-400">
                  P = {(event.probability * 100).toFixed(2)}%
                </div>
              )}
            </div>
          )
        },
        position: { x: 0, y: 0 },
        style: {
          background: "var(--background)",
          color: "var(--foreground)",
          borderRadius: 6,
          border: "2px solid #10b981",
          padding: 8,
          minWidth: 180,
        },
      });
    });

    // Apply Dagre layout (Top-to-Bottom for fault trees)
    return getLayoutedElements(nodes, edges, "TB");
  }, [currentScenario, basicEvents, showProbabilities]);

  const topEventProb = useMemo(() => {
    const rootGate = currentScenario.gates.find(g => g.id === "root");
    return rootGate ? calculateProbability("root") : 0;
  }, [currentScenario, basicEvents]);

  // ReactFlow state management
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Update nodes and edges when layout changes
  useEffect(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);

  // ──────────────────────────────
  // RENDER
  // ──────────────────────────────
  return (
    <div className="flex flex-col items-center w-full space-y-8 py-12 px-4">
      {/* Header */}
      <div className="text-center max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Fault Tree Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive fault tree analysis for software systems using Boolean logic gates and probability theory.
          Explore real-world scenarios in payment processing, microservices, and CI/CD to understand
          how redundancy and failure modes impact system reliability.
        </p>
      </div>

      {/* Scenario Selection */}
      <div className="flex gap-3 flex-wrap justify-center">
        {SCENARIOS.map((scenario, idx) => (
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

      {/* Basic Events Configuration */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Basic Events (Leaf Nodes)
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {basicEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 border border-green-500 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {event.label}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={event.probability * 100}
                onChange={(e) => handleProbabilityChange(event.id, parseFloat(e.target.value) / 100)}
                className="w-full accent-green-600 mb-2"
              />
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={(event.probability * 100).toFixed(1)}
                  onChange={(e) => handleProbabilityChange(event.id, parseFloat(e.target.value) / 100)}
                  className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">% failure</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => setShowProbabilities(!showProbabilities)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          {showProbabilities ? "Hide Probabilities" : "Calculate & Show Probabilities"}
        </Button>
        {showProbabilities && (
          <div className="text-center px-6 py-3 bg-red-100 dark:bg-red-900 border-2 border-red-500 rounded-lg">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Top Event Failure Probability
            </div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {(topEventProb * 100).toFixed(4)}%
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {showProbabilities && (
        <div className="flex gap-6 flex-wrap justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-500 rounded"></div>
            <span>Basic Event (Leaf)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
            <span>Intermediate Event (Gate)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-red-500 rounded"></div>
            <span>Top Event</span>
          </div>
        </div>
      )}

      {/* Visualization Area */}
      <div className="w-full h-[600px] max-w-6xl border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
        <ReactFlow
          key={scenarioIndex}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={16} size={1} />
          <Controls />
        </ReactFlow>
      </div>

      {/* Explanation */}
      <div className="max-w-4xl space-y-4">
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <strong className="text-blue-700 dark:text-blue-300">AND Gate:</strong>
            <p className="mt-1">All inputs must fail for the gate to fail (redundancy protection).</p>
            <code className="block mt-2 text-xs font-mono">P = P₁ × P₂ × ... × Pₙ</code>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
            <strong className="text-orange-700 dark:text-orange-300">OR Gate:</strong>
            <p className="mt-1">At least one input must fail for the gate to fail (single point of failure).</p>
            <code className="block mt-2 text-xs font-mono">P = 1 - (1-P₁) × (1-P₂) × ... × (1-Pₙ)</code>
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
          <p>
            <strong>Technical Implementation:</strong> This analyzer uses recursive probability calculation with memoization,
            directed acyclic graph (DAG) layout via Dagre, and React Flow for interactive visualization.
            Real-world applications include SRE reliability engineering, incident postmortem analysis, and SLA/SLO planning.
          </p>
          <p>
            <strong>Domain Knowledge:</strong> Payment processing models PCI-DSS compliance concerns and financial transaction integrity.
            Microservices scenario demonstrates understanding of cloud-native architecture, container orchestration, and distributed system patterns.
            CI/CD pipeline shows DevOps practices including infrastructure-as-code, security scanning, and deployment automation.
          </p>
          <p>
            <strong>Business Insight:</strong> The &quot;Large Company vs Small Team&quot; scenario models real organizational risks that
            many clients face when working with enterprise vendors. Small, focused teams (5-10 people) eliminate many failure modes:
            direct access to developers, consistent team composition, agile decision-making, and genuine client prioritization.
            This analysis demonstrates both technical capability and business acumen.
          </p>
        </div>
      </div>
    </div>
  );
}
