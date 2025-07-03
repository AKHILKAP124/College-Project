import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [], // Initialize with an empty array
};

const notificationsSlice = createSlice({
  name: "userNotifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    }
  },
});


export const { setNotifications} = notificationsSlice.actions;

export default notificationsSlice.reducer;
