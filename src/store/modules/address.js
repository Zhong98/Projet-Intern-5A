export default {
    state: {
        list: [],
        orderAddress:undefined
    },
    getters: {
        defaultAddress(state){
            return state.list.filter(v=>{
                return v.isDefault==1
            })
        }
    },
    mutations: {
        initAddress(state, addressList) {
            state.list = addressList
        },
        changeAddress(state,addressID) {
            state.orderAddress=state.list.filter(v=>{
                return v.id===addressID
            })
            console.log(state.orderAddress[0])
        }
    },
    actions: {}
}
