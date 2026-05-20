import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Mail, MapPin, Send } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const ContactSection = () => {
  const [state, handleSubmit] = useForm("xaqkqvwb");


  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="section-centered">
        <SectionHeading title="Get In Touch" subtitle="Let's build something extraordinary together." />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 md:p-12 max-w-lg mx-auto"
        >
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
            <Mail size={16} className="text-primary" />
            <span>rishinarayana2805@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
            <MapPin size={16} className="text-primary" />
            <span>Chennai, India</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {state.succeeded && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            <input type="hidden" name="_subject" value="Portfolio contact form submission" />
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                placeholder="Your name"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                placeholder="you@email.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                placeholder="Shoot a message..."
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <motion.button
              type="submit"
              disabled={state.submitting}
              whileHover={{ scale: state.submitting ? 1 : 1.02 }}
              whileTap={{ scale: state.submitting ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending..." : "Send Message"} <Send size={15} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
