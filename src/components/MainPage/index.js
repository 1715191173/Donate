import axios from "axios";

const mainPageStore = {
  /*
  * state
  * 存放共享数据
  * */
  state: {
    pageData: [],
    pageId: Number,
    itemId: Number,
    indivMsg: {},
  },
  /*
  * mutation
  * state指的是state的数据
  * */
  mutations: {
    'STORE_MainPageData': (state, payload) => {
      state.pageData = payload
    },
    'STORE_ItemPage': (state, payload) => {
      state.pageId = payload
    },
	  'STORE_IndivMsg': (state, payload) => {
      state.indivMsg = payload
    },
    'STORE_ItemID': (state, payload) => {
      state.itemId = payload
    },
  },

  /*
  * getter
  * 类似共享属性
  *
  * getter 的返回值会根据它的依赖被缓存起来
  * 且只有当它的依赖值发生了改变才会被重新计算
  * */
  getters: {

  },

  /*
  * actions
  * 通常与api接口相关
  * 参数列表：{commit, state}
  * state指的是state数据
  * commit调用mutations的方法
  * name就是调用此方法时要传的参数
  * */
  actions: {
    storeMainPageData({ state, commit, rootState }) {
      commit('STORE_MainPageData')
    },
    getItemPage({ state, commit, rootState }) {
      commit('STORE_ItemPage')
    },
	  storeIndivMsg({ state, commit, rootState }) {
	    commit('STORE_IndivMsg')
	  },
    storeItemId({ state, commit, rootState }) {
      commit('STORE_ItemID')
    },
  }

}

export default mainPageStore
