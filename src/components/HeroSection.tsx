import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
    {/* Subtle gradient orb */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="section-centered text-center relative z-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-primary font-medium text-sm tracking-widest uppercase mb-6">
          AI/ML Engineer & Full Stack Developer
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-tight">
          Rishi
          <br />
          <span className="gradient-text">Narayana</span>
        </h1>
        <p className="mt-8 text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Building intelligent systems at the intersection of machine learning
          and modern web architecture.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex items-center justify-center gap-6 mt-12"
      >
        {[
          { icon: Github, href: "https://github.com/RishiNarayana", label: "GitHub" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/rishinarayana", label: "LinkedIn" },
          { icon: Mail, href: "mailto:rishinarayana2805@gmail.com", label: "Email" },
        ].map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-200"
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="inline-block mt-20 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </motion.a>
    </div>
  </section>
);

export default HeroSection;
