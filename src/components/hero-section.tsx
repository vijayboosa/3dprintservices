import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import type * as THREE from "three";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

function NeonGrid({ size = 10, divisions = 10, color = "#E53935" }) {
  return (
    <group position={[0, -2, 0]}>
      <gridHelper
        args={[size, divisions, color, color]}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
      <gridHelper
        args={[size, divisions, color, color]}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </group>
  );
}

function PrinterModel() {
  // Using a placeholder cube for the printer model
  // In a real implementation, you would load a 3D printer model
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;

      // Simulate printing movement
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time) * 0.1 + 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Printer base */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[3, 0.5, 3]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Printer frame */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial color="#444" wireframe />
      </mesh>

      {/* Print head */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Object being printed */}
      <mesh
        ref={meshRef}
        position={[0, -0.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
        <meshStandardMaterial
          color={hovered ? "#E53935" : "#FF9800"}
          emissive={hovered ? "#E53935" : "#FF9800"}
          emissiveIntensity={0.7}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <NeonGrid />
      <PrinterModel />
      <Environment preset="warehouse" />
    </>
  );
}

export default function HeroSection() {
  const isMobile = useMobile();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 bg-[#263238]">
        <Canvas shadows>
          <Scene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl backdrop-blur-sm bg-[#263238]/30 p-6 md:p-8 rounded-xl mx-auto md:mx-0">
            <h1
              className={cn(
                "font-bold text-white mb-4",
                isMobile ? "text-4xl" : "text-5xl md:text-6xl"
              )}
            >
              Turn Your <span className="text-primary">3D Designs</span> Into
              Reality
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Professional 3D printing services with instant quotes, fast
              turnaround, and exceptional quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/upload">Get Instant Quote</Link>
              </Button>
              <Button
                variant="outline"
                className="bg-[#263238]/40 text-white border-white hover:bg-white/20"
                size="lg"
                asChild
              >
                <Link to="/services" className="gap-2">
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
