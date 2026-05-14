export function Footer() {
  return (
    <footer
      className="py-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px]"
      style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}
    >
      <p>© 2026 Portfolio Analytics. All rights reserved.</p>
      <div className="flex items-center gap-5">
        <span className="cursor-default transition-colors hover:text-[var(--color-text-secondary)]">Methodology</span>
        <span className="cursor-default transition-colors hover:text-[var(--color-text-secondary)]">Privacy</span>
        <span className="flex items-center gap-1.5 cursor-default transition-colors hover:text-[var(--color-text-secondary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Status
        </span>
      </div>
    </footer>
  );
}
