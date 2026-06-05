"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Faceted diamond (octahedron) with glowing edges + an emissive NV core. */
function Diamond() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.25;
      group.current.rotation.x += dt * 0.06;
    }
  });
  return (
    <group ref={group}>
      {/* Outer crystal */}
      <mesh>
        <octahedronGeometry args={[1.7, 0]} />
        <meshStandardMaterial
          color="#0A0A12"
          metalness={0.7}
          roughness={0.25}
          transparent
          opacity={0.55}
        />
        <Edges threshold={1} color="#00E5FF" />
      </mesh>
      {/* A second, rotated shell for depth */}
      <mesh rotation={[0, Math.PI / 4, Math.PI / 5]} scale={1.04}>
        <octahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color="#7C5CFF" wireframe transparent opacity={0.18} />
      </mesh>
      {/* NV core */}
      <mesh>
        <icosahedronGeometry args={[0.34, 1]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <pointLight color="#00E5FF" intensity={6} distance={6} />
    </group>
  );
}

/** Sparse point cloud evoking the diamond lattice / surrounding spins. */
function Lattice() {
  const ref = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const n = 220;
    const positions = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      // Shell-ish distribution around the crystal
      const r = 2.6 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y -= dt * 0.04;
  });
  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial color="#9AA4BF" size={0.045} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={50} color="#00E5FF" />
      <pointLight position={[-5, -3, -2]} intensity={25} color="#7C5CFF" />
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <Diamond />
      </Float>
      <Lattice />
    </Canvas>
  );
}
