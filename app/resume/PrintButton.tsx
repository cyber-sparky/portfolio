'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="font-mono text-xs px-4 py-2 border border-card-border text-gray-400 rounded hover:border-neon-green/30 hover:text-neon-green transition-all"
    >
      Print / Save PDF
    </button>
  );
}
