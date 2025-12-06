import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import useNodeStore from "../../store/useNodeStore";

export default function NodeSphere({ node }) {
  const ref = useRef();
  const selectNode = useNodeStore((s) => s.selectNode);
  const selectedNode = useNodeStore((s) => s.selectedNode);
  const isSelected = selectedNode?.id === node.id;

  const { scale, emissiveIntensity } = useSpring({
    scale: isSelected ? 1.8 : 1.0,
    emissiveIntensity: isSelected ? 2.8 : 0.5,
    config: { mass: 1, tension: 200, friction: 20 }
  });

  const plasmaColor = "#4fdfff";     // Cyan Plasma
  const glowColor = "#92faff";       // Outer Glow

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.35;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <animated.group
      ref={ref}
      scale={scale}
      position={[node.x, node.y, node.z]}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node.id);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >

      {/* Animated hologram outer shell */}
      <mesh>
        <sphereGeometry args={[1.3, 64, 64]} />
        <MeshDistortMaterial
          color={glowColor}
          transparent
          opacity={0.25}
          distort={0.4}
          speed={3}
        />
      </mesh>

      {/* Inner plasma core */}
      <animated.mesh>
        <sphereGeometry args={[0.9, 48, 48]} />
        <animated.meshStandardMaterial
          color={plasmaColor}
          emissive={plasmaColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.25}
          roughness={0.1}
        />
      </animated.mesh>

      {/* Shockwave halo when selected */}
      {isSelected && (
        <animated.mesh scale={scale.to((v) => v * 1.3)}>
          <sphereGeometry args={[1.55, 48, 48]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={0.18}
            depthWrite={false}
          />
        </animated.mesh>
      )}
    </animated.group>
  );
}
