import { ingredientTypeValues } from '@/utils/constants';
import { useState, useRef, useEffect, useCallback } from 'react';

export function useCategoryScroll(): {
  activeTab: string;
  scrollToCategory: (type: string) => void;
  setRef: (el: HTMLSpanElement | null, indx: number) => void;
  listContainerRef: React.RefObject<HTMLUListElement | null>;
} {
  const [activeTab, setActiveTab] = useState<string>(ingredientTypeValues[0].type);

  const listContainerRef = useRef<HTMLUListElement>(null);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const scrollToCategory = useCallback(
    (type: string) => {
      const title =
        titleRefs.current[ingredientTypeValues.findIndex((i) => i.type === type)];
      if (title) {
        title.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [ingredientTypeValues]
  );

  const setRef = (el: HTMLSpanElement | null, indx: number): void => {
    titleRefs.current[indx] = el;
  };

  useEffect(() => {
    titleRefs.current = titleRefs.current.slice(0, ingredientTypeValues.length);
  }, [ingredientTypeValues]);

  const findClosestTitle = useCallback(() => {
    if (!listContainerRef.current) return;
    const containerTop = listContainerRef.current.getBoundingClientRect().top;
    let minDistance = Infinity;
    let closestType = ingredientTypeValues[0].type;

    titleRefs.current.forEach((title, index) => {
      if (title) {
        const distance = Math.abs(title.getBoundingClientRect().top - containerTop);
        if (distance < minDistance) {
          minDistance = distance;
          closestType = ingredientTypeValues[index].type;
        }
      }
    });

    setActiveTab(closestType);
  }, [ingredientTypeValues]);

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', findClosestTitle);
    return (): void => {
      container.removeEventListener('scroll', findClosestTitle);
    };
  }, [findClosestTitle]);

  return { activeTab, scrollToCategory, setRef, listContainerRef };
}
