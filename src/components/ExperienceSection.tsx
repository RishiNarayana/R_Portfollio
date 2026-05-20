import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    role: "AIML Intern",
    org: "IITM Pravartak Technologies Foundation",
    period: "2024",
    desc: "Developed domain-specific Large Language Models using Hugging Face and PyTorch. Fine-tuned transformer architectures for specialized NLP tasks.",
  },
  {
    role: "Technical Member",
    org: "GeeksforGeeks — SRM RMP",
    period: "2023 – Present",
    desc: "Mentored peers in Data Structures & Algorithms. Organized coding workshops and competitive programming events.",
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-20 md:py-28">
    <div className="section-centered">
      <SectionHeading title="Experience" subtitle="Professional journey and contributions." />
      <div className="relative max-w-xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-border" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.15 }}
            className="relative mb-16 last:mb-0"
          >
            {/* Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10" />
            <div className={`glass-card p-7 ${i % 2 === 0 ? "mr-auto pr-8 mr-[52%]" : "ml-auto pl-8 ml-[52%]"}`}>
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{exp.period}</span>
              <h3 className="font-heading font-semibold text-foreground mt-1">{exp.role}</h3>
              <p className="text-sm text-muted-foreground font-medium">{exp.org}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
