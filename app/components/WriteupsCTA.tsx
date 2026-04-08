'use client';

import { motion } from 'framer-motion';
import { writeups, categoryColors, difficultyColors } from '@/app/data/writeups';
import { domains, writeupUrl } from '@/app/lib/domains';

export default function WriteupsCTA() {
  const recent = writeups.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 px-3 sm:px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary mb-2">
            <span className="text-muted-cyan">03.</span> ctf_writeups
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-card-bg border border-card-border rounded-lg p-4 sm:p-6 mb-6"
        >
          <div className="text-xs font-mono text-dimmed mb-4">
            $ ls ~/writeups/ --recent
          </div>

          <div className="space-y-3">
            {recent.map((w, i) => (
              <motion.div
                key={w.slug}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.08 }}
              >
                <a
                  href={writeupUrl(w.slug)}
                  className="group flex items-center gap-3 sm:gap-4 p-3 rounded-md hover:bg-overlay/5 transition-all duration-200"
                >
                  <span className="text-neon-green/40 font-mono text-xs shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-mono text-sm text-primary group-hover:text-neon-green transition-colors truncate">
                        {w.title}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-mono rounded border shrink-0 ${
                          categoryColors[w.category]
                        }`}
                      >
                        {w.category}
                      </span>
                      <span
                        className={`text-[9px] font-mono shrink-0 ${
                          difficultyColors[w.difficulty]
                        }`}
                      >
                        {w.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-dimmed font-sans truncate">
                      {w.ctfName} — {w.description}
                    </p>
                  </div>

                  <span className="text-faint group-hover:text-neon-green text-xs font-mono shrink-0 hidden sm:block transition-colors">
                    →
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center"
        >
          <a
            href={domains.writeups}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon-green/10 border border-neon-green/30 text-neon-green font-mono text-sm rounded-md hover:bg-neon-green/20 hover:border-neon-green/50 transition-all duration-300"
          >
            <span>{'>'}</span>
            Explore all {writeups.length} writeups
          </a>
        </motion.div>
      </div>
    </section>
  );
}
