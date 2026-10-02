/**
 * Tracks whether an element is within (or near) the viewport, using a
 * single shared IntersectionObserver for every subscriber
 */

import { useEffect, useRef, useState } from 'react';

const callbacks = new Map();
let observer = null;

const getObserver = () => {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cb = callbacks.get(entry.target);
          if (cb) cb(entry.isIntersecting);
        });
      },
      // small margin so effects are already running as they scroll in
      { rootMargin: '200px 0px' },
    );
  }

  return observer;
};

/**
 * @param {boolean} enabled Only observe when true; otherwise reports false
 * @return {[React.RefObject, boolean]} Ref to attach, and visibility
 */
export default function useOnScreen(enabled = true) {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const obs = getObserver();
    callbacks.set(el, setOnScreen);
    obs.observe(el);

    return () => {
      obs.unobserve(el);
      callbacks.delete(el);
    };
  }, [enabled]);

  return [ref, enabled && onScreen];
}
