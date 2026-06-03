import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import portfolioDataJson from '@/data/portfolio-data.json';

export interface PortfolioData {
  hero: {
    name: string;
    initials: string;
    role: string;
    description: string;
    github: string;
    linkedin: string;
    email: string;
  };
  projects: {
    slug: string;
    title: string;
    subtitle: string;
    period: string;
    description: string;
    stack: string[];
    github?: string;
    demo?: string;
  }[];
  about: string[];
  stats: { value: string; label: string }[];
  skills: Record<string, string[]>;
  certifications: string[];
  experience: {
    title: string;
    org: string;
    period: string;
    description: string;
  }[];
  achievements: {
    title: string;
    event: string;
    detail: string;
    date: string;
  }[];
}

/** Bundled JSON fallback — always available, never stale at build time */
export const defaultPortfolioData: PortfolioData = portfolioDataJson as unknown as PortfolioData;

/**
 * Fetch portfolio data from Firestore.
 * Falls back to the bundled JSON if Firestore is unreachable.
 */
export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const docRef = doc(db, 'portfolio', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData;
    }
    // Document doesn't exist yet — return bundled defaults
    return defaultPortfolioData;
  } catch (err) {
    console.error('Firestore fetch failed, using bundled fallback:', err);
    return defaultPortfolioData;
  }
}
