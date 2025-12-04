import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import NodeSphere from "../components/three/NodeSphere";
import EdgeLine from "../components/three/EdgeLine";
import RightPanel from "../components/ui/RightPanel";
import useNodeStore from "../store/useNodeStore";

export default function UniversePage() {
  const nodes = useNodeStore((s) => s.nodes);
  const edges = useNodeStore((s) => s.edges);

  return (
    <div className="h-screen flex">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[6, 6, 6]} intensity={1.2} />

          <Suspense fallback={null}>
            <Stars radius={80} depth={40} count={6000} factor={4} fade />

            {/* Nodes */}
            {nodes.map((n) => (
              <NodeSphere key={n.id} node={n} />
            ))}

            {/* Edges */}
            {edges.map((e, i) => (
              <EdgeLine key={i} from={e.from} to={e.to} />
            ))}

            <OrbitControls enableZoom={true} enablePan={true} />
          </Suspense>
        </Canvas>

        <div className="absolute top-4 left-4">
          <button className="px-3 py-2 rounded bg-white/10 backdrop-blur">
            Add Node
          </button>
        </div>
      </div>

      <aside className="w-96 bg-black/50 backdrop-blur-xl px-6 py-4 border-l border-white/10">
        <RightPanel />
      </aside>
    </div>
  );
}
