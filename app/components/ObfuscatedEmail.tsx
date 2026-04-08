'use client';

import { useState, useEffect, useCallback } from 'react';

const USER = 'mdpranaw';
const DOMAIN = 'gmail.com';

export function useDecodedEmail() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(`${USER}@${DOMAIN}`);
  }, []);

  return email;
}

export function EmailLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const email = useDecodedEmail();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (email) window.location.href = `mailto:${email}`;
    },
    [email]
  );

  return (
    <a
      href="#contact"
      onClick={handleClick}
      className={className}
      rel="nofollow"
    >
      {children ?? email}
    </a>
  );
}

export function EmailText({ className }: { className?: string }) {
  const email = useDecodedEmail();
  return <span className={className}>{email || '...'}</span>;
}
