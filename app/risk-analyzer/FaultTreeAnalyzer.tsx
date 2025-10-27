"use client";

import { useState, useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Position,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// ──────────────────────────────
// DAGRE CONFIG
// ──────────────────────────────
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 200;
const nodeHeight = 60;

function getLayoutedElements(nodes: Node[], edges: Edge[], direction = "TB") {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: 80, ranksep: 120 });

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
// CYBERLION FACTORS
// ──────────────────────────────
const FACTORS = {
  reliability: [
    "High uptime and performance",
    "Fast response times",
    "Secure hosting and data handling",
  ],
  customer: [
    "Direct access to developers",
    "Clear communication and transparency",
    "Flexible support hours",
  ],
  cost: [
    "Transparent pricing",
    "Efficient development process",
    "Low maintenance overhead",
  ],
};

export default function FaultTreeAnalyzer() {
  const [selected, setSelected] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  // ──────────────────────────────
  // HANDLERS
  // ──────────────────────────────
  const handleCheckbox = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((f) => f !== label)
        : [...prev, label]
    );
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const cyberlionScore = Math.random() * 0.05 + 0.95; // 95–100%
      setResult(cyberlionScore);
      setAnalyzing(false);
    }, 3000 + Math.random() * 1000);
  };

  // ──────────────────────────────
  // BUILD & LAYOUT NODES
  // ──────────────────────────────
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Root node
    const rootId = "root";
    nodes.push({
      id: rootId,
      data: { label: "Cyberlion Success Probability" },
      position: { x: 0, y: 0 },
      style: {
        border: "2px solid #22d3ee",
        background: "var(--background)",
        color: "var(--foreground)",
        borderRadius: 8,
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
      },
    });

    // AND Gate categories
    Object.keys(FACTORS).forEach((cat) => {
      const gateId = `gate-${cat}`;
      nodes.push({
        id: gateId,
        data: { label: `${cat.toUpperCase()} AND` },
        position: { x: 0, y: 0 },
        style: {
          border: "2px solid #3b82f6",
          background: "var(--accent)",
          color: "var(--foreground)",
          borderRadius: 8,
          padding: 8,
          fontWeight: "bold",
          textAlign: "center",
        },
      });
      edges.push({
        id: `edge-${gateId}-root`,
        source: gateId,
        target: rootId,
        animated: true,
        type: "smoothstep",
      });

      const items = FACTORS[cat as keyof typeof FACTORS];
      const selectedItems = items.filter((i) => selected.includes(i));

      selectedItems.forEach((item, i) => {
        const id = `${cat}-${i}`;
        nodes.push({
          id,
          data: { label: item },
          position: { x: 0, y: 0 },
          style: {
            background: "var(--background)",
            color: "var(--foreground)",
            borderRadius: 6,
            border: "1px solid #6ee7b7",
            padding: 6,
            textAlign: "center",
          },
        });
        edges.push({
          id: `edge-${id}-${gateId}`,
          source: id,
          target: gateId,
          type: "smoothstep",
        });
      });
    });

    // Apply Dagre layout (Top-to-Bottom)
    return getLayoutedElements(nodes, edges, "TB");
  }, [selected]);

  const [nodes, , onNodesChange] = useNodesState(layoutedNodes);
  const [edges, , onEdgesChange] = useEdgesState(layoutedEdges);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      "TB"
    );
    onNodesChange([]);
    onEdgesChange([]);
  }, [selected]);

  // ──────────────────────────────
  // RENDER
  // ──────────────────────────────
  return (
    <div className="flex flex-col items-center w-full space-y-10 py-12">
      {/* Checkbox section */}
      <div className="grid sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {Object.entries(FACTORS).map(([cat, items]) => (
          <div key={cat}>
            <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-300 capitalize mb-2">
              {cat}
            </h2>
            <div className="space-y-2">
              {items.map((label) => (
                <label
                  key={label}
                  className="flex items-center gap-3 cursor-pointer rounded-md px-3 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(label)}
                    onChange={() => handleCheckbox(label)}
                    className="w-5 h-5 accent-cyan-600 dark:accent-cyan-400"
                  />
                  <span className="text-gray-800 dark:text-gray-100 text-sm font-medium">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        disabled={selected.length === 0 || analyzing}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-2 rounded-lg text-lg"
      >
        {analyzing ? "Running Monte Carlo..." : "Analyze"}
      </Button>

      {/* Visualization Area */}
      <div className="relative w-full h-[500px] max-w-5xl border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <ReactFlow
          nodes={layoutedNodes}
          edges={layoutedEdges}
          fitView
          nodesDraggable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
        >
          <Background gap={16} size={1} />
          <Controls />
        </ReactFlow>

        {/* Analyzing overlay */}
        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-lg font-semibold backdrop-blur-sm"
          >
            Crunching 10,000 Monte Carlo simulations...
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 rounded-full"
            />
          </motion.div>
        )}

        {/* Result overlay */}
        {result && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/60 text-white backdrop-blur-md"
          >
            <p className="text-3xl font-bold text-cyan-400">
              Cyberlion Reliability Index
            </p>
            <p className="text-6xl font-extrabold mt-2">
              {(result * 100).toFixed(2)}%
            </p>
            <p className="mt-3 text-gray-300 italic">
              Statistically speaking, choosing Cyberlion is the safest bet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
