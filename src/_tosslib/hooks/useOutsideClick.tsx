import { MutableRefObject, RefObject, useEffect } from 'react';

export interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  handler: (...args: unknown[]) => unknown;
}

export const useOutsideClick = ({ ref, handler }: UseOutsideClickProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        console.log('qwer');
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
