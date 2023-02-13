import { createStore } from 'vuex'

import user from './modules/user'
import cart from './modules/cart'
import address from './modules/address'
import order from './modules/order'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart,
    address,
    order
  }
})
