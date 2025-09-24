import { Type } from "./action.type";

export const initialState = {
  cart: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_CART:
      // check if the item already exists in the cart

      const existingItem = state.cart.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        return {
          ...state,
          cart: [...state.cart, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedCart = state.cart.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          ...state,
          cart: updatedCart,
        };
      }
    case Type.REMOVE_FROM_CART:
      const index = state.cart.findIndex((item) => item.id === action.id);
      let newCart = [...state.cart];

      if (index >= 0) {
        if (newCart[index].amount > 1) {
          newCart[index] = {
            ...newCart[index],
            amount: newCart[index].amount - 1,
          };
        } else {
          newCart.splice(index, 1);
        }
      }
      return {
        ...state,
        cart: newCart,
      };
    case Type.EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};