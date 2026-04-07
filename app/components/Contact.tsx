'use client';

import { motion } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiExternalLink,
} from 'react-icons/fi';

// TODO: Update all social links with your actual profiles
const socials = [
  { label: 'GitHub', href: 'https://github.com/cybersparky', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/cybersparky', icon: FiLinkedin },
  { label: 'Twitter / X', href: 'https://x.com/cybersparky', icon: FiTwitter },
  { label: 'HackerOne', href: 'https://hackerone.com/cybersparky', icon: FiExternalLink },
  { label: 'Bugcrowd', href: 'https://bugcrowd.com/cybersparky', icon: FiExternalLink },
  { label: 'Email', href: 'mailto:cybersparky@example.com', icon: FiMail }, // TODO: Update email
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 relative z-10">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-muted-cyan">06.</span> contact
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-neon-green to-transparent mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-card-bg border border-card-border rounded-lg p-8 mb-8">
            <div className="font-mono text-sm text-gray-500 mb-6">
              <span className="text-muted-cyan">$</span> echo &quot;Let&apos;s connect&quot;
            </div>

            <div className="flex flex-wrap justify-center gap-4">
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
                    className="group flex flex-col items-center gap-2 px-4 py-3 bg-white/5 border border-card-border rounded-lg hover:border-neon-green/30 hover:bg-neon-green/5 transition-all duration-300 min-w-[80px]"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-neon-green transition-colors" />
                    <span className="text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-600 font-mono"
          >
            Available for:{' '}
            <span className="text-gray-400">
              Bug Bounty Collabs • Security Consulting • CTF Teams
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
          <p className="text-xs text-gray-600 font-mono">
            <span className="text-neon-green/50">&gt;</span> Designed & built with purpose.
            <br />
            <span className="text-gray-700">© {new Date().getFullYear()}</span>
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
