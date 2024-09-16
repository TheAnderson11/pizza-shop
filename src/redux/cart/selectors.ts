import { RootState } from "../../store";

export const cartSelectorFindItems = (id: string) => (state: RootState) =>
    state.cart.items.find(obj => obj.id === id);

export const cartSelector = (state: RootState) => state.cart;