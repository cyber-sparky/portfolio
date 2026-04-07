'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from '@/app/components/ThemeToggle';
import { writeups, categoryColors, difficultyColors } from '@/app/data/writeups';
import type { Writeup } from '@/app/data/writeups';

const categories: Array<Writeup['category'] | 'all'> = [
  'all',
  'web',
  'crypto',
  'pwn',
  'forensics',
  'reverse',
  'misc',
];

export default function WriteupsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered =
    activeCategory === 'all'
      ? writeups
      : writeups.filter((w) => w.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-card-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-neon-green text-sm hover:text-glow transition-all"
          >
            ← back to portfolio
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-mono text-dimmed text-xs">
              {writeups.length} writeup{writeups.length !== 1 ? 's' : ''}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-primary mb-3 tracking-tight">
            <span className="text-neon-green">$</span> ctf_writeups
          </h1>
          <p className="text-muted font-sans text-sm sm:text-base max-w-xl">
            Detailed walkthroughs of CTF challenges I&apos;ve solved — covering web exploitation,
            cryptography, binary analysis, and more.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => {
            const count =
              cat === 'all'
                ? writeups.length
                : writeups.filter((w) => w.category === cat).length;
            if (cat !== 'all' && count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-mono rounded-md border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-neon-green/10 border-neon-green/40 text-neon-green'
                    : 'border-card-border text-dimmed hover:border-faint hover:text-muted'
                }`}
              >
                {cat}
                <span className="ml-1.5 text-faint">{count}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Writeup cards */}
        <div className="grid gap-4 sm:gap-5">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 text-dimmed font-mono text-sm"
              >
                No writeups in this category yet.
              </motion.div>
            ) : (
              filtered.map((writeup, i) => (
                <motion.div
                  key={writeup.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/writeups/${writeup.slug}`}>
                    <div className="group bg-card-bg border border-card-border rounded-lg p-5 sm:p-6 hover:border-neon-green/30 transition-all duration-300 cursor-pointer">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] sm:text-xs font-mono rounded border ${
                            categoryColors[writeup.category]
                          }`}
                        >
                          {writeup.category}
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs font-mono ${
                            difficultyColors[writeup.difficulty]
                          }`}
                        >
                          {writeup.difficulty}
                        </span>
                        <span className="text-faint text-[10px] sm:text-xs font-mono ml-auto">
                          {writeup.date}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold font-mono text-primary group-hover:text-neon-green transition-colors mb-1.5">
                        {writeup.title}
                      </h2>

                      <p className="text-xs sm:text-sm font-mono text-muted-cyan mb-3">
                        {writeup.ctfName}
                      </p>

                      <p className="text-sm text-muted font-sans leading-relaxed mb-4">
                        {writeup.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {writeup.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-mono text-dimmed bg-overlay/5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-card-border flex items-center justify-between">
                        <span className="text-xs font-mono text-faint group-hover:text-neon-green transition-colors">
                          Read writeup →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
