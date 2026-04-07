export interface Skill {
  name: string;
  category: string;
}

export const skillCategories = [
  'Recon & OSINT',
  'Web App Testing',
  'Automation & Scripting',
  'Platforms & Certifications',
] as const;

export const skills: Skill[] = [
  { name: 'Subfinder', category: 'Recon & OSINT' },
  { name: 'httpx', category: 'Recon & OSINT' },
  { name: 'Katana', category: 'Recon & OSINT' },
  { name: 'dnsx', category: 'Recon & OSINT' },
  { name: 'Nmap', category: 'Recon & OSINT' },
  { name: 'ffuf', category: 'Recon & OSINT' },
  { name: 'Amass', category: 'Recon & OSINT' },
  { name: 'Shodan', category: 'Recon & OSINT' },

  { name: 'Burp Suite', category: 'Web App Testing' },
  { name: 'SQLmap', category: 'Web App Testing' },
  { name: 'Nuclei', category: 'Web App Testing' },
  { name: 'Dalfox', category: 'Web App Testing' },
  { name: 'Metasploit', category: 'Web App Testing' },
  { name: 'Caido', category: 'Web App Testing' },

  { name: 'Python', category: 'Automation & Scripting' },
  { name: 'Bash', category: 'Automation & Scripting' },
  { name: 'Go', category: 'Automation & Scripting' },
  { name: 'Docker', category: 'Automation & Scripting' },
  { name: 'GitHub Actions', category: 'Automation & Scripting' },
  { name: 'Ansible', category: 'Automation & Scripting' },

  { name: 'HackerOne', category: 'Platforms & Certifications' },
  { name: 'Bugcrowd', category: 'Platforms & Certifications' },
  { name: 'TryHackMe', category: 'Platforms & Certifications' },
  { name: 'OSCP', category: 'Platforms & Certifications' }, // TODO: Update cert status
  { name: 'BSCP', category: 'Platforms & Certifications' }, // TODO: Update cert status
  { name: 'eWPT', category: 'Platforms & Certifications' }, // TODO: Update cert status
];
