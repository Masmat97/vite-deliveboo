import { reactive, toRefs } from 'vue';

const state = reactive({
    cart: [],
    total: 0
});

function addToCart(product) {
    const existingProduct = state.cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        state.cart.push({...product, quantity: 1});
    }
    updateTotal();
}

function removeFromCart(productId) {
    const index = state.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        state.cart.splice(index, 1);
    }
    updateTotal();
}

function updateTotal() {
    state.total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
}

export function useCart() {
    return { ...toRefs(state), addToCart, removeFromCart };
}
