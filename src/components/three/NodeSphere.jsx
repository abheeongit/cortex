import React, { useRef } from "react";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from "three";

import useNodeStore from "../../store/useNodeStore";
import useThemeStore from "../../store/useThemeStore";

const BLOOM_LAYER = 1;

export default function NodeSphere({ node, bloomOnly = false }) {
  const groupRef = useRef();

  const theme = useThemeStore((s) => s.currentTheme);

  const selectNode = useNodeStore((s) => s.selectNode);

  const isConnectMode = useNodeStore((s) => s.isConnectMode);
  const startNode = useNodeStore((s) => s.startNodeForConnection);
  const startConnection = useNodeStore((s) => s.startConnection);
  const finishConnection = useNodeStore((s) => s.finishConnection);

  const selected = useNodeStore((s) => s.selectedNode);
  const isSelected = selected?.id === node.id;

  const isConnectingStart = isConnectMode && startNode === node.id;

  // glow color logic (soft)
  const glowColor = isConnectingStart
    ? "#aa55ff"
    : isSelected
    ? theme.glowColor
    : node.color || theme.accent;

  // Inner pulse glow intensity
  const { pulse } = useSpring({
    pulse: isSelected ? 1.6 : 1,
    config: { tension: 90, friction: 10 },
  });

  // Outer scale animation
  const { scale } = useSpring({
    scale: isSelected ? 1.3 : 1,
    config: { tension: 160, friction: 15 },
  });

  return (
    <animated.group
      ref={groupRef}
      scale={scale}
      position={[node.x, node.y, node.z]}
      onClick={(e) => {
        e.stopPropagation();

        if (isConnectMode) {
          if (!startNode) startConnection(node.id);
          else finishConnection(node.id);
          return;
        }

        selectNode(node.id);
      }}
    >
      {/* OUTER HOLOGRAM SHELL */}
      {!bloomOnly && (
        <mesh>
          <sphereGeometry args={[node.radius || 1.1, 48, 48]} />
          <meshStandardMaterial
            color={glowColor}
            transparent
            opacity={0.17}
            roughness={0.3}
            metalness={0.05}
            emissive={glowColor}
            emissiveIntensity={0.35}
          />
        </mesh>
      )}

      {/* INNER GLOW CORE (Bloom Layer) */}
      <animated.mesh
        onUpdate={(self) => {
          if (bloomOnly) {
            self.layers.set(BLOOM_LAYER);
          }
        }}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <animated.meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={pulse.to((v) => (isSelected ? v * 1.3 : v * 0.6))}
          roughness={0.2}
          metalness={0.1}
        />
      </animated.mesh>
    </animated.group>
  );
}
