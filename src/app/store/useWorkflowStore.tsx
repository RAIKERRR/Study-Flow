import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

import type {
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange
} from "reactflow";

import { runStudyFlow } from "./executionEngine";

/* ---------------- LOCAL STORAGE HELPERS ---------------- */

const saveWorkflow = (nodes: Node[], edges: Edge[]) => {
  const data = JSON.stringify({ nodes, edges });
  localStorage.setItem("studyflow-workflow", data);
};

const loadWorkflow = () => {
  const saved = localStorage.getItem("studyflow-workflow");

  if (!saved) {
    return { nodes: [], edges: [] };
  }

  try {
    return JSON.parse(saved);
  } catch {
    return { nodes: [], edges: [] };
  }
};

const initial = loadWorkflow();

/* ---------------- STORE TYPE ---------------- */

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];
  logs: string[];

  theme: "light" | "dark";
  toggleTheme: () => void;

  past: { nodes: Node[]; edges: Edge[] }[];
  future: { nodes: Node[]; edges: Edge[] }[];

  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
  updateNodeData: (id: string, data: any) => void;

  runningNode: string | null;
  setRunningNode: (id: string | null) => void;

  addTrigger: () => void;
  addCondition: () => void;
  addAction: () => void;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  runWorkflow: () => void;
  addLog: (msg: string) => void;

  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;
  exportWorkflow: () => void;
  importWorkflow: (data: any) => void;
};

/* ---------------- STORE ---------------- */

export const useWorkflowStore = create<WorkflowState>((set, get) => ({

  nodes: initial.nodes,
  edges: initial.edges,
  logs: [],

  /* ---------- THEME ---------- */

  theme: "dark",

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark"
    })),

  /* ---------- HISTORY ---------- */

  past: [],
  future: [],

  selectedNode: null,

  runningNode: null,

  setRunningNode: (id) => {
    set({ runningNode: id });
  },

  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },

  updateNodeData: (id, newData) => {

    const { nodes, edges, selectedNode } = get();

    const updatedNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            ...node.data,
            ...newData
          }
        };
      }
      return node;
    });

    saveWorkflow(updatedNodes, edges);

    const updatedSelected =
      selectedNode && selectedNode.id === id
        ? {
            ...selectedNode,
            data: {
              ...selectedNode.data,
              ...newData
            }
          }
        : selectedNode;

    set({
      nodes: updatedNodes,
      selectedNode: updatedSelected
    });
  },

  /* ---------------- ADD TRIGGER ---------------- */

  addTrigger: () => {

    const { nodes, edges, past } = get();

    const node: Node = {
      id: crypto.randomUUID(),
      type: "trigger",
      position: { x: 200, y: 200 },
      data: { label: "Start Study Session" },
    };

    const newNodes = [...nodes, node];

    saveWorkflow(newNodes, edges);

    set({
      past: [...past, {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges))
      }],
      nodes: newNodes,
      future: []
    });

  },

  /* ---------------- ADD CONDITION ---------------- */

  addCondition: () => {

    const { nodes, edges, past } = get();

    const node: Node = {
      id: crypto.randomUUID(),
      type: "condition",
      position: { x: 450, y: 200 },
      data: { rule: "Study Time > 30 minutes" },
    };

    const newNodes = [...nodes, node];

    saveWorkflow(newNodes, edges);

    set({
      past: [...past, {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges))
      }],
      nodes: newNodes,
      future: []
    });

  },

  /* ---------------- ADD ACTION ---------------- */

  addAction: () => {

    const { nodes, edges, past } = get();

    const node: Node = {
      id: crypto.randomUUID(),
      type: "action",
      position: { x: 700, y: 200 },
      data: { action: "Take Break" },
    };

    const newNodes = [...nodes, node];

    saveWorkflow(newNodes, edges);

    set({
      past: [...past, {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges))
      }],
      nodes: newNodes,
      future: []
    });

  },

  /* ---------------- NODE MOVEMENT ---------------- */

  onNodesChange: (changes) => {

    const { nodes, edges,  } = get();

    const newNodes = applyNodeChanges(changes, nodes);

    saveWorkflow(newNodes, edges);

    set({
      nodes: newNodes,
    });

  },

  /* ---------------- EDGE MOVEMENT ---------------- */

  onEdgesChange: (changes) => {

    const { nodes, edges,  } = get();

    const newEdges = applyEdgeChanges(changes, edges);

    saveWorkflow(nodes, newEdges);

    set({
      edges: newEdges,
          });

  },

  /* ---------------- CONNECT NODES ---------------- */

  onConnect: (connection) => {

    const { nodes, edges, past } = get();

    const newEdges = addEdge(connection, edges);

    saveWorkflow(nodes, newEdges);

    set({
      edges: newEdges,
      past: [...past, {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges))
      }],
      future: []
    });

  },

  /* ---------------- LOGS ---------------- */

  addLog: (msg) => {
    set({
      logs: [...get().logs, msg],
    });
  },

  runWorkflow: () => {

    const { nodes, edges, addLog } = get();

    set({ logs: [] });

    runStudyFlow(nodes, edges, addLog);
  },

  /* ---------------- UNDO ---------------- */

  undo: () => {

    const { past, nodes, edges, future } = get();

    if (past.length === 0) return;

    const previous = past[past.length - 1];

    saveWorkflow(previous.nodes, previous.edges);

    set({
      nodes: previous.nodes,
      edges: previous.edges,
      past: past.slice(0, past.length - 1),
      future: [
        {
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(edges))
        },
        ...future
      ]
    });

  },

  /* ---------------- REDO ---------------- */

  redo: () => {

    const { future, nodes, edges, past } = get();

    if (future.length === 0) return;

    const next = future[0];

    saveWorkflow(next.nodes, next.edges);

    set({
      nodes: next.nodes,
      edges: next.edges,
      future: future.slice(1),
      past: [
        ...past,
        {
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(edges))
        }
      ]
    });

  },

  clearCanvas: () => {

    const { nodes, edges, past } = get();

    localStorage.removeItem("studyflow-workflow");

    set({
      nodes: [],
      edges: [],
      past: [...past, { nodes, edges }],
      future: []
    });

  },

  exportWorkflow: () => {

    const { nodes, edges } = get();

    const data = JSON.stringify({ nodes, edges }, null, 2);

    const blob = new Blob([data], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "studyflow-workflow.json";
    a.click();

    URL.revokeObjectURL(url);

  },

  importWorkflow: (data) => {

    if (!data) return;

    saveWorkflow(data.nodes || [], data.edges || []);

    set({
      nodes: data.nodes || [],
      edges: data.edges || []
    });

  },

}));