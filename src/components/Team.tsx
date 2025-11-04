import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const team = [
    {
      name: 'Perivi Harikrishna',
      role: 'Chief AI Officer',
      expertise: 'Deep Learning & Neural Networks',
    },
  ];

  return (
    <section id="team" className="py-32 px-0 relative">
      <div className="container mx-auto max-w-7xl" style={{ padding: '0px' }} ref={ref}>
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Our Team</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Meet the brilliant minds driving AI innovation
          </p>
        </div>

        <div className="flex justify-center px-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer shine hover:glow-violet transition-all duration-300 w-full max-w-md"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/30 to-primary/10 relative overflow-hidden flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full bg-primary/20 glow-violet relative"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold gradient-text leading-none">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-foreground/60 text-sm mb-4">{member.expertise}</p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-foreground/50 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-foreground/50 hover:text-primary transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
