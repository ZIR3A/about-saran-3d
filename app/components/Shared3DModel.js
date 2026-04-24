"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SharedModel({ scale = 1, scrollY = 0, isInteractive = false, mousePosition = { x: 0, y: 0 } }) {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollProgress = scrollY * 0.002;
    
    if (meshRef.current) {
      if (isInteractive) {
        meshRef.current.rotation.x = time * 0.15 + scrollProgress;
        meshRef.current.rotation.y = time * 0.1 + scrollProgress * 0.5;
        
        const targetScale = hovered ? 1.15 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
        
        if (mousePosition.x !== 0 || mousePosition.y !== 0) {
          meshRef.current.rotation.x += mousePosition.y * 0.3;
          meshRef.current.rotation.y += mousePosition.x * 0.3;
        }
      } else {
        meshRef.current.rotation.x = time * 0.5;
        meshRef.current.rotation.y = time * 0.3;
      }
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current?.rotation.x || 0;
      wireframeRef.current.rotation.y = meshRef.current?.rotation.y || 0;
      wireframeRef.current.scale.setScalar((meshRef.current?.scale.x || 1) * 1.02);
    }
  });

  return (
    <group>
      <mesh 
        ref={meshRef}
        scale={scale}
        onPointerOver={isInteractive ? () => setHovered(true) : undefined}
        onPointerOut={isInteractive ? () => setHovered(false) : undefined}
      >
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#E50914"
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.9}
          roughness={0.1}
          flatShading
        />
      </mesh>
      
      <mesh ref={wireframeRef} scale={scale * 1.02}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#E50914"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      
      <mesh scale={scale * 1.05}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}