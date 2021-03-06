import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import MysqlStudy from '../views/MysqlStudy.vue'
import MySQLPrePareIntroduce from '../views/MySQLPrePareIntroduce.vue'
import MySQLPrePareInstall from '../views/MySQLPrePareInstall.vue'
import MySQLJuniorChangeDatabases from '../views/MySQLJuniorChangeDatabases.vue'
import MySQLJuniorChangeTables from '../views/MySQLJuniorChangeTables.vue'
import MySQLJuniorSelect from '../views/MySQLJuniorSelect.vue'
import MySQLJuniorInsert from '../views/MySQLJuniorInsert.vue'
import MySQLJuniorUpdate from '../views/MySQLJuniorUpdate.vue'
import MySQLJuniorDelete from '../views/MySQLJuniorDelete.vue'
import MySQLJuniorGroupBy from '../views/MySQLJuniorGroupBy.vue'
import MySQLJuniorOrderBy from '../views/MySQLJuniorOrderBy.vue'
import MySQLJuniorJoin from '../views/MySQLJuniorJoin.vue'
import MySQLJuniorLike from '../views/MySQLJuniorLike.vue'
import MySQLJuniorUnion from '../views/MySQLJuniorUnion.vue'
import MySQLJuniorRegular from '../views/MySQLJuniorRegular.vue'
import MySQLSeniorFrameWork from '../views/MySQLSeniorFrameWork.vue'
import MySQLSeniorAffair from '../views/MySQLSeniorAffair.vue'
import MySQLSeniorDistributeAffair from '../views/MySQLSeniorDistributeAffair.vue'
import MySQLSeniorIndex1 from '../views/MySQLSeniorIndex1.vue'
import MySQLSeniorIndex2 from '../views/MySQLSeniorIndex2.vue'
import MySQLSeniorExplain from '../views/MySQLSeniorExplain.vue'
import MySQLSeniorInnodb from '../views/MySQLSeniorInnodb.vue'
import MySQLSeniorBTree from '../views/MySQLSeniorBTree.vue'
import MySQLSeniorMVCC from '../views/MySQLSeniorMVCC.vue'
import MySQLSeniorLock from '../views/MySQLSeniorLock.vue'
import MySQLSeniorUndoLog from '../views/MySQLSeniorUndoLog.vue'
import MySQLSeniorRedoLog from '../views/MySQLSeniorRedoLog.vue'
import MySQLSeniorBinLog from '../views/MySQLSeniorBinLog.vue'
import MySQLProgram from '../views/MySQLProgram.vue'
import MySQLTestProgram from '../views/MySQLTestProgram.vue'
import User from '../views/User.vue'
import ManagerHome from '../views/ManagerHome.vue'
import ManagerSpread from '../views/ManagerSpread.vue'
import ManagerCooperationSchool from '../views/ManagerCooperationSchool.vue'
import ManagerTest from '../views/ManagerTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ManagerTest',
    name: 'ManagerTest',
    component: ManagerTest
  },
  {
    path: '/MySQLTestProgram',
    name: 'MySQLTestProgram',
    component: MySQLTestProgram
  },
  {
    path: '/ManagerCooperationSchool',
    name: 'ManagerCooperationSchool',
    component: ManagerCooperationSchool
  },
  {
    path: '/ManagerSpread',
    name: 'ManagerSpread',
    component: ManagerSpread
  },
  {
    path: '/ManagerHome',
    name: 'ManagerHome',
    component: ManagerHome
  },
  {
    path: '/User',
    name: 'User',
    component: User
  },
  {
    path: '/MySQLProgram',
    name: 'MySQLProgram',
    component: MySQLProgram
  },
  {
    path: '/MySQLSeniorUndoLog',
    name: 'MySQLSeniorUndoLog',
    component: MySQLSeniorUndoLog
  },
  {
    path: '/MySQLSeniorRedoLog',
    name: 'MySQLSeniorRedoLog',
    component: MySQLSeniorRedoLog
  },
  {
    path: '/MySQLSeniorBinLog',
    name: 'MySQLSeniorBinLog',
    component: MySQLSeniorBinLog
  },

  {
    path: '/MySQLSeniorLock',
    name: 'MySQLSeniorLock',
    component: MySQLSeniorLock
  },
  {
    path: '/MySQLSeniorMVCC',
    name: 'MySQLSeniorMVCC',
    component: MySQLSeniorMVCC
  },
  {
    path: '/MySQLSeniorBTree',
    name: 'MySQLSeniorBTree',
    component: MySQLSeniorBTree
  },
  {
    path: '/MySQLSeniorInnodb',
    name: 'MySQLSeniorInnodb',
    component: MySQLSeniorInnodb
  },
  {
    path: '/MySQLSeniorExplain',
    name: 'MySQLSeniorExplain',
    component: MySQLSeniorExplain
  },
  {
    path: '/MySQLSeniorIndex1',
    name: 'MySQLSeniorIndex1',
    component: MySQLSeniorIndex1
  },
  {
    path: '/MySQLSeniorIndex2',
    name: 'MySQLSeniorIndex2',
    component: MySQLSeniorIndex2
  },
  {
    path: '/MySQLSeniorAffair',
    name: 'MySQLSeniorAffair',
    component: MySQLSeniorAffair
  },
  {
    path: '/MySQLSeniorDistributeAffair',
    name: 'MySQLSeniorDistributeAffair',
    component: MySQLSeniorDistributeAffair
  },
  {
    path: '/MySQLSeniorFrameWork',
    name: 'MySQLSeniorFrameWork',
    component: MySQLSeniorFrameWork
  },
  {
    path: '/MySQLJuniorRegular',
    name: 'MySQLJuniorRegular',
    component: MySQLJuniorRegular
  },
  {
    path: '/MySQLJuniorUnion',
    name: 'MySQLJuniorUnion',
    component: MySQLJuniorUnion
  },
  {
    path: '/MySQLJuniorLike',
    name: 'MySQLJuniorLike',
    component: MySQLJuniorLike
  },
  {
    path: '/MySQLJuniorGroupBy',
    name: 'MySQLJuniorGroupBy',
    component: MySQLJuniorGroupBy
  },
  {
    path: '/MySQLJuniorOrderBy',
    name: 'MySQLJuniorOrderBy',
    component: MySQLJuniorOrderBy
  },
  {
    path: '/MySQLJuniorJoin',
    name: 'MySQLJuniorJoin',
    component: MySQLJuniorJoin
  },
  {
    path: '/MySQLJuniorDelete',
    name: 'MySQLJuniorDelete',
    component: MySQLJuniorDelete
  },
  {
    path: '/MySQLJuniorUpdate',
    name: 'MySQLJuniorUpdate',
    component: MySQLJuniorUpdate
  },
  {
    path: '/MySQLJuniorInsert',
    name: 'MySQLJuniorInsert',
    component: MySQLJuniorInsert
  },
  {
    path: '/MySQLJuniorSelect',
    name: 'MySQLJuniorSelect',
    component: MySQLJuniorSelect
  },
  {
    path: '/MySQLJuniorChangeTables',
    name: 'MySQLJuniorChangeTables',
    component: MySQLJuniorChangeTables
  },
  {
    path: '/MySQLJuniorChangeDatabases',
    name: 'MySQLJuniorChangeDatabases',
    component: MySQLJuniorChangeDatabases
  },
  {
    path: '/MySQLPrePareInstall',
    name: 'MySQLPrePareInstall',
    component: MySQLPrePareInstall
  },
  {
    path: '/MySQLPrePareIntroduce',
    name: 'MySQLPrePareIntroduce',
    component: MySQLPrePareIntroduce
  },
  {
    path: '/MysqlStudy',
    name: 'MysqlStudy',
    component: MysqlStudy
  },
  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
