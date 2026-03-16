"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BubbleData {
  position: [number, number, number];
  scale: number;
  speed: number;
  wobbleSpeed: number;
  wobbleAmount: number;
  opacity: number;
}

function Bubbles({ count = 40 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const bubbles = useMemo<BubbleData[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4 - 1,
      ] as [number, number, number],
      scale: Math.random() * 0.12 + 0.03,
      speed: Math.random() * 0.15 + 0.05,
      wobbleSpeed: Math.random() * 1.5 + 0.5,
      wobbleAmount: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.25 + 0.08,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    groupRef.current.children.forEach((mesh, i) => {
      const bubble = bubbles[i];
      // Float upward
      mesh.position.y += bubble.speed * 0.01;
      // Wobble sideways
      mesh.position.x = bubble.position[0] + Math.sin(t * bubble.wobbleSpeed + i) * bubble.wobbleAmount;
      // Reset when out of view
      if (mesh.position.y > 6) {
        mesh.position.y = -6;
        mesh.position.x = bubble.position[0];
      }
      // Gentle scale pulse
      const s = bubble.scale * (1 + Math.sin(t * 0.8 + i * 0.5) * 0.15);
      mesh.scale.setScalar(s);
    });
  });

  return (
    <group ref={groupRef}>
      {bubbles.map((bubble, i) => (
        <mesh key={i} position={bubble.position}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#00DAFF"
            transparent
            opacity={bubble.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function BubbleScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Bubbles />
      </Canvas>
    </div>
  );
}
