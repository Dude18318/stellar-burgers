import { useSelector } from '../../services/store';
import { resetConstructor } from '../../services/user/slices/constructorSlice';
import styles from './constructor-page.module.css';
import { useDispatch } from '../../services/store';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { useEffect } from 'react';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = false;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(resetConstructor()); // <-- очищаем state при монтировании
  // }, [dispatch]);
  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
