import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Message sent! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'nexoventlabs@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=nexoventlabs@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8106811285',
      href: 'tel:+918106811285',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Andhra Pradesh, India',
      href: 'https://www.google.com/maps/search/?api=1&query=Andhra+Pradesh,+India',
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's talk.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-8 rounded-2xl shine hover:glow-violet transition-all duration-500 hover:scale-[1.02]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="glass-card border-primary/30 focus:border-primary focus:ring-primary glow-violet"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="glass-card border-primary/30 focus:border-primary focus:ring-primary glow-violet"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    pattern="[0-9\s\-\+\(\)]+"
                    minLength={10}
                    className="glass-card border-primary/30 focus:border-primary focus:ring-primary glow-violet"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="glass-card border-primary/30 focus:border-primary focus:ring-primary glow-violet resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glass glow-violet-intense hover:scale-105 transition-all duration-300 shine disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="glass-card p-6 rounded-2xl flex items-center gap-6 group cursor-pointer shine hover:glow-violet transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center glow-violet group-hover:glow-violet-intense transition-all duration-300">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">{info.label}</p>
                  <p className="text-lg font-semibold group-hover:gradient-text transition-all duration-300">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 rounded-2xl shine hover:glow-violet transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">Follow Us</h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://twitter.com/nexoventlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-violet hover:glow-violet-intense transition-all duration-300"
                >
                  <Twitter className="w-5 h-5 text-primary" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/nexoventlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-violet hover:glow-violet-intense transition-all duration-300"
                >
                  <Instagram className="w-5 h-5 text-primary" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/company/nexoventlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-violet hover:glow-violet-intense transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
