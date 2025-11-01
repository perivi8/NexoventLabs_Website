import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Company: ['About', 'Services', 'Projects', 'Team'],
    Resources: ['Blog', 'Documentation', 'Research', 'Case Studies'],
    Support: ['Contact', 'Careers', 'FAQ', 'Privacy Policy'],
  };

  return (
    <footer className="relative py-16 px-6 glass border-t border-primary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <motion.h3
              className="text-2xl font-bold gradient-text mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Nexovent Labs
            </motion.h3>
            <p className="text-foreground/60 text-sm leading-relaxed mb-6">
              Empowering businesses with next-generation AI solutions.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <motion.a
                href="https://twitter.com/nexoventlabs"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-all duration-300"
              >
                <Twitter className="w-4 h-4 text-primary" />
              </motion.a>
              <motion.a
                href="https://instagram.com/nexoventlabs"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-all duration-300"
              >
                <Instagram className="w-4 h-4 text-primary" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/nexoventlabs"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 text-primary" />
              </motion.a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4 text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      className="text-foreground/60 hover:text-primary transition-colors text-sm relative group"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/60 text-sm">
            © 2025 Nexovent Labs. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <motion.a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
              whileHover={{ scale: 1.1 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
              whileHover={{ scale: 1.1 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
