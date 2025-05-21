import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
};

const memberSlice = createSlice({
  name: "userMember",
  initialState,
  reducers: {
    setUserMember: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const { setUserMember } =
  memberSlice.actions;

export default memberSlice.reducer;
