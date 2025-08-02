import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, Sphere, Box, Cylinder } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Button } from "../ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

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

// Animated background component
function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshStandardMaterial
        color="#001122"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

// Scene 1: Introduction
function IntroScene({ userData, isActive }: { userData: Portfolio3DProps['userData'], isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central orb */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.5]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>

      {/* Name */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.8}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {userData.name}
      </Text>

      {/* Title */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.4}
        color="#ff00ff"
        anchorX="center"
        anchorY="middle"
      >
        {userData.title}
      </Text>

      {/* Field */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {userData.field}
      </Text>

      {/* Orbiting elements */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3}>
            <Box
              args={[0.2, 0.2, 0.2]}
              position={[
                Math.cos(angle) * 4,
                Math.sin(angle * 2) * 1,
                Math.sin(angle) * 4
              ]}
            >
              <meshStandardMaterial
                color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                emissive={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                emissiveIntensity={0.2}
              />
            </Box>
          </Float>
        );
      })}
    </group>
  );
}

// Scene 2: Skills
function SkillsScene({ userData, isActive }: { userData: Portfolio3DProps['userData'], isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const skills = userData.skills.slice(0, 8);

  return (
    <group ref={groupRef}>
      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.6}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        Skills & Expertise
      </Text>

      {/* Skill spheres */}
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={skill} position={[x, 0, z]}>
            <Float speed={1 + index * 0.1} rotationIntensity={0.2}>
              <Sphere args={[0.6]}>
                <meshStandardMaterial
                  color={`hsl(${(index * 45) % 360}, 70%, 60%)`}
                  emissive={`hsl(${(index * 45) % 360}, 70%, 30%)`}
                  emissiveIntensity={0.3}
                />
              </Sphere>
            </Float>
            
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {skill}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

// Scene 3: Projects
function ProjectsScene({ userData, isActive }: { userData: Portfolio3DProps['userData'], isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const projects = userData.projects.slice(0, 4);

  return (
    <group ref={groupRef}>
      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.6}
        color="#ff00ff"
        anchorX="center"
        anchorY="middle"
      >
        Featured Projects
      </Text>

      {/* Project displays */}
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={project.name} position={[x, 0, z]}>
            {/* Project screen */}
            <Float speed={0.5} rotationIntensity={0.1}>
              <Box args={[2.5, 1.5, 0.1]}>
                <meshStandardMaterial
                  color="#000033"
                  emissive="#000066"
                  emissiveIntensity={0.2}
                />
              </Box>
            </Float>

            {/* Project name */}
            <Text
              position={[0, 1.2, 0.1]}
              fontSize={0.12}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {project.name}
            </Text>

            {/* Tech indicators */}
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <Sphere
                key={tech}
                args={[0.05]}
                position={[(techIndex - 1) * 0.3, -1, 0.2]}
              >
                <meshStandardMaterial
                  color={`hsl(${techIndex * 120}, 80%, 60%)`}
                  emissive={`hsl(${techIndex * 120}, 80%, 30%)`}
                  emissiveIntensity={0.5}
                />
              </Sphere>
            ))}
          </group>
        );
      })}
    </group>
  );
}

// Scene 4: Contact
function ContactScene({ userData, isActive }: { userData: Portfolio3DProps['userData'], isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.7}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
      >
        Let's Connect
      </Text>

      {/* Central communication hub */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <Sphere args={[1.2]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.3}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Contact info */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {userData.email}
      </Text>

      <Text
        position={[0, -2.5, 0]}
        fontSize={0.25}
        color="#0077b5"
        anchorX="center"
        anchorY="middle"
      >
        LinkedIn: {userData.linkedin}
      </Text>

      {/* Connecting lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <Cylinder
            key={i}
            args={[0.01, 0.01, 3]}
            position={[Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5]}
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
    </group>
  );
}

export const Portfolio3D = ({ userData }: Portfolio3DProps) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const nextScene = () => {
    setCurrentScene((prev) => (prev + 1) % scenes.length);
  };

  const prevScene = () => {
    setCurrentScene((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const CurrentSceneComponent = scenes[currentScene]?.component || IntroScene;

  return (
    <div className="w-full h-screen relative bg-background overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
          />

          {/* Background */}
          <AnimatedBackground />

          {/* Current Scene */}
          <CurrentSceneComponent userData={userData} isActive={isPlaying} />

          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <Float
              key={i}
              speed={1 + Math.random() * 2}
              rotationIntensity={0.3}
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
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.5}
                />
              </Sphere>
            </Float>
          ))}

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            enableZoom={true}
            enablePan={false}
            autoRotate={isPlaying}
            autoRotateSpeed={1}
            minDistance={5}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>

      {/* UI Controls */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="hologram-panel p-4 flex items-center gap-4">
          <Button onClick={prevScene} variant="cyber" size="lg">
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button onClick={togglePlay} variant="cyber" size="lg">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          
          <Button onClick={nextScene} variant="cyber" size="lg">
            <SkipForward className="w-5 h-5" />
          </Button>

          <div className="flex gap-2 ml-4">
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
            width: `${((currentScene + 1) / scenes.length) * 100}%`
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
      {!isPlaying && currentScene === 0 && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="hologram-panel p-8 max-w-md">
            <h3 className="neon-text text-xl mb-4">3D Portfolio Experience</h3>
            <p className="text-muted-foreground mb-6">
              Navigate through an immersive showcase of skills, projects, and achievements
            </p>
            <Button
              onClick={togglePlay}
              variant="cyber"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Start Experience
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};