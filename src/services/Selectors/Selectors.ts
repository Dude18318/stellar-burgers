import { RootState } from '../store';

// Для конструктора
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;

export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;

export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;

export const selectOrders = (state: RootState) => state.feed.orders;

export const selectFeedStats = (state: RootState) => ({
  total: state.feed.total,
  totalToday: state.feed.totalToday
});
