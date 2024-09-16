export interface SortType {
    name: string;
    sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

export interface filterSliceState {
    sort: SortType;
    categoryId: number;
    search: string;
    currentPage: number;
}