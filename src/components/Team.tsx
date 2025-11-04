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
      role: 'Founder',
      expertise: 'ML & Full stack Developer',
      image: '/1.JPG',
      description: '2 years of experience in Machine Learning and AI development. Passionate about building intelligent systems and innovative solutions that solve real-world problems.',
    },
    {
      name: 'Gali Vijay',
      role: 'Co-Founder',
      expertise: 'Frontend Developer',
      image: '/2.png',
      description: '1 year of experience as a Frontend Developer. Specializes in creating beautiful, responsive user interfaces with modern web technologies and frameworks.',
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer shine hover:glow-violet transition-all duration-300"
            >
              <div className="h-64 bg-gradient-to-br from-primary/30 to-primary/10 relative overflow-hidden flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full overflow-hidden glow-violet relative"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-foreground/60 text-sm mb-3">{member.expertise}</p>
                <p className="text-foreground/50 text-sm mb-4 leading-relaxed">{member.description}</p>
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
