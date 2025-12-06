import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from "three";
import useNodeStore from "../../store/useNodeStore";

export default function NodeSphere({ node }) {
  const ref = useRef();
  const { camera, raycaster, mouse } = useThree();

  // store functions
  const selectNode = useNodeStore((s) => s.selectNode);
  const selectedNode = useNodeStore((s) => s.selectedNode);

  // ⭐ Connect Mode
  const isConnectMode = useNodeStore((s) => s.isConnectMode);
  const handleConnectClick = useNodeStore((s) => s.handleConnectClick);

  // ⭐ Correct selection logic
  const isSelected = selectedNode === node.id;

  const setDragging = useNodeStore((s) => s.setDragging);
  const updateNodePosition = useNodeStore((s) => s.updateNodePosition);

  const [dragging, setDraggingLocal] = useState(false);
  const dragPlane = useRef(new THREE.Plane());
  const dragOffset = useRef(new THREE.Vector3());

  // ⭐ OG node animation
  const { scale, opacity } = useSpring({
    scale: isSelected ? 1.6 : 1.0,
    opacity: isSelected ? 1 : 0.4,
    config: { mass: 1, tension: 180, friction: 20 },
  });

  // ⭐ OG rotation
  useFrame(({ clock }) => {
    if (!dragging) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = t * 0.3;
    }
  });

  // ⭐ DRAG START
  const onPointerDown = (e) => {
    if (isConnectMode) return; // do NOT drag in connect mode

    e.stopPropagation();
    selectNode(node.id);

    setDragging(true);
    setDraggingLocal(true);

    dragPlane.current.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()),
      ref.current.position
    );

    const hit = new THREE.Vector3();
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(dragPlane.current, hit);

    dragOffset.current.copy(hit).sub(ref.current.position);
  };

  // ⭐ DRAG MOVE
  const onPointerMove = () => {
    if (!dragging || isConnectMode) return;

    const hit = new THREE.Vector3();
    raycaster.setFromCamera(mouse, camera);

    if (raycaster.ray.intersectPlane(dragPlane.current, hit)) {
      ref.current.position.copy(hit.sub(dragOffset.current));
    }
  };

  // ⭐ DRAG END
  const onPointerUp = () => {
    if (!dragging || isConnectMode) return;

    setDragging(false);
    setDraggingLocal(false);

    const p = ref.current.position;
    updateNodePosition(node.id, p.x, p.y, p.z);
  };

  return (
    <animated.mesh
      ref={ref}
      position={[node.x, node.y, node.z]}
      scale={scale}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
      onClick={(e) => {
        e.stopPropagation();

        if (isConnectMode) {
          handleConnectClick(node.id);
        } else {
          selectNode(node.id);
        }
      }}
    >
      {/* ⭐ OG Sphere */}
      <sphereGeometry args={[node.radius || 1.2, 32, 32]} />

      {/* ⭐ OG Material */}
      <animated.meshStandardMaterial
        color={node.color}
        transparent
        opacity={opacity}
        emissive={isSelected ? node.color : "#000"}
        emissiveIntensity={isSelected ? 1.5 : 0.0}
      />

      {/* ⭐ OG Glow */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[node.radius * 1.8, 32, 32]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </mesh>
      )}
    </animated.mesh>
  );
}
