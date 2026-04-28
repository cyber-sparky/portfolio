'use client';

import { useState } from 'react';
import { FiLink, FiCheck, FiTwitter, FiLinkedin } from 'react-icons/fi';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers / restricted environments
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // give up
      }
      document.body.removeChild(textarea);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  const baseClass =
    'inline-flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-md border border-card-border text-muted hover:border-neon-green/30 hover:text-neon-green transition-all duration-200';

  return (
    <div className="mt-12 p-5 bg-card-bg border border-card-border rounded-lg">
      <div className="text-xs font-mono text-dimmed uppercase tracking-widest mb-3">
        Share this post
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={handleCopy} className={baseClass} aria-label="Copy link">
          {copied ? (
            <>
              <FiCheck className="w-3.5 h-3.5 text-neon-green" />
              <span className="text-neon-green">Copied!</span>
            </>
          ) : (
            <>
              <FiLink className="w-3.5 h-3.5" />
              <span>Copy link</span>
            </>
          )}
        </button>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          aria-label="Share on Twitter / X"
        >
          <FiTwitter className="w-3.5 h-3.5" />
          <span>Twitter / X</span>
        </a>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          aria-label="Share on LinkedIn"
        >
          <FiLinkedin className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
