import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className="section-heading"
  >
    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{title}</h2>
    <p className="text-muted-foreground mt-3 text-base md:text-lg">{subtitle}</p>
    <div className="section-divider" />
  </motion.div>
);

export default SectionHeading;
