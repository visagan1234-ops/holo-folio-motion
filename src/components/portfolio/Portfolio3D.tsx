import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

// Simple test component first
function TestSphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color="#00ffff" />
    </mesh>
  );
}

interface Portfolio3DProps {
  userData: {
    name: string;
    title: string;
    field: string;
    email: string;
    linkedin: string;
    skills: string[];
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
    }>;
  };
}

export const Portfolio3D = ({ userData }: Portfolio3DProps) => {
  console.log("Portfolio3D component rendering");

  return (
    <div className="w-full h-screen relative bg-background">
      <div className="absolute top-4 left-4 z-10 text-primary">
        <h2>3D Portfolio Loading...</h2>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          <TestSphere />
          
          <OrbitControls enableDamping />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <Button variant="cyber" size="lg">
          <Play className="w-5 h-5" />
          Test Button
        </Button>
      </div>
    </div>
  );
};