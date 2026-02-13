import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { TIngredientWithCounter } from '@/utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetails = {
  ingredient: TIngredientWithCounter | null;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetails): React.JSX.Element => {
  const details = useMemo(
    () => [
      {
        id: uuidv4(),
        title: 'Калории,ккал',
        value: ingredient?.calories,
      },
      {
        id: uuidv4(),
        title: 'Белки, г',
        value: ingredient?.proteins,
      },
      {
        id: uuidv4(),
        title: 'Жиры, г',
        value: ingredient?.fat,
      },
      {
        id: uuidv4(),
        title: 'Углеводы, г',
        value: ingredient?.calories,
      },
    ],
    [ingredient]
  );

  return (
    <div className={`${styles.details_wrapper}`}>
      <img
        src={ingredient?.image}
        alt={ingredient?.name}
        className={`mb-4 ${styles.details_img}`}
      />
      <span className="mb-8 text text_type_main-medium">{ingredient?.name}</span>
      <div className={styles.details_list}>
        {details.map(({ id, title, value }) => (
          <div className={styles.details_list_item} key={id}>
            <span className="text text_type_main-default">{title}</span>
            <span className="text text_type_digits-default">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
