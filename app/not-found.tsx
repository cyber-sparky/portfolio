'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/app/components/ThemeToggle';
import { domains } from '@/app/lib/domains';

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

function useGlitchText(target: string, duration = 1500) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let frame: number;
    const start = Date.now();

    function animate() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * target.length);

      let result = '';
      for (let i = 0; i < target.length; i++) {
        if (i < revealed) {
          result += target[i];
        } else {
          result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
      }
      setDisplay(result);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return display;
}

export default function NotFound() {
  const title = useGlitchText('404_NOT_FOUND', 1200);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-card-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href={domains.home || '/'}
            className="font-mono text-neon-green text-sm hover:text-glow transition-all"
          >
            ← back to portfolio
          </a>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-7xl sm:text-9xl font-bold font-mono text-neon-green/20 mb-6 select-none">
              404
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card-bg border border-card-border rounded-lg p-6 sm:p-8"
          >
            <div className="font-mono text-xs text-dimmed mb-4 text-left">
              <span className="text-muted-cyan">cybersparky@kali</span>
              <span className="text-faint">:</span>
              <span className="text-neon-green/70">~</span>
              <span className="text-faint">$</span>{' '}
              <span className="text-muted">find / -name &quot;page&quot;</span>
            </div>

            <h1 className="font-mono text-xl sm:text-2xl font-bold text-primary mb-3 tracking-tight">
              {title}
              <span className="animate-blink text-neon-green">▌</span>
            </h1>

            <p className="text-sm text-muted font-sans mb-6 leading-relaxed">
              The resource you&apos;re looking for doesn&apos;t exist, was moved,
              or you don&apos;t have permission to access it.
            </p>

            <div className="font-mono text-xs text-dimmed mb-6 text-left space-y-1">
              <p>
                <span className="text-red-400">error:</span> ENOENT — no such file or directory
              </p>
              <p>
                <span className="text-faint">path:</span>{' '}
                <span className="text-muted">{typeof window !== 'undefined' ? window.location.pathname : '/'}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={domains.home || '/'}
                className="px-4 py-2.5 bg-neon-green/10 border border-neon-green/30 text-neon-green font-mono text-xs sm:text-sm rounded-md hover:bg-neon-green/20 hover:border-neon-green/50 transition-all duration-300"
              >
                {'>'} cd ~/home
              </a>
              <a
                href={domains.writeups}
                className="px-4 py-2.5 border border-card-border text-muted font-mono text-xs sm:text-sm rounded-md hover:border-dimmed hover:text-secondary transition-all duration-300"
              >
                {'>'} ls ~/writeups
              </a>
              <a
                href={domains.resume}
                className="px-4 py-2.5 border border-card-border text-muted font-mono text-xs sm:text-sm rounded-md hover:border-dimmed hover:text-secondary transition-all duration-300"
              >
                {'>'} cat ~/resume
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-xs font-mono text-faint"
          >
            HTTP 404 — If you think this is a bug, reach out.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
