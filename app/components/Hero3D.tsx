"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  Sparkles,
  Float,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

/** A cut diamond — faceted octahedron rendered as refractive glass (IOR 2.42),
 *  with a glowing nitrogen-vacancy core suspended inside. */
function Diamond() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.22;
      group.current.rotation.x += dt * 0.05;
    }
  });
  return (
    <group ref={group}>
      {/* Glass crystal */}
      <mesh>
        <octahedronGeometry args={[1.75, 0]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={256}
          transmission={1}
          thickness={1.4}
          roughness={0.06}
          ior={2.42}
          chromaticAberration={0.08}
          anisotropy={0.15}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.08}
          clearcoat={1}
          color="#eafcff"
          attenuationColor="#39d9ff"
          attenuationDistance={2.4}
          background={new THREE.Color("#05050A")}
        />
      </mesh>

      {/* NV core — blooms through the glass */}
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={4} toneMapped={false} />
      </mesh>
      <pointLight color="#00E5FF" intensity={5} distance={6} />
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#00E5FF" />
      <pointLight position={[-5, -3, -2]} intensity={20} color="#7C5CFF" />

      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.7}>
        <Diamond />
      </Float>

      {/* Floating glints — a wide ambient field + a tight bright cluster that
          really catches the light around the facets */}
      <Sparkles count={70} scale={[8, 6, 6]} size={2.6} speed={0.45} color="#aeefff" opacity={0.75} />
      <Sparkles count={34} scale={[3.6, 3.6, 3.6]} size={5} speed={0.7} color="#ffffff" opacity={1} />

      {/* Reflections built from light shapes — no external HDR needed */}
      <Environment resolution={256}>
        <group rotation={[0, 0, 1]}>
          <Lightformer form="rect" intensity={3} position={[0, 3, 4]} scale={[5, 1.5, 1]} color="#00E5FF" />
          <Lightformer form="rect" intensity={2} position={[-4, -1, 2]} scale={[2, 4, 1]} color="#7C5CFF" />
          <Lightformer form="circle" intensity={2.4} position={[3, 2, -3]} scale={3} color="#ffffff" />
          <Lightformer form="rect" intensity={1.4} position={[2, -3, 1]} scale={[3, 1, 1]} color="#ffffff" />
        </group>
      </Environment>

      <EffectComposer>
        <Bloom mipmapBlur intensity={1.25} luminanceThreshold={0.45} luminanceSmoothing={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
