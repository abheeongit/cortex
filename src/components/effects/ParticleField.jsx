import React, { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ParticleField() {
  const particles = useMemo(() => {
    const arr = new Float32Array(500 * 3);

    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 80;
      arr[i + 1] = (Math.random() - 0.5) * 80;
      arr[i + 2] = (Math.random() - 0.5) * 80;
    }
    return arr;
  }, []);

  return (
    <Points positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#7deaff"
        size={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}
