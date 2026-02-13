import React from 'react';

import { IngredientCard } from '..';

import type { TIngredientWithCounter } from '@utils/types';

import styles from './ingredients-list.module.css';

type TIngredientCardListsProps = {
  title: string;
  ingredients: TIngredientWithCounter[];
  onClickIngredient: (ingredient: TIngredientWithCounter | null) => void;
  onAddIngredient: (ingredient: TIngredientWithCounter) => void;
};

export const IngredientsList = React.forwardRef<
  HTMLSpanElement,
  TIngredientCardListsProps
>(
  (
    { ingredients, title, onClickIngredient, onAddIngredient },
    ref
  ): React.JSX.Element => {
    return (
      <div className="pt-10">
        <span ref={ref} className="pb-6 text text_type_main-medium">
          {title}
        </span>
        <ul className={styles.card_list}>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              <IngredientCard
                onClick={() => onClickIngredient(ingredient)}
                onDblClick={() => onAddIngredient(ingredient)}
                ingredient={ingredient}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

IngredientsList.displayName = 'IngredientsList';
