export function fogSupported(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return false;

  if (window.matchMedia('(max-width: 900px)').matches) return false;

  return true;
}
