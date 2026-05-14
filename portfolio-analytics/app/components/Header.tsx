'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Activity, Sun, Moon, ChevronDown, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = ['Overview', 'Traffic', 'Behavior', 'Settings'] as const;

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-12"
      style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0066FF 0%, #00D4AA 100%)' }}
        >
          <Activity size={16} className="text-white" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Portfolio Analytics
        </span>
        <div className="hidden sm:flex items-center gap-1.5 ml-3 px-2.5 py-1 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-pulse" />
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Live</span>
        </div>
      </div>

      {/* Center: Navigation Tabs — hidden on mobile */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className="relative px-4 py-2 text-[14px] font-medium transition-colors"
            style={{ color: activeTab === tab ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
            aria-label={`Switch to ${tab} view`}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab}
            {activeTab === tab && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                style={{ background: '#0066FF' }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg transition-all"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-5 mx-1" style={{ background: 'var(--color-border)' }} />

        {/* Avatar / Logout */}
        <div className="relative">
          <button
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg transition-all"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label="User menu"
            aria-expanded={avatarMenuOpen}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold"
              style={{ background: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
            >
              A
            </div>
            <ChevronDown size={14} className={`transition-transform ${avatarMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          {avatarMenuOpen && (
            <div
              className="absolute right-0 top-12 w-48 py-2 rounded-xl z-50"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-dropdown)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <form action="/api/auth" method="POST">
                <input type="hidden" name="action" value="logout" />
                <button
                  type="submit"
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-[14px] font-medium transition-colors text-left"
                  style={{ color: 'var(--color-text-primary)' }}
                  aria-label="Sign out"
                >
                  <LogOut size={16} style={{ color: 'var(--color-text-secondary)' }} />
                  Sign out
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div
          className="absolute top-16 left-0 right-0 md:hidden py-2 px-4 z-40"
          style={{
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { onTabChange(tab); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 text-[14px] font-medium rounded-lg transition-colors"
              style={{
                color: activeTab === tab ? '#0066FF' : 'var(--color-text-secondary)',
                background: activeTab === tab ? 'rgba(0, 102, 255, 0.06)' : 'transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
