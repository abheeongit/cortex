import React, { useState } from "react";
import UniverseCanvas from "../components/UniverseCanvas";

import RightPanel from "../components/ui/RightPanel";
import AddNodeModal from "../components/ui/AddNodeModal";
import ThemeSwitcher from "../components/ui/ThemeSwitcher";

import useNodeStore from "../store/useNodeStore";
import useThemeStore from "../store/useThemeStore";

export default function UniversePage() {
  const theme = useThemeStore((s) => s.currentTheme);
  const isConnectMode = useNodeStore((s) => s.isConnectMode);
  const toggleConnectMode = useNodeStore((s) => s.toggleConnectMode);

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-screen flex" style={{ background: theme.bgColor }}>
      
      {/* CANVAS + OVERLAY */}
      <div className="flex-1 relative">
        {/* 3D UNIVERSE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <UniverseCanvas />
        </div>

        {/* UI OVERLAY */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 10, pointerEvents: "none" }}
        >
          {/* TOP LEFT BUTTONS */}
          <div
            className="absolute top-4 left-4 flex gap-3"
            style={{ pointerEvents: "none" }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="px-3 py-2 rounded bg-white/10 backdrop-blur hover:bg-white/20 transition"
              style={{ pointerEvents: "auto" }}
            >
              Add Node
            </button>

            <button
              onClick={toggleConnectMode}
              className={`px-3 py-2 rounded transition pointer-events-auto ${
                isConnectMode
                  ? "bg-purple-600/40 border border-purple-400/60"
                  : "bg-white/10 backdrop-blur hover:bg-white/20"
              }`}
              style={{ pointerEvents: "auto" }}
            >
              Connect
            </button>
          </div>

          {/* TOP RIGHT THEME SWITCHER */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              pointerEvents: "none",
            }}
          >
            <div style={{ pointerEvents: "auto" }}>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <aside
        className="w-96 bg-black/40 backdrop-blur-xl border-l border-white/10 px-6 py-4"
        style={{ zIndex: 20, pointerEvents: "auto" }}
      >
        <RightPanel />
      </aside>

      {/* ADD NODE MODAL */}
      <AddNodeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
