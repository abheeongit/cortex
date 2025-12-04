import { create } from "zustand";
import sampleNodes from "../data/sampleNodes.json";
import sampleEdges from "../data/sampleEdges.json";

const useNodeStore = create((set) => ({
  nodes: sampleNodes,
  edges: sampleEdges,
  selectedNode: null,

  selectNode: (id) =>
    set((state) => ({
      selectedNode: state.nodes.find((n) => n.id === id) || null,
    })),

  addNode: (node) =>
    set((state) => ({ nodes: [...state.nodes, node] })),

  addEdge: (edge) =>
    set((state) => ({ edges: [...state.edges, edge] })),
}));

export default useNodeStore;
