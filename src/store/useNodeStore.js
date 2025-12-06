import { create } from "zustand";
import sampleNodes from "../data/sampleNodes.json";
import sampleEdges from "../data/sampleEdges.json";

const useNodeStore = create((set) => ({
  nodes: sampleNodes,
  edges: sampleEdges,

  selectedNode: null,

  // Phase 2 states
  isConnectMode: false,
  startNodeForConnection: null,

  // Dragging state (Phase 4)
  isDragging: false,
  draggingNodeId: null,

  // SELECT NODE (normal mode)
  selectNode: (id) =>
    set((state) => ({
      selectedNode: state.nodes.find((n) => n.id === id) || null,
    })),

  // CREATE NODE
  addNode: (node) =>
    set((state) => ({ nodes: [...state.nodes, node] })),

  // UPDATE NODE (including position updates)
  updateNode: (id, updatedFields) =>
    set((state) => {
      const updatedNodes = state.nodes.map((node) =>
        node.id === id ? { ...node, ...updatedFields } : node
      );

      return {
        nodes: updatedNodes,
        selectedNode: updatedNodes.find((n) => n.id === id) || state.selectedNode,
      };
    }),

  // DELETE NODE + REMOVE RELATED EDGES
  deleteNode: (id) =>
    set((state) => {
      return {
        nodes: state.nodes.filter((n) => n.id !== id),
        edges: state.edges.filter((e) => e.from !== id && e.to !== id),
        selectedNode: state.selectedNode && state.selectedNode.id === id ? null : state.selectedNode,
      };
    }),

  // PHASE 2 — CONNECT MODE
  toggleConnectMode: () =>
    set((s) => ({
      isConnectMode: !s.isConnectMode,
      startNodeForConnection: null,
      selectedNode: null,
    })),

  // STEP 1: Select first node
  startConnection: (id) =>
    set(() => ({
      startNodeForConnection: id,
    })),

  // STEP 2: Select second node
  finishConnection: (secondId) =>
    set((state) => {
      const firstId = state.startNodeForConnection;

      if (!firstId || firstId === secondId)
        return {
          isConnectMode: false,
          startNodeForConnection: null,
        };

      const newEdge = { from: firstId, to: secondId };

      return {
        edges: [...state.edges, newEdge],
        isConnectMode: false,
        startNodeForConnection: null,
      };
    }),

  // DRAGGING CONTROLS
  setDragging: (isDragging) =>
    set(() => ({
      isDragging,
      draggingNodeId: isDragging ? null : null, // keep but we'll set draggingNodeId separately
    })),

  setDraggingNode: (id) =>
    set(() => ({
      draggingNodeId: id,
      isDragging: !!id,
    })),
}));

export default useNodeStore;
