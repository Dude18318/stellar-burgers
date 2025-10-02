import {
  ingredientsReducer,
  initialState,
  fetchIngredients
} from '../services/user/slices/ingredientSlice';
import type { TIngredient } from '@utils-types';

const reduce = (state = initialState, action: any) =>
  ingredientsReducer(state, action);

describe('ingredientsSlice', () => {
  it('pending: установка isLoading=true и очистка error', () => {
    const action = fetchIngredients.pending('');
    const state = reduce(undefined, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled: запись ингредиентов и isLoading=false', () => {
    const payload: TIngredient[] = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 10,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const action = fetchIngredients.fulfilled(payload, '');
    const state = reduce({ ...initialState, isLoading: true }, action);
    expect(state.items).toEqual(payload);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('rejected: пишет ошибку и isLoading=false', () => {
    const error = new Error('Ошибка загрузки');
    const action = fetchIngredients.rejected(error, '');
    const state = reduce({ ...initialState, isLoading: true }, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
