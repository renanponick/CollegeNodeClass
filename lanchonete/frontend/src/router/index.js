import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router