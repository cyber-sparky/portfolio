'use client';

import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for non-secure contexts.
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // Silent failure.
      }
      document.body.removeChild(ta);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono rounded border border-card-border text-dimmed hover:text-neon-green hover:border-neon-green/30 transition-colors"
    >
      {copied ? (
        <>
          <FiCheck className="w-3 h-3" aria-hidden="true" />
          <span>copied</span>
        </>
      ) : (
        <>
          <FiCopy className="w-3 h-3" aria-hidden="true" />
          <span>copy</span>
        </>
      )}
    </button>
  );
}
