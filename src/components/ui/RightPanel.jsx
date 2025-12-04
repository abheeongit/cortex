import React from "react";
import useNodeStore from "../../store/useNodeStore";
import { motion } from "framer-motion";

export default function RightPanel() {
  const selected = useNodeStore((s) => s.selectedNode);

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

      <div className="text-xs text-slate-400">
        Tags: {selected.tags?.join(", ") || "none"}
      </div>
    </motion.div>
  );
}
