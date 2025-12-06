import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import NodeSphere from "./three/NodeSphere";
import EdgeLine from "./three/EdgeLine";

import useNodeStore from "../store/useNodeStore";
import useThemeStore from "../store/useThemeStore";

function UniverseCanvas() {
  const nodes = useNodeStore((s) => s.nodes);
  const edges = useNodeStore((s) => s.edges);
  const selectNode = useNodeStore((s) => s.selectNode);
  const theme = useThemeStore((s) => s.currentTheme);
  const isDragging = useNodeStore((s) => s.isDragging);

  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 20], fov: 55 }}
      onPointerMissed={() => selectNode(null)}
      dpr={[1, 1.5]} // smoother performance
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <color attach="background" args={[theme.bgColor]} />

      <Stars
        radius={60}
        depth={20}
        count={200}
        factor={2}
        saturation={0}
        fade
        speed={0.05}
      />

      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 6, 6]} intensity={0.8} />

      <Suspense fallback={null}>
        {nodes.map((n) => (
          <NodeSphere key={n.id} node={n} />
        ))}

        {edges.map((e, i) => (
          <EdgeLine key={i} from={e.from} to={e.to} />
        ))}

        <EffectComposer>
          <Bloom
            intensity={0.2}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.75}
            blendFunction={BlendFunction.ADD}
          />
          <Vignette darkness={theme.vignette} offset={0.4} />
        </EffectComposer>

        <OrbitControls
          enablePan={!isDragging}
          enableRotate={!isDragging}
          enableZoom={!isDragging}
        />
      </Suspense>
    </Canvas>
  );
}

export default React.memo(UniverseCanvas);
