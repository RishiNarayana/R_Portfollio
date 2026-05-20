import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Camera, TrendingUp, Hand, Beaker } from "lucide-react";

const projects = [
  {
    icon: Camera,
    title: "Smart Face Recognition Attendance",
    desc: "Real-time face recognition system for automated attendance tracking with high accuracy under varied conditions.",
    tags: ["OpenCV", "PyTorch", "MongoDB", "Firebase"],
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Stock Market Analyzer Using Gemini",
    desc: "Time-series analysis and predictive modeling engine using financial indicators for market trend forecasting.",
    tags: ["Python", "TensorFlow", "Pandas", "Spring Boot", "Gemini API"],
  },
  {
    icon: Hand,
    title: "Real-Time Sign Language Recognition",
    desc: "Deep learning-based system that translates sign language gestures into text in real time using computer vision.",
    tags: ["PyTorch", "OpenCV", "CNN", "MediaPipe"],
  },
  {
    icon: Beaker,
    title: "E-Tongue Classification System",
    desc: "Classification of taste profiles using electronic tongue sensor data and machine learning models.",
    tags: ["Python", "Scikit-Learn", "NumPy", "SVM"],
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-20 md:py-28">
    <div className="section-centered">
      <SectionHeading title="Projects" subtitle="Selected work showcasing AI & engineering." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(({ icon: Icon, title, desc, tags }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="glass-card p-8 group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
              <Icon size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
