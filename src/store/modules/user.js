export default{
    state:{
        loginStatus:false,
        token:null,
        userInfo:{}
    },
    getters:{

    },
    mutations:{
        saveUser(state, user){
            state.loginStatus=true;
            state.token=user.token;
            state.userInfo=user;

            //持久化存储
            localStorage.setItem('teaUserInfo',JSON.stringify(user))
        },
        initUser(state){
            let user=JSON.parse(localStorage.getItem('teaUserInfo'))
            if (user){
                state.loginStatus=true;
                state.token=user.token;
                state.userInfo=user;
            }
        },
        loginOut(state){
            state.loginStatus=false;
            state.token=null;
            state.userInfo={};
            localStorage.removeItem('teaUserInfo');
            localStorage.removeItem('goodsList');
            localStorage.removeItem('order_id');
        }
    },
    actions: {
    },
}
