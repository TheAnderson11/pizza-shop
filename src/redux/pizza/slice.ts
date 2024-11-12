import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IQuery, Pizza, PizzaSliceState, Status } from './types';

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};



export const axiosReqPizzas = createAsyncThunk<Pizza[], IQuery>(
    'pizza/axiosReqPizza',
    async (params) => {
        const { paginateQuery, categoryQuery, sortQuery, orderQuery, searchQuery } =
            params;
        const { data } = await axios.get<Pizza[]>(
            `https://64aaf2bd0c6d844abedf0487.mockapi.io/items?${paginateQuery}&
    ${categoryQuery}&${sortQuery}&${orderQuery}&${searchQuery}`,
        );
        return data;
    },
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(axiosReqPizzas.pending, state => {
            state.items = [];
            state.status = Status.LOADING;
        });
        builder.addCase(axiosReqPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(axiosReqPizzas.rejected, state => {
            state.items = [];
            state.status = Status.ERROR;
        });
    },
});



export default pizzaSlice.reducer;
