import { createRouter, createWebHashHistory } from "vue-router"


const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {   path:"/",
            redirect:"/home"
        },
        {
            path:"/home",
            component:()=> import("@/views/Home/home.vue")
        },
        {
            path:"/publication",
            component:()=> import("@/views/Publication/publication.vue")
        },{
            path:"/gsaHumanHome",
            component:()=> import("@/views/GsaHumanHome/gsaHumanHome.vue")
        },{
            path:"/review",
            component:()=> import("@/views/GsaHumanHome/cps/review.vue")
        },{
            path:"/history",
            component:()=> import("@/views/GsaHumanHome/cps/history.vue")
        },{
            path:"/modifyMetaData",
            component:()=> import("@/views/GsaHumanHome/cps/modifyMetaData.vue")
        },{
            path:"/dac",
            component:()=> import("@/views/GsaHumanHome/cps/dac.vue")
        },{
            path:"/dachistory",
            component:()=> import("@/views/GsaHumanHome/cps/dacHistory.vue")
        }
    ]

})

export default router