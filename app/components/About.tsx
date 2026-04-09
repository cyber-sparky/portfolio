'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-3 sm:px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary mb-2">
            <span className="text-muted-cyan">01.</span> about_me
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 sm:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            {/* TODO: Replace with your actual bio */}
            <div className="space-y-4 text-muted leading-relaxed font-sans">
              <p>
                Security engineer with a focus on application security, DevSecOps, and
                building secure-by-default pipelines. I work at the intersection of
                development and security — embedding SAST, SCA, and container scanning
                into CI/CD workflows so vulnerabilities get caught before they ship.
              </p>
              <p>
                My day-to-day involves working with tools like Semgrep, Snyk, and Wiz
                to enforce security guardrails across codebases and cloud infrastructure.
                I write code in Python, Java, JavaScript, and C++ — which helps me think
                like both the developer and the attacker.
              </p>
              <p>
                Outside of work, I&apos;m a CTF enthusiast, constantly learning new
                exploitation techniques and staying sharp on the offensive side to better
                understand what I&apos;m defending against.
              </p>
            </div>

            <div className="mt-6 p-4 bg-card-bg border border-card-border rounded-lg font-mono text-sm">
              <div className="text-dimmed mb-1">$ cat focus.txt</div>
              <div className="text-neon-green/80">
                Application Security • DevSecOps • SAST/SCA • Container Security
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2"
          >
            <div className="bg-card-bg border border-card-border rounded-lg p-4 sm:p-5 font-mono text-sm space-y-3">
              <div className="text-dimmed text-xs mb-4">$ neofetch --security</div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-dimmed">role</span>
                  <span className="text-neon-green">Security Engineer</span>
                </div>
                <div className="h-px bg-card-border" />

                <div className="flex justify-between items-center">
                  <span className="text-dimmed">focus</span>
                  <span className="text-muted-cyan">AppSec / DevSecOps</span>
                </div>
                <div className="h-px bg-card-border" />

                <div className="flex justify-between items-center">
                  <span className="text-dimmed">languages</span>
                  <span className="text-secondary">Py, Java, JS, C++</span>
                </div>
                <div className="h-px bg-card-border" />

                <div className="flex justify-between items-center">
                  <span className="text-dimmed">tools</span>
                  <span className="text-secondary">Semgrep, Snyk, Wiz</span>
                </div>
                <div className="h-px bg-card-border" />

                <div className="flex justify-between items-center">
                  <span className="text-dimmed">infra</span>
                  <span className="text-secondary">Docker, Podman, GHA</span>
                </div>
                <div className="h-px bg-card-border" />

                <div className="flex justify-between items-center">
                  <span className="text-dimmed">vibes</span>
                  <span className="text-secondary">CTFs, Anime, Coffee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 sm:mt-14"
        >
          <div className="bg-card-bg border border-card-border rounded-lg p-4 sm:p-6 font-mono text-sm">
            <div className="text-dimmed text-xs mb-5">$ ls ~/certs/ --verbose</div>
            <div className="grid gap-4 sm:gap-5">
              {[
                {
                  name: 'CAISP',
                  full: 'Certified AI Security Professional',
                  issuer: 'Practical DevSecOps',
                  date: 'Sep 2025',
                  desc: 'Industry-recognized certification covering adversarial ML, LLM security, AI supply chain risks, and secure AI/ML pipeline design — validating expertise in securing AI-driven systems at scale.',
                  tags: ['AI/ML Security', 'LLM Threats', 'Adversarial ML'],
                },
                {
                  name: 'CDP',
                  full: 'Certified DevSecOps Professional',
                  issuer: 'Practical DevSecOps',
                  date: 'Apr 2025',
                  desc: 'Hands-on certification focused on embedding security into CI/CD pipelines — covering SAST, DAST, SCA, IaC scanning, container security, and compliance-as-code in real-world DevOps environments.',
                  tags: ['CI/CD Security', 'SAST/SCA', 'Container Hardening'],
                },
                {
                  name: 'GCC',
                  full: 'Google Cybersecurity Certificate',
                  issuer: 'Google',
                  date: 'Jan 2024',
                  desc: 'Google\'s professional-level cybersecurity program covering network security, incident response, SIEM tooling (Splunk, Chronicle), Linux administration, and Python automation for security operations.',
                  tags: ['SIEM', 'Incident Response', 'Network Security'],
                },
              ].map((cert) => (
                <div
                  key={cert.name}
                  className="group p-4 sm:p-5 border border-card-border rounded-lg hover:border-neon-green/30 hover:bg-neon-green/5 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-neon-green font-bold text-base sm:text-lg group-hover:text-glow transition-all">
                      {cert.name}
                    </span>
                    <span className="text-faint text-[10px] sm:text-xs ml-auto">{cert.date}</span>
                  </div>
                  <p className="text-primary text-xs sm:text-sm font-sans font-medium">
                    {cert.full}
                  </p>
                  <p className="text-faint text-xs mt-0.5 font-sans">
                    Issued by {cert.issuer}
                  </p>
                  <p className="text-muted text-xs sm:text-sm mt-2.5 leading-relaxed font-sans">
                    {cert.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono text-dimmed bg-overlay/5 rounded border border-card-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
