import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem, CartSliceState } from './types';
import getLocalStorage from '../../utils/getLocalStorage';
import calcTotalPrice from '../../utils/calcTotalPrice';



const { items, totalPrice } = getLocalStorage();

const initialState: CartSliceState = {
    totalPrice,
    items
};
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
                if (findItem.count === 0) {
                    state.items = state.items.filter(obj => obj.id !== action.payload);
                }
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        clearItems: state => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});


export const { addItems, minusItem, removeItem, clearItems } =
    cartSlice.actions;
export default cartSlice.reducer;
