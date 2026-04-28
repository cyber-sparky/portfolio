import type { ContentBlock } from '@/app/data/writeups';

const WORDS_PER_MINUTE = 230;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Estimate reading time for a writeup based on its content blocks.
 * - Prose blocks (text, callout, heading) are weighted at 230 wpm.
 * - Code blocks are weighted at half speed (~115 wpm) since people scan code.
 * - Images add 10s each (people glance, then move on).
 * - Info / flag blocks are negligible.
 */
export function readingTime(blocks: ContentBlock[]): {
  minutes: number;
  words: number;
} {
  let words = 0;
  let codeWords = 0;
  let imageSeconds = 0;

  for (const b of blocks) {
    switch (b.type) {
      case 'text':
      case 'callout':
        words += countWords(b.value);
        break;
      case 'heading':
        words += countWords(b.value);
        break;
      case 'code':
        codeWords += countWords(b.value);
        break;
      case 'image':
        imageSeconds += 10;
        break;
      case 'info':
        words += b.items.reduce(
          (acc, item) => acc + countWords(item.label) + countWords(item.value),
          0
        );
        break;
      case 'flag':
        // Negligible reading time.
        break;
    }
  }

  const proseMinutes = words / WORDS_PER_MINUTE;
  const codeMinutes = codeWords / (WORDS_PER_MINUTE / 2);
  const imageMinutes = imageSeconds / 60;

  const total = proseMinutes + codeMinutes + imageMinutes;
  return {
    minutes: Math.max(1, Math.round(total)),
    words: words + codeWords,
  };
}
