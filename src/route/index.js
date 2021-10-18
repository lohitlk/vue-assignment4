import { createRouter,createWebHistory} from "vue-router";
import Home from '@/components/home/Home.vue'
const routes=[
    { path: '/:pathMatch(.*)*', name: 'Home', component:Home   },
    {
        path: '/home',
        name: 'home',
        // component:Home
        component: () => import(/*webpackChunkName:"Home"*/ '@/components/home/Home.vue')
    },
    {
        path: '/details/:id',
        name: 'detailpage',
        // component:Home
        component: () => import(/*webpackChunkName:"Home"*/ '@/components/view/ContentDetails.vue')
    },
    {
        path:'/myfav',
        name:'Favourite',
        component:()=>import(/*webpackChunkName:"favourite"*/ '@/components/home/MyFavourite.vue')
    },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })
  export default router;