import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface SkillsSceneProps {
  userData: {
    skills: string[];
  };
  isActive: boolean;
  sceneIndex: number;
}

export const SkillsScene = ({ userData, isActive }: SkillsSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const skillRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }

    skillRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.rotation.y = state.clock.elapsedTime * (0.5 + i * 0.1);
        ref.position.y = Math.sin(state.clock.elapsedTime + i) * 0.3;
      }
    });
  });

  const skills = userData.skills.slice(0, 8); // Limit to 8 skills for better visualization

  return (
    <group ref={groupRef}>
      {/* Central title */}
      <Center position={[0, 4, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.6}
          height={0.1}
          curveSegments={12}
        >
          Technical Skills
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Center>

      {/* Skill nodes arranged in a circle */}
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={skill} position={[x, 0, z]}>
            {/* Skill orb */}
            <Float speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
              <Sphere
                ref={(el) => el && (skillRefs.current[index] = el)}
                args={[0.8]}
              >
                <meshStandardMaterial
                  color={index % 3 === 0 ? "#00ffff" : index % 3 === 1 ? "#ff00ff" : "#ffff00"}
                  emissive={index % 3 === 0 ? "#00ffff" : index % 3 === 1 ? "#ff00ff" : "#ffff00"}
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.7}
                />
              </Sphere>
            </Float>

            {/* Skill text */}
            <Center position={[0, -1.5, 0]}>
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.2}
                height={0.02}
                curveSegments={12}
              >
                {skill}
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.1}
                />
              </Text3D>
            </Center>

            {/* Connecting beam to center */}
            <Cylinder
              args={[0.02, 0.02, radius * 2]}
              position={[-x / 2, 0, -z / 2]}
              rotation={[0, -angle, Math.PI / 2]}
            >
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.3}
                transparent
                opacity={0.4}
              />
            </Cylinder>

            {/* Skill level indicator */}
            <group position={[0, 1.2, 0]}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Sphere
                  key={i}
                  args={[0.05]}
                  position={[(i - 2) * 0.15, 0, 0]}
                >
                  <meshStandardMaterial
                    color={i < 3 + (index % 3) ? "#00ff00" : "#444444"}
                    emissive={i < 3 + (index % 3) ? "#00ff00" : "#000000"}
                    emissiveIntensity={0.2}
                  />
                </Sphere>
              ))}
            </group>
          </group>
        );
      })}

      {/* Central core */}
      <Float speed={0.5} rotationIntensity={1} floatIntensity={0.2}>
        <Sphere args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.1}
            transparent
            opacity={0.2}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Data streams */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.1}>
          <Sphere
            args={[0.03]}
            position={[
              Math.cos((i / 12) * Math.PI * 2 + Date.now() * 0.001) * 3,
              Math.sin((i / 6) * Math.PI + Date.now() * 0.002) * 2,
              Math.sin((i / 12) * Math.PI * 2 + Date.now() * 0.001) * 3
            ]}
          >
            <meshStandardMaterial
              color="#ffff00"
              emissive="#ffff00"
              emissiveIntensity={0.4}
            />
          </Sphere>
        </Float>
      ))}

      {/* Holographic background grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[16, 16, 16, 16]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.05}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};