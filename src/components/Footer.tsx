import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="section-centered text-center">
      <div className="flex items-center justify-center gap-5 mb-4">
        {[
          { icon: Github, href: "#", label: "GitHub" },
          { icon: Linkedin, href: "#", label: "LinkedIn" },
          { icon: Mail, href: "#contact", label: "Email" },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Rishi Narayana. Crafted with precision.
      </p>
    </div>
  </footer>
);

export default Footer;
