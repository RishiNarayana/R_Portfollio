import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { GraduationCap, Brain, Code } from "lucide-react";

const highlights = [
  { icon: Brain, label: "AI/ML Focus", desc: "Deep learning, NLP & Computer Vision" },
  { icon: Code, label: "Full Stack", desc: "React, FastAPI, Node.js & more" },
  { icon: GraduationCap, label: "9.60 GPA", desc: "BTech CS at SRMIST" },
];

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28">
    <div className="section-centered">
      <SectionHeading title="About Me" subtitle="Engineer. Builder. Problem solver." />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-muted-foreground text-center text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
      >
        I'm a Computer Engineering student at SRMIST with a deep focus on AI-driven systems
        and scalable backend architectures. My work spans from developing domain-specific LLMs
        to building real-time computer vision systems. I have a strong interest in distributed
        systems and competitive programming.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {highlights.map(({ icon: Icon, label, desc }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card p-8 text-center cursor-pointer hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon size={22} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground">{label}</h3>
            <p className="text-muted-foreground text-sm mt-2">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
