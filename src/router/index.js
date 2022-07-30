import Vue from 'vue'
import Router from 'vue-router'
import StartPage from "../components/StartPage";
import GuidancePage from "../components/GuidancePage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },{
      path: '/guidance',
      name: 'guidance',
      component: GuidancePage
    }
  ]
})
