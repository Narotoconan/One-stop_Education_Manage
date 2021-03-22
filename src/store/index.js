import Vue from 'vue'
import Vuex from 'vuex'

import AdminLogin from "./modules/AdminLogin"
import Statistic from "./modules/Statistic"
import TeacherManage from "./modules/TeacherManage"
import UserManage from "./modules/UserManage"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    targetURL:'http://39.97.185.232:25565'
  },
  mutations: {},
  actions: {},
  modules: {
    AdminLogin,
    Statistic,
    TeacherManage,
    UserManage
  }
})
