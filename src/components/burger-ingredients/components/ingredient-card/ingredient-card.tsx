import { useDoubleClick } from '@/hooks/useDoubleClick';
import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientWithCounter } from '@utils/types';

import styles from './ingredient-card.module.css';

type IngredientCardProps = {
  ingredient: TIngredientWithCounter;
  onClick: () => void;
  onDblClick: () => void;
};

export const IngredientCard = ({
  ingredient,
  onClick,
  onDblClick,
}: IngredientCardProps): React.JSX.Element => {
  const { image, name, price, count } = ingredient;

  const handleClick = useDoubleClick(
    () => onClick(),
    () => onDblClick()
  );

  return (
    <>
      <div onClick={handleClick} className={styles.ingredient_card}>
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
