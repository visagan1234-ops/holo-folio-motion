import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Text3D, Center, Float, Sphere, Box } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { IntroScene } from "./scenes/IntroScene";
import { SkillsScene } from "./scenes/SkillsScene";
import { ProjectsScene } from "./scenes/ProjectsScene";
import { ContactScene } from "./scenes/ContactScene";
import { Button } from "../ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

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
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scenes = [
    { component: IntroScene, name: "Introduction", duration: 6000 },
    { component: SkillsScene, name: "Skills", duration: 8000 },
    { component: ProjectsScene, name: "Projects", duration: 10000 },
    { component: ContactScene, name: "Contact", duration: 4000 }
  ];

  const totalDuration = scenes.reduce((acc, scene) => acc + scene.duration, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentScene((prev) => {
          const next = (prev + 1) % scenes.length;
          return next;
        });
      }, scenes[currentScene]?.duration || 6000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentScene, scenes]);

  const startPresentation = () => {
    setIsPlaying(true);
    setCurrentScene(0);
    if (audioRef.current && !isMuted) {
      audioRef.current.play();
    }
  };

  const pausePresentation = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const CurrentSceneComponent = scenes[currentScene]?.component || IntroScene;

  return (
    <div className="w-full h-screen relative bg-background overflow-hidden">
      {/* Audio */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        className="hidden"
      >
        <source src="data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAAAR0ZW4AcGVuAEQAYQB0AGEAcwBhAGEAcwBhAGEA" />
      </audio>

      {/* 3D Canvas */}
      <Canvas
        ref={canvasRef}
        className="w-full h-full"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} color="#00ffff" />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#ffffff"
            castShadow
          />

          {/* Environment */}
          <Environment preset="city" background={false} />
          
          {/* Grid Background */}
          <gridHelper args={[100, 100, "#00ffff", "#444444"]} position={[0, -5, 0]} />
          
          {/* Current Scene */}
          <group>
            <CurrentSceneComponent 
              userData={userData} 
              isActive={isPlaying}
              sceneIndex={currentScene}
            />
          </group>

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
          
          <Button
            onClick={toggleMute}
            variant="cyber"
            size="lg"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
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