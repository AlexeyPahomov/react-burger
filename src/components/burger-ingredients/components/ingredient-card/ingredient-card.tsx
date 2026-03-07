import { useDndRef } from '@/hooks/useDndRef';
import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import type { TIngredientWithCounter } from '@utils/types';

import styles from './ingredient-card.module.css';

type IngredientCardProps = {
  ingredient: TIngredientWithCounter;
};

export const IngredientCard = ({
  ingredient,
}: IngredientCardProps): React.JSX.Element => {
  const { image, name, price, count } = ingredient;

  const [, dragSource] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });
  const dragRef = useDndRef(dragSource);

  return (
    <>
      <div className={styles.ingredient_card} ref={dragRef}>
        <div className={styles.ingredient_counter}>
          {count > 0 && <Counter count={count} />}
        </div>
        <img src={image} alt={name} className={styles.ingredient_img} />
        <div className={styles.ingredient_price}>
          <span className="text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`text text_type_main-default ${styles.ingredient_name}`}>
          {name}
        </span>
      </div>
    </>
  );
};
