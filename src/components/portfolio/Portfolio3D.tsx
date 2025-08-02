import React from "react";
import { motion } from "framer-motion";
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

export const Portfolio3D = ({ userData }: Portfolio3DProps) => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const scenes = [
    { name: "Introduction", duration: 6000 },
    { name: "Skills", duration: 8000 },
    { name: "Projects", duration: 10000 },
    { name: "Contact", duration: 4000 }
  ];

  React.useEffect(() => {
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

  // Scene content based on current scene
  const renderSceneContent = () => {
    switch (currentScene) {
      case 0:
        return (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-cyber rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
              <div className="relative z-10 w-32 h-32 mx-auto bg-gradient-cyber rounded-full flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-background rounded-full animate-float"></div>
              </div>
            </div>
            <h1 className="neon-text text-6xl font-bold mb-4">{userData.name}</h1>
            <h2 className="text-3xl text-secondary font-semibold mb-2">{userData.title}</h2>
            <p className="text-xl text-muted-foreground">{userData.field}</p>
            <div className="flex justify-center space-x-4 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-primary rounded-full animate-float floating-element"
                  style={{ animationDelay: `${i * 0.5}s` }}
                ></div>
              ))}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center space-y-8"
          >
            <h1 className="neon-text text-5xl font-bold mb-8">Technical Skills</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {userData.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hologram-panel p-4 text-center group hover:scale-105 transition-transform"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${
                    index % 3 === 0 ? 'from-primary to-primary-glow' :
                    index % 3 === 1 ? 'from-secondary to-accent' :
                    'from-accent to-primary'
                  } flex items-center justify-center animate-pulse-glow`}>
                    <div className="w-6 h-6 bg-background rounded-full"></div>
                  </div>
                  <p className="text-sm font-medium text-foreground">{skill}</p>
                  <div className="flex justify-center mt-2 space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < 3 + (index % 3) ? 'bg-primary' : 'bg-muted'
                        }`}
                      ></div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="text-center space-y-8"
          >
            <h1 className="neon-text text-5xl font-bold mb-8">Featured Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {userData.projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="hologram-panel p-6 text-left group hover:scale-105 transition-all duration-300"
                >
                  <div className="w-full h-32 bg-gradient-cyber rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <h3 className="text-xl font-bold text-white z-10">{project.name}</h3>
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      {project.technologies.slice(0, 3).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i === 0 ? 'bg-red-400' :
                            i === 1 ? 'bg-green-400' :
                            'bg-blue-400'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center space-y-8"
          >
            <h1 className="neon-text text-5xl font-bold mb-8">Let's Connect</h1>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-cyber rounded-3xl blur-2xl opacity-20 animate-pulse-glow"></div>
              <div className="relative hologram-panel p-12 space-y-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-float">
                  <div className="w-12 h-12 bg-background rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="hologram-panel p-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary">Email</h3>
                    <p className="text-foreground">{userData.email}</p>
                  </div>
                  
                  <div className="hologram-panel p-4">
                    <h3 className="text-lg font-semibold mb-2 text-secondary">LinkedIn</h3>
                    <p className="text-foreground">{userData.linkedin}</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-accent animate-pulse-glow">Thank You!</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          {renderSceneContent()}
        </div>
      </div>

      {/* Controls */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted/20 z-20">
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
      <motion.div
        key={currentScene}
        className="absolute top-8 left-8 z-20"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="neon-text text-2xl font-bold">
          {scenes[currentScene]?.name}
        </h2>
      </motion.div>
    </div>
  );
};