export interface Skill {
  name: string;
  category: string;
}

export const skillCategories = [
  'Languages',
  'AppSec & DevSecOps',
  'AI Security',
  'DevOps & Containers',
  'Web Technologies',
] as const;

export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'Bash', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },

  // AppSec & DevSecOps
  { name: 'Semgrep', category: 'AppSec & DevSecOps' },
  { name: 'Snyk', category: 'AppSec & DevSecOps' },
  { name: 'Wiz', category: 'AppSec & DevSecOps' },
  { name: 'OWASP Top 10', category: 'AppSec & DevSecOps' },

  // AI Security
  { name: 'LLM Security', category: 'AI Security' },
  { name: 'Prompt Injection', category: 'AI Security' },
  { name: 'AI Supply Chain', category: 'AI Security' },
  { name: 'Model Security', category: 'AI Security' },

  // DevOps & Containers
  { name: 'Docker', category: 'DevOps & Containers' },
  { name: 'Podman', category: 'DevOps & Containers' },
  { name: 'GitHub Actions', category: 'DevOps & Containers' },
  { name: 'CI/CD Pipelines', category: 'DevOps & Containers' },

  // Web Technologies
  { name: 'Node.js', category: 'Web Technologies' },
  { name: 'HTML/CSS', category: 'Web Technologies' },
  { name: 'MySQL', category: 'Web Technologies' },
  { name: 'REST APIs', category: 'Web Technologies' },
];
