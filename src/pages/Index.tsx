import { lazy, Suspense } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Chatbot from '@/components/Chatbot';
import WhatsAppButton from '@/components/WhatsAppButton';

// Lazy load components below the fold for better performance
const About = lazy(() => import('@/components/About'));
const WhyChoose = lazy(() => import('@/components/WhyChoose'));
const Services = lazy(() => import('@/components/Services'));
const Projects = lazy(() => import('@/components/Projects'));
const Team = lazy(() => import('@/components/Team'));
const Careers = lazy(() => import('@/components/Careers'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* <CustomCursor /> */}
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <About />
          <WhyChoose />
          <Services />
          <Projects />
          <Team />
          <Careers />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
};

export default Index;
