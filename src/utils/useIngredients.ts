import { useEffect, useState } from 'react';

import { ingredientsApi } from './constants';

import type { TIngredient, TIngredientWithCounter } from './types';

type UseIngredientsResult = {
  isLoading: boolean;
  ingredients: TIngredientWithCounter[];
  setIngredients: React.Dispatch<React.SetStateAction<TIngredientWithCounter[]>>;
};

export function useIngredients(): UseIngredientsResult {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ingredients, setIngredients] = useState<TIngredientWithCounter[]>([]);

  useEffect(() => {
    setIsLoading(true);

    fetch(ingredientsApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Статус ответа: ${response.status}`);
        }
        return response.json();
      })
      .then(({ data }: { data: TIngredient[] }) => {
        setIngredients(data.map((ingredient) => ({ ...ingredient, count: 0 })));
      })
      .catch((e) => {
        console.error('Ошибка загрузки данных:', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { ingredients, setIngredients, isLoading };
}
