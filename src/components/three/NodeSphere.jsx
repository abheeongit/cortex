import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import useNodeStore from "../../store/useNodeStore";
import { animated, useSpring } from "@react-spring/three";

export default function NodeSphere({ node }) {
  const ref = useRef();
  const selectNode = useNodeStore((s) => s.selectNode);
  const selectedNode = useNodeStore((s) => s.selectedNode);

  const isSelected = selectedNode?.id === node.id;

  const { scale, opacity } = useSpring({
    scale: isSelected ? 1.6 : 1.0,
    opacity: isSelected ? 1 : 0.4,
    config: { mass: 1, tension: 180, friction: 20 },
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.3;
  });

  return (
    <animated.mesh
      ref={ref}
      position={[node.x, node.y, node.z]}
      scale={scale}
      onClick={() => selectNode(node.id)}
      onPointerOver={(e) => (document.body.style.cursor = "pointer")}
      onPointerOut={(e) => (document.body.style.cursor = "default")}
    >
      <sphereGeometry args={[node.radius || 1.2, 32, 32]} />

      <animated.meshStandardMaterial
        color={node.color}
        transparent
        opacity={opacity}
        emissive={isSelected ? node.color : "#000"}
        emissiveIntensity={isSelected ? 1.5 : 0.0}
      />

      {/* Glow layer */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[node.radius * 1.8, 32, 32]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.15} />
        </mesh>
      )}
    </animated.mesh>
  );
}
