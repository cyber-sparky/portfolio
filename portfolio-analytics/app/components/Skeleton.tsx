'use client';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}

export function Skeleton({ width = '100%', height = '20px', className = '', rounded = false }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${rounded ? 'rounded-full' : ''} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`surface-card-static p-6 space-y-4 ${className}`}>
      <div className="flex justify-between items-start">
        <Skeleton width="36px" height="36px" rounded />
        <Skeleton width="64px" height="24px" />
      </div>
      <Skeleton width="120px" height="14px" />
      <Skeleton width="80px" height="40px" />
    </div>
  );
}
