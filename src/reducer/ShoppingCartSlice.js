import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shoppingCart: []
};

export const addToCartReducer = (state, action) => {
    const newGroceryItem = {
        ...action.payload
    }
    newGroceryItem.quantity = 1;
    newGroceryItem.total = getTotal(newGroceryItem.price,newGroceryItem.quantity)
    state.shoppingCart.push(newGroceryItem);
}

export const getTotal = (price, quantity) => {
    const total = price * quantity;
    return isNaN(total) ? '0' : total.toFixed(2); 
};

export const removeFromCartReducer = (state, action) => {
    state.shoppingCart = state.shoppingCart.filter((item) => item.id !== action.payload);
}

export const updateCartReducer = (state, action) => {
    const item = state.shoppingCart.find((item) => item.id === action.payload.id);
    if (item) {
        item.quantity = action.payload.val;
        item.total=getTotal(item.price, item.quantity);
    }
}

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addToCart: addToCartReducer,
        removeFromCart: removeFromCartReducer,
        updateCart: updateCartReducer
    }
})

export const { addToCart, removeFromCart, updateCart } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer