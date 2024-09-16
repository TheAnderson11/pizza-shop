import { CartItem } from "../redux/cart/types";


const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce(
        (sum, item) => item.count * item.price + sum,
        0,
    );
}

export default calcTotalPrice;