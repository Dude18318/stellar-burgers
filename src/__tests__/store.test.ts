import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../services/user/slices/ingredientSlice';
import { burgerConstructorReducer } from '../services/user/slices/constructorSlice';
import { auth } from '../services/user/slices/authSlice';
import feedReducer from '../services/user/slices/feedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth,
  feed: feedReducer
});

describe('rootReducer', () => {
  it('инициализация с корректной формой состояния', () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (gDM) => gDM({ serializableCheck: false })
    });

    const state = store.getState();
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('feed');

    expect(state.ingredients).toEqual(
      expect.objectContaining({
        items: expect.any(Array),
        isLoading: false,
        error: null
      })
    );
    expect(state.burgerConstructor).toEqual(
      expect.objectContaining({
        bun: null,
        ingredients: expect.any(Array),
        orderRequest: false,
        orderModalData: null,
        error: null
      })
    );
  });
});

it('rootReducer: UNKNOWN_ACTION с undefined состоянием', () => {
  const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' } as any);

  expect(state).toHaveProperty('ingredients');
  expect(state).toHaveProperty('burgerConstructor');
  expect(state).toHaveProperty('auth');
  expect(state).toHaveProperty('feed');

  expect(state.ingredients).toEqual(
    expect.objectContaining({
      items: expect.any(Array),
      isLoading: false,
      error: null
    })
  );
  expect(state.burgerConstructor).toEqual(
    expect.objectContaining({
      bun: null,
      ingredients: expect.any(Array),
      orderRequest: false,
      orderModalData: null,
      error: null
    })
  );
});
