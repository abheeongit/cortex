import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function NebulaPlane() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.material.opacity = 0.25 + Math.sin(t * 0.1) * 0.05;
    ref.current.material.map.offset.x = t * 0.01;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial
        transparent
        opacity={0.3}
        color="#3ad8ff"
      />
    </mesh>
  );
}
