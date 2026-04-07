'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories } from '@/app/data/skills';

function getSkillIcon(name: string): string {
  const icons: Record<string, string> = {
    'Subfinder': '◎',
    'httpx': '⇄',
    'Katana': '⚔',
    'dnsx': '◈',
    'Nmap': '🔍',
    'ffuf': '⚡',
    'Amass': '◉',
    'Shodan': '👁',
    'Burp Suite': '🔧',
    'SQLmap': '💉',
    'Nuclei': '☢',
    'Dalfox': '🦊',
    'Metasploit': '💀',
    'Caido': '🌐',
    'Python': 'Py',
    'Bash': '$_',
    'Go': 'Go',
    'Docker': '🐳',
    'GitHub Actions': '⚙',
    'Ansible': '▶',
    'HackerOne': 'H1',
    'Bugcrowd': 'BC',
    'TryHackMe': '🎯',
    'OSCP': '🏅',
    'BSCP': '🏅',
    'eWPT': '🏅',
  };
  return icons[name] || '•';
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0]);

  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-muted-cyan">02.</span> skills_&_arsenal
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-mono rounded-md border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-neon-green/10 border-neon-green/40 text-neon-green shadow-[0_0_10px_rgba(0,255,65,0.15)]'
                  : 'border-card-border text-gray-500 hover:border-gray-600 hover:text-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <AnimatePresence mode="wait">
            {filtered.map((skill, i) => (
              <motion.div
                key={`${activeCategory}-${skill.name}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group bg-card-bg border border-card-border rounded-lg p-4 text-center cursor-default transition-all duration-300 hover:border-neon-green/30 hover:shadow-[0_0_15px_rgba(0,255,65,0.1)]"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-md bg-neon-green/5 border border-neon-green/10 flex items-center justify-center group-hover:bg-neon-green/10 group-hover:border-neon-green/30 transition-all duration-300">
                  <span className="text-neon-green font-mono text-lg group-hover:text-glow transition-all">
                    {getSkillIcon(skill.name)}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-400 font-mono group-hover:text-gray-300 transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
