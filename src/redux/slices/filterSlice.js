import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort: {
    name: 'популярности(Desc)',
    sortProperty: 'rating',
  },
  categoryId: 0,
  search: '',
  currentPage: 1,
};
export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPaginationCount: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});
export const {
  setSort,
  setCategory,
  setSearch,
  setPaginationCount,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
