import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "../src/reducer/ShoppingCartSlice"

export const store = configureStore({
    reducer:shoppingCartReducer
});
