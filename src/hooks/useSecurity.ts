import { useEffect } from 'react';

const SELECTABLE_SELECTOR = '[data-selectable]';

const inSelectable = (node: unknown): boolean => {
  let el: Element | null = null;
  if (node instanceof Element) el = node;
  else if (node instanceof Node) el = node.parentElement;
  return el !== null && el.closest(SELECTABLE_SELECTOR) !== null;
};

const copyingFromSelectable = (e: Event): boolean => {
  if (inSelectable(e.target)) return true;
  const selection = window.getSelection();
  return inSelectable(selection?.anchorNode) || inSelectable(selection?.focusNode);
};

const hasSelectableRegion = (): boolean =>
  document.querySelector(SELECTABLE_SELECTOR) !== null;

export const useSecurity = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (inSelectable(e.target)) return;
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && (e.key === 'P' || e.key === 'p') && !hasSelectableRegion()) {
        e.preventDefault();
        return false;
      }
    };

    const noop = () => undefined;
    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug,
      table: console.table,
      clear: console.clear,
    };

    if (process.env.NODE_ENV === 'production') {
      console.log = noop;
      console.warn = noop;
      console.error = noop;
      console.info = noop;
      console.debug = noop;
      console.table = noop;
      console.clear = noop;
    }

    const handleSelectStart = (e: Event) => {
      if (inSelectable(e.target)) return;
      e.preventDefault();
      return false;
    };

    const handleCopy = (e: ClipboardEvent) => {
      if (copyingFromSelectable(e)) return;
      e.preventDefault();
      return false;
    };

    const handleCut = (e: ClipboardEvent) => {
      if (copyingFromSelectable(e)) return;
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e: DragEvent) => {
      if (inSelectable(e.target)) return;
      e.preventDefault();
      return false;
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    const handleBeforePrint = () => {
      if (hasSelectableRegion()) return;
      document.body.style.visibility = 'hidden';
    };

    const handleAfterPrint = () => {
      document.body.style.visibility = 'visible';
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('drop', handleDrop);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('drop', handleDrop);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);

      if (process.env.NODE_ENV === 'production') {
        console.log = originalConsole.log;
        console.warn = originalConsole.warn;
        console.error = originalConsole.error;
        console.info = originalConsole.info;
        console.debug = originalConsole.debug;
        console.table = originalConsole.table;
        console.clear = originalConsole.clear;
      }
    };
  }, []);
};
