import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import NodeSphere from "../components/three/NodeSphere";
import EdgeLine from "../components/three/EdgeLine";
import RightPanel from "../components/ui/RightPanel";
import AddNodeModal from "../components/ui/AddNodeModal";
import ThemeSwitcher from "../components/ui/ThemeSwitcher";

import useNodeStore from "../store/useNodeStore";
import useThemeStore from "../store/useThemeStore";

export default function UniversePage() {
  const nodes = useNodeStore((s) => s.nodes);
  const edges = useNodeStore((s) => s.edges);

  const isConnectMode = useNodeStore((s) => s.isConnectMode);
  const toggleConnectMode = useNodeStore((s) => s.toggleConnectMode);

  const theme = useThemeStore((s) => s.currentTheme);

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-screen flex" style={{ background: theme.bgColor }}>
      <div className="flex-1 relative">
        <Canvas
          gl={{ antialias: true }}
          camera={{ position: [0, 0, 20], fov: 55 }}
        >
          {/* BACKGROUND COLOR */}
          <color attach="background" args={[theme.bgColor]} />

          {/* LIGHT STARFIELD (THEMED) */}
          <Stars
            radius={70}
            depth={20}
            count={700}
            factor={3}
            saturation={0}
            fade
            speed={0.12}
          />

          {/* LIGHTING */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[6, 6, 6]} intensity={0.8} />

          <Suspense fallback={null}>
            {/* NODES */}
            {nodes.map((n) => (
              <NodeSphere key={n.id} node={n} bloomOnly={false} />
            ))}

            {/* EDGES */}
            {edges.map((e, i) => (
              <EdgeLine key={i} from={e.from} to={e.to} />
            ))}

            {/* MINIMAL BLOOM ON CORES ONLY */}
            <EffectComposer>
              <Bloom
                intensity={0.25}
                luminanceThreshold={0.25}
                luminanceSmoothing={0.9}
                blendFunction={BlendFunction.ADD}
              />
              <Vignette darkness={theme.vignette} offset={0.4} />
            </EffectComposer>

            <OrbitControls enablePan enableZoom />
          </Suspense>
        </Canvas>

        {/* TOP LEFT BUTTONS */}
        <div className="absolute top-4 left-4 flex gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-2 rounded bg-white/10 backdrop-blur hover:bg-white/20 transition"
          >
            Add Node
          </button>

          <button
            onClick={toggleConnectMode}
            className={`px-3 py-2 rounded transition ${
              isConnectMode
                ? "bg-purple-600/40 border border-purple-400/60"
                : "bg-white/10 backdrop-blur hover:bg-white/20"
            }`}
          >
            Connect
          </button>
        </div>

        {/* THEME SWITCHER */}
        <ThemeSwitcher />
      </div>

      {/* RIGHT PANEL */}
      <aside className="w-96 bg-black/40 backdrop-blur-xl border-l border-white/10 px-6 py-4">
        <RightPanel />
      </aside>

      {/* ADD NODE MODAL */}
      <AddNodeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
