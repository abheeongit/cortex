import { create } from "zustand";
import sampleNodes from "../data/sampleNodes.json";
import sampleEdges from "../data/sampleEdges.json";

const useNodeStore = create((set) => ({
  nodes: sampleNodes,
  edges: sampleEdges,

  selectedNode: null,

  // connect mode state
  isConnectMode: false,
  startNodeForConnection: null,

  // SELECT NODE
  selectNode: (id) =>
    set((state) => ({
      selectedNode: state.nodes.find((n) => n.id === id) || null,
    })),

  // CREATE NODE
  addNode: (node) =>
    set((state) => ({ nodes: [...state.nodes, node] })),

  // UPDATE NODE
  updateNode: (id, updatedFields) =>
    set((state) => {
      const updatedNodes = state.nodes.map((node) =>
        node.id === id ? { ...node, ...updatedFields } : node
      );

      return {
        nodes: updatedNodes,
        selectedNode:
          updatedNodes.find((n) => n.id === id) || null,
      };
    }),

  // DELETE NODE + CLEAN EDGES
  deleteNode: (id) =>
    set((state) => {
      const filteredNodes = state.nodes.filter((n) => n.id !== id);
      const filteredEdges = state.edges.filter(
        (e) => e.from !== id && e.to !== id
      );

      return {
        nodes: filteredNodes,
        edges: filteredEdges,
        selectedNode: null,
      };
    }),

  // 🔥 CONNECT MODE ENABLE / DISABLE
  toggleConnectMode: () =>
    set((s) => ({
      isConnectMode: !s.isConnectMode,
      startNodeForConnection: null,
    })),

  // 🔥 STEP 1: SELECT FIRST NODE
  startConnection: (id) =>
    set(() => ({
      startNodeForConnection: id,
    })),

  // 🔥 STEP 2: SELECT SECOND NODE → CREATE EDGE
  finishConnection: (secondId) =>
    set((state) => {
      const firstId = state.startNodeForConnection;

      // do nothing if same node clicked
      if (!firstId || firstId === secondId)
        return { isConnectMode: false, startNodeForConnection: null };

      // add edge
      const newEdge = { from: firstId, to: secondId };

      return {
        edges: [...state.edges, newEdge],
        isConnectMode: false,
        startNodeForConnection: null,
      };
    }),
}));

export default useNodeStore;
