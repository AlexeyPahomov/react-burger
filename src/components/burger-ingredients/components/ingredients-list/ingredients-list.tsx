import { IngredientCard } from '..';

import type { TIngredientWithCounter } from '@utils/types';

import styles from './ingredients-list.module.css';

type TIngredientCardListsProps = {
  title: string;
  ingredients: TIngredientWithCounter[];
  onAddIngredient: (ingredient: TIngredientWithCounter) => void;
};

export const IngredientsList = ({
  ingredients,
  title,
  onAddIngredient,
}: TIngredientCardListsProps): React.JSX.Element => {
  return (
    <div className="pt-10">
      <span className="pb-6 text text_type_main-medium">{title}</span>
      <ul className={styles.card_list}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientCard
              onClick={() => onAddIngredient(ingredient)}
              ingredient={ingredient}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
