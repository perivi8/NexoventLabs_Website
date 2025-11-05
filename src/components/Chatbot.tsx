import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';
import { generateDynamicKnowledge } from '@/lib/websiteDataExtractor';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m the NexoventLabs AI assistant. How can I help you today? Feel free to ask about our services, team, careers, projects, or contact information!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatbotRef.current &&
        buttonRef.current &&
        !chatbotRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Check backend connection only when chatbot is opened - deferred to avoid blocking initial page load
  useEffect(() => {
    if (!isOpen || connectionStatus !== 'checking') return;

    const checkConnection = async () => {
      const urls = [
        import.meta.env.VITE_API_URL,
        'https://nexoventlabs-backend.onrender.com',
        'http://localhost:3001'
      ].filter(Boolean);

      for (const apiUrl of urls) {
        try {
          console.log('🔍 Checking connection to:', apiUrl);
          const response = await fetch(`${apiUrl}/api/health`, {
            signal: AbortSignal.timeout(5000) // 5 second timeout
          });
          if (response.ok) {
            setConnectionStatus('connected');
            console.log('✅ Backend connected:', apiUrl);
            // Store the working URL for later use
            sessionStorage.setItem('chatbot_api_url', apiUrl);
            return;
          }
        } catch (error) {
          console.warn('⚠️ Failed to connect to:', apiUrl);
        }
      }
      
      setConnectionStatus('disconnected');
      console.error('❌ All backend URLs failed');
    };
    
    // Defer the check slightly to not block rendering
    const timeoutId = setTimeout(checkConnection, 100);
    return () => clearTimeout(timeoutId);
  }, [isOpen, connectionStatus]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Try multiple backend URLs in order: stored working URL, env variable, production, localhost
      const storedUrl = sessionStorage.getItem('chatbot_api_url');
      const urls = [
        storedUrl,
        import.meta.env.VITE_API_URL,
        'https://nexoventlabs-backend.onrender.com',
        'http://localhost:3001'
      ].filter(Boolean);

      // Send minimal conversation history (last 3 messages only) to prevent AI from using old cached data
      // This ensures the AI prioritizes fresh knowledge over conversation context
      const recentHistory = messages.slice(-3).map(msg => ({
        sender: msg.sender,
        text: msg.text
      }));

      // Generate dynamic knowledge from current website data
      // This ensures the chatbot ALWAYS has the latest information from the website
      const dynamicKnowledge = generateDynamicKnowledge();
      console.log('🔄 Generated fresh dynamic knowledge at:', new Date().toISOString());
      console.log('📊 Knowledge size:', dynamicKnowledge.length, 'characters');

      let lastError = null;
      
      for (const apiUrl of urls) {
        try {
          console.log('🔗 Trying to connect to:', apiUrl);
          
          const response = await fetch(`${apiUrl}/api/chatbot`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: inputMessage,
              conversationHistory: recentHistory,
              websiteKnowledge: dynamicKnowledge // Send live website data
            }),
            signal: AbortSignal.timeout(10000) // 10 second timeout
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setConnectionStatus('connected');
            // Store the working URL
            sessionStorage.setItem('chatbot_api_url', apiUrl);
            
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              text: data.response,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            console.log('✅ Response received successfully from:', apiUrl);
            return; // Success, exit the function
          } else {
            lastError = new Error(data.message || 'Failed to get response');
          }
        } catch (error) {
          console.warn('⚠️ Failed with:', apiUrl, error);
          lastError = error;
          continue; // Try next URL
        }
      }
      
      // If we get here, all URLs failed
      setConnectionStatus('disconnected');
      throw lastError || new Error('All backend URLs failed');
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setConnectionStatus('disconnected');
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error connecting to the server. Please ensure the backend is running or contact us at nexoventlabs@gmail.com for assistance.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error('Backend connection failed. Tried all available URLs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div
        ref={buttonRef}
        className="fixed bottom-3 right-1 md:right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-24 w-24 rounded-full bg-transparent border-0 hover:bg-transparent hover:scale-110 transition-all duration-300 p-0"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <img src={theme === 'light' ? '/AI1.gif' : '/AI.gif'} alt="AI Assistant" className="h-16 w-16" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatbotRef}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0 }}
            className="fixed bottom-24 right-3 md:right-6 z-50 w-[400px] max-w-[calc(100vw-24px)] h-[500px] glass-card rounded-2xl shadow-2xl glow-violet flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center glow-violet">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg gradient-text">NexoventLabs AI</h3>
                    <p className="text-xs text-foreground/60">Always here to help</p>
                  </div>
                </div>
                {/* Connection Status Indicator */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'connected'
                        ? 'bg-green-500 animate-pulse'
                        : connectionStatus === 'disconnected'
                        ? 'bg-red-500'
                        : 'bg-yellow-500 animate-pulse'
                    }`}
                  />
                  <span className="text-xs text-foreground/50">
                    {connectionStatus === 'connected'
                      ? 'Online'
                      : connectionStatus === 'disconnected'
                      ? 'Offline'
                      : 'Connecting...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-primary/20'
                          : 'bg-primary/10 glow-violet'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-primary" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary/20 text-foreground'
                          : 'glass-card text-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                      <p className="text-xs text-foreground/40 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center glow-violet">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="glass-card rounded-2xl p-3">
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="glass-card border-primary/30 focus:border-primary focus:ring-primary glow-violet"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="glass glow-violet-intense hover:scale-105 transition-all duration-300"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
