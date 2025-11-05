import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import OptimizedVideo from './OptimizedVideo';

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
  const [showLoadingGif, setShowLoadingGif] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowLoadingGif(true);

    const startTime = Date.now();
    const minDisplayTime = 2000; // Minimum 2 seconds

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://nexoventlabs-backend.onrender.com';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Calculate remaining time to show the GIF
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      // Wait for the remaining time before hiding the GIF
      await new Promise(resolve => setTimeout(resolve, remainingTime));

      setShowLoadingGif(false);

      if (response.ok && data.success) {
        toast.success('Message sent! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Calculate remaining time to show the GIF
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      // Wait for the remaining time before hiding the GIF
      await new Promise(resolve => setTimeout(resolve, remainingTime));

      setShowLoadingGif(false);
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
    <section id="contact" className="py-32 md:px-6 relative">
      {/* Loading GIF Overlay */}
      {showLoadingGif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <OptimizedVideo
              src="/send"
              fallbackGif="/send.gif"
              alt="Sending message..."
              className="w-48 h-48 object-contain"
              lazy={false}
            />
            <p className="text-white text-xl font-semibold">Sending your message...</p>
          </motion.div>
        </div>
      )}

      <div className="container mx-auto max-w-6xl pl-[2px] pr-[2px]" ref={ref}>
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's talk.
          </p>
        </div>

        {/* Second Section: Contact Details and GIF */}
        <div className="grid md:grid-cols-2 gap-12 mb-12 items-center">
          {/* Contact Details */}
          <div className="space-y-6 w-full">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <a
                key={info.label}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card py-6 pl-4 pr-4 md:px-6 rounded-2xl flex items-center gap-6 group cursor-pointer shine hover:glow-violet transition-all duration-300 block"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center glow-violet group-hover:glow-violet-intense transition-all duration-300 flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/60 mb-2">{info.label}</p>
                  <p className="text-lg font-semibold group-hover:gradient-text transition-all duration-300 break-words">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

          </div>

          {/* Contact Us GIF */}
          <div className="flex items-center justify-center w-full">
            <img 
              src="/contactus.gif" 
              alt="Contact Us" 
              className="w-full h-auto max-w-md object-contain mx-auto"
            />
          </div>
        </div>

        {/* Third Section: Full Width Form */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-3xl font-bold mb-8 gradient-text text-center">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
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
                className="glass-card border-primary/30 focus:border-primary focus:ring-primary glow-violet resize-none min-h-[200px]"
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
      </div>
    </section>
  );
};

export default Contact;
