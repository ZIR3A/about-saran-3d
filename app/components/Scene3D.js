"use client";

import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingModel() {
  const meshRef = useRef();
  const groupRef = useRef();
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
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI * 2;
      
      const tiltAmount = scrollProgress * Math.PI * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + tiltAmount;
    }
    
    if (meshRef.current) {
      meshRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      const scaleBase = 0.8;
      const scaleMultiplier = 1 + scrollProgress * 0.8;
      meshRef.current.scale.setScalar(scaleBase * scaleMultiplier);
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.8}
      floatingRange={[-0.2, 0.2]}
    >
      <group ref={groupRef}>
        <mesh ref={meshRef} scale={0.8}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#E50914"
            envMapIntensity={0.4}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.9}
            roughness={0.1}
            distort={0.3}
            speed={2}
          />
        </mesh>

        <mesh scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#1F1F1F" transparent opacity={0.3} wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function Particles({ count = 500 }) {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
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

  useFrame((state) => {
    const baseZ = 5;
    const minZ = 2.5;
    const targetZ = baseZ - scrollProgress * (baseZ - minZ);
    
    const baseY = 0;
    const maxY = 1.5;
    const targetY = baseY + scrollProgress * maxY;
    
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
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