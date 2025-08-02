import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Float, Sphere, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Button } from "../ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

console.log("Portfolio3D component loading...");

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

// Simple text-based scenes to avoid font loading issues
const IntroScene = ({ userData }: { userData: Portfolio3DProps['userData'] }) => {
  console.log("IntroScene rendering with userData:", userData);
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Central holographic sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[2]} position={[0, 0, -2]}>
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

      {/* Name text using regular Text component */}
      <Center position={[0, 3, 0]}>
        <Text
          fontSize={0.8}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          {userData.name}
        </Text>
      </Center>

      {/* Title text */}
      <Center position={[0, 1.5, 0]}>
        <Text
          fontSize={0.4}
          color="#ff00ff"
          anchorX="center"
          anchorY="middle"
        >
          {userData.title}
        </Text>
      </Center>

      {/* Field text */}
      <Center position={[0, 0.5, 0]}>
        <Text
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {userData.field}
        </Text>
      </Center>

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

const SkillsScene = ({ userData }: { userData: Portfolio3DProps['userData'] }) => {
  const skills = userData.skills.slice(0, 6);

  return (
    <group>
      <Center position={[0, 4, 0]}>
        <Text
          fontSize={0.6}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          Technical Skills
        </Text>
      </Center>

      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={skill} position={[x, 0, z]}>
            <Float speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
              <Sphere args={[0.8]}>
                <meshStandardMaterial
                  color={index % 3 === 0 ? "#00ffff" : index % 3 === 1 ? "#ff00ff" : "#ffff00"}
                  emissive={index % 3 === 0 ? "#00ffff" : index % 3 === 1 ? "#ff00ff" : "#ffff00"}
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.7}
                />
              </Sphere>
            </Float>

            <Center position={[0, -1.5, 0]}>
              <Text
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {skill}
              </Text>
            </Center>
          </group>
        );
      })}
    </group>
  );
};

const ProjectsScene = ({ userData }: { userData: Portfolio3DProps['userData'] }) => {
  const projects = userData.projects.slice(0, 4);

  return (
    <group>
      <Center position={[0, 4, 0]}>
        <Text
          fontSize={0.6}
          color="#ff00ff"
          anchorX="center"
          anchorY="middle"
        >
          Featured Projects
        </Text>
      </Center>

      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={project.name} position={[x, 0, z]}>
            <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <mesh>
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial
                  color="#000000"
                  emissive="#00ffff"
                  emissiveIntensity={0.1}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            </Float>

            <Center position={[0, 1.2, 0.1]}>
              <Text
                fontSize={0.15}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {project.name}
              </Text>
            </Center>
          </group>
        );
      })}
    </group>
  );
};

const ContactScene = ({ userData }: { userData: Portfolio3DProps['userData'] }) => {
  return (
    <group>
      <Center position={[0, 4, 0]}>
        <Text
          fontSize={0.7}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
        >
          Let's Connect
        </Text>
      </Center>

      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <Sphere args={[1.5]} position={[0, 0, 0]}>
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

      <Center position={[0, -2, 0]}>
        <Text
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {userData.email}
        </Text>
      </Center>

      <Center position={[0, -3, 0]}>
        <Text
          fontSize={0.3}
          color="#0077b5"
          anchorX="center"
          anchorY="middle"
        >
          {userData.linkedin}
        </Text>
      </Center>
    </group>
  );
};

export const Portfolio3D = ({ userData }: Portfolio3DProps) => {
  console.log("Portfolio3D rendering with userData:", userData);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const scenes = [
    { component: IntroScene, name: "Introduction", duration: 6000 },
    { component: SkillsScene, name: "Skills", duration: 8000 },
    { component: ProjectsScene, name: "Projects", duration: 10000 },
    { component: ContactScene, name: "Contact", duration: 4000 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentScene((prev) => (prev + 1) % scenes.length);
      }, scenes[currentScene]?.duration || 6000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentScene, scenes]);

  const startPresentation = () => {
    setIsPlaying(true);
    setCurrentScene(0);
  };

  const pausePresentation = () => {
    setIsPlaying(false);
  };

  const CurrentSceneComponent = scenes[currentScene]?.component || IntroScene;

  return (
    <div className="w-full h-screen relative bg-background overflow-hidden">
      {/* 3D Canvas with Error Boundary */}
      <Canvas
        className="w-full h-full"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} color="#00ffff" />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
          
          {/* Grid Background */}
          <gridHelper args={[100, 100, "#00ffff", "#444444"]} position={[0, -5, 0]} />
          
          {/* Current Scene */}
          <CurrentSceneComponent userData={userData} />

          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <Float
              key={i}
              speed={1 + Math.random() * 2}
              rotationIntensity={0.5}
              floatIntensity={0.5}
            >
              <Sphere
                args={[0.02]}
                position={[
                  (Math.random() - 0.5) * 20,
                  (Math.random() - 0.5) * 20,
                  (Math.random() - 0.5) * 20
                ]}
              >
                <meshStandardMaterial
                  color="#00ffff"
                  emissive="#00ffff"
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.6}
                />
              </Sphere>
            </Float>
          ))}

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            enableZoom={false}
            enablePan={false}
            autoRotate={isPlaying}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* Control Panel */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="hologram-panel p-4 flex items-center gap-4">
          <Button
            onClick={isPlaying ? pausePresentation : startPresentation}
            variant="cyber"
            size="lg"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <div className="flex gap-2">
            {scenes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentScene(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentScene === index 
                    ? 'bg-primary shadow-glow-primary' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted/20 z-10">
        <motion.div
          className="h-full bg-gradient-cyber"
          initial={{ width: "0%" }}
          animate={{ 
            width: isPlaying 
              ? `${((currentScene + 1) / scenes.length) * 100}%`
              : "0%"
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Scene Title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          className="absolute top-8 left-8 z-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="neon-text text-2xl font-bold">
            {scenes[currentScene]?.name}
          </h2>
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      {!isPlaying && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="hologram-panel p-8 max-w-md">
            <h3 className="neon-text text-xl mb-4">Interactive 3D Portfolio</h3>
            <p className="text-muted-foreground mb-6">
              Experience an immersive journey through skills, projects, and achievements
            </p>
            <Button
              onClick={startPresentation}
              variant="cyber"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Begin Experience
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};