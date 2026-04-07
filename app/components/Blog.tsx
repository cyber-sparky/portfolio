'use client';

import { motion } from 'framer-motion';
import { blogPosts } from '@/app/data/findings';
import { FiExternalLink, FiClock, FiCalendar } from 'react-icons/fi';

export default function Blog() {
  return (
    <section id="blog" className="py-16 sm:py-24 px-3 sm:px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-muted-cyan">05.</span> blog_&_writeups
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-card-bg border border-card-border rounded-lg p-4 sm:p-6 card-hover-glow block"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono px-2 py-1 bg-muted-cyan/10 border border-muted-cyan/20 text-muted-cyan rounded">
                  {post.platform}
                </span>
                <FiExternalLink className="w-3 h-3 text-gray-600 group-hover:text-neon-green transition-colors ml-auto" />
              </div>

              <h3 className="text-base font-bold text-white font-sans mb-4 group-hover:text-neon-green transition-colors leading-snug">
                {post.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                <span className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
