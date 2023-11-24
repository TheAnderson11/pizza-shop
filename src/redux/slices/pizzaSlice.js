import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosReqPizzas = createAsyncThunk(
  'pizza/axiosReqPizza',
  async params => {
    const { paginateQuery, categoryQuery, sortQuery, orderQuery, searchQuery } =
      params;
    const { data } = await axios.get(
      `https://64aaf-2bd0c6d844abedf0487.mockapi.io/items?${paginateQuery}&
    ${categoryQuery}&${sortQuery}&${orderQuery}&${searchQuery}`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  status: '',
};
export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: builder => {
    builder.addCase(axiosReqPizzas.pending, state => {
      state.items = [];
      state.status = 'loading';
    });
    builder.addCase(axiosReqPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(axiosReqPizzas.rejected, state => {
      state.items = [];
      state.status = 'error';
    });
  },
});

export default pizzaSlice.reducer;
