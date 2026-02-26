import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { IngredientCard } from '..';

import type { TIngredientWithCounter } from '@utils/types';

import styles from './ingredients-list.module.css';

type TIngredientCardListsProps = {
  title: string;
  ingredients: TIngredientWithCounter[];
};

export const IngredientsList = React.forwardRef<
  HTMLSpanElement,
  TIngredientCardListsProps
>(({ ingredients, title }, ref): React.JSX.Element => {
  const location = useLocation();

  return (
    <div className="pt-10">
      <span ref={ref} className="pb-6 text text_type_main-medium">
        {title}
      </span>
      <ul className={styles.card_list}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <NavLink to={`/ingredients/${ingredient._id}`} state={{ modal: location }}>
              <IngredientCard ingredient={ingredient} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
});

IngredientsList.displayName = 'IngredientsList';
