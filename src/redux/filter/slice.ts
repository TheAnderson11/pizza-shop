import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filterSliceState, SortType } from './types';


const initialState: filterSliceState = {
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
        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload;
        },
        setCategory: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setPaginationCount: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action: PayloadAction<filterSliceState>) => {
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
