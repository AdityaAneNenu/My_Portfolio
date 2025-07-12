'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaCode, FaRocket, FaBrain, FaNetworkWired, FaGithub, FaChartLine, FaBars, FaTimes } from 'react-icons/fa'
import { useEffect, Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import LiquidBackground from '@/components/LiquidBackground'
import LiquidTypewriter from '@/components/LiquidTypewriter'
import GestureInteractive, { MagneticElement } from '@/components/GestureInteractive'
import ContactForm from '@/components/ContactForm'

const HomeContent = () => {
  const searchParams = useSearchParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const projects = [
    {
      id: 1,
      title: "Money Mentor AI - AI-Powered Financial Advisor",
      period: "Apr 2025 - May 2025",
      description: "Developed Money Mentor AI, a modern financial advisory platform using Next.js 15, React 19, and TypeScript. This application provides intelligent financial guidance through an interactive chat interface with real-time market data and cited research.",
      keyContributions: [
        "Built responsive UI with Tailwind CSS and Framer Motion animations",
        "Implemented dark/light theme with system preference detection",
        "Created accessible components following WCAG 2.1 AA standards",
        "Optimized performance with Next.js 15 and Turbopack",
        "Designed AI chat interface for financial advice with citation support"
      ],
      techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
      icon: FaBrain,
      color: "cyan",
      category: "AI/ML"
    },
    {
      id: 2,
      title: "Campus Area Network using VLAN",
      period: "Jun 2024 - Jul 2024",
      company: "Associated with BSNL LTD",
      description: "Designed a college campus network across a five-floor building (Ground + 4) with comprehensive VLAN implementation and security features.",
      keyContributions: [
        "Cisco 2811 Router configuration with 100Mbps ISP connectivity",
        "VLANs for departments (CSC, IT, ECE, EEE) with inter-VLAN routing",
        "Bandwidth allocation: 40Mbps CSC, 30Mbps IT, 20Mbps ECE, 10Mbps EEE",
        "DHCP for automatic IP assignment and DNS for URL browsing",
        "Security implementation with login credentials and port security",
        "College website (IP: 117.117.117.3) publicly accessible configuration"
      ],
      techStack: ["Cisco 2811 Router", "VLAN", "DHCP", "DNS", "Network Security", "Cisco Packet Tracer"],
      icon: FaNetworkWired,
      color: "purple",
      category: "Networking"
    },
    {
      id: 3,
      title: "Multi-Agentic Chat System with Structured Results",
      period: "Apr 2025",
      description: "Developed a modular AI chatbot using Python and OpenAI API with multiple task-specific agents for enhanced performance and accuracy.",
      keyContributions: [
        "Developed modular AI chatbot using Python and OpenAI API",
        "Achieved 90%+ classification accuracy across 200+ sample queries",
        "Reduced response time by 35% through intent-based routing",
        "Implemented prompt engineering for optimized performance"
      ],
      techStack: ["Python", "OpenAI API", "Natural Language Processing", "Machine Learning"],
      icon: FaRocket,
      color: "blue",
      category: "AI/ML"
    },
    {
      id: 4,
      title: "DreamScribe - AI-Powered Dream Journal",
      period: "May 2025 - July 2025",
      description: "DreamScribe is an AI-powered dream journal that helps users record, analyze, and understand their dreams through advanced insights and pattern recognition.",
      keyContributions: [
        "Developed an AI-powered dream analysis system for comprehensive insights, including emotional breakdowns and symbol identification.",
        "Built a cross-platform application (web, iOS, Android) from a single codebase using React Native and Expo.",
        "Established a robust and secure backend with Supabase for user authentication, data storage, and real-time features.",
        "Designed an intuitive user interface with features for seamless dream recording, interactive analytics, and a comprehensive symbol library."
      ],
      techStack: ["TypeScript", "React Native", "Expo", "Supabase", "PostgreSQL", "Lucide Icons"],
      icon: FaChartLine,
      color: "green",
      category: "AI/ML"
    }
  ]

  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {!isMobile && <LiquidBackground />}

      {/* Navigation */}
      {isMobile ? (
        <>
          {/* Mobile Header */}
          <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <div className="text-white font-bold text-lg">VSLD</div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2"
              >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </motion.nav>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-white text-2xl font-medium hover:text-orange-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </>
      ) : (
        /* Desktop Navigation */
        <motion.nav
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="glass-card px-6 py-3">
            <div className="flex items-center space-x-6">
              <MagneticElement>
                <a href="#home" className="text-white hover:text-orange-300 transition-colors font-medium text-sm">Home</a>
              </MagneticElement>
              <MagneticElement>
                <a href="#about" className="text-white/80 hover:text-orange-300 transition-colors font-medium text-sm">About</a>
              </MagneticElement>
              <MagneticElement>
                <a href="#skills" className="text-white/80 hover:text-orange-300 transition-colors font-medium text-sm">Skills</a>
              </MagneticElement>
              <MagneticElement>
                <a href="#experience" className="text-white/80 hover:text-orange-300 transition-colors font-medium text-sm">Experience</a>
              </MagneticElement>
              <MagneticElement>
                <a href="#projects" className="text-white/80 hover:text-orange-300 transition-colors font-medium text-sm">Projects</a>
              </MagneticElement>
              <MagneticElement>
                <a href="#contact" className="text-white/80 hover:text-orange-300 transition-colors font-medium text-sm">Contact</a>
              </MagneticElement>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Hero Section */}
      <section id="home" className={`min-h-screen flex items-center justify-center px-4 md:px-6 relative ${isMobile ? 'pt-20' : 'pt-32'}`}>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'} font-display font-bold mb-6 leading-tight`}>
              <span className="block text-white mb-2">
                Venkata Siva
              </span>
              <span className="block" style={{ color: '#ff783c' }}>
                <LiquidTypewriter text="Lalitaaditya Duggi" delay={isMobile ? 10 : 5} />
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mb-12"
          >
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl md:text-3xl'} text-white/80 mb-4 font-medium`}>
              AI/ML Developer | B.Tech Computer Science
            </h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-white/70 max-w-3xl mx-auto mb-8`}>
              Experienced in building OpenAI-based chatbots, implementing machine learning models with TensorFlow and Scikit-learn, and deploying cloud-based solutions using AWS. Skilled in software development, networking, and rapid prototyping in collaborative environments.
            </p>
            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-center space-x-4'} text-sm text-white/60`}>
              <span>📧 adityaduggi0@gmail.com</span>
              <span>📱 +91 733 066 9413</span>
              <span>🌐 github.com/AdityaAneNenu</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 3 }}
            className={`flex ${isMobile ? 'flex-col space-y-4' : 'justify-center space-x-6'} mb-12`}
          >
            {isMobile ? (
              <>
                <motion.a
                  href="https://www.linkedin.com/in/vsld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-button flex items-center justify-center space-x-3"
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="w-5 h-5" />
                  <span>Connect</span>
                </motion.a>
                <motion.a
                  href="https://github.com/AdityaAneNenu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-button flex items-center justify-center space-x-3"
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="w-5 h-5" />
                  <span>Explore</span>
                </motion.a>
                <motion.a
                  href="#contact"
                  className="liquid-button flex items-center justify-center space-x-3"
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className="w-5 h-5" />
                  <span>Contact</span>
                </motion.a>
              </>
            ) : (
              <>
                <GestureInteractive>
                  <motion.a
                    href="https://www.linkedin.com/in/vsld"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-button flex items-center space-x-3"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin className="w-5 h-5" />
                    <span>Connect</span>
                  </motion.a>
                </GestureInteractive>
                <GestureInteractive>
                  <motion.a
                    href="https://github.com/AdityaAneNenu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-button flex items-center space-x-3"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>Explore</span>
                  </motion.a>
                </GestureInteractive>
                <GestureInteractive>
                  <motion.a
                    href="#contact"
                    className="liquid-button flex items-center space-x-3"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEnvelope className="w-5 h-5" />
                    <span>Contact</span>
                  </motion.a>
                </GestureInteractive>
              </>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div
              className="w-1 h-3 rounded-full mt-2"
              style={{
                background: `linear-gradient(180deg,
                  rgba(var(--orange-glow), 1) 0%,
                  rgba(var(--purple-glow), 1) 100%)`
              }}
              animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-6 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: isMobile ? 0 : 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card">
              <p className="text-lg text-white/80 leading-relaxed">
                As an <span className="gradient-text font-semibold">AI/ML Developer</span>, I specialize in building OpenAI-based chatbots and implementing machine learning models with <span className="gradient-text font-semibold">TensorFlow and Scikit-learn</span>. My expertise extends to deploying cloud-based solutions using AWS, with a strong foundation in software development, networking, and rapid prototyping in collaborative environments.
              </p>
            </div>
            <div className="glass-card">
              <p className="text-lg text-white/80 leading-relaxed">
                Currently serving as <span className="gradient-text font-semibold">Vice President of VIT-AP Newspaper Club</span>, I lead initiatives combining creative writing and tech journalism. My technical journey includes developing multi-agentic chat systems, network optimization projects, and machine learning pipelines for stock prediction, achieving <span className="gradient-text font-semibold">90%+ classification accuracy</span> across diverse applications.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: isMobile ? 0.2 : 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <motion.div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg,
                      rgba(var(--orange-glow), 0.8) 0deg,
                      rgba(var(--purple-glow), 0.8) 120deg,
                      rgba(var(--blue-glow), 0.8) 240deg,
                      rgba(var(--orange-glow), 0.8) 360deg)`,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <div className="absolute inset-2 bg-black/80 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10">
                  <FaCode className="w-12 h-12 text-white/80" />
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Digital Innovation Leader
              </h3>
              <p className="text-white/70">
                Bridging the gap between technology and creativity through strategic leadership and hands-on development.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 md:px-6 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto stagger-fade-in">
          {/* Programming Skills */}
          <motion.div
            className="glass-card group h-full"
            whileHover={isMobile ? {} : { scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <FaCode className="w-6 h-6 text-orange-400 mr-3" />
              <h3 className="text-xl font-display font-semibold text-white">Programming</h3>
            </div>
            <div className="space-y-4">
              {[
                { skill: 'Python', level: 95 },
                { skill: 'Java', level: 85 },
                { skill: 'MySQL', level: 80 },
                { skill: 'HTML/CSS', level: 90 }
              ].map((item, index) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">{item.skill}</span>
                    <span className="text-orange-400 text-xs">{item.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-400 to-purple-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI/ML Tools */}
          <motion.div
            className="glass-card group h-full"
            whileHover={isMobile ? {} : { scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <FaBrain className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-display font-semibold text-white">AI/ML Tools</h3>
            </div>
            <div className="space-y-4">
              {[
                { skill: 'TensorFlow', level: 90 },
                { skill: 'PyTorch', level: 85 },
                { skill: 'Keras', level: 88 },
                { skill: 'Scikit-learn', level: 92 }
              ].map((item, index) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">{item.skill}</span>
                    <span className="text-purple-400 text-xs">{item.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools & Platforms */}
          <motion.div
            className="glass-card group h-full"
            whileHover={isMobile ? {} : { scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <FaNetworkWired className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-display font-semibold text-white">Tools & Platforms</h3>
            </div>
            <div className="space-y-4">
              {[
                { skill: 'VS Code', level: 95 },
                { skill: 'Git/GitHub', level: 90 },
                { skill: 'AWS Console', level: 85 },
                { skill: 'Figma', level: 75 }
              ].map((item, index) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">{item.skill}</span>
                    <span className="text-blue-400 text-xs">{item.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="glass-card group h-full"
            whileHover={isMobile ? {} : { scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <FaRocket className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-display font-semibold text-white">Certifications</h3>
            </div>
            <div className="space-y-3">
              {[
                { cert: 'Crash Course on Python by Google', date: 'Dec 2023' },
                { cert: 'Digital Skills: AI by Accenture', date: 'Sep 2024' },
                { cert: 'Microsoft Azure AI Fundamentals', date: 'Jul 2024' },
                { cert: 'AWS Cloud Foundations', date: 'Sep 2024' }
              ].map((item, index) => (
                <motion.div
                  key={item.cert}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-white/80 text-sm font-medium block leading-tight">{item.cert}</span>
                        <span className="text-xs text-white/50 mt-1 block">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 md:px-6 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold neon-text mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>

          <div className="space-y-12">
            {[
              {
                title: 'Vice President',
                company: 'VIT-AP Newspaper Club',
                period: 'Oct 2024 - Present',
                description: 'Led initiatives combining creative writing and tech journalism. Organized interactive sessions on innovation and public speaking.',
                icon: FaRocket,
                color: 'cyan'
              },
              {
                title: 'Intern - RTTC BSNL',
                company: 'Hyderabad',
                period: 'Jun 2024 - Jul 2024',
                description: 'Configured routers and VLAN switches across simulated BSNL campus network environments. Analyzed and optimized subnetting strategies to improve traffic flow by 30%. Captured and diagnosed network traffic using Wireshark for 10+ test cases.',
                icon: FaNetworkWired,
                color: 'purple'
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                className="relative flex items-start"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-gray-900 z-10 ${
                  exp.color === 'cyan' ? 'bg-cyan-400' :
                  exp.color === 'purple' ? 'bg-purple-400' : 'bg-blue-400'
                }`}></div>
                <div className="ml-16 futuristic-card flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white mb-1">{exp.title}</h3>
                      <p className={`font-semibold mb-2 ${
                        exp.color === 'cyan' ? 'text-cyan-400' :
                        exp.color === 'purple' ? 'text-purple-400' : 'text-blue-400'
                      }`}>{exp.company}</p>
                      <p className="text-gray-500 text-sm">{exp.period}</p>
                    </div>
                    <exp.icon className={`w-8 h-8 flex-shrink-0 ${
                      exp.color === 'cyan' ? 'text-cyan-400' :
                      exp.color === 'purple' ? 'text-purple-400' : 'text-blue-400'
                    }`} />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 md:px-6 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold neon-text mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore my journey through AI/ML development, network engineering, and full-stack applications.
            Each project represents a milestone in my technical evolution.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className={`space-y-${isMobile ? '12' : '16'}`}>
          {projects.map((project, index) => (
            isMobile ? (
              <motion.div
                key={project.id}
                className="grid grid-cols-1 gap-6 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Project Number & Icon */}
                <div className="col-span-1 flex flex-row items-center mb-4">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center border-2 border-cyan-400">
                      <span className="text-cyan-400 font-bold text-xs">{project.id}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ml-4 ${
                    project.category === 'AI/ML' ? 'bg-cyan-500/20 text-cyan-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* Project Content */}
                <div className="col-span-1">
                  <div className="futuristic-card p-4">
                    <div className={`flex flex-col mb-6`}>
                      <div>
                        <h3 className="text-xl font-display font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        {project.company && (
                          <p className="text-gray-400 mb-2">{project.company}</p>
                        )}
                        <p className={`text-sm font-semibold ${
                          project.color === 'cyan' ? 'text-cyan-400' :
                          project.color === 'purple' ? 'text-purple-400' :
                          project.color === 'blue' ? 'text-blue-400' :
                          'text-green-400'
                        }`}>
                          {project.period}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Key Contributions:</h4>
                      <ul className="space-y-2">
                        {project.keyContributions.map((contribution, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                              project.color === 'cyan' ? 'bg-cyan-400' :
                              project.color === 'purple' ? 'bg-purple-400' :
                              project.color === 'blue' ? 'bg-blue-400' :
                              'bg-green-400'
                            }`}></div>
                            <span className="text-gray-300">{contribution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-3 py-1 rounded-full ${
                              project.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-300' :
                              project.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                              project.color === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-green-500/20 text-green-300'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <GestureInteractive key={project.id}>
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                  initial={{ opacity: 0, y: 50 }}
                  {...(index === 0 ? {
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.8, delay: 0.5 }
                  } : {
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.8, delay: (index - 1) * 0.2 },
                    viewport: { once: true }
                  })}
                >
                  {/* Project Number & Icon */}
                  <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center animate-pulse-slow">
                        <project.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center border-2 border-cyan-400">
                        <span className="text-cyan-400 font-bold text-sm">{project.id}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      project.category === 'AI/ML' ? 'bg-cyan-500/20 text-cyan-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Project Content */}
                  <div className="lg:col-span-10">
                    <div className="futuristic-card p-8">
                      <div className={`flex flex-col md:flex-row md:items-start md:justify-between mb-6`}>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                            {project.title}
                          </h3>
                          {project.company && (
                            <p className="text-gray-400 mb-2">{project.company}</p>
                          )}
                          <p className={`text-sm font-semibold ${
                            project.color === 'cyan' ? 'text-cyan-400' :
                            project.color === 'purple' ? 'text-purple-400' :
                            project.color === 'blue' ? 'text-blue-400' :
                            'text-green-400'
                          }`}>
                            {project.period}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Key Contributions:</h4>
                        <ul className="space-y-2">
                          {project.keyContributions.map((contribution, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                                project.color === 'cyan' ? 'bg-cyan-400' :
                                project.color === 'purple' ? 'bg-purple-400' :
                                project.color === 'blue' ? 'bg-blue-400' :
                                'bg-green-400'
                              }`}></div>
                              <span className="text-gray-300">{contribution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-3 py-1 rounded-full ${
                                project.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-300' :
                                project.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                                project.color === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-green-500/20 text-green-300'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </GestureInteractive>
            )
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-6 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold neon-text mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Let&apos;s connect and discuss opportunities in AI/ML, software development, or any exciting tech projects.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="futuristic-card">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                    <FaEnvelope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <a href="mailto:adityaduggi0@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      adityaduggi0@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                    <FaLinkedin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">LinkedIn</h4>
                    <a href="https://www.linkedin.com/in/vsld" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                      linkedin.com/in/vsld
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center">
                    <FaGithub className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">GitHub</h4>
                    <a href="https://github.com/AdityaAneNenu" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                      github.com/AdityaAneNenu
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">
              © 2024 Venkata Siva Lalitaaditya Duggi. Crafted with passion and futuristic vision.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/vsld"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/AdityaAneNenu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="mailto:adityaduggi0@gmail.com"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}

