'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// TODO: Update stats with your actual numbers
const stats = [
  { label: 'Bugs Found', value: 150, suffix: '+' },
  { label: 'Programs', value: 30, suffix: '+' },
  { label: 'CVEs / HoFs', value: 12, suffix: '' },
  { label: 'Years Experience', value: 5, suffix: '+' },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="text-4xl sm:text-5xl font-bold font-mono text-neon-green text-glow">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-muted-cyan">01.</span> about_me
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* TODO: Replace with your actual bio */}
            <div className="space-y-4 text-gray-400 leading-relaxed font-sans">
              <p>
                Security engineer and bug bounty hunter with a passion for breaking things
                that shouldn&apos;t be broken. I specialize in web application security,
                API testing, and building automated reconnaissance pipelines that scale.
              </p>
              <p>
                My approach combines deep manual testing with custom automation — leveraging
                the ProjectDiscovery ecosystem to find what others miss. From subdomain
                enumeration to vulnerability validation, every step is optimized for
                efficiency and accuracy.
              </p>
              <p>
                When I&apos;m not hunting bugs, I contribute to open-source security tooling,
                write technical blog posts, and mentor aspiring security researchers in the
                community.
              </p>
            </div>

            <div className="mt-6 p-4 bg-card-bg border border-card-border rounded-lg font-mono text-sm">
              <div className="text-gray-500 mb-1">$ cat focus.txt</div>
              <div className="text-neon-green/80">
                Web App Security • API Testing • Recon Automation • Cloud Security
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="bg-card-bg border border-card-border rounded-lg p-6 text-center card-hover-glow"
              >
                <CountUp target={stat.value} suffix={stat.suffix} inView={isInView} />
                <div className="mt-2 text-sm text-gray-500 font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
