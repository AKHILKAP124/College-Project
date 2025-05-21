import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
  name: '',
    email: '',
    avatar: '',
  token: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      },
    setToken: (state, action) => {
        state.token = action.payload;
    },
    clearUser: (state) => {
        state._id = "";
        state.name = "";
        state.email = "";
        state.avatar = "";
        state.token = "";
    },
  },
}); 

export const { setUser, clearUser, setToken } = userSlice.actions;

export default userSlice.reducer;
  