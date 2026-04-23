"use client";
/* eslint-disable react-hooks/immutability */

import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingModel() {
  const meshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
      
      meshRef.current.distort = 0.4 + Math.sin(time * 0.5) * 0.15;
      
      const baseScale = 1 + scrollProgress * 0.15;
      meshRef.current.scale.setScalar(baseScale);
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = -time * 2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = time * 1.5;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.8}
      floatingRange={[-0.2, 0.2]}
    >
      <group>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <MeshDistortMaterial
            color="#E50914"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={3}
          />
        </mesh>

        <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#E50914" transparent opacity={0.6} />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.01, 16, 100]} />
          <meshBasicMaterial color="#E50914" transparent opacity={0.3} />
        </mesh>
      </group>
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

function CameraController() {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    const baseZ = 5;
    const minZ = 4;
    const targetZ = baseZ - scrollProgress * (baseZ - minZ);
    
    const baseY = 0;
    const maxY = 0.5;
    const targetY = baseY + scrollProgress * maxY;
    
    const lerp = (start, end, t) => start + (end - start) * t;
    camera.position.z = lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = lerp(camera.position.y, targetY, 0.05);
  });

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#E50914" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#E50914"
      />

      <CameraController />
      <FloatingModel />
      <Particles count={300} />

      <Sparkles
        count={100}
        scale={12}
        size={2}
        speed={0.4}
        opacity={0.2}
        color="#E50914"
        noise={0.5}
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
    <div className="fixed inset-0 z-0 pointer-events-none">
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