import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};
export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
});
/* export const {} = pizzaSlice.actions; */
export default pizzaSlice.reducer;
