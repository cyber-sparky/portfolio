export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Finding {
  program: string;
  title: string;
  severity: Severity;
  reward: string;
  status: string;
  date: string;
}

// TODO: Replace with your actual bug bounty findings
export const findings: Finding[] = [
  {
    program: 'Major Tech Corp',
    title: 'IDOR leading to full account takeover via API endpoint',
    severity: 'Critical',
    reward: '$5,000',
    status: 'Resolved',
    date: '2025-11',
  },
  {
    program: 'FinTech Startup',
    title: 'Stored XSS in user profile rendering via SVG upload',
    severity: 'High',
    reward: '$2,500',
    status: 'Resolved',
    date: '2025-08',
  },
  {
    program: 'E-Commerce Platform',
    title: 'SQL injection in search parameter bypassing WAF rules',
    severity: 'Critical',
    reward: '$4,000',
    status: 'Resolved',
    date: '2025-05',
  },
  {
    program: 'SaaS Provider',
    title: 'SSRF via webhook URL allowing internal network scanning',
    severity: 'High',
    reward: '$3,000',
    status: 'Resolved',
    date: '2025-02',
  },
  {
    program: 'Cloud Platform',
    title: 'Authentication bypass through JWT algorithm confusion',
    severity: 'Medium',
    reward: '$1,500',
    status: 'Resolved',
    date: '2024-11',
  },
  {
    program: 'Social Media App',
    title: 'Rate limiting bypass on OTP verification endpoint',
    severity: 'Medium',
    reward: '$1,000',
    status: 'Resolved',
    date: '2024-07',
  },
];

export interface BlogPost {
  title: string;
  platform: string;
  readTime: string;
  date: string;
  url: string;
}

// TODO: Replace with your actual blog posts / writeups
export const blogPosts: BlogPost[] = [
  {
    title: 'How I Found a Critical IDOR in a Fortune 500 Company',
    platform: 'Medium',
    readTime: '8 min read',
    date: '2025-11-15',
    url: 'https://medium.com/@cybersparky/idor-writeup', // TODO: Update URL
  },
  {
    title: 'Automating Recon: Building a Scalable Pipeline with ProjectDiscovery',
    platform: 'Personal Blog',
    readTime: '12 min read',
    date: '2025-09-20',
    url: 'https://cybersparky.com/recon-pipeline', // TODO: Update URL
  },
  {
    title: 'Bypassing WAFs: Techniques That Still Work in 2025',
    platform: 'Bugcrowd Blog',
    readTime: '10 min read',
    date: '2025-06-10',
    url: 'https://bugcrowd.com/blog/waf-bypass', // TODO: Update URL
  },
];
