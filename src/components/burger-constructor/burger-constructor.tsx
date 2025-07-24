import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorIngredients,
  selectConstructorBun,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/Selectors/Selectors';
import {
  createOrder,
  closeOrderModal
} from '../../services/user/slices/constructorSlice';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectConstructorIngredients);
  const bun = useSelector(selectConstructorBun);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds));
  };

  const handleCloseModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(() => {
    const ingredientsPrice = Array.isArray(ingredients)
      ? ingredients.reduce((acc, item) => acc + item.price, 0)
      : 0;

    const bunPrice = bun ? bun.price * 2 : 0;
    return ingredientsPrice + bunPrice;
  }, [ingredients, bun]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{
        bun: bun || null,
        ingredients: Array.isArray(ingredients) ? ingredients : []
      }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};
