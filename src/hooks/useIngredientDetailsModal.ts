import { useModal } from '@/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setCurrentIngredient } from '@/services/ingredients/ingredientDetailsSlice';
import { selectCurrentIngredient } from '@/services/selectors';

import type { TIngredientWithCounter } from '@/utils/types';

type TUseIngredientDetailsResult = {
  isModalOpen: boolean;
  currentIngredient: TIngredientWithCounter | null;
  toggleIngredientDetails: (ingredient?: TIngredientWithCounter | null) => void;
};

export function useIngredientDetailsModal(): TUseIngredientDetailsResult {
  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useAppDispatch();
  const currentIngredient = useAppSelector(selectCurrentIngredient);

  const toggleIngredientDetails = (
    ingredient: TIngredientWithCounter | null = null
  ): void => {
    dispatch(setCurrentIngredient(ingredient));
    !ingredient ? closeModal() : openModal();
  };

  return { isModalOpen, currentIngredient, toggleIngredientDetails };
}
