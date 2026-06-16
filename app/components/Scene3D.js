"use client";
/* eslint-disable react-hooks/immutability */

import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import { SharedModel } from "./Shared3DModel";
import { useLenis } from "@/lib/lenis-context";
import * as THREE from "three";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(value) {
  return value * value * (3 - 2 * value);
}

function getModelScale(width) {
  if (width < 768) return 0.9;
  if (width < 1024) return 1.12;
  if (width < 1280) return 1.22;
  if (width < 1536) return 1.32;
  return 1.4;
}

function FloatingModel({ reducedMotion, scale, offsetX }) {
  return (
    <group position={[offsetX, 0, 0]}>
      <SharedModel
        scale={scale}
        isInteractive={!reducedMotion}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}

function Particles({ count = 200, color = "#E50914", speed = 0.3, paused = false }) {
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
    if (pointsRef.current && !paused) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * speed;
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
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Camera({ scale = 1 }) {
  const { camera } = useThree();
  const z = 5.8 + (scale - 1) * 1.1;

  useFrame(() => {
    camera.position.set(0, 0, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene({ reducedMotion, scrollY, heroHeight, modelScale, modelOffsetX }) {
  const pastHero = scrollY > heroHeight * 0.5;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#E50914" />
      <pointLight position={[5, 3, 2]} intensity={0.3} color="#00F0FF" />

      <Camera scale={modelScale} />
      <FloatingModel
        reducedMotion={reducedMotion}
        scale={modelScale}
        offsetX={modelOffsetX}
      />
      <Particles count={60} color="#E50914" speed={0.2} paused={reducedMotion} />
      <Particles count={40} color="#00F0FF" speed={0.25} paused={reducedMotion} />

      {!reducedMotion && !pastHero && (
        <Sparkles
          count={30}
          scale={8}
          size={1.2}
          speed={0.2}
          opacity={0.12}
          color="#E50914"
          noise={0.3}
        />
      )}

      <Environment preset="night" />
    </>
  );
}

function LoadingFallback() {
  return (
    <group rotation={[0.1, 0.2, 0]}>
      <mesh>
        <boxGeometry args={[1.2, 0.75, 0.04]} />
        <meshBasicMaterial color="#1F1F1F" transparent opacity={0.4} wireframe />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  const [heroHeight, setHeroHeight] = useState(800);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const lenis = useLenis();
  const scrollY = lenis?.scrollY ?? 0;
  const reducedMotion = lenis?.reducedMotion ?? false;

  useEffect(() => {
    const updateLayout = () => {
      setHeroHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const isDesktop = viewportWidth >= 768;
  const transitionStart = heroHeight * 0.2;
  const transitionEnd = heroHeight * 0.95;
  const centerProgress = smoothstep(
    clamp((scrollY - transitionStart) / (transitionEnd - transitionStart), 0, 1)
  );

  const modelScale = getModelScale(viewportWidth);
  const heroAnchor = 1 - centerProgress;
  const modelOffsetX = isDesktop ? heroAnchor * 0.52 : heroAnchor * 0.12;

  const panelWidthPercent = isDesktop ? 50 : 100;
  const leftPercent = isDesktop ? 50 - centerProgress * 25 : 0;
  const opacity = 1 - centerProgress * 0.7;
  const cameraZ = 5.8 + (modelScale - 1) * 1.1;

  return (
    <div
      className="fixed top-0 h-screen z-0"
      style={{
        left: `${leftPercent}%`,
        width: `${panelWidthPercent}%`,
        opacity,
        pointerEvents: "none",
      }}
    >
      <Canvas
        className={reducedMotion ? "h-full w-full" : "pointer-events-auto h-full w-full"}
        camera={{ position: [0, 0, cameraZ], fov: 58 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            scrollY={scrollY}
            heroHeight={heroHeight}
            reducedMotion={reducedMotion}
            modelScale={modelScale}
            modelOffsetX={modelOffsetX}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
