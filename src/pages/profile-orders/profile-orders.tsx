import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { fetchOrders } from '../../services/user/slices/feedSlice';
import { selectOrders } from '../../services/Selectors/Selectors';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <p className='text text_type_main-default'>Загрузка заказов...</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
