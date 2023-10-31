import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort: {
    name: 'популярности(Desc)',
    sortProperty: 'rating',
  },
  category: 0,
};
export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { setSort, setCategory } = filterSlice.actions;
export default filterSlice.reducer;
