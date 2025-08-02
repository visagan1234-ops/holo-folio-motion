import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, Box, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface ProjectsSceneProps {
  userData: {
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
    }>;
  };
  isActive: boolean;
  sceneIndex: number;
}

export const ProjectsScene = ({ userData, isActive }: ProjectsSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const projectRefs = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }

    projectRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.1);
        ref.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 2) * 0.5;
      }
    });
  });

  const projects = userData.projects.slice(0, 6); // Limit to 6 projects

  return (
    <group ref={groupRef}>
      {/* Central title */}
      <Center position={[0, 5, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.6}
          height={0.1}
          curveSegments={12}
        >
          Featured Projects
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Center>

      {/* Project displays arranged in a helix */}
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (index - projects.length / 2) * 1.5;

        return (
          <group
            key={project.name}
            ref={(el) => el && (projectRefs.current[index] = el)}
            position={[x, y, z]}
          >
            {/* Project display screen */}
            <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <Box args={[3, 2, 0.1]}>
                <meshStandardMaterial
                  color="#000000"
                  emissive="#00ffff"
                  emissiveIntensity={0.1}
                  transparent
                  opacity={0.8}
                />
              </Box>
            </Float>

            {/* Project frame */}
            <Box args={[3.2, 2.2, 0.05]} position={[0, 0, -0.1]}>
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.2}
              />
            </Box>

            {/* Project title */}
            <Center position={[0, 1.5, 0.1]}>
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.15}
                height={0.02}
                curveSegments={12}
              >
                {project.name}
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.2}
                />
              </Text3D>
            </Center>

            {/* Technology orbs */}
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <Float
                key={tech}
                speed={1 + techIndex * 0.3}
                rotationIntensity={0.5}
                floatIntensity={0.3}
              >
                <Sphere
                  args={[0.1]}
                  position={[
                    (techIndex - 1.5) * 0.4,
                    -1.5,
                    0.2
                  ]}
                >
                  <meshStandardMaterial
                    color={
                      techIndex % 4 === 0 ? "#ff0000" :
                      techIndex % 4 === 1 ? "#00ff00" :
                      techIndex % 4 === 2 ? "#0000ff" : "#ffff00"
                    }
                    emissive={
                      techIndex % 4 === 0 ? "#ff0000" :
                      techIndex % 4 === 1 ? "#00ff00" :
                      techIndex % 4 === 2 ? "#0000ff" : "#ffff00"
                    }
                    emissiveIntensity={0.3}
                  />
                </Sphere>
              </Float>
            ))}

            {/* Holographic data visualization */}
            <group position={[0, -0.5, 0.2]}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Cylinder
                  key={i}
                  args={[0.05, 0.05, Math.random() * 0.8 + 0.2]}
                  position={[(i - 2) * 0.3, 0, 0]}
                >
                  <meshStandardMaterial
                    color="#00ff00"
                    emissive="#00ff00"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.7}
                  />
                </Cylinder>
              ))}
            </group>

            {/* Connection lines to center */}
            <Cylinder
              args={[0.01, 0.01, radius]}
              position={[-x / 2, -y / 2, -z / 2]}
              rotation={[
                Math.atan2(y, Math.sqrt(x * x + z * z)),
                Math.atan2(z, x) - Math.PI / 2,
                0
              ]}
            >
              <meshStandardMaterial
                color="#ff00ff"
                emissive="#ff00ff"
                emissiveIntensity={0.2}
                transparent
                opacity={0.6}
              />
            </Cylinder>

            {/* Floating code elements */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Float
                key={i}
                speed={1.5 + i * 0.2}
                rotationIntensity={0.3}
                floatIntensity={0.4}
              >
                <Box
                  args={[0.05, 0.05, 0.05]}
                  position={[
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 3,
                    0.5 + Math.random() * 0.5
                  ]}
                >
                  <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.4}
                  />
                </Box>
              </Float>
            ))}
          </group>
        );
      })}

      {/* Central hub */}
      <Float speed={0.3} rotationIntensity={0.5} floatIntensity={0.2}>
        <Sphere args={[0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Rotating rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[
            Math.PI / 3 * i,
            0,
            Math.PI / 4 * i
          ]}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[3 + i * 0.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Data streams */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={3 + i * 0.1} rotationIntensity={0.1}>
          <Sphere
            args={[0.02]}
            position={[
              Math.cos((i / 15) * Math.PI * 4) * (2 + Math.sin(Date.now() * 0.001 + i) * 2),
              Math.sin((i / 15) * Math.PI * 2) * 4,
              Math.sin((i / 15) * Math.PI * 4) * (2 + Math.cos(Date.now() * 0.001 + i) * 2)
            ]}
          >
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </Sphere>
        </Float>
      ))}

      {/* Background matrix */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, -8]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshStandardMaterial
          color="#ff00ff"
          transparent
          opacity={0.03}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};