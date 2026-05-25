'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, Suspense, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import TextReveal, { FadeUp } from '@/components/TextReveal'
import Marquee from '@/components/Marquee'
import ContactForm from '@/components/ContactForm'
import SpotlightCard from '@/components/SpotlightCard'
import MagneticButton from '@/components/MagneticButton'
import {
  PROJECTS,
  HERO,
  ABOUT,
  STATS,
  SKILLS,
  CERTIFICATIONS,
  EXPERIENCE,
  ACHIEVEMENTS
} from '@/data/projects'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

const HomeContent = () => {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.05], [-20, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [searchParams])

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // Split name for visual accentuation
  const nameParts = HERO.name.split(' ')
  const firstName = nameParts.slice(0, 2).join(' ')
  const lastName = nameParts.slice(2).join(' ')

  return (
    <div className="min-h-screen">

      {/* ── Sticky Nav ──────────────────────────── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/50"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href="#" className="text-sm font-semibold tracking-widest text-fg">{HERO.initials}</a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-xs tracking-widest uppercase transition-colors duration-300 cursor-pointer ${
                  activeSection === id ? 'text-accent' : 'text-muted hover:text-fg'
                }`}
              >
                {label}
              </a>
            ))}
            <div className="pl-4 border-l border-border flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ────────────────────────────────── */}
      <section ref={heroRef} className="min-h-[90vh] flex flex-col justify-center px-6 max-w-6xl mx-auto relative pt-20 pb-16 overflow-hidden">
        <motion.div className="space-y-8" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {HERO.role}
          </motion.p>

          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-tighter">
            <TextReveal delay={0.4}>{firstName}</TextReveal>
            <br />
            <span className="text-accent">
              <TextReveal delay={0.7}>{lastName}</TextReveal>
            </span>
          </h1>

          <FadeUp delay={1.2}>
            <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
              {HERO.description}
            </p>
          </FadeUp>

          <FadeUp delay={1.5}>
            <div className="flex flex-wrap gap-4 pt-6">
              <MagneticButton href="#contact" className="text-sm font-semibold text-bg bg-accent border border-accent px-8 py-4
                hover:bg-fg hover:border-fg transition-all duration-300 cursor-pointer tracking-widest uppercase">
                Get in Touch
              </MagneticButton>
              {HERO.github && (
                <MagneticButton href={HERO.github} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium text-fg border border-border px-8 py-4
                  hover:bg-fg hover:text-bg transition-all duration-300 cursor-pointer tracking-widest uppercase">
                  GitHub
                </MagneticButton>
              )}
              {HERO.linkedin && (
                <MagneticButton href={HERO.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium text-fg border border-border px-8 py-4
                  hover:bg-fg hover:text-bg transition-all duration-300 cursor-pointer tracking-widest uppercase">
                  LinkedIn
                </MagneticButton>
              )}
            </div>
          </FadeUp>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-px h-16 bg-border relative overflow-hidden"
          >
            <motion.div
              className="w-full bg-accent absolute top-0"
              style={{ height: '30%' }}
              animate={{ y: ['0%', '233%', '0%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Tech Stack Marquee ──────────────────── */}
      <div className="py-6 border-y border-border">
        <Marquee items={['Next.js', 'TypeScript', 'Python', 'TensorFlow', 'React Native', 'Firebase', 'Django', 'PostgreSQL', 'AWS', 'Supabase']} />
      </div>

      {/* ── About ───────────────────────────────── */}
      <section id="about" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <FadeUp>
              <p className="text-xs tracking-[0.3em] uppercase text-muted mb-4">About</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Building at the intersection of AI & engineering.
              </h2>
            </FadeUp>
          </div>
          <div className="lg:col-span-8 space-y-8">
            {ABOUT.map((para, i) => (
              <FadeUp key={i} delay={0.2 + i * 0.1}>
                <p className="text-muted text-lg leading-relaxed">
                  {para}
                </p>
              </FadeUp>
            ))}
            <FadeUp delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold text-fg">{stat.value}</p>
                    <p className="text-xs text-muted tracking-widest uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────── */}
      <section id="skills" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-4">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">Skills & Technologies</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {Object.entries(SKILLS).map(([category, skills], catIdx) => (
            <FadeUp key={category} delay={catIdx * 0.1}>
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-accent mb-6">{category}</h3>
                <ul className="space-y-3">
                  {skills.map((skill) => (
                    <li key={skill} className="text-muted hover:text-fg transition-colors duration-300 cursor-default text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Certifications */}
        <FadeUp delay={0.4}>
          <div className="mt-20 pt-12 border-t border-border">
            <h3 className="text-xs tracking-[0.3em] uppercase text-accent mb-6">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert) => (
                <p key={cert} className="text-muted text-sm hover:text-fg transition-colors duration-300">{cert}</p>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Experience ──────────────────────────── */}
      <section id="experience" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-4">Career</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">Experience</h2>
        </FadeUp>

        <div className="space-y-0">
          {EXPERIENCE.map((exp, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <SpotlightCard className="py-10 border-b border-border group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 px-4 -mx-4 group-hover:pl-6 transition-all duration-300 ease-out">
                  <div className="md:col-span-3">
                    <p className="text-xs text-muted tracking-widest uppercase mt-1">{exp.period}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-xl font-semibold text-fg mb-1 group-hover:text-accent transition-colors duration-300">{exp.title}</h3>
                    <p className="text-accent text-sm mb-4">{exp.org}</p>
                    <p className="text-muted text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Projects ────────────────────────────── */}
      <section id="projects" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            <div className="md:col-span-3">
              <p className="text-xs tracking-[0.3em] uppercase text-muted pt-2">Work</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Projects</h2>
            </div>
          </div>
        </FadeUp>

        <div className="space-y-0">
          {PROJECTS.slice(0, 3).map((project, i) => (
            <FadeUp key={project.slug} delay={i * 0.08}>
              <Link href={`/projects/${project.slug}`} className="block py-12 border-b border-border group cursor-pointer hover:bg-fg/5 transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-3">
                    <p className="text-xs text-muted tracking-widest uppercase mt-2 group-hover:text-accent transition-colors duration-300">{project.period}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-4xl md:text-5xl font-bold text-fg mb-4 group-hover:pl-4 transition-all duration-500 ease-out flex items-center gap-4">
                      {project.title}
                      <svg className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </h3>
                    <p className="text-sm text-accent uppercase tracking-widest mb-4 group-hover:pl-4 transition-all duration-500 ease-out delay-75">{project.subtitle}</p>
                    <p className="text-muted text-sm leading-relaxed max-w-xl group-hover:pl-4 transition-all duration-500 ease-out delay-100">{project.description}</p>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className="mt-16 flex justify-center">
            <MagneticButton href="/projects" className="text-sm font-semibold text-bg bg-accent border border-accent px-10 py-5
              hover:bg-fg hover:border-fg hover:text-bg transition-all duration-300 cursor-pointer tracking-widest uppercase">
              Show Me More
            </MagneticButton>
          </div>
        </FadeUp>
      </section>

      {/* ── Achievements ────────────────────────── */}
      <section id="achievements" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-4">Recognition</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">Achievements</h2>
        </FadeUp>

        <div className="space-y-0">
          {ACHIEVEMENTS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <SpotlightCard className="py-8 border-b border-border group cursor-default">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 px-4 -mx-4 group-hover:pl-6 transition-all duration-300 ease-out">
                  <div className="md:col-span-3">
                    <p className="text-xs text-muted tracking-widest uppercase mt-1">{item.date}</p>
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-accent text-sm font-semibold">{item.title}</span>
                      <span className="text-fg text-sm group-hover:text-accent transition-colors duration-300">— {item.event}</span>
                    </div>
                    <p className="text-muted text-sm">{item.detail}</p>
                  </div>
                </div>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────── */}
      <section id="contact" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <FadeUp>
              <p className="text-xs tracking-[0.3em] uppercase text-muted mb-4">Contact</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                Let&apos;s work<br/>together.
              </h2>
              <p className="text-muted text-lg mb-12">
                I&apos;m currently available for freelance work and full-time opportunities. If you have a project that needs some creative magic, I&apos;d love to hear about it.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="space-y-6 text-sm">
                  {HERO.email && (
                    <a href={`mailto:${HERO.email}`} className="flex items-center gap-6 text-muted hover:text-accent transition-colors duration-300 group">
                      <svg className="w-5 h-5 text-dim group-hover:text-accent transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {HERO.email}
                    </a>
                  )}
                  {HERO.github && (
                    <a href={HERO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 text-muted hover:text-accent transition-colors duration-300 group">
                      <svg className="w-5 h-5 text-dim group-hover:text-accent transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      {HERO.github.replace('https://', '')}
                    </a>
                  )}
                  {HERO.linkedin && (
                    <a href={HERO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 text-muted hover:text-accent transition-colors duration-300 group">
                      <svg className="w-5 h-5 text-dim group-hover:text-accent transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      {HERO.linkedin.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>
            </FadeUp>
          </div>
          <div className="lg:col-span-7">
            <FadeUp delay={0.2}>
              <div className="pt-4">
                <ContactForm />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dim">© {mounted ? new Date().getFullYear() : '2026'} {HERO.name}</p>
          <div className="flex gap-8">
            {HERO.linkedin && <a href={HERO.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-dim hover:text-fg transition-colors duration-300 cursor-pointer tracking-widest uppercase">LinkedIn</a>}
            {HERO.github && <a href={HERO.github} target="_blank" rel="noopener noreferrer" className="text-xs text-dim hover:text-fg transition-colors duration-300 cursor-pointer tracking-widest uppercase">GitHub</a>}
            {HERO.email && <a href={`mailto:${HERO.email}`} className="text-xs text-dim hover:text-fg transition-colors duration-300 cursor-pointer tracking-widest uppercase">Email</a>}
          </div>
        </div>
      </footer>

    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <HomeContent />
    </Suspense>
  )
}
