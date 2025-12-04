import React, { useState } from "react";
import { motion } from "framer-motion";
import useNodeStore from "../../store/useNodeStore";
import EditNodeModal from "./EditNodeModal";

export default function RightPanel() {
  const selected = useNodeStore((s) => s.selectedNode);
  const nodes = useNodeStore((s) => s.nodes);
  const edges = useNodeStore((s) => s.edges);

  const deleteNode = useNodeStore((s) => s.deleteNode);
  const selectNode = useNodeStore((s) => s.selectNode);

  const [isEditOpen, setEditOpen] = useState(false);

  if (!selected)
    return <div className="text-slate-400 mt-6">Click a node to view details.</div>;

  return (
    <motion.div
      key={selected.id}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
      <p className="text-sm text-slate-300 mb-4">{selected.description}</p>

      <div className="text-xs text-slate-400 mb-4">
        Tags: {selected.tags?.join(", ") || "none"}
      </div>

      <h3 className="text-sm text-slate-400 mb-1">Connections:</h3>
      <ul className="text-slate-300 text-sm flex flex-col gap-1 mb-4">
        {edges
          .filter((e) => e.from === selected.id || e.to === selected.id)
          .map((conn, i) => {
            const otherId = conn.from === selected.id ? conn.to : conn.from;
            const otherNode = nodes.find((n) => n.id === otherId);

            return (
              <li
                key={i}
                className="cursor-pointer hover:text-white"
                onClick={() => selectNode(otherId)}
              >
                → {otherNode?.title || "Unknown"}
              </li>
            );
          })}
      </ul>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setEditOpen(true)}
          className="px-3 py-2 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 transition"
        >
          Edit
        </button>

        <button
          onClick={() => deleteNode(selected.id)}
          className="px-3 py-2 rounded bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition"
        >
          Delete
        </button>
      </div>

      <EditNodeModal isOpen={isEditOpen} onClose={() => setEditOpen(false)} />
    </motion.div>
  );
}
