import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skillGroups = [
  {
    category: "AI / ML",
    skills: ["Python", "PyTorch", "TensorFlow", "Hugging Face", "NLP", "Computer Vision", "Scikit-Learn"],
  },
  {
    category: "Full Stack",
    skills: ["React", "TypeScript", "Node.js", "FastAPI", "MongoDB", "SQL", "REST APIs"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "Docker", "Firebase", "Linux", "VS Code", "Jupyter"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-20 md:py-28">
    <div className="section-centered">
      <SectionHeading title="Skills" subtitle="Technologies I work with every day." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillGroups.map(({ category, skills }, gi) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.1 }}
            className="text-center"
          >
            <h3 className="font-heading font-semibold text-foreground mb-5">{category}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm px-4 py-2 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary cursor-pointer transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
