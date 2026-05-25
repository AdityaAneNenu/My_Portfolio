'use client';

import { useState } from 'react';
import Link from 'next/link';
import TextReveal, { FadeUp } from '@/components/TextReveal';
import ThemeToggle from '@/components/ThemeToggle';
import MagneticButton from '@/components/MagneticButton';
import { Project } from '@/data/projects';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-bg">
      {/* ── Sticky Nav ──────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <Link href="/" className="text-sm font-semibold tracking-widest hover:text-accent transition-colors duration-300 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── Content ──────────────────────────────── */}
      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-muted mb-4">
            <FadeUp>Archive</FadeUp>
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9] tracking-tighter mb-6">
            <TextReveal delay={0.1}>All Projects</TextReveal>
          </h1>
          <FadeUp delay={0.2}>
            <p className="text-sm text-accent tracking-widest uppercase">
              Page {currentPage} of {totalPages}
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, i) => (
            <FadeUp key={project.slug} delay={i * 0.05} className="h-full">
              <Link href={`/projects/${project.slug}`} className="block h-full p-8 border border-border bg-bg hover:bg-fg/5 transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  <p className="text-xs text-muted tracking-widest uppercase mb-6 group-hover:text-accent transition-colors duration-300">
                    {project.period}
                  </p>
                  
                  <h3 className="text-2xl font-bold text-fg mb-3 flex items-start justify-between group-hover:text-accent transition-colors duration-300">
                    <span className="leading-tight">{project.title}</span>
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 ml-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </h3>
                  
                  <p className="text-xs text-accent uppercase tracking-widest mb-4">
                    {project.subtitle}
                  </p>
                  
                  <p className="text-muted text-sm leading-relaxed flex-grow mb-6 line-clamp-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-border mt-auto">
                    {project.stack.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[10px] tracking-wider uppercase text-muted bg-fg/5 px-2 py-1">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-[10px] tracking-wider uppercase text-muted bg-fg/5 px-2 py-1">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <FadeUp delay={0.3}>
            <div className="flex items-center justify-center gap-6 mt-16 pt-8 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`text-sm font-semibold tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 ${
                  currentPage === 1 ? 'text-muted cursor-not-allowed opacity-50' : 'text-fg hover:text-accent cursor-pointer'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPage(idx + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-full transition-colors duration-300 ${
                      currentPage === idx + 1 ? 'bg-accent text-bg' : 'text-muted hover:text-fg hover:bg-fg/5'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`text-sm font-semibold tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 ${
                  currentPage === totalPages ? 'text-muted cursor-not-allowed opacity-50' : 'text-fg hover:text-accent cursor-pointer'
                }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </FadeUp>
        )}
      </main>
    </div>
  );
}
