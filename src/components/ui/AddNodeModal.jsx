import React, { useState } from "react";
import Modal from "./Modal";
import useNodeStore from "../../store/useNodeStore";

export default function AddNodeModal({ isOpen, onClose }) {
  const addNode = useNodeStore((s) => s.addNode);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("#6ee7b7");

  // Random coordinates generator
  const generateRandomPosition = () => {
    return {
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
    };
  };

  const onSubmit = () => {
    if (!title.trim()) return;

    const pos = generateRandomPosition();

    addNode({
      id: crypto.randomUUID(),
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
      color,
      radius: 1.2,
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });

    onClose();
    setTitle("");
    setDescription("");
    setTags("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Add New Node</h2>

      <div className="flex flex-col gap-3">
        <input
          className="bg-black/30 border border-white/10 rounded px-3 py-2 focus:outline-none"
          placeholder="Node title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="bg-black/30 border border-white/10 rounded px-3 py-2 h-20 focus:outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="bg-black/30 border border-white/10 rounded px-3 py-2 focus:outline-none"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300">Color:</label>
          <input
            type="color"
            className="w-10 h-10 rounded cursor-pointer"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <button
          onClick={onSubmit}
          className="mt-3 bg-green-500/20 border border-green-500/50 hover:bg-green-500/30 text-green-300 rounded px-4 py-2 transition"
        >
          Create Node
        </button>
      </div>
    </Modal>
  );
}
