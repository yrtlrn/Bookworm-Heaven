import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Types } from "mongoose";
import { UserApi } from "../api/userApi";

type cartProps = {
  total?: number;
  items: Array<cartItems>;
};

export type cartItems = {
  id: Types.ObjectId;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
};

const initialState: cartProps = { total: 0, items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer: (
        state,
        action: PayloadAction<cartItems>
      ) => {
        if (
          state.items.find(
            (item) =>
              item.itemName === action.payload.itemName
          )
        ) {
          const itemIndex = state.items.findIndex(
            (x) => x.itemName === action.payload.itemName
          );

          state.items[itemIndex].itemQuantity +=
            action.payload.itemQuantity;
        } else {
          state.items.push(action.payload);
        }

        let sum = 0;

        for (let x = 0; x < state.items.length; x++) {
          sum +=
            state.items[x].itemQuantity *
            state.items[x].itemPrice;
        }
        state.total = parseFloat(sum.toFixed(2));
      },
      prepare: (item: cartItems) => {
        return { payload: item };
      },
    },
    increaseQuantity: {
      reducer: (
        state,
        action: PayloadAction<Types.ObjectId>
      ) => {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items[itemIndex].itemQuantity += 1;
        state.total! += state.items[itemIndex].itemPrice;
      },
      prepare: (item: Types.ObjectId) => {
        return { payload: item };
      },
    },
    decreaseQuantity: {
      reducer: (
        state,
        action: PayloadAction<Types.ObjectId>
      ) => {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items[itemIndex].itemQuantity -= 1;
        state.total! -= state.items[itemIndex].itemPrice;

        if (state.items[itemIndex].itemQuantity <= 0) {
          state.items.splice(itemIndex, 1);
        }
      },
      prepare: (item: Types.ObjectId) => {
        return { payload: item };
      },
    },
    setCartItems: (
      state,
      action: PayloadAction<cartItems[]>
    ) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      UserApi.endpoints.getUserCart.matchFulfilled,
      (state, action: PayloadAction<cartItems[]>) => {
        console.log(action.payload);
        console.log("Extra Reducer")
        // state.items = action.payload;
      }
    );
  },
});

export const getCartItems = (state: RootState) =>
  state.cartReducer.items;

export const getTotalPrice = (state: RootState) =>
  state.cartReducer.total;

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
