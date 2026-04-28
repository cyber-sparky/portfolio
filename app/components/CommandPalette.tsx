'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Command } from 'cmdk';
import {
  FiHome,
  FiUser,
  FiCpu,
  FiMail,
  FiFileText,
  FiBookOpen,
  FiSun,
  FiMoon,
  FiCopy,
  FiRss,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
} from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import { writeups } from '@/app/data/writeups';
import { domains, writeupUrl, absoluteUrls } from '@/app/lib/domains';

const EMAIL_USER = 'mdpranaw';
const EMAIL_DOMAIN = 'gmail.com';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Global Cmd+K / Ctrl+K shortcut + custom 'open-command-palette' event.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((p) => !p);
      }
    }
    function onOpenEvent() {
      setOpen((p) => !p);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onOpenEvent);
    };
  }, []);

  // Close palette on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = useCallback(() => setOpen(false), []);

  const goHomeSection = useCallback(
    (anchor: string) => {
      close();
      // If we're already on the home page (covers '/' and any non-blog/resume path on root domain).
      const onHome = pathname === '/' || pathname === '';
      if (onHome) {
        const el = document.querySelector(anchor);
        el?.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', anchor);
      } else {
        // Cross-subdomain or cross-page: full navigation to home + anchor.
        const target = `${domains.home || '/'}${anchor}`;
        window.location.href = target;
      }
    },
    [close, pathname]
  );

  const navigateExternal = useCallback(
    (url: string) => {
      close();
      window.location.href = url;
    },
    [close]
  );

  const openInNewTab = useCallback(
    (url: string) => {
      close();
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    [close]
  );

  const copyEmail = useCallback(async () => {
    const email = `${EMAIL_USER}@${EMAIL_DOMAIN}`;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers / non-secure contexts.
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // Give up silently.
      }
      document.body.removeChild(ta);
    }
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Palette"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:pt-[15vh]"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-overlay/40 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Palette */}
      <div className="relative w-full max-w-xl bg-card-bg border border-card-border rounded-xl shadow-2xl shadow-overlay/20 overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-card-border">
          <span className="text-neon-green font-mono text-sm" aria-hidden="true">
            $
          </span>
          <Command.Input
            placeholder="Type a command or search posts..."
            className="flex-1 py-4 bg-transparent text-sm font-mono text-primary placeholder:text-faint focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-faint border border-card-border rounded bg-bg">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm font-mono text-dimmed">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Navigate"
            className="text-[10px] font-mono text-faint uppercase tracking-widest px-2 py-1.5"
          >
            <PaletteItem
              icon={<FiHome />}
              label="Home"
              hint="/"
              onSelect={() => goHomeSection('#main')}
            />
            <PaletteItem
              icon={<FiUser />}
              label="About"
              hint="#about"
              onSelect={() => goHomeSection('#about')}
            />
            <PaletteItem
              icon={<FiCpu />}
              label="Skills & Arsenal"
              hint="#skills"
              onSelect={() => goHomeSection('#skills')}
            />
            <PaletteItem
              icon={<FiMail />}
              label="Contact"
              hint="#contact"
              onSelect={() => goHomeSection('#contact')}
            />
            <PaletteItem
              icon={<FiBookOpen />}
              label="Blog"
              hint={domains.writeups || '/writeups'}
              onSelect={() => navigateExternal(domains.writeups || '/writeups')}
            />
            <PaletteItem
              icon={<FiFileText />}
              label="Resume"
              hint={domains.resume || '/resume'}
              onSelect={() => navigateExternal(domains.resume || '/resume')}
            />
          </Command.Group>

          <Command.Separator className="my-2 border-t border-card-border" />

          <Command.Group
            heading="Posts"
            className="text-[10px] font-mono text-faint uppercase tracking-widest px-2 py-1.5"
          >
            {writeups.map((w) => (
              <PaletteItem
                key={w.slug}
                icon={<FiArrowRight />}
                label={w.title}
                hint={`${w.ctfName} · ${w.category}`}
                keywords={[w.ctfName, w.category, ...w.tags, w.description]}
                onSelect={() => navigateExternal(writeupUrl(w.slug))}
              />
            ))}
          </Command.Group>

          <Command.Separator className="my-2 border-t border-card-border" />

          <Command.Group
            heading="Actions"
            className="text-[10px] font-mono text-faint uppercase tracking-widest px-2 py-1.5"
          >
            <PaletteItem
              icon={theme === 'dark' ? <FiSun /> : <FiMoon />}
              label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              onSelect={() => {
                toggleTheme();
                close();
              }}
            />
            <PaletteItem
              icon={<FiCopy />}
              label={copied ? 'Email copied!' : 'Copy email address'}
              onSelect={copyEmail}
            />
            <PaletteItem
              icon={<FiRss />}
              label="View RSS feed"
              hint="/feed.xml"
              onSelect={() => openInNewTab(`${absoluteUrls.writeups}/feed.xml`)}
            />
            <PaletteItem
              icon={<FiGithub />}
              label="GitHub profile"
              hint="github.com/cyber-sparky"
              onSelect={() => openInNewTab('https://github.com/cyber-sparky')}
            />
            <PaletteItem
              icon={<FiLinkedin />}
              label="LinkedIn profile"
              hint="linkedin.com/in/pranaw-m-9ab53024b"
              onSelect={() =>
                openInNewTab('https://www.linkedin.com/in/pranaw-m-9ab53024b/')
              }
            />
          </Command.Group>
        </Command.List>

        <div className="hidden sm:flex items-center justify-between px-4 py-2 border-t border-card-border text-[10px] font-mono text-faint">
          <span>
            <kbd className="px-1 py-0.5 border border-card-border rounded bg-bg">↑↓</kbd>{' '}
            navigate
          </span>
          <span>
            <kbd className="px-1 py-0.5 border border-card-border rounded bg-bg">↵</kbd>{' '}
            select
          </span>
          <span>
            <kbd className="px-1 py-0.5 border border-card-border rounded bg-bg">⌘K</kbd>{' '}
            toggle
          </span>
        </div>
      </div>
    </Command.Dialog>
  );
}

function PaletteItem({
  icon,
  label,
  hint,
  keywords,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  keywords?: string[];
  onSelect: () => void;
}) {
  return (
    <Command.Item
      value={`${label} ${(keywords || []).join(' ')}`}
      onSelect={onSelect}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer text-sm font-mono text-muted aria-selected:bg-neon-green/10 aria-selected:text-neon-green transition-colors"
    >
      <span className="text-base text-dimmed group-aria-selected:text-neon-green shrink-0">
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {hint && (
        <span className="text-[10px] text-faint truncate max-w-[180px] hidden sm:inline">
          {hint}
        </span>
      )}
    </Command.Item>
  );
}
