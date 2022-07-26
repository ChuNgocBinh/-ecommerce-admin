import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMe } from 'services/user';

const initialState = {
  navCurrentId: 1,
  user: '',
  status: 'idle',
};

export const fetchUserInfo = createAsyncThunk(
  'users/fetchUserInfo',
  // eslint-disable-next-line consistent-return
  async () => {
    const token = JSON.parse(localStorage.getItem('AuthToken'));
    if (!token) {
      return null;
    }
    const res = await getMe();
    if (res.status === 200 && res?.data?.status === 'success') {
      return res?.data?.data;
    }
    return null;
  },
);

export const appSlice = createSlice({
  name: 'app-redux',
  initialState,

  reducers: {
    changeAppCurrent: (state, action) => {
      state.navCurrentId = action.payload;
    },
    changeUserInfo: (state, action) => {
      state.user = action.payload;
    },

  },
  extraReducers: {
    [fetchUserInfo.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.status = 'done';
      state.user = action.payload;
    },
    [fetchUserInfo.rejected]: (state) => {
      state.status = 'error';
    },
  },
});

export const { changeAppCurrent, changeUserInfo } = appSlice.actions;

export default appSlice.reducer;
