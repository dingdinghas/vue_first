import Vue from 'vue'
import Router from 'vue-router'
import Mypage from '@/views/mypage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mypage',
      component: Mypage
    }
  ]
})
