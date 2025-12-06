import { create } from "zustand";

const useNodeStore = create((set) => ({
  // INITIAL NODES
  nodes: [
    {
      id: "node-1",
      x: 0,
      y: 0,
      z: 0,
      color: "#4fdfff", // BLUE
      radius: 1.2,
    },
    {
      id: "node-2",
      x: 3,
      y: 1,
      z: -1,
      color: "#ff6ad5", // PINK/PURPLE
      radius: 1.2,
    },
    {
      id: "node-3",
      x: -3,
      y: -1,
      z: 1,
      color: "#a6ff4d", // GREEN
      radius: 1.2,
    },
  ],

  edges: [],

  selectedNode: null,
  isDragging: false,

  // CONNECT MODE STATE
  isConnectMode: false,
  firstNode: null,

  toggleConnectMode: () =>
    set((state) => ({
      isConnectMode: !state.isConnectMode,
      firstNode: null, // reset whenever toggled
      selectedNode: null,
    })),

  // Select a node
  selectNode: (id) => set({ selectedNode: id }),

  // Called when a node is clicked WHILE in connect mode
  handleConnectClick: (nodeId) =>
    set((state) => {
      // If firstNode is not chosen yet → choose it
      if (!state.firstNode) {
        return { firstNode: nodeId };
      }

      // If second node chosen → create an edge
      if (state.firstNode !== nodeId) {
        const newEdge = {
          from: state.firstNode,
          to: nodeId,
        };

        return {
          edges: [...state.edges, newEdge],
          firstNode: null,
          isConnectMode: false,
          selectedNode: null,
        };
      }

      return {};
    }),

  // Drag state
  setDragging: (v) => set({ isDragging: v }),

  // Add a new node
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  // Update a node's position
  updateNodePosition: (id, x, y, z) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, x, y, z } : n
      ),
    })),
}));

export default useNodeStore;
