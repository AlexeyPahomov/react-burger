import { useRef } from 'react';

export const useDoubleClick = (
  onSingleClick: () => void,
  onDoubleClick: () => void,
  delay = 250
): (() => void) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const clicks = useRef(0);

  const onClick = (): void => {
    clicks.current++;

    if (clicks.current === 1) {
      timer.current = setTimeout(() => {
        if (clicks.current === 1) {
          onSingleClick();
        }
        clicks.current = 0;
      }, delay);
    } else {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      onDoubleClick();
      clicks.current = 0;
    }
  };

  return onClick;
};
