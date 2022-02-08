import axios from "axios";

const specificPageStore = {
  state: {
    donateValue: Number,
    errMsg: String,
  },
  mutations: {
    'STORE_DonateValue': (state, payload) => {
      state.donateValue = payload
    },
    'STORE_ErrMsg': (state, payload) => {
      state.errMsg = payload
    },
  },
  getters: {},
  actions: {
    storeDonateValue({ state, commit, rootState }) {
      commit('STORE_DonateValue')
    },
    storeErrMsg({ state, commit, rootState }) {
      commit('STORE_ErrMsg')
    },
  }

}

export default specificPageStore
