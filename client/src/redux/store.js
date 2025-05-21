import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userMemberReducer from "./memberSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userMember: userMemberReducer
  }
});

export default store;