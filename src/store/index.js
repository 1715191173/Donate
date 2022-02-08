import Vue from 'vue'
import Vuex from 'vuex'

// 1. 安装插件
Vue.use(Vuex)

import mainPageStore from "../components/MainPage";
import historyPageStore from "../components/HistoryPage";
import specificPageStore from "../components/SpecificPage";

// 2. 创建对象
const store = new Vuex.Store({
  /*
   * 利用Vuex管理全局变量
   * 可共享数据
   * */
  state: {
    individualData: {},
  },
  modules: {
    mainPageStore,
    historyPageStore,
    specificPageStore
  },
  mutations: {

  }
})

// 3. 导出对象
export default store
