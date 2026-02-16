import { useRef, useEffect } from 'react';

export function useDndRef(
  connector: (element: HTMLDivElement | null) => void
): React.Ref<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      connector(ref.current);
    }
  }, [connector]);

  return ref;
}
