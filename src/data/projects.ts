import portfolioData from './portfolio-data.json';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
}

export interface ExperienceItem {
  title: string;
  org: string;
  period: string;
  description: string;
}

export interface AchievementItem {
  title: string;
  event: string;
  detail: string;
  date: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroData {
  name: string;
  initials: string;
  role: string;
  description: string;
  github: string;
  linkedin: string;
  email: string;
}

export const PROJECTS: Project[] = portfolioData.projects;
export const HERO: HeroData = portfolioData.hero;
export const ABOUT: string[] = portfolioData.about;
export const STATS: StatItem[] = portfolioData.stats;
export const SKILLS: Record<string, string[]> = portfolioData.skills;
export const CERTIFICATIONS: string[] = portfolioData.certifications;
export const EXPERIENCE: ExperienceItem[] = portfolioData.experience;
export const ACHIEVEMENTS: AchievementItem[] = portfolioData.achievements;
