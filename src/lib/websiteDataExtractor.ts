// This utility extracts live data from website components for the chatbot
// When you update Team, Services, or Projects components, the chatbot automatically gets the latest data

export interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  description: string;
}

export interface Service {
  title: string;
  items: string[];
}

export interface Project {
  title: string;
  category: string;
  description: string;
}

export interface Career {
  title: string;
  location: string;
  type: string;
  description: string;
}

export interface About {
  title: string;
  paragraphs: string[];
  tagline: string;
}

export interface WebsiteData {
  about: About;
  team: TeamMember[];
  services: Service[];
  projects: Project[];
  careers: Career[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

// About data - Update this when About.tsx changes
export const getAboutData = (): About => {
  return {
    title: 'About Us',
    paragraphs: [
      'We offer exceptional web development services to create responsive, intuitive, and visually stunning websites. We specialize in seamless navigation, optimized performance, and innovative designs tailored to your brand.',
      'Whether you need dynamic e-commerce platforms, corporate websites, or creative portfolios, our cutting-edge solutions bring your vision to life. Empower your online presence and captivate your audience with our expertise.',
    ],
    tagline: 'AI-Powered Innovation',
  };
};

// Team data - Update this when Team.tsx changes
export const getTeamData = (): TeamMember[] => {
  return [
    {
      name: 'Perivi Harikrishna',
      role: 'Founder',
      expertise: 'ML & Full stack Developer',
      description: '2 years of experience in Machine Learning and AI development. Passionate about building intelligent systems and innovative solutions that solve real-world problems.',
    },
    {
      name: 'Gali Vijay',
      role: 'Co-Founder',
      expertise: 'Frontend Developer',
      description: '1 year of experience as a Frontend Developer. Specializes in creating beautiful, responsive user interfaces with modern web technologies and frameworks.',
    },
  ];
};

// Services data - Update this when Services.tsx changes
export const getServicesData = (): Service[] => {
  return [
    {
      title: 'Web Development',
      items: [
        'Custom Website Development (React, Angular, Vite)',
        'Full-Stack Web Apps (Frontend + Backend)',
        'Portfolio, Business, and E-Commerce Websites',
        'API Integration & Development (Node.js, Flask)',
      ],
    },
    {
      title: 'Mobile App Development',
      items: [
        'Cross-Platform App Development (React Native)',
        'Backend-Powered Mobile Apps (Supabase, SQL)',
        'App Maintenance & Updates',
      ],
    },
    {
      title: 'Chatbot & AI Integration',
      items: [
        'Website Chatbots (Custom AI / OpenAI API)',
        'Customer Support Chatbots',
        'Lead Generation Chatbots',
        'Workflow Automation (automated responses, form handling, etc.)',
      ],
    },
    {
      title: 'Machine Learning & AI Solutions',
      items: [
        'Predictive Analytics & Data Modeling',
        'Computer Vision (YOLO, TensorFlow)',
        'Natural Language Processing (NLP)',
        'Model Deployment & Integration',
      ],
    },
    {
      title: 'Database & Backend Solutions',
      items: [
        'Database Design (MongoDB, PostgreSQL, MySQL)',
        'Cloud Backend Setup (Supabase)',
        'API Development & Integration',
      ],
    },
    {
      title: 'Deployment & DevOps',
      items: [
        'Website & App Deployment (Render, Vercel, Netlify)',
        'Continuous Integration / Continuous Deployment (CI/CD)',
        'Git & GitHub Version Control Setup',
      ],
    },
    {
      title: 'Automation & Workflow Tools',
      items: [
        'Website Chatbots with Auto-Trigger',
        'WhatsApp Bots with Automated Responses',
        'Automated Business Workflows',
        'Custom Dashboards and Admin Panels',
      ],
    },
    {
      title: 'Maintenance & Support',
      items: [
        'Bug Fixes & Performance Optimization',
        'Security & Backup Services',
        'Regular Updates & Feature Enhancements',
      ],
    },
  ];
};

// Projects data - Update this when Projects.tsx changes
export const getProjectsData = (): Project[] => {
  return [
    {
      title: 'AI Vision System',
      category: 'Computer Vision',
      description: 'Real-time object detection and classification for autonomous systems.',
    },
    {
      title: 'NLP Engine',
      category: 'Natural Language',
      description: 'Advanced language understanding for customer service automation.',
    },
    {
      title: 'Predictive Analytics',
      category: 'Data Science',
      description: 'ML-powered forecasting system for enterprise decision making.',
    },
    {
      title: 'Neural Optimization',
      category: 'Deep Learning',
      description: 'Optimizing complex systems using reinforcement learning.',
    },
    {
      title: 'Smart Automation',
      category: 'Process Intelligence',
      description: 'Intelligent workflow automation powered by machine learning.',
    },
    {
      title: 'Data Pipeline',
      category: 'Big Data',
      description: 'Scalable data processing infrastructure for real-time analytics.',
    },
    {
      title: 'Recommendation Engine',
      category: 'Personalization',
      description: 'AI-driven personalization for enhanced user experiences.',
    },
    {
      title: 'Anomaly Detection',
      category: 'Security AI',
      description: 'Real-time threat detection using advanced machine learning.',
    },
  ];
};

// Careers data - Update this when Careers.tsx changes
export const getCareersData = (): Career[] => {
  return [
    {
      title: 'Senior ML Engineer',
      location: 'Chennai, Tamil Nadu',
      type: 'Full-time',
      description: 'Build cutting-edge ML models for real-world applications.',
    },
    {
      title: 'AI Research Scientist',
      location: 'Remote',
      type: 'Full-time',
      description: 'Push the boundaries of AI research and innovation.',
    },
    {
      title: 'Data Engineer',
      location: 'Chennai, Tamil Nadu',
      type: 'Full-time',
      description: 'Design and maintain scalable data infrastructure.',
    },
    {
      title: 'AI Product Manager',
      location: 'Chennai, Tamil Nadu',
      type: 'Full-time',
      description: 'Lead product strategy for AI-powered solutions.',
    },
  ];
};

// Contact data
export const getContactData = () => {
  return {
    email: 'nexoventlabs@gmail.com',
    phone: '+91 8106811285',
    address: 'Andhra Pradesh, India',
  };
};

// Generate dynamic knowledge base from live website data
// This function is called on EVERY chatbot message to ensure fresh, up-to-date information
// When you update Team, Services, Projects, Careers, About, or Contact data, the chatbot automatically reflects those changes
export const generateDynamicKnowledge = (): string => {
  const about = getAboutData();
  const team = getTeamData();
  const services = getServicesData();
  const projects = getProjectsData();
  const careers = getCareersData();
  const contact = getContactData();

  // Add timestamp to ensure this is fresh data (cache-busting)
  const generatedAt = new Date().toISOString();

  let knowledge = `You are a helpful AI assistant for NexoventLabs, an AI solutions company. You should provide accurate information about the company based on the following details:

[DATA FRESHNESS: Generated at ${generatedAt} - This is live, current website data]

## COMPANY INFORMATION
Company Name: NexoventLabs
Mission: Transform businesses through innovative AI solutions that drive growth, efficiency, and unprecedented insights.
Founded by: A team of AI researchers and industry veterans
Approach: Combine cutting-edge research with practical applications to deliver real-world impact

## ABOUT US
${about.paragraphs.join('\n\n')}

Tagline: ${about.tagline}

## CONTACT INFORMATION
Email: ${contact.email}
Phone: ${contact.phone}
Address: ${contact.address}
Social Media:
- Twitter: https://twitter.com/nexoventlabs
- Instagram: https://instagram.com/nexoventlabs
- LinkedIn: https://linkedin.com/company/nexoventlabs

## SERVICES OFFERED\n`;

  services.forEach((service, index) => {
    knowledge += `${index + 1}. ${service.title}\n`;
    service.items.forEach(item => {
      knowledge += `   - ${item}\n`;
    });
    knowledge += '\n';
  });

  knowledge += `## TEAM MEMBERS\n`;
  team.forEach((member, index) => {
    knowledge += `${index + 1}. ${member.name}
   - Role: ${member.role}
   - Expertise: ${member.expertise}
   - Experience: ${member.description}
   
`;
  });

  knowledge += `## FEATURED PROJECTS\n`;
  projects.forEach((project, index) => {
    knowledge += `${index + 1}. ${project.title} (${project.category}) - ${project.description}\n`;
  });

  knowledge += `\n## CAREER OPPORTUNITIES\n`;
  if (careers.length > 0) {
    knowledge += `We are currently hiring for the following positions:\n\n`;
    careers.forEach((job, index) => {
      knowledge += `${index + 1}. ${job.title}
   - Location: ${job.location}
   - Type: ${job.type}
   - Description: ${job.description}
   
`;
    });
  } else {
    knowledge += `We are not currently hiring, but we're always interested in talented individuals. Please contact us at ${contact.email} to express your interest.\n\n`;
  }

  knowledge += `
## INSTRUCTIONS FOR RESPONDING

### Priority 1: Company-Specific Questions (Use Knowledge Base Above)
- If asked "about us" or "who are you", share the About Us section highlighting our web development expertise and AI-powered innovation
- If asked about team members, provide their names, roles, and expertise from the knowledge base
- If asked about services, explain the comprehensive development and AI solutions offered (${services.length} service categories)
- If asked about projects, describe any of the ${projects.length} featured projects
- If asked about careers/jobs, list all ${careers.length} available positions with location and type
- If someone wants to apply for a job, direct them to contact via email: ${contact.email}
- If asked about contact info, provide email, phone, and address
- If someone wants to work with us or hire us, direct them to contact via email: ${contact.email} or call ${contact.phone}

### Priority 2: General Questions (Use Your AI Knowledge)
- For questions about technology, programming, AI, web development, or general topics NOT specific to NexoventLabs:
  * Use your general AI knowledge to provide helpful, accurate answers
  * Be informative and educational
  * Relate the answer back to NexoventLabs services when relevant
  * Example: If asked "What is React?", explain React and mention that NexoventLabs uses it for web development
  
### Response Style:
- Always be friendly, professional, and helpful
- Keep responses concise but informative
- Use your AI capabilities to assist users with both company-specific and general questions
- If unsure about NexoventLabs-specific information, direct users to contact ${contact.email}
- For technical questions, demonstrate expertise while being approachable
`;

  return knowledge;
};

// Get all website data as structured object
export const getAllWebsiteData = (): WebsiteData => {
  return {
    about: getAboutData(),
    team: getTeamData(),
    services: getServicesData(),
    projects: getProjectsData(),
    careers: getCareersData(),
    contact: getContactData(),
  };
};
