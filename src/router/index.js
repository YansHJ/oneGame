import Vue from 'vue'
import Router from 'vue-router'
import StartPage from "../components/StartPage";
import GuidancePage from "../components/GuidancePage";
import ChangeWeaponPage from "../components/ChangeWeaponPage";
import FailPage from "../components/FailPage";
import BattlePage from "../components/BattlePage";
import DrawCardPage from "../components/DrawCardPage";
import DesignYourMonster from "../components/DesignYourMonster";
import Map from "../components/MapPage";
import TestPage from "../components/TestPage";
import UpdateInfo from "../components/UpdateInfo";
import RoleManagementPage from "../components/RoleManagementPage";

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
    },{
      path: '/drawCard',
      name: 'drawCard',
      component: DrawCardPage
    },{
      path: '/DesignYourMonster',
      name: 'DesignYourMonster',
      component: DesignYourMonster
    },{
      path: '/map',
      name: 'Map',
      component: Map
    },{
      path: '/test',
      name: 'test',
      component: TestPage
    },{
      path: '/update',
      name: 'update',
      component: UpdateInfo
    },{
      path: '/roleManage',
      name: 'roleManage',
      component: RoleManagementPage
    }
  ]
})
