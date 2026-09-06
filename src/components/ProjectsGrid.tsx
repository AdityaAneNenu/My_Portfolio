'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TextReveal, { FadeUp } from '@/components/TextReveal';
import ThemeToggle from '@/components/ThemeToggle';
import { fetchPortfolioData, type PortfolioData } from '@/lib/firebase-data';

interface ProjectsGridProps {
  projects: PortfolioData['projects'];
}

export default function ProjectsGrid({ projects: initialProjects }: ProjectsGridProps) {
  const [liveProjects, setLiveProjects] = useState(initialProjects);

  useEffect(() => {
    fetchPortfolioData().then(data => {
      if (data.projects) setLiveProjects(data.projects);
    });
  }, []);

  const projects = liveProjects;
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
              <div className="group block h-full border border-border bg-bg hover:bg-fg/5 transition-all duration-300 flex flex-col justify-between">
                <Link href={`/projects/${project.slug}`} className="p-8 pb-4 flex flex-col flex-grow">
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
                  
                  <p className="text-muted text-sm leading-relaxed flex-grow line-clamp-4">
                    {project.description}
                  </p>
                </Link>

                <div className="px-8 pb-8 pt-0 flex flex-col gap-4">
                  {/* GitHub & Demo links */}
                  {(project.github || project.demo) && (
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted hover:text-accent transition-colors duration-300 flex items-center gap-1.5 tracking-widest uppercase cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted hover:text-accent transition-colors duration-300 flex items-center gap-1.5 tracking-widest uppercase cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border mt-auto">
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
              </div>
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
