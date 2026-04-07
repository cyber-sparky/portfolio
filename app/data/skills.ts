export interface Skill {
  name: string;
  category: string;
}

export const skillCategories = [
  'Languages',
  'Security & AppSec',
  'DevOps & Containers',
] as const;

export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'C++', category: 'Languages' },

  // Security & AppSec
  { name: 'Semgrep', category: 'Security & AppSec' },
  { name: 'Snyk', category: 'Security & AppSec' },
  { name: 'Wiz', category: 'Security & AppSec' },

  // DevOps & Containers
  { name: 'Docker', category: 'DevOps & Containers' },
  { name: 'Podman', category: 'DevOps & Containers' },
  { name: 'GitHub Actions', category: 'DevOps & Containers' },
];
