export const mutations = {
    setOrder(state, newVal) {
        console.log('mutation', newVal)
        state.newOrder = newVal;
        state.orders.push(newVal)
        let orders = state.orders
        localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    setFromStorage(state, newVal) {
        state.orders = newVal;
    },
};