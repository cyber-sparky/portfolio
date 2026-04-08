import type { Metadata } from 'next';
import PrintButton from './PrintButton';
import ThemeToggle from '@/app/components/ThemeToggle';
import { domains } from '@/app/lib/domains';

export const metadata: Metadata = {
  title: 'Resume — Pranaw M | Security Engineer',
  description: 'Resume of Pranaw M, Security Engineer at Freshworks.',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-bg text-secondary">
      {/* Print-only styles */}
      <style>{`
        @media print {
          body { background: #fff !important; color: #111 !important; }
          .no-print { display: none !important; }
          .print-page { 
            background: #fff !important; 
            color: #111 !important; 
            padding: 0 !important;
            max-width: 100% !important;
          }
          .print-page * { color: #111 !important; border-color: #ddd !important; }
          .print-page .accent { color: #0a6e31 !important; }
          .print-page .sub-accent { color: #0077b6 !important; }
          .print-page .muted-print { color: #555 !important; }
          .print-page .section-border { border-color: #ccc !important; }
          a { text-decoration: none !important; }
        }
      `}</style>

      {/* Top bar */}
      <div className="no-print sticky top-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-card-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href={domains.home || '/'}
            className="font-mono text-neon-green text-sm hover:text-glow transition-all"
          >
            ← back to portfolio
          </a>
          <div className="flex items-center gap-2">
            <PrintButton />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Resume content */}
      <div className="print-page max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold font-mono text-primary tracking-tight">
            Pranaw M
          </h1>
          <p className="accent text-neon-green font-mono text-base sm:text-lg mt-1">
            Security Engineer
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm font-mono muted-print text-dimmed">
            <span>Chennai, India</span>
            <span>·</span>
            <a href="mailto:mdpranaw@gmail.com" className="hover:text-neon-green transition-colors">
              mdpranaw@gmail.com
            </a>
            <span>·</span>
            <a href="https://github.com/cyber-sparky" className="hover:text-neon-green transition-colors">
              github.com/cyber-sparky
            </a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/pranaw-m-9ab53024b/" className="hover:text-neon-green transition-colors">
              linkedin.com/in/pranaw-m
            </a>
          </div>
        </header>

        <hr className="section-border border-card-border mb-8" />

        {/* Summary */}
        <section className="mb-8">
          <h2 className="accent text-neon-green font-mono text-sm font-bold uppercase tracking-widest mb-3">
            Summary
          </h2>
          <p className="text-sm leading-relaxed font-sans text-muted">
            Security engineer at Freshworks with hands-on experience in application security,
            DevSecOps, and penetration testing. Focused on embedding security into CI/CD
            pipelines through SAST, SCA, and container scanning using tools like Semgrep, Snyk,
            and Wiz. Proficient in Python, Java, JavaScript, and C++ with a strong foundation
            in full-stack development. Certified in AI Security (CAISP) and DevSecOps (CDP).
          </p>
        </section>

        <hr className="section-border border-card-border mb-8" />

        {/* Experience */}
        <section className="mb-8">
          <h2 className="accent text-neon-green font-mono text-sm font-bold uppercase tracking-widest mb-5">
            Experience
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-bold text-primary text-sm font-sans">
                  Security Engineer — Graduate Trainee
                </h3>
                <span className="muted-print text-dimmed font-mono text-xs shrink-0">
                  Feb 2025 — Present
                </span>
              </div>
              <p className="sub-accent text-muted-cyan font-mono text-xs mt-0.5">Freshworks · Chennai</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted font-sans list-none">
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Conduct application security assessments and code reviews across Freshworks product lines
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Integrate SAST/SCA tooling (Semgrep, Snyk) into CI/CD pipelines to enforce security guardrails
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Manage cloud security posture using Wiz across production infrastructure
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Triage and validate vulnerability reports from external security researchers
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-bold text-primary text-sm font-sans">
                  Security Engineer — Intern
                </h3>
                <span className="muted-print text-dimmed font-mono text-xs shrink-0">
                  Dec 2023 — Feb 2025
                </span>
              </div>
              <p className="sub-accent text-muted-cyan font-mono text-xs mt-0.5">Freshworks · Chennai</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted font-sans list-none">
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Performed penetration testing on web applications to identify security vulnerabilities
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Analyzed and triaged findings from DAST and SAST scans, driving remediation with engineering teams
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Validated and acknowledged vulnerability reports from external researchers
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-bold text-primary text-sm font-sans">
                  FSSA Student — Full-Stack Development
                </h3>
                <span className="muted-print text-dimmed font-mono text-xs shrink-0">
                  Sep 2022 — Dec 2023
                </span>
              </div>
              <p className="sub-accent text-muted-cyan font-mono text-xs mt-0.5">Freshworks Software Academy · Chennai</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted font-sans list-none">
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Built full-stack applications using Java, JavaScript, HTML/CSS, and MySQL
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Developed &quot;Scryptify&quot; — a cybersecurity education platform with intuitive UI/UX
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-green/60 shrink-0">▸</span>
                  Built a Leave Management System with Java backend and MySQL, handling real-time request workflows
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="section-border border-card-border mb-8" />

        {/* Certifications */}
        <section className="mb-8">
          <h2 className="accent text-neon-green font-mono text-sm font-bold uppercase tracking-widest mb-5">
            Certifications
          </h2>
          <div className="space-y-2.5 text-sm font-sans">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
              <div>
                <span className="text-primary font-semibold">Certified AI Security Professional (CAISP)</span>
                <span className="muted-print text-dimmed"> — Practical DevSecOps</span>
              </div>
              <span className="muted-print text-dimmed font-mono text-xs shrink-0">Sep 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
              <div>
                <span className="text-primary font-semibold">Certified DevSecOps Professional (CDP)</span>
                <span className="muted-print text-dimmed"> — Practical DevSecOps</span>
              </div>
              <span className="muted-print text-dimmed font-mono text-xs shrink-0">Apr 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
              <div>
                <span className="text-primary font-semibold">Google Cybersecurity Certificate</span>
                <span className="muted-print text-dimmed"> — Google / Coursera</span>
              </div>
              <span className="muted-print text-dimmed font-mono text-xs shrink-0">Jan 2024</span>
            </div>
          </div>
        </section>

        <hr className="section-border border-card-border mb-8" />

        {/* Skills */}
        <section className="mb-8">
          <h2 className="accent text-neon-green font-mono text-sm font-bold uppercase tracking-widest mb-4">
            Skills
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm font-sans">
            <div className="flex gap-2">
              <span className="muted-print text-dimmed font-mono w-24 shrink-0">Languages</span>
              <span className="text-secondary">Python, Java, JavaScript, C++</span>
            </div>
            <div className="flex gap-2">
              <span className="muted-print text-dimmed font-mono w-24 shrink-0">Security</span>
              <span className="text-secondary">Semgrep, Snyk, Wiz, SAST, DAST, SCA</span>
            </div>
            <div className="flex gap-2">
              <span className="muted-print text-dimmed font-mono w-24 shrink-0">DevOps</span>
              <span className="text-secondary">Docker, Podman, GitHub Actions</span>
            </div>
            <div className="flex gap-2">
              <span className="muted-print text-dimmed font-mono w-24 shrink-0">Web</span>
              <span className="text-secondary">HTML, CSS, MySQL, REST APIs</span>
            </div>
          </div>
        </section>

        <hr className="section-border border-card-border mb-8" />

        {/* Education */}
        <section className="mb-8">
          <h2 className="accent text-neon-green font-mono text-sm font-bold uppercase tracking-widest mb-5">
            Education
          </h2>
          <div className="space-y-3 text-sm font-sans">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
              <div>
                <span className="text-primary font-semibold">BCA, Computer Application</span>
                <span className="muted-print text-dimmed"> — SASTRA Deemed University</span>
              </div>
              <span className="muted-print text-dimmed font-mono text-xs shrink-0">2025 — 2027</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
              <div>
                <span className="text-primary font-semibold">Computer Science, XII</span>
                <span className="muted-print text-dimmed"> — Govt. Higher Secondary School, Karur</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-border border-card-border mb-8" />

        {/* Projects */}
        <section>
          <h2 className="accent text-neon-green font-mono text-sm font-bold uppercase tracking-widest mb-5">
            Projects
          </h2>
          <div className="space-y-4 text-sm font-sans">
            <div>
              <h3 className="text-primary font-semibold">Scryptify</h3>
              <p className="text-muted mt-1 leading-relaxed">
                Frontend cybersecurity education platform designed to teach non-technical
                users about common threats, hacking methods, and digital self-defense
                through an intuitive interface.
              </p>
            </div>
            <div>
              <h3 className="text-primary font-semibold">Fresh Leave — Leave Management System</h3>
              <p className="text-muted mt-1 leading-relaxed">
                Full-stack application with Java backend and MySQL database enabling
                streamlined leave request workflows, real-time status tracking, and
                manager approval dashboards.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
