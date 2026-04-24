"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { SharedModel } from "./Shared3DModel";
import * as THREE from "three";

function LoadingSpinner() {
  return (
    <group>
      <SharedModel scale={1} />
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

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#E50914" />

          <LoadingSpinner />
          <Particles />

          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-wider text-main font-mono">
            LOADING
          </h1>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-accent animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-muted font-mono">{Math.round(progress)}%</p>
      </div>

      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-muted font-mono tracking-widest">
          PREPARING EXPERIENCE
        </p>
      </div>
    </div>
  );
}