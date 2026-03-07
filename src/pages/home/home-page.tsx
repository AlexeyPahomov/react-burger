import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './home-page.module.css';

export const HomePage = (): React.JSX.Element => {
  const { isLoading } = useGetIngredientsQuery();

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <DndProvider backend={HTML5Backend}>
            <main className={`${styles.main} pl-5 pr-5`}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </DndProvider>
          <Outlet />
        </>
      )}
    </>
  );
};
export default HomePage;
