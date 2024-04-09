// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Slices
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

// API
import { BookApi } from "./api/bookApi";
import { UserApi } from "./api/userApi";

// Redux Presist
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
// Other

const persistConig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConig, cartReducer)

export const store = configureStore({
  reducer: {
    persistedReducer,
    userReducer,
    cartReducer,
    [BookApi.reducerPath]: BookApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      BookApi.middleware,
      UserApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store)
