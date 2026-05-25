import { PROJECTS } from '@/data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TextReveal, { FadeUp } from '@/components/TextReveal';
import MagneticButton from '@/components/MagneticButton';
import ThemeToggle from '@/components/ThemeToggle';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-bg">
      {/* ── Minimal Nav ──────────────────────────── */}
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
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-accent mb-6">
            <FadeUp>{project.period}</FadeUp>
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9] tracking-tighter mb-6">
            <TextReveal delay={0.1}>{project.title}</TextReveal>
          </h1>
          <FadeUp delay={0.3}>
            <p className="text-xl md:text-2xl text-muted tracking-wide uppercase">
              {project.subtitle}
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-border pt-12">
          <div className="md:col-span-8">
            <FadeUp delay={0.4}>
              <h2 className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Overview</h2>
              <p className="text-lg leading-relaxed text-fg">
                {project.description}
              </p>
            </FadeUp>
          </div>
          
          <div className="md:col-span-4 space-y-8">
            <FadeUp delay={0.5}>
              <h2 className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Technologies</h2>
              <ul className="space-y-4">
                {project.stack.map((tech) => (
                  <li key={tech} className="text-sm font-medium">
                    {tech}
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Links Section */}
            {(project.github || project.demo) && (
              <FadeUp delay={0.55}>
                <h2 className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Links</h2>
                <div className="flex flex-col gap-4 mb-8">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-fg hover:text-accent transition-colors duration-300 flex items-center gap-2.5 group cursor-pointer"
                    >
                      <svg className="w-5 h-5 text-muted group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub Repository
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-fg hover:text-accent transition-colors duration-300 flex items-center gap-2.5 group cursor-pointer"
                    >
                      <svg className="w-5 h-5 text-muted group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </FadeUp>
            )}

            <FadeUp delay={0.6}>
              <MagneticButton href="/" className="mt-8 text-sm font-semibold text-bg bg-accent border border-accent px-8 py-4
                  hover:bg-fg hover:border-fg hover:text-bg transition-all duration-300 cursor-pointer tracking-widest uppercase w-full text-center">
                Return Home
              </MagneticButton>
            </FadeUp>
          </div>
        </div>
      </main>
    </div>
  );
}
