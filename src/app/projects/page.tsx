import { PROJECTS } from '@/data/projects';
import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata = {
  title: 'Projects | Venkata Siva Lalitaaditya Duggi',
  description: 'A collection of my recent projects and work.',
};

export default function ProjectsIndexPage() {
  // Pass static data for initial SSR — ProjectsGrid hydrates with Firestore on client
  return <ProjectsGrid projects={PROJECTS} />;
}
