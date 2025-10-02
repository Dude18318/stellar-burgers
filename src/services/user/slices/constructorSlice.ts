import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TConstructorIngredient } from '@utils-types';
import { orderBurgerApi } from '@api';
import { RootState } from 'src/services/store';

type BurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  nextIngredientId: number;
  error: string | null;
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  nextIngredientId: 1,
  error: null
};

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { state: RootState; rejectValue: string }
>('burgerConstructor/createOrder', async (items: string[], thunkAPI) => {
  const state = thunkAPI.getState();
  const isAuthenticated = state.auth.isAuthenticated;

  if (!isAuthenticated) {
    return thunkAPI.rejectWithValue('Пользователь не авторизован');
  }

  try {
    const res = await orderBurgerApi(items);
    return res.order;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,

  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({
          ...action.payload,
          id: `${action.payload._id}-${state.nextIngredientId++}`
        });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const items = [...state.ingredients];
      const [removed] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, removed);
      state.ingredients = items;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    },
    resetConstructor: () => initialState
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload;
          state.bun = null;
          state.ingredients = [];
          state.nextIngredientId = 1;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal,
  resetConstructor
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
