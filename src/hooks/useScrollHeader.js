import { useState, useEffect } from 'react';

/**
 * useScrollHeader
 * Returns true when the page has been scrolled past `threshold` px.
 * Used to add shadow/background to the sticky header.
 */
export function useScrollHeader(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
