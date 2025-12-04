import React from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";

export default function EdgeLine({ from, to }) {
  const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  return (
    <Line points={points} color="#94a3b8" lineWidth={1} dashed={false} />
  );
}
