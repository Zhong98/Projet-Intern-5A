export default {
    state: {
        orderID:localStorage.getItem('order_id') || ''
    },
    getters: {},
    mutations: {
        initOrder(state,orderID){
            state.orderID=orderID;
            localStorage.setItem('order_id',orderID)
        }
    },
    actions: {},
}