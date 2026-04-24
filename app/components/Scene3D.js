"use client";
/* eslint-disable react-hooks/immutability */

import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Environment } from "@react-three/drei";
import { SharedModel } from "./Shared3DModel";
import * as THREE from "three";

function FloatingModel() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.2}
      floatIntensity={0.4}
      floatingRange={[-0.1, 0.1]}
    >
      <SharedModel scale={1.2} scrollY={scrollY} isInteractive={true} />
    </Float>
  );
}

function Particles({ count = 200 }) {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seededRandom = (i) => {
      const x = Math.sin(i * 9999) * 10000;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + seededRandom(i) * 0.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (seededRandom(i + count) - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
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
        size={0.02}
        color="#E50914"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Camera() {
  const { camera } = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x = Math.sin(time * 0.1) * 2;
    camera.position.y = Math.cos(time * 0.1) * 1;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#E50914" />

      <Camera />
      <FloatingModel />
      <Particles count={150} />

      <Sparkles
        count={50}
        scale={10}
        size={1.5}
        speed={0.3}
        opacity={0.15}
        color="#E50914"
        noise={0.3}
      />

      <Environment preset="night" />
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#1F1F1F" wireframe />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed right-0 top-0 w-full md:w-1/2 h-screen z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}