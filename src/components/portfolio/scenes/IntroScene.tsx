import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, Sphere, Box } from "@react-three/drei";
import * as THREE from "three";

interface IntroSceneProps {
  userData: {
    name: string;
    title: string;
    field: string;
  };
  isActive: boolean;
  sceneIndex: number;
}

export const IntroScene = ({ userData, isActive }: IntroSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central holographic sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[2]} position={[0, 0, -2]}>
          <meshStandardMaterial
            color="#00ffff"
            transparent
            opacity={0.1}
            wireframe
            emissive="#00ffff"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>

      {/* Animated rings around sphere */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.5} rotationIntensity={1}>
          <mesh rotation={[Math.PI / 2, 0, i * Math.PI / 3]} position={[0, 0, -2]}>
            <torusGeometry args={[2.5 + i * 0.5, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#ff00ff"
              emissive="#ff00ff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}

      {/* Name text - with fallback */}
      <Center position={[0, 3, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.1}
          curveSegments={12}
          bevelEnabled={true}
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {userData.name}
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Center>

      {/* Title text */}
      <Center position={[0, 1.5, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.4}
          height={0.05}
          curveSegments={12}
        >
          {userData.title}
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>

      {/* Field text */}
      <Center position={[0, 0.5, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.03}
          curveSegments={12}
        >
          {userData.field}
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </Text3D>
      </Center>

      {/* Floating geometric elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.5}
          floatIntensity={0.3}
        >
          <Box
            args={[0.2, 0.2, 0.2]}
            position={[
              (Math.cos((i / 8) * Math.PI * 2) * 6),
              (Math.sin((i / 8) * Math.PI * 2) * 2),
              (Math.sin((i / 8) * Math.PI * 4) * 3) - 2
            ]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
              emissive={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
              emissiveIntensity={0.2}
              transparent
              opacity={0.7}
            />
          </Box>
        </Float>
      ))}

      {/* Holographic grid plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -2]}>
        <planeGeometry args={[20, 20, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};