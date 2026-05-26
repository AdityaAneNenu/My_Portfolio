import { PROJECTS } from '@/data/projects';
import ProjectsGrid from '@/components/ProjectsGrid';
import path from 'path';
import fs from 'fs/promises';

export const revalidate = 0; // Force dynamic server rendering

export const metadata = {
  title: 'Projects | Venkata Siva Lalitaaditya Duggi',
  description: 'A collection of my recent projects and work.',
};

export default async function ProjectsIndexPage() {
  // Read live projects from disk for accurate SSR
  const filePath = path.join(process.cwd(), 'src', 'data', 'portfolio-data.json');
  let liveProjects = PROJECTS;
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(fileData);
    if (parsed.projects) {
      liveProjects = parsed.projects;
    }
  } catch (e) {
    console.error('Error reading live projects for projects page:', e);
  }

  return <ProjectsGrid projects={liveProjects} />;
}
