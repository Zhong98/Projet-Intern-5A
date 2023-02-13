import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'

const routes = [
  {
    path: "/home",
    name: "Home",
    meta:{
      keepAlive:true
    },
    component: HomeView,
  },
  {
    path: "/",
    redirect:'/home',
  },
  {
    path: '/list',
    name: 'List',
    meta:{
      keepAlive:true
    },
    component: () => import('@/views/List.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      keepAlive:false //不缓存购物车页面
    },
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('@/views/My.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    children:[
      //子路由
      //默认路径
      {
        path: '',
        name: 'SearchIndex',
        component: () => import('@/views/Search/SearchIndex.vue')
      },
      {
        path: '/item',
        name: 'SearchItem',
        component: () => import('@/views/Search/SearchItem.vue')
      }
    ],
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    meta:{
      keepAlive:true
    },
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    children:[
      //子路由
      //默认路径
      {
        path: '',
        name: 'LoginIndex',
        component: () => import('@/views/Login/LoginIndex.vue')
      },
      {
        path: '/userLogin',
        name: 'UserLogin',
        component: () => import('@/views/Login/UserLogin.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Login/Register.vue')
      }
    ],
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/recovery',
    name: 'Recovery',
    children:[
      //子路由
      //默认路径
      {
        path: '',
        name: 'RecoveryIndex',
        component: () => import('@/views/Recovery/RecoveryIndex.vue')
      },
      {
        path: '/recoveryPwd',
        name: 'RecoveryPwd',
        component: () => import('@/views/Recovery/RecoveryPwd.vue')
      }
    ],
    component: () => import('@/views/Recovery.vue')
  },
  {
    path: '/address',
    name: 'Address',
    children:[
      //子路由
      //默认路径
      {
        path: '',
        name: 'AddressIndex',
        component: () => import('@/views/Address/AddressIndex.vue')
      },
      {
        path: '/addOrEdit',
        name: 'AddOrEdit',
        component: () => import('@/views/Address/AddOrEdit.vue')
      }
    ],
    component: () => import('@/views/Address.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/alipay',
    name: 'AliPay',
    component: () => import('@/views/PaymentResult.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to)=>{
  let nextRoute=['AliPay','Address','Order','Cart','AddressIndex','AddOrEdit'];
  let userInfo=JSON.parse(localStorage.getItem('teaUserInfo'))
  //当前进入的页面是不是需要验证的，如果是则需验证登录状态
  if (nextRoute.indexOf(to.name)>=0){
    if (!userInfo){
      router.push('/login')
    }
  }
})

export default router
