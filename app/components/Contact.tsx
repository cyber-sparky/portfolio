'use client';

import { motion } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi';
import { EmailLink } from './ObfuscatedEmail';

const socials = [
  { label: 'GitHub', href: 'https://github.com/cyber-sparky', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cybersparky/', icon: FiLinkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 px-3 sm:px-4 relative z-10">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary mb-2">
            <span className="text-muted-cyan">04.</span> contact
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-card-bg border border-card-border rounded-lg p-5 sm:p-8 mb-8">
            <div className="font-mono text-sm text-dimmed mb-6">
              <span className="text-muted-cyan">$</span> echo &quot;Let&apos;s connect&quot;
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex flex-col items-center gap-2 px-5 py-4 bg-overlay/5 border border-card-border rounded-lg hover:border-neon-green/30 hover:bg-neon-green/5 transition-all duration-300 min-w-[90px]"
                  >
                    <Icon className="w-6 h-6 text-muted group-hover:text-neon-green transition-colors" />
                    <span className="text-xs font-mono text-dimmed group-hover:text-muted transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + socials.length * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <EmailLink className="group flex flex-col items-center gap-2 px-5 py-4 bg-overlay/5 border border-card-border rounded-lg hover:border-neon-green/30 hover:bg-neon-green/5 transition-all duration-300 min-w-[90px]">
                  <FiMail className="w-6 h-6 text-muted group-hover:text-neon-green transition-colors" />
                  <span className="text-xs font-mono text-dimmed group-hover:text-muted transition-colors">
                    Email
                  </span>
                </EmailLink>
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-sm text-faint font-mono"
          >
            Available for:{' '}
            <span className="text-muted">
              AppSec Collaboration • CTF Teams
            </span>
          </motion.p>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-8 border-t border-card-border"
        >
          <p className="text-xs text-faint font-mono">
            <span className="text-neon-green/50">&gt;</span> Designed & built with purpose.
            <br />
            <span className="text-faint/70">© {new Date().getFullYear()}</span>
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
