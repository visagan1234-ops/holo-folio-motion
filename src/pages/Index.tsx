import { Portfolio3D } from "@/components/portfolio/Portfolio3D";

const Index = () => {
  // Sample user data - replace with your actual information
  const userData = {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    field: "Full-Stack Development & AI",
    email: "alex.johnson@email.com",
    linkedin: "linkedin.com/in/alexjohnson",
    skills: [
      "React & Next.js",
      "Node.js & Express",
      "Python & Django",
      "TypeScript",
      "AWS & Cloud",
      "Machine Learning",
      "Docker & K8s",
      "PostgreSQL"
    ],
    projects: [
      {
        name: "AI-Powered Analytics",
        description: "Machine learning platform for business intelligence",
        technologies: ["Python", "TensorFlow", "React", "AWS"]
      },
      {
        name: "Real-time Chat App",
        description: "Scalable messaging platform with WebSocket",
        technologies: ["Node.js", "Socket.io", "React", "MongoDB"]
      },
      {
        name: "E-commerce Platform",
        description: "Full-stack marketplace with payment integration",
        technologies: ["Next.js", "Stripe", "PostgreSQL", "Vercel"]
      },
      {
        name: "Mobile Health Tracker",
        description: "Cross-platform health monitoring application",
        technologies: ["React Native", "Firebase", "Redux", "Charts.js"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Portfolio3D userData={userData} />
    </div>
  );
};

export default Index;
