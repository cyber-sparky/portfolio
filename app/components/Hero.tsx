'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { domains } from '@/app/lib/domains';

const terminalLines = [
  { prompt: '~$', command: 'whoami', delay: 500 },
  { prompt: '', command: 'security_engineer | appsec | devsecops | ai security', delay: 100, isOutput: true },
  { prompt: '~$', command: 'cat /etc/mission', delay: 800 },
  { prompt: '', command: 'Securing code. Shipping safe.', delay: 100, isOutput: true },
  { prompt: '~$', command: './init_portfolio.sh', delay: 600 },
  { prompt: '', command: '[+] initializing portfolio...', delay: 100, isOutput: true },
  { prompt: '', command: '[+] loading modules ██████████ 100%', delay: 50, isOutput: true },
  { prompt: '', command: '[✓] portfolio ready.', delay: 50, isOutput: true },
];

function useTypewriter(text: string, speed: number, startDelay: number, enabled: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayed('');
    setDone(false);

    const delayTimer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}

function TerminalLine({
  line,
  startTime,
  onDone,
}: {
  line: (typeof terminalLines)[0];
  startTime: number;
  onDone: () => void;
}) {
  const speed = line.isOutput ? 15 : 40;
  const { displayed, done } = useTypewriter(line.command, speed, startTime, true);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, line.delay);
      return () => clearTimeout(t);
    }
  }, [done, onDone, line.delay]);

  return (
    <div className="flex gap-2 font-mono text-xs sm:text-sm md:text-base">
      {line.prompt && (
        <span className="text-muted-cyan shrink-0">{line.prompt}</span>
      )}
      <span className={`break-all sm:break-normal ${line.isOutput ? 'text-neon-green/80' : 'text-secondary'}`}>
        {displayed}
        {!done && (
          <span className="inline-block w-2 h-4 bg-neon-green ml-0.5 animate-blink align-middle" />
        )}
      </span>
    </div>
  );
}

export default function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleLineDone = (index: number) => {
    setCompletedLines((prev) => [...prev, index]);
    if (index < terminalLines.length - 1) {
      setCurrentLine(index + 1);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentLine]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 pt-16">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-card-bg border border-card-border rounded-lg overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-terminal-bar border-b border-card-border">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-dimmed font-mono">
                cybersparky@kali:~
              </span>
            </div>

            <div
              ref={terminalRef}
              className="p-3 sm:p-4 md:p-6 space-y-1 min-h-[180px] sm:min-h-[200px] max-h-[300px] overflow-y-auto overflow-x-hidden"
            >
              {terminalLines.map((line, i) => {
                if (i > currentLine) return null;
                if (completedLines.includes(i)) {
                  return (
                    <div key={i} className="flex gap-2 font-mono text-xs sm:text-sm md:text-base">
                      {line.prompt && (
                        <span className="text-muted-cyan shrink-0">{line.prompt}</span>
                      )}
                      <span className={`break-all sm:break-normal ${line.isOutput ? 'text-neon-green/80' : 'text-secondary'}`}>
                        {line.command}
                      </span>
                    </div>
                  );
                }
                return (
                  <TerminalLine
                    key={i}
                    line={line}
                    startTime={200}
                    onDone={() => handleLineDone(i)}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="glitch-wrapper mb-4">
            <h1
              className="glitch-text text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-mono text-primary tracking-tighter"
              data-text="CYBERSPARKY"
            >
              CYBERSPARKY
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-lg sm:text-xl text-muted font-sans mb-8 tracking-wide"
          >
            Securing code.{' '}
            <span className="text-neon-green font-semibold">Shipping safe.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={() =>
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-4 py-2.5 sm:px-6 sm:py-3 bg-neon-green/10 border border-neon-green/30 text-neon-green font-mono text-xs sm:text-sm rounded-md hover:bg-neon-green/20 hover:border-neon-green/50 transition-all duration-300"
            >
              {'>'} View My Work
            </button>

            <a
              href={domains.resume}
              className="px-4 py-2.5 sm:px-6 sm:py-3 bg-muted-cyan/10 border border-muted-cyan/30 text-muted-cyan font-mono text-xs sm:text-sm rounded-md hover:bg-muted-cyan/20 hover:border-muted-cyan/50 transition-all duration-300"
            >
              {'>'} Resume
            </a>

            <a
              href="https://github.com/cyber-sparky"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 sm:px-6 sm:py-3 border border-card-border text-muted font-mono text-xs sm:text-sm rounded-md hover:border-dimmed hover:text-secondary transition-all duration-300"
            >
              {'>'} GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-faint text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
