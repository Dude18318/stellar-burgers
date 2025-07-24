import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';

type AuthState = {
  isAuthenticated: boolean;
  user: TUser | null;
  error: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null
};

// 🔐 Логин
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await loginUserApi({ email, password });
      return res.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    {
      email,
      password,
      name
    }: { email: string; password: string; name: string },
    thunkAPI
  ) => {
    try {
      const res = await registerUserApi({ email, password, name });
      return res.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await logoutApi();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const res = await getUserApi();
    return res.user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// ✏️ Обновить данные пользователя
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: Partial<TUser>, thunkAPI) => {
    try {
      const res = await updateUserApi(userData);
      return res.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Ручной logout без удаления токенов
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // register
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // getUser
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // updateUser
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

// Селекторы
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

// Экспорты
export const { logout } = authSlice.actions;
export const auth = authSlice.reducer;
