import Vue from 'vue'
import VueRouter from "vue-router";

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Cartgory')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = ()=> import('views/detail/Detail')
const OpenAnimations = ()=> import('views/openAnimations/OpenAnimations')

Vue.use(VueRouter)

const  routes = [{
  path:'',
  redirect:'/home'
},
  {
    path: '/home',
    component:Home
  },
  {
    path: '/openAnimations',
    component:OpenAnimations
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path: '/detail/:iid',
    component:Detail
  }]

const router = new VueRouter({
    routes,
  mode:'hash'
})


export default router
