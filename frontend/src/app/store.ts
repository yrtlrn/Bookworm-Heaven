// Redux Toolkit
import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

// Slices
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

// API
import { BookApi } from "./api/bookApi";
import { UserApi } from "./api/userApi";

// Redux Presist

// Other

const reducer = combineReducers({
  userReducer,
  cartReducer,
  [BookApi.reducerPath]: BookApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(

    ).concat(BookApi.middleware, UserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
