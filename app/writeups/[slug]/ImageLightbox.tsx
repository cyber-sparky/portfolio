'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface LightboxImageData {
  src: string;
  alt: string;
}

interface LightboxContextValue {
  images: LightboxImageData[];
  open: (index: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({
  images,
  children,
}: {
  images: LightboxImageData[];
  children: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);

  const next = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return i;
      return (i + 1) % images.length;
    });
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return i;
      return (i - 1 + images.length) % images.length;
    });
  }, [images.length]);

  // Keyboard navigation when open.
  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKey);
    // Lock body scroll while open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, next, prev]);

  const value = useMemo(() => ({ images, open }), [images, open]);
  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt || 'Image preview'}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8 bg-overlay/80 backdrop-blur-md"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <FiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <FiChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </>
          )}

          <div
            className="relative max-w-6xl max-h-full w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ maxHeight: '85vh' }}>
              <Image
                src={active.src}
                alt={active.alt}
                width={1600}
                height={1000}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                quality={95}
                priority
              />
            </div>
            {active.alt && (
              <p className="mt-3 text-center text-xs sm:text-sm font-mono text-white/70">
                {active.alt}
              </p>
            )}
            {images.length > 1 && (
              <p className="mt-1 text-center text-[10px] font-mono text-white/40">
                {(activeIndex ?? 0) + 1} / {images.length}
              </p>
            )}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

function useLightbox() {
  return useContext(LightboxContext);
}

export default function LightboxImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const ctx = useLightbox();

  return (
    <button
      type="button"
      onClick={() => ctx?.open(index)}
      aria-label={`Open image: ${alt}`}
      className="block w-full text-left rounded-lg overflow-hidden border border-card-border bg-card-bg cursor-zoom-in transition-all hover:border-neon-green/30"
    >
      <Image
        src={src}
        alt={alt}
        width={900}
        height={500}
        className="w-full h-auto"
        quality={85}
      />
    </button>
  );
}
