"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Edges } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#E50914";
const CYAN = "#00F0FF";
const VIOLET = "#8000FF";
const SURFACE = "#141414";
const LINE = "#2A2A2A";
const MUTED = "#6B6B6B";

function GlassMaterial({ opacity = 0.72, color = SURFACE }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.15}
      roughness={0.12}
      transmission={0.55}
      thickness={0.35}
      transparent
      opacity={opacity}
      envMapIntensity={0.9}
      clearcoat={0.4}
      clearcoatRoughness={0.2}
    />
  );
}

function UiBlock({ position, args, color = LINE, opacity = 1 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function GlassPanel({
  position,
  rotation = [0, 0, 0],
  size,
  radius = 0.035,
  accent = ACCENT,
  isInteractive,
  children,
}) {
  const groupRef = useRef();
  const hoveredRef = useRef(false);
  const [w, h, d] = size;

  useFrame(() => {
    if (!groupRef.current) return;
    const target = hoveredRef.current ? 1.14 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(target, target, target),
      hoveredRef.current ? 0.14 : 0.1
    );
  });

  const handleOver = (e) => {
    if (!isInteractive) return;
    e.stopPropagation();
    hoveredRef.current = true;
    document.body.style.cursor = "pointer";
  };

  const handleOut = (e) => {
    if (!isInteractive) return;
    e.stopPropagation();
    hoveredRef.current = false;
    document.body.style.cursor = "";
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <RoundedBox
        args={size}
        radius={radius}
        smoothness={6}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      >
        <GlassMaterial />
        <Edges color={accent} threshold={12} opacity={0.35} />
      </RoundedBox>

      {/* Accent top edge */}
      <mesh position={[0, h / 2 - 0.012, d / 2 + 0.004]}>
        <planeGeometry args={[w * 0.92, 0.018]} />
        <meshBasicMaterial color={accent} transparent opacity={0.85} />
      </mesh>

      {children}
    </group>
  );
}

function RotatingDot({ position, color, speed = 1.6, reducedMotion = false, size = 0.011 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} position={position}>
      <ringGeometry args={[size * 0.45, size, 12]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

function BrowserChrome({ width, reducedMotion = false }) {
  const dotsRef = useRef();

  useFrame((state) => {
    if (!dotsRef.current || reducedMotion) return;
    dotsRef.current.rotation.y = state.clock.elapsedTime * 0.55;
  });

  return (
    <>
      <group ref={dotsRef}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((color, i) => (
          <RotatingDot
            key={color}
            position={[-width / 2 + 0.06 + i * 0.05, 0, 0.034]}
            color={color}
            speed={1.4 + i * 0.25}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
      <UiBlock position={[0.06, 0, 0.032]} args={[width * 0.62, 0.038, 0.004]} color="#1E1E1E" />
      <UiBlock position={[0.02, 0, 0.035]} args={[width * 0.38, 0.018, 0.002]} color={MUTED} opacity={0.35} />
    </>
  );
}

function ProjectThumbnail({ position, accent, titleWidth = 0.14 }) {
  return (
    <group position={position}>
      <UiBlock position={[0, 0.04, 0]} args={[0.22, 0.12, 0.004]} color="#161616" />
      <UiBlock position={[0, 0.1, 0.003]} args={[0.22, 0.012, 0.002]} color={accent} opacity={0.85} />
      <UiBlock position={[-0.04, -0.02, 0.003]} args={[titleWidth, 0.022, 0.002]} color="#E8E8E8" opacity={0.55} />
      <UiBlock position={[-0.05, -0.06, 0.003]} args={[0.1, 0.016, 0.002]} color={MUTED} opacity={0.4} />
      <UiBlock position={[0.06, -0.06, 0.003]} args={[0.05, 0.016, 0.002]} color={accent} opacity={0.5} />
    </group>
  );
}

function PortfolioScreenPanel({ isInteractive, reducedMotion }) {
  const w = 1.35;
  const chromeY = 0.36;

  return (
    <GlassPanel
      position={[0, 0.05, 0]}
      rotation={[0.04, -0.08, 0]}
      size={[w, 0.88, 0.036]}
      radius={0.04}
      accent={ACCENT}
      isInteractive={isInteractive}
    >
      <group position={[0, chromeY, 0]}>
        <BrowserChrome width={w * 0.88} reducedMotion={reducedMotion} />
      </group>

      <UiBlock position={[0, 0.28, 0.028]} args={[w * 0.86, 0.045, 0.005]} color="#121212" />
      <UiBlock position={[-0.42, 0.28, 0.032]} args={[0.06, 0.022, 0.003]} color={ACCENT} opacity={0.9} />
      {[-0.22, -0.02, 0.18, 0.34].map((x, i) => (
        <UiBlock
          key={x}
          position={[x, 0.28, 0.032]}
          args={[0.1, 0.018, 0.003]}
          color={i === 0 ? "#F0F0F0" : MUTED}
          opacity={i === 0 ? 0.55 : 0.35}
        />
      ))}
      <UiBlock position={[0.48, 0.28, 0.032]} args={[0.1, 0.028, 0.004]} color={ACCENT} opacity={0.75} />

      <UiBlock position={[-0.28, 0.12, 0.028]} args={[0.14, 0.022, 0.003]} color={ACCENT} opacity={0.7} />
      <UiBlock position={[-0.22, 0.04, 0.028]} args={[0.42, 0.05, 0.004]} color="#F5F5F5" opacity={0.7} />
      <UiBlock position={[-0.18, -0.02, 0.028]} args={[0.34, 0.05, 0.004]} color={ACCENT} opacity={0.85} />
      <UiBlock position={[-0.2, -0.1, 0.028]} args={[0.38, 0.028, 0.003]} color={MUTED} opacity={0.45} />
      <UiBlock position={[-0.22, -0.16, 0.028]} args={[0.32, 0.022, 0.003]} color={MUTED} opacity={0.35} />
      <UiBlock position={[-0.3, -0.24, 0.032]} args={[0.14, 0.038, 0.004]} color={ACCENT} opacity={0.8} />

      <UiBlock position={[-0.38, -0.34, 0.028]} args={[0.12, 0.02, 0.003]} color={ACCENT} opacity={0.65} />
      <UiBlock position={[-0.2, -0.34, 0.028]} args={[0.28, 0.028, 0.003]} color="#F0F0F0" opacity={0.5} />

      <ProjectThumbnail position={[-0.2, -0.48, 0.03]} accent={ACCENT} />
      <ProjectThumbnail position={[0.18, -0.48, 0.03]} accent={CYAN} />
    </GlassPanel>
  );
}

function ProjectShowcaseCard({ isInteractive }) {
  return (
    <GlassPanel
      position={[-1.05, 0.42, -0.4]}
      rotation={[0.1, 0.35, 0.03]}
      size={[0.42, 0.52, 0.028]}
      radius={0.028}
      accent={VIOLET}
      isInteractive={isInteractive}
    >
      <UiBlock position={[0, 0.14, 0.026]} args={[0.34, 0.18, 0.004]} color="#161616" />
      <UiBlock position={[0, 0.22, 0.03]} args={[0.34, 0.014, 0.002]} color={VIOLET} opacity={0.9} />
      <UiBlock position={[-0.1, 0.04, 0.03]} args={[0.18, 0.028, 0.003]} color="#F0F0F0" opacity={0.6} />
      <UiBlock position={[-0.1, -0.02, 0.03]} args={[0.22, 0.02, 0.003]} color={MUTED} opacity={0.4} />
      <UiBlock position={[-0.1, -0.08, 0.03]} args={[0.16, 0.02, 0.003]} color={MUTED} opacity={0.3} />
      {[-0.08, 0.02, 0.1].map((x, i) => (
        <UiBlock
          key={x}
          position={[x, -0.16, 0.03]}
          args={[0.08, 0.022, 0.003]}
          color={i === 0 ? VIOLET : LINE}
          opacity={i === 0 ? 0.65 : 0.5}
        />
      ))}
      <UiBlock position={[0.1, -0.2, 0.032]} args={[0.1, 0.03, 0.004]} color={VIOLET} opacity={0.7} />
    </GlassPanel>
  );
}

function MobilePanel({ isInteractive, reducedMotion }) {
  return (
    <GlassPanel
      position={[1.08, -0.55, 0.3]}
      rotation={[0.05, -0.45, -0.04]}
      size={[0.36, 0.74, 0.034]}
      radius={0.05}
      accent={CYAN}
      isInteractive={isInteractive}
    >
      <UiBlock position={[0, 0.3, 0.026]} args={[0.28, 0.1, 0.004]} color="#1A1A1A" />
      <RotatingDot position={[0, 0.335, 0.03]} color={ACCENT} speed={2} reducedMotion={reducedMotion} />

      <UiBlock position={[0, 0.12, 0.028]} args={[0.26, 0.14, 0.005]} color="#181818" />
      <UiBlock position={[0, 0.18, 0.032]} args={[0.18, 0.03, 0.003]} color={CYAN} opacity={0.7} />
      <UiBlock position={[0, 0.1, 0.032]} args={[0.14, 0.025, 0.003]} color={MUTED} opacity={0.45} />

      <UiBlock position={[0, -0.06, 0.028]} args={[0.26, 0.1, 0.005]} color="#181818" />
      <UiBlock position={[0, -0.02, 0.032]} args={[0.1, 0.025, 0.003]} color={VIOLET} opacity={0.65} />

      <UiBlock position={[0, -0.22, 0.028]} args={[0.26, 0.1, 0.005]} color="#181818" />
      <UiBlock position={[-0.06, -0.22, 0.032]} args={[0.08, 0.04, 0.003]} color={ACCENT} opacity={0.6} />
      <UiBlock position={[0.08, -0.22, 0.032]} args={[0.08, 0.04, 0.003]} color={LINE} />

      <mesh position={[0, -0.34, 0.03]}>
        <capsuleGeometry args={[0.028, 0.1, 4, 8]} />
        <meshBasicMaterial color={LINE} transparent opacity={0.5} />
      </mesh>
    </GlassPanel>
  );
}

export function SharedModel({
  scale = 1,
  isInteractive = false,
  reducedMotion = false,
}) {
  return (
    <group scale={scale}>
      <PortfolioScreenPanel
        isInteractive={isInteractive}
        reducedMotion={reducedMotion}
      />
      <ProjectShowcaseCard isInteractive={isInteractive} />
      <MobilePanel
        isInteractive={isInteractive}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}
