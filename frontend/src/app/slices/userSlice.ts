import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { UserApi } from "../api/userApi";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/hook";
import { cartItems } from "./cartSlice";

const initialState: {
  authorized: boolean;
} = {
  authorized: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      UserApi.endpoints.getAuthCheck.matchFulfilled,
      (state) => {
        state.authorized = true;
      }
    );
    builder.addMatcher(
      UserApi.endpoints.postLogoutUser.matchFulfilled,
      (state) => {
        state.authorized = false;
        localStorage.removeItem("cart");
      }
    );
    builder.addMatcher(
      UserApi.endpoints.postLoginUser.matchFulfilled,
      (state, action) => {
        state.authorized = true;
        if (action.payload) {
          const payload = action.payload as {
            data: cartItems[];
            message: string;
          };
          const total = payload.data.reduce(
            (total, amount) =>
              total +
              amount.itemQuantity * amount.itemPrice,
            0
          );
          const storeData = {
            total: total,
            items: payload.data,
            expiry: new Date().getTime()
          };
          localStorage.setItem(
            "cart",
            JSON.stringify(storeData)
          );
        }
      }
    );
    builder.addMatcher(
      UserApi.endpoints.postSignupUser.matchFulfilled,
      (state) => {
        state.authorized = true;
      }
    );
    builder.addMatcher(
      UserApi.endpoints.deleteUser.matchFulfilled,
      (state) => {
        state.authorized = false;
      }
    );
  },
});

export const isUserAuthorized = (state: RootState) =>
  state.userReducer.authorized;

export default userSlice.reducer;
