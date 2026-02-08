import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { useBurger } from '@hooks/useBurger';
import { useIngredients } from '@hooks/useIngredients';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { ingredients, setIngredients, isLoading } = useIngredients();
  const { burger, addIngredient, removeIngredient } = useBurger(
    ingredients,
    setIngredients
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <main className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients
              onAddIngredient={addIngredient}
              ingredients={ingredients}
            />
            <BurgerConstructor
              onRemoveIngredient={removeIngredient}
              ingredients={burger}
            />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
