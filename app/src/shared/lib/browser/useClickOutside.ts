import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

function useClickOutside<T extends HTMLElement = HTMLElement, B extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  buttonRef: RefObject<B | null>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      const button = buttonRef?.current;
      if (button?.contains(event?.target as Node)) {
        return
      }
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(mouseEvent, listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, mouseEvent, buttonRef ]);
}

export default useClickOutside; 