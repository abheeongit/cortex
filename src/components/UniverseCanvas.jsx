import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import NodeSphere from "./three/NodeSphere";
import EdgeLine from "./three/EdgeLine";

import useNodeStore from "../store/useNodeStore";
import useThemeStore from "../store/useThemeStore";

export default function UniverseCanvas() {
  const nodes = useNodeStore((s) => s.nodes);
  const edges = useNodeStore((s) => s.edges);

  const theme = useThemeStore((s) => s.currentTheme);
  const selectNode = useNodeStore((s) => s.selectNode);

  const isDragging = useNodeStore((s) => s.isDragging);

  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 22], fov: 55 }}
      onPointerMissed={() => selectNode(null)}
      style={{ width: "100%", height: "100%" }}
    >
      {/* BACKGROUND COLOR */}
      <color attach="background" args={[theme.bgColor]} />

      {/* STARFIELD */}
      <Stars
        radius={70}
        depth={20}
        count={220}
        factor={2}
        saturation={0}
        fade
        speed={0.05}
      />

      {/* LIGHTING */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />

      <Suspense fallback={null}>
        {/* NODES */}
        {nodes.map((n) => (
          <NodeSphere key={n.id} node={n} />
        ))}

        {/* EDGES */}
        {edges.map((e, i) => (
          <EdgeLine key={i} from={e.from} to={e.to} />
        ))}

        {/* POSTPROCESSING */}
        <EffectComposer>
          <Bloom
            intensity={0.18}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
          <Vignette offset={0.35} darkness={0.6} />
        </EffectComposer>

        {/* CAMERA CONTROLS (DISABLED ON DRAG) */}
        <OrbitControls
          enablePan={!isDragging}
          enableRotate={!isDragging}
          enableZoom={!isDragging}
          enableDamping={false}
        />
      </Suspense>
    </Canvas>
  );
}
