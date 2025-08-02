import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, Sphere, Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface ContactSceneProps {
  userData: {
    name: string;
    email: string;
    linkedin: string;
  };
  isActive: boolean;
  sceneIndex: number;
}

export const ContactScene = ({ userData, isActive }: ContactSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }

    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      orbRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main title */}
      <Center position={[0, 4, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.7}
          height={0.1}
          curveSegments={12}
        >
          Let's Connect
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Center>

      {/* Central communication orb */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <Sphere ref={orbRef} args={[1.5]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Contact information displays */}
      <group position={[-4, 1, 2]}>
        {/* Email display */}
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <Box args={[3, 1, 0.1]}>
            <meshStandardMaterial
              color="#000000"
              emissive="#00ffff"
              emissiveIntensity={0.1}
              transparent
              opacity={0.8}
            />
          </Box>
        </Float>
        
        <Center position={[0, 0, 0.1]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.15}
            height={0.02}
            curveSegments={12}
          >
            Email
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>

        <Center position={[0, -0.3, 0.1]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.1}
            height={0.01}
            curveSegments={12}
          >
            {userData.email}
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.1}
            />
          </Text3D>
        </Center>
      </group>

      <group position={[4, 1, 2]}>
        {/* LinkedIn display */}
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <Box args={[3, 1, 0.1]}>
            <meshStandardMaterial
              color="#000000"
              emissive="#0077b5"
              emissiveIntensity={0.1}
              transparent
              opacity={0.8}
            />
          </Box>
        </Float>
        
        <Center position={[0, 0, 0.1]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.15}
            height={0.02}
            curveSegments={12}
          >
            LinkedIn
            <meshStandardMaterial
              color="#0077b5"
              emissive="#0077b5"
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>

        <Center position={[0, -0.3, 0.1]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.1}
            height={0.01}
            curveSegments={12}
          >
            {userData.linkedin}
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.1}
            />
          </Text3D>
        </Center>
      </group>

      {/* Thank you message */}
      <Center position={[0, -2, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.4}
          height={0.05}
          curveSegments={12}
        >
          Thank You!
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Center>

      {/* Network connection lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        return (
          <Cylinder
            key={i}
            args={[0.01, 0.01, radius]}
            position={[
              Math.cos(angle) * radius / 2,
              0,
              Math.sin(angle) * radius / 2
            ]}
            rotation={[0, angle, Math.PI / 2]}
          >
            <meshStandardMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </Cylinder>
        );
      })}

      {/* Floating social media icons representation */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 5;
        return (
          <Float
            key={i}
            speed={1 + i * 0.2}
            rotationIntensity={0.5}
            floatIntensity={0.4}
          >
            <Box
              args={[0.3, 0.3, 0.1]}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 2,
                Math.sin(angle) * radius
              ]}
            >
              <meshStandardMaterial
                color={
                  i % 3 === 0 ? "#1da1f2" :  // Twitter blue
                  i % 3 === 1 ? "#0077b5" :  // LinkedIn blue
                  "#333333"                   // Generic
                }
                emissive={
                  i % 3 === 0 ? "#1da1f2" :
                  i % 3 === 1 ? "#0077b5" :
                  "#333333"
                }
                emissiveIntensity={0.2}
              />
            </Box>
          </Float>
        );
      })}

      {/* Communication signals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.1}>
          <Sphere
            args={[0.03]}
            position={[
              Math.cos((i / 12) * Math.PI * 2 + Date.now() * 0.002) * 4,
              Math.sin((i / 6) * Math.PI + Date.now() * 0.003) * 3,
              Math.sin((i / 12) * Math.PI * 2 + Date.now() * 0.002) * 4
            ]}
          >
            <meshStandardMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={0.5}
            />
          </Sphere>
        </Float>
      ))}

      {/* Holographic rings */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, i * Math.PI / 4]}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.3}
            transparent
            opacity={0.5 - i * 0.1}
          />
        </mesh>
      ))}

      {/* Background network grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[16, 16, 16, 16]} />
        <meshStandardMaterial
          color="#00ff00"
          transparent
          opacity={0.05}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};