"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { SharedModel } from "./Shared3DModel";
import * as THREE from "three";

function LoadingSpinner() {
  return (
    <group>
      <SharedModel scale={1.05} isInteractive={false} />
    </group>
  );
}

function Particles() {
  const count = 100;
  const particles = new Float32Array(count * 3);

  const seededRandom = (i) => {
    const x = Math.sin(i * 9999) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 3 + seededRandom(i) * 0.5;
    particles[i * 3] = Math.cos(angle) * radius;
    particles[i * 3 + 1] = (seededRandom(i + count) - 0.5) * 2;
    particles[i * 3 + 2] = Math.sin(angle) * radius;
  }

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#E50914"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function LoadingCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#E50914" />
      <LoadingSpinner />
      <Particles />
      <Environment preset="night" />
    </Canvas>
  );
}
