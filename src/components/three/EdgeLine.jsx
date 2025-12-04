import React, { useMemo } from "react";
import { Line } from "@react-three/drei";
import useNodeStore from "../../store/useNodeStore";
import useThemeStore from "../../store/useThemeStore";

export default function EdgeLine({ from, to }) {
  const nodes = useNodeStore((s) => s.nodes);
  const theme = useThemeStore((s) => s.currentTheme);

  const n1 = nodes.find((n) => n.id === from);
  const n2 = nodes.find((n) => n.id === to);

  if (!n1 || !n2) return null;

  const points = useMemo(() => {
    const mid = [
      (n1.x + n2.x) / 2,
      (n1.y + n2.y) / 2 + 0.6,
      (n1.z + n2.z) / 2,
    ];
    return [
      [n1.x, n1.y, n1.z],
      mid,
      [n2.x, n2.y, n2.z],
    ];
  }, [n1, n2]);

  return (
    <Line
      points={points}
      color={theme.accent}
      lineWidth={1.2}
      opacity={0.23}
      transparent
    />
  );
}
