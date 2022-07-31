import Vue from 'vue'
import Router from 'vue-router'
import StartPage from "../components/StartPage";
import GuidancePage from "../components/GuidancePage";
import ChangeWeaponPage from "../components/ChangeWeaponPage";
import FailPage from "../components/FailPage";
import BattlePage from "../components/BattlePage";

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
    },{
      path: '/ChangeWeapon',
      name: 'changeWeaponPage',
      component: ChangeWeaponPage
    },{
      path: '/fail',
      name: 'fail',
      component: FailPage
    },{
      path: '/battle',
      name: 'battle',
      component: BattlePage
    }
  ]
})
