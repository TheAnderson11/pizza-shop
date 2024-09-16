import calcTotalPrice from './calcTotalPrice';

function getLocalStorage() {
    const data = localStorage.getItem('cartItems');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    return {
        items,
        totalPrice
    }
}
export default getLocalStorage;