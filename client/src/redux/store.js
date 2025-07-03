import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import userMemberReducer from "./memberSlice";
import notificationsReducer from "./notificationSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers( {
  user: userReducer,
  userMember: userMemberReducer,
  notifications: notificationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
