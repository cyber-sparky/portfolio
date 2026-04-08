'use client';

import { EmailLink, EmailText } from '@/app/components/ObfuscatedEmail';

export function ResumeEmailLink({ className }: { className?: string }) {
  return (
    <EmailLink className={className}>
      <EmailText />
    </EmailLink>
  );
}
