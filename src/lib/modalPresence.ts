import { useEffect } from 'react';

let openCount = 0;
const listeners = new Set<(anyOpen: boolean) => void>();

const notify = () => {
  const anyOpen = openCount > 0;
  listeners.forEach((listener) => listener(anyOpen));
};

export function subscribeModalPresence(listener: (anyOpen: boolean) => void): () => void {
  listeners.add(listener);
  listener(openCount > 0);
  return () => {
    listeners.delete(listener);
  };
}

export function useModalPresence(isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen) return;
    openCount += 1;
    notify();
    return () => {
      openCount -= 1;
      notify();
    };
  }, [isOpen]);
}
