'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import MagneticButton from '@/components/MagneticButton';
import { HERO as staticHero } from '@/data/projects';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [hero, setHero] = useState(staticHero);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Fetch live data on mount to ensure initials/socials are correct
    fetch('/api/admin/portfolio-data')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch');
      })
      .then(data => {
        if (data.hero) {
          setHero(data.hero);
        }
      })
      .catch(err => console.error('Error fetching live portfolio data for 404 page:', err));
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  if (!mounted) {
    return <div className="min-h-screen bg-bg" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-bg text-fg transition-colors duration-300 selection:bg-accent selection:text-bg font-sans">
      
      {/* ── Page Header / Nav ──────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/50 py-3"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="text-sm font-semibold tracking-widest text-fg">
            {(hero.name || 'Venkata Siva Lalitaaditya Duggi').toUpperCase()}
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-xs tracking-widest uppercase text-muted hover:text-fg transition-colors duration-300">
              Home
            </Link>
            <Link href="/?section=projects" className="text-xs tracking-widest uppercase text-muted hover:text-fg transition-colors duration-300">
              Projects
            </Link>
            <Link href="/?section=about" className="text-xs tracking-widest uppercase text-muted hover:text-fg transition-colors duration-300">
              About
            </Link>
            <Link href="/?section=contact" className="text-xs tracking-widest uppercase text-muted hover:text-fg transition-colors duration-300">
              Contact
            </Link>
            <div className="pl-4 border-l border-border flex items-center">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-8 h-8 flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-5 h-[1.5px] bg-fg block"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute w-5 h-[1.5px] bg-fg block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-5 h-[1.5px] bg-fg block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-14 left-0 right-0 z-40 bg-bg border-b border-border md:hidden"
            >
              <div className="px-6 py-6 space-y-1">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Projects', href: '/?section=projects' },
                  { label: 'About', href: '/?section=about' },
                  { label: 'Contact', href: '/?section=contact' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 text-sm tracking-widest uppercase text-muted hover:text-fg transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content block ───────────────────────── */}
      <main className="flex-grow flex flex-col justify-center items-center px-6 pt-24 pb-16 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-xl text-center z-10 flex flex-col items-center">
          
          {/* Animated 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10rem] sm:text-[14rem] font-light text-muted/20 select-none tracking-tighter leading-none"
          >
            404
          </motion.h1>

          {/* Staggered Text & Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="flex flex-col items-center"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-fg mb-4 mt-2"
            >
              Page Not Found
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-muted text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed"
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <MagneticButton href="/" className="bg-fg text-bg hover:bg-fg/90 border border-fg px-6 py-3.5 rounded-lg flex items-center gap-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 shadow-lg shadow-fg/5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Home
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* ── Footer ────────────────────────────────── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="border-t border-border/50 py-6 sm:py-8 px-4 sm:px-6 z-10"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dim">© 2026 {hero.name}</p>
          <div className="flex gap-6 sm:gap-8">
            {hero.linkedin && (
              <a
                href={hero.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-dim hover:text-fg transition-colors duration-300 cursor-pointer tracking-widest uppercase"
              >
                LinkedIn
              </a>
            )}
            {hero.github && (
              <a
                href={hero.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-dim hover:text-fg transition-colors duration-300 cursor-pointer tracking-widest uppercase"
              >
                GitHub
              </a>
            )}
            {hero.email && (
              <a
                href={`mailto:${hero.email}`}
                className="text-xs text-dim hover:text-fg transition-colors duration-300 cursor-pointer tracking-widest uppercase"
              >
                Email
              </a>
            )}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
