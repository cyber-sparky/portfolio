'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiSearch, FiX } from 'react-icons/fi';
import ThemeToggle from '@/app/components/ThemeToggle';
import { writeups, categoryColors, difficultyColors } from '@/app/data/writeups';
import type { Writeup } from '@/app/data/writeups';
import { domains, writeupUrl } from '@/app/lib/domains';
import { readingTime } from '@/app/lib/readingTime';

const categories: Array<Writeup['category'] | 'all'> = [
  'all',
  'web',
  'crypto',
  'pwn',
  'forensics',
  'reverse',
  'android',
  'misc',
];

const MAX_QUERY_LENGTH = 100;

function sanitizeQuery(raw: string): string {
  return raw.replace(/[<>"'&]/g, '').slice(0, MAX_QUERY_LENGTH);
}

function matchesSearch(writeup: Writeup, query: string): boolean {
  const q = query.toLowerCase();
  return (
    writeup.title.toLowerCase().includes(q) ||
    writeup.ctfName.toLowerCase().includes(q) ||
    writeup.description.toLowerCase().includes(q) ||
    writeup.category.toLowerCase().includes(q) ||
    writeup.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default function WriteupsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Cmd+K is reserved for the global command palette; only handle Escape here.
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const filtered = useMemo(() => {
    let result = writeups;
    if (activeCategory !== 'all') {
      result = result.filter((w) => w.category === activeCategory);
    }
    const q = sanitizeQuery(searchQuery).trim();
    if (q.length > 0) {
      result = result.filter((w) => matchesSearch(w, q));
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-card-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href={domains.home || '/'}
            className="font-mono text-neon-green text-sm hover:text-glow transition-all"
          >
            ← back to portfolio
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className="p-2 rounded-md text-dimmed hover:text-neon-green hover:bg-overlay/5 transition-all duration-200"
              aria-label="Toggle search"
            >
              <FiSearch className="w-4 h-4" />
            </button>
            <span className="font-mono text-dimmed text-xs hidden sm:inline">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
            <ThemeToggle />
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-card-border"
            >
              <div className="max-w-5xl mx-auto px-4 py-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dimmed" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(sanitizeQuery(e.target.value))}
                    placeholder="Search by title, category, tag..."
                    maxLength={MAX_QUERY_LENGTH}
                    className="w-full pl-10 pr-20 py-2.5 bg-card-bg border border-card-border rounded-lg font-mono text-sm text-primary placeholder:text-faint focus:outline-none focus:border-neon-green/40 transition-colors"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-dimmed hover:text-primary transition-colors"
                        aria-label="Clear search"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-faint border border-card-border rounded bg-bg">
                      ESC
                    </kbd>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main id="main" className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-primary mb-3 tracking-tight">
            <span className="text-neon-green" aria-hidden="true">$</span> blog
          </h1>
          <p className="text-muted font-sans text-sm sm:text-base max-w-xl">
            CTF writeups, security research, and technical deep-dives — covering web exploitation,
            mobile security, cryptography, and more.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
          role="group"
          aria-label="Filter posts by category"
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
                aria-pressed={activeCategory === cat}
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
                className="text-center py-16"
              >
                <p className="text-dimmed font-mono text-sm mb-2">
                  {searchQuery
                    ? 'No posts match your search.'
                    : 'No posts in this category yet.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="text-xs font-mono text-neon-green/70 hover:text-neon-green transition-colors"
                  >
                    Clear filters
                  </button>
                )}
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
                  <Link href={writeupUrl(writeup.slug)}>
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
                          Read more →
                        </span>
                        <span className="text-[10px] font-mono text-faint">
                          {readingTime(writeup.content).minutes} min read
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
