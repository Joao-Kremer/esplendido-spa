"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, Vector3, Color } from "three";

function Bubble({ position, scale, color, speed, swayAmount }: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  swayAmount: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const initialY = useRef(position[1]);
  const time = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta * speed;

    meshRef.current.position.y += delta * speed * 0.5;
    meshRef.current.position.x = position[0] + Math.sin(time.current) * swayAmount;

    if (meshRef.current.position.y > 6) {
      meshRef.current.position.y = initialY.current - 2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshPhysicalMaterial
        transmission={0.6}
        roughness={0.1}
        thickness={0.5}
        color={color}
        transparent
        opacity={0.35}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

function Bubbles() {
  const bubbles = useMemo(() => {
    const colors = ["#88ccee", "#66ddcc", "#aaddff", "#55bbee", "#77eedd", "#99ccff"];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      scale: 0.15 + Math.random() * 0.35,
      color: colors[i % colors.length],
      speed: 0.3 + Math.random() * 0.7,
      swayAmount: 0.5 + Math.random() * 1.0,
    }));
  }, []);

  return (
    <>
      {bubbles.map((b) => (
        <Bubble key={b.id} {...b} />
      ))}
    </>
  );
}

export default function BubbleScene() {
  return (
    <Canvas
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
      camera={{ position: [0, 0, 6], fov: 60 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Bubbles />
    </Canvas>
  );
}
