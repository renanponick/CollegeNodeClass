import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthService from "../services/AuthService.js"

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ("../views/Home.vue")
    },
    {
        path: '/createuser',
        name: 'CreateUser',
        component: () =>
            import ("../views/Users/Create.vue")
    },
    {
        path: '/createproduct',
        name: 'CreateProdutc',
        component: () =>
            import ("../views/Products/Create.vue")
    },
    {
        path: '/listproducts',
        name: 'ListProducts',
        component: () =>
            import ("../views/Products/List.vue")
    },
    {
        path: '/detailproducts:id',
        name: 'DetailProducts',
        component: () =>
            import ("../views/Products/Detail.vue")
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ("../views/Login.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.name != 'Login' && !AuthService.isSignedIn()){
        next({ nome: 'Login' });
    }else{
        if(to.name == 'CreateProdutc' && !AuthService.isAdmin()){
            next({ nome: 'Home' });
        }else{
            next();
        }
    }
})

export default router