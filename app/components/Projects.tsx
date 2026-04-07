'use client';

import { motion } from 'framer-motion';
import { projects } from '@/app/data/projects';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-3 sm:px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-muted-cyan">03.</span> projects
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-card-bg border rounded-lg overflow-hidden card-hover-glow flex flex-col ${
                project.featured
                  ? 'border-neon-green/20 shadow-[0_0_10px_rgba(0,255,65,0.05)]'
                  : 'border-card-border'
              }`}
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-card-border">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-xs text-gray-500 font-mono truncate">
                  ~/{project.title.toLowerCase().replace(/\s+/g, '-')}
                </span>
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-1">
                {project.featured && (
                  <span className="inline-block w-fit text-xs font-mono text-neon-green bg-neon-green/10 border border-neon-green/20 px-2 py-0.5 rounded mb-3">
                    ★ Featured
                  </span>
                )}

                <h3 className="text-lg font-bold text-white font-mono mb-3">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-400 font-sans leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-green transition-colors"
                    >
                      <FiGithub className="w-4 h-4" />
                      Source
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-muted-cyan transition-colors"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
