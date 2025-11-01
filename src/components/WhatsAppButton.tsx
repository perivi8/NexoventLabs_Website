import { motion } from 'framer-motion';
import { Button } from './ui/button';

const WhatsAppButton = () => {
  // Replace with your actual WhatsApp number (format: country code + number, no spaces or special characters)
  const whatsappNumber = '918106811285'; // Indian number with country code
  const message = 'Hello! I would like to know more about NexoventLabs.';
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      className="fixed bottom-8 left-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={handleWhatsAppClick}
        className="h-16 w-16 rounded-full bg-transparent border-0 hover:bg-transparent hover:scale-110 transition-all duration-300 p-0"
        size="icon"
        aria-label="Contact us on WhatsApp"
      >
        <img src="/whatsapp.gif" alt="WhatsApp" className="h-16 w-16" />
      </Button>
    </motion.div>
  );
};

export default WhatsAppButton;
