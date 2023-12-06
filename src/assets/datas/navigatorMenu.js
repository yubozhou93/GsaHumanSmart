export const navigatorMenu ={
    path:'/manage',
    component : AppLayout,
    children:[
      {
        path:'',
        name:'home',
        component:()=>import('@/manage/Home/Home.vue')  
      },
      {
        path:'/user',
        name:'用户管理',
        component:()=>import('@/manage/UserManage/UserManage.vue')
      }
    ]
  }
  