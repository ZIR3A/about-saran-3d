"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SharedModel({ scale = 1, scrollY = 0, isInteractive = false }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollProgress = scrollY * 0.002;
    
    if (meshRef.current) {
      if (isInteractive) {
        meshRef.current.rotation.x = time * 0.15 + scrollProgress;
        meshRef.current.rotation.y = time * 0.1 + scrollProgress * 0.5;
        
        const targetScale = hovered ? 1.1 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      } else {
        meshRef.current.rotation.x = time * 0.5;
        meshRef.current.rotation.y = time * 0.3;
      }
    }
  });

  return (
    <mesh 
      ref={meshRef}
      scale={scale}
      onPointerOver={isInteractive ? () => setHovered(true) : undefined}
      onPointerOut={isInteractive ? () => setHovered(false) : undefined}
    >
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#E50914"
        envMapIntensity={0.8}
        metalness={0.7}
        roughness={0.2}
        flatShading
      />
    </mesh>
  );
}