import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  wishlist: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const item = {
        id: action.payload.id,
        img: action.payload.images,
        qty: 1,
        price: action.payload.price,
        title: action.payload.title,
      };

      const itemIndex = state.cart.findIndex((e) => e.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex].qty += 1;
      } else {
        state.cart.push(item);
      }
    },
    addWishlistItem: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeWishlistItem: (state, action) => {
      const deleteitemfromWishlist = state.wishlist.filter(
        (e) => e.id !== action.payload.id
      );

      return {
        ...state,
        wishlist: deleteitemfromWishlist,
      };
    },

    increaseQty: (state, action) => {
      const increaseItemQty = state.cart.findIndex(
        (e) => e.id === action.payload.id
      );

      if (increaseItemQty >= 0) {
        state.cart[increaseItemQty].qty += 1;
      }

      // No need to return a new state object here
    },
    deleteCartItem: (state, action) => {
      const deleteitemfromcart = state.cart.filter(
        (e) => e.id !== action.payload.id
      );
      return {
        ...state,
        cart: deleteitemfromcart,
      };
    },
    deleteWishlistItem: (state, action) => {
      const deleteitemfromwishlist = state.wishlist.filter(
        (e) => e.id !== action.payload.id
      );
      return {
        ...state,
        wishlist: deleteitemfromwishlist,
      };
    },

    decreaseQty: (state, action) => {
      const decreaseItemQty = state.cart.findIndex(
        (e) => e.id === action.payload.id
      );
     
      if (state.cart[decreaseItemQty].qty == 1) {
        const deleteitemfromcart = state.cart.filter(
          (e) => e.id !== action.payload.id
        );
        return {
          ...state,
          cart: deleteitemfromcart,
        };
      } else {
        state.cart[decreaseItemQty].qty += -1;
      }
    },
  },
});

export const {
  addCartItem,
  deleteCartItem,
  decreaseQty,
  deleteWholeCartItem,
  increaseQty,
  deleteWishlistItem,
  removeWishlistItem,
  addWishlistItem,
} = cartSlice.actions;

export default cartSlice.reducer;
