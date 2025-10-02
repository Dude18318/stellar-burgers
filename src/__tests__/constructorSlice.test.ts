import {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../services/user/slices/constructorSlice';
import type { TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-1',
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
};

const sauce: TIngredient = {
  _id: 'sauce-1',
  name: 'Соус',
  type: 'sauce',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 5,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mainIng: TIngredient = {
  _id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 25,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('burgerConstructor reducer', () => {
  it('addIngredient: добавление булок и начинки', () => {
    let state = burgerConstructorReducer(undefined, { type: '@@INIT' });

    state = burgerConstructorReducer(state, addIngredient(bun));
    expect(state.bun?._id).toBe('bun-1');
    expect(state.ingredients).toHaveLength(0);

    state = burgerConstructorReducer(state, addIngredient(sauce));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('sauce-1');
    expect(state.ingredients[0].id).toEqual(expect.any(String));
  });

  it('removeIngredient: удаление по id конструктора', () => {
    let state = burgerConstructorReducer(undefined, { type: '@@INIT' });
    state = burgerConstructorReducer(state, addIngredient(mainIng));
    state = burgerConstructorReducer(state, addIngredient(sauce));
    expect(state.ingredients).toHaveLength(2);

    const idToRemove = state.ingredients[0].id;
    state = burgerConstructorReducer(state, removeIngredient(idToRemove));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).not.toBe(idToRemove);
  });

  it('moveIngredient: меняет порядок элементов', () => {
    let state = burgerConstructorReducer(undefined, { type: '@@INIT' });
    state = burgerConstructorReducer(state, addIngredient(mainIng));
    state = burgerConstructorReducer(state, addIngredient(sauce));
    const first = state.ingredients[0];
    const second = state.ingredients[1];

    state = burgerConstructorReducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(state.ingredients[0].id).toBe(second.id);
    expect(state.ingredients[1].id).toBe(first.id);
  });

  it('clearConstructor: очистка булки и ингредиенты', () => {
    let state = burgerConstructorReducer(undefined, { type: '@@INIT' });
    state = burgerConstructorReducer(state, addIngredient(bun));
    state = burgerConstructorReducer(state, addIngredient(sauce));

    state = burgerConstructorReducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
