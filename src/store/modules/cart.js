import http from "@/common/api/request"
import {Toast, Dialog} from "vant";

export default {
    state: {
        list: [], //商品的列表
        selectList: [], //选中的商品
    },
    getters: {
        isCheckedAll(state) {
            return state.list.length === state.selectList.length;
        },
        hasChecked(state) {
            return state.selectList.length !== 0
        },
        total(state) {
            let total = {
                num: 0,
                price: 0
            }
            state.list.forEach(v => {
                if (v.checked) {
                    total.num += parseInt(v.product_num);
                    total.price += v.product_price * v.product_num
                }
            })
            return total
        }
    },
    mutations: {
        getCartProducts(state, cartArr) {
            state.list = cartArr;

            cartArr.forEach(v => {
                state.selectList.push(v.id)
            })
        },
        checkedAll(state) {
            state.selectList = state.list.map(v => {
                v.checked = true;
                return v.id
            })
        },
        unCheckedAll(state) {
            state.list.forEach(v => {
                v.checked = false
            })
            state.selectList = []
            state.totalPrice = 0
        },
        checkItem(state, index) {
            let id = state.list[index].id //查找item的id
            let i = state.selectList.indexOf(id); //查找该id在selectList的index
            if (i > -1) {
                return state.selectList.splice(i, 1) //存在remove
            } else {
                return state.selectList.push(id) //不存在添加
            }
        },
        clearCart(state) {
            state.list = []
            state.selectList = []
        }
    },
    actions: {
        checkedAllFn({commit, getters}) {
            getters.isCheckedAll ? commit('unCheckedAll') : commit('checkedAll')
        },
        deleteFn({state}, id) {
            if (typeof id === "object" && state.selectList.length === 0) { //点击底部删除按钮才会出现提示，点击删除标签删除某一项不会出现
                Toast('请选择商品')
            }
            if (typeof id === "number") { //number转化为数组
                id = [id]
            }
            Dialog.confirm({
                message: '确认删除所选商品吗？',
            }).then(() => {
                http.$axios({
                    url: '/api/deleteCart',
                    method: 'POST',
                    data: {
                        idArr: id
                    }
                }).then(res => {
                    if (res.success) {
                        Toast(res.msg);
                        if (typeof id === "object") {
                            id.forEach(v => { //点击删除按钮，批量删除
                                let index = state.list.findIndex((value) => value.id === v)
                                let indexSelect=state.selectList.indexOf(id)
                                state.list.splice(index, 1);
                                state.selectList.splice(indexSelect,1) //list和selectList删除对应项
                            })
                        } else {
                            let index = state.list.findIndex((v) => v.id === id) //删除图标单独删除
                            let indexSelect=state.selectList.indexOf(id)
                            state.list.splice(index, 1);
                            state.selectList.splice(indexSelect,1)
                        }
                    }
                })
            })
        }
    }
}