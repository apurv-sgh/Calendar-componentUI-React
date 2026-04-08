import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useCalendarStore } from "../store/calendarStore";

function FloatingRing({ position, radius, color, speed }: {
  position: [number, number, number];
  radius: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed;
      meshRef.current.rotation.x += delta * speed * 0.5;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, 0.03, 10, 48]} />
      <meshStandardMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

function Particles() {
  const count = 60;
  const positions = useRef(new Float32Array(count * 3));
  const geoRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 18;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
    }
  }, []);

  useFrame((_, delta) => {
    if (geoRef.current) {
      const pos = geoRef.current.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += delta * 0.04;
        if (pos[i * 3 + 1] > 7) pos[i * 3 + 1] = -7;
      }
      geoRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#60a5fa" size={0.05} transparent opacity={0.5} />
    </points>
  );
}

function SceneContent() {
  const { theme } = useCalendarStore();
  const isDark = theme === "dark";
  const bgColor = isDark ? "#0a1020" : "#dce8fb";

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={isDark ? 0.4 : 0.7} />
      <pointLight position={[5, 8, 5]} intensity={isDark ? 1.2 : 1.5} color="#ffffff" />
      <pointLight position={[-5, -3, 3]} color="#1e88e5" intensity={isDark ? 0.7 : 0.35} />
      <pointLight position={[6, -4, 2]} color="#26c6da" intensity={isDark ? 0.4 : 0.2} />

      <Particles />

      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.3}>
        <FloatingRing position={[-7, 3, -3]} radius={1.2} color="#1e88e5" speed={0.3} />
      </Float>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
        <FloatingRing position={[7, -2, -4]} radius={0.9} color="#26c6da" speed={0.4} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.2}>
        <FloatingRing position={[4, 4, -5]} radius={1.5} color="#7c3aed" speed={0.2} />
      </Float>
      <Float speed={1.8} rotationIntensity={0.09} floatIntensity={0.35}>
        <FloatingRing position={[-4, -4, -3]} radius={0.8} color="#10b981" speed={0.35} />
      </Float>
    </>
  );
}

function FallbackBackground() {
  const { theme } = useCalendarStore();
  const isDark = theme === "dark";
  return (
    <div
      className="absolute inset-0"
      style={{
        background: isDark
          ? "radial-gradient(ellipse at 30% 40%, #0f2044 0%, #0a1020 60%, #060d18 100%)"
          : "radial-gradient(ellipse at 30% 40%, #dce8fb 0%, #e8f2ff 60%, #f0f7ff 100%)",
      }}
    >
      {/* Animated CSS rings as fallback */}
      <div
        className="absolute rounded-full border border-blue-400/20 animate-ping"
        style={{ width: 300, height: 300, top: "10%", left: "5%", animationDuration: "4s" }}
      />
      <div
        className="absolute rounded-full border border-cyan-400/15 animate-ping"
        style={{ width: 200, height: 200, bottom: "15%", right: "8%", animationDuration: "5s", animationDelay: "1s" }}
      />
      <div
        className="absolute rounded-full border border-purple-400/10 animate-ping"
        style={{ width: 150, height: 150, top: "40%", right: "15%", animationDuration: "6s", animationDelay: "2s" }}
      />
    </div>
  );
}

export default function ThreeDScene() {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglAvailable(!!gl);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  if (webglAvailable === null) return null;

  if (!webglAvailable) {
    return (
      <div className="calendar-scene" style={{ zIndex: 0 }}>
        <FallbackBackground />
      </div>
    );
  }

  return (
    <div className="calendar-scene" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
