import { useDndRef } from '@/hooks/useDndRef';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { mergeRefs } from 'react-merge-refs';

import type { TBurgerIngredient } from '@/utils/types';

import styles from './draggable-element.module.css';

type TDraggableElementProps = {
  ingredient: TBurgerIngredient;
  handleClose?: () => void;
  handleDrop?: (ingredient: TBurgerIngredient) => void;
};

export const DraggableElement = ({
  ingredient,
  handleClose,
  handleDrop,
}: TDraggableElementProps): React.JSX.Element => {
  const [, dragSource] = useDrag({
    type: 'burger-element',
    item: ingredient,
  });
  const dragRef = useDndRef(dragSource);

  const [, dropTarget] = useDrop({
    accept: 'burger-element',
    drop: (item: TBurgerIngredient) => {
      if (ingredient.id === item.id) return;

      if (handleDrop) {
        handleDrop(item);
      }
    },
  });
  const dropRef = useDndRef(dropTarget);

  return (
    <div ref={mergeRefs([dragRef, dropRef])} className={styles.wrapper}>
      <DragIcon type="primary" className="mr-2" />
      <ConstructorElement
        handleClose={handleClose}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        extraClass={`${styles.enable}`}
      />
    </div>
  );
};
