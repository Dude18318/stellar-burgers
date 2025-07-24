import { loginUserApi, logoutApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TLoginData } from '@api';
import { TUser } from '@utils-types';
import { logout } from './slices/authSlice';

export const loginThunk = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data) => {
    const response = await loginUserApi(data);
    return response.user;
  }
);

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  return response.success;
});
