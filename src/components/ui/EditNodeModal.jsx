import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import useNodeStore from "../../store/useNodeStore";

export default function EditNodeModal({ isOpen, onClose }) {
  const selected = useNodeStore((s) => s.selectedNode);
  const updateNode = useNodeStore((s) => s.updateNode);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("#ffffff");

  // Load data when modal opens
  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setDescription(selected.description);
      setTags(selected.tags?.join(", ") || "");
      setColor(selected.color);
    }
  }, [selected]);

  const onSubmit = () => {
    updateNode(selected.id, {
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
      color,
    });
    onClose();
  };

  if (!selected) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Node</h2>

      <div className="flex flex-col gap-3">
        <input
          className="bg-black/30 border border-white/10 rounded px-3 py-2"
          placeholder="Node title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="bg-black/30 border border-white/10 rounded px-3 py-2 h-20"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="bg-black/30 border border-white/10 rounded px-3 py-2"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300">Color:</label>
          <input
            type="color"
            className="w-10 h-10 rounded"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <button
          onClick={onSubmit}
          className="mt-3 bg-blue-500/30 border border-blue-500/50 hover:bg-blue-500/40 text-blue-300 rounded px-4 py-2"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
}
