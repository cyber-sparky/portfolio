export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: 'Automated Recon Pipeline',
    description:
      'End-to-end wildcard subdomain enumeration, DNS resolution, HTTP probing, and vulnerability scanning using the ProjectDiscovery stack. Chains subfinder → dnsx → httpx → katana → nuclei → dalfox with smart filtering and notification hooks.',
    tags: ['Go', 'Bash', 'subfinder', 'dnsx', 'httpx', 'nuclei', 'katana', 'dalfox'],
    github: 'https://github.com/cybersparky/recon-pipeline', // TODO: Update URL
    featured: true,
  },
  {
    // TODO: Replace with your actual project
    title: 'Nuclei Template Generator',
    description:
      'CLI tool that auto-generates custom Nuclei templates from raw HTTP request/response pairs. Supports parameterized matchers, dynamic payloads, and YAML validation before execution.',
    tags: ['Python', 'Nuclei', 'YAML', 'CLI'],
    github: 'https://github.com/cybersparky/nuclei-template-gen', // TODO: Update URL
  },
  {
    // TODO: Replace with your actual project
    title: 'Scope Sentinel',
    description:
      'Real-time scope monitoring tool that watches bug bounty program pages for changes in scope, new assets, and updated rules. Sends Discord/Slack alerts on any modifications.',
    tags: ['Python', 'Selenium', 'Discord.py', 'Docker'],
    github: 'https://github.com/cybersparky/scope-sentinel', // TODO: Update URL
    demo: 'https://scope-sentinel.vercel.app', // TODO: Update URL
  },
];
