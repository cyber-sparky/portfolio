'use client';

import { motion } from 'framer-motion';
import { findings, type Severity } from '@/app/data/findings';

const severityConfig: Record<Severity, { color: string; bg: string; border: string }> = {
  Critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  High: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  Medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  Low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
};

export default function HallOfFame() {
  return (
    <section id="halloffame" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-muted-cyan">04.</span> hall_of_fame
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent" />
          <p className="mt-4 text-gray-500 font-sans text-sm">
            Notable bug bounty findings and recognitions.{' '}
            <a
              href="https://hackerone.com/cybersparky"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-cyan hover:underline"
            >
              View full HackerOne profile →
            </a>
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-green/30 via-card-border to-transparent" />

          <div className="space-y-8">
            {findings.map((finding, i) => {
              const sev = severityConfig[finding.severity];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 -translate-x-1.5 rounded-full bg-neon-green border-2 border-bg z-10 shadow-[0_0_8px_rgba(0,255,65,0.5)]" />

                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] bg-card-bg border border-card-border rounded-lg p-5 card-hover-glow ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-xs font-mono text-gray-500">{finding.date}</span>
                        <h3 className="text-sm font-bold text-white font-sans mt-1">
                          {finding.program}
                        </h3>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-mono px-2 py-1 rounded ${sev.bg} ${sev.border} ${sev.color} border`}
                      >
                        {finding.severity}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 font-sans mb-3">{finding.title}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-neon-green font-mono text-sm font-bold">
                        {finding.reward}
                      </span>
                      <span className="text-xs font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                        {finding.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
