import axios from "axios";

const historyPageStore = {
  state: {
    // 网络请求结构
    dataList: {
      data: {
        now: {

        }
      }
    }
  },
  mutations: {
    getData(state, res){
      state.dataList = res;
    },
  },
  getters: {},
  actions: {
    getManPageData({commit}){
      axios.get('https://devapi.qweather.com/v7/weather/now?key=ab2a12e9d33e4fb7a16304836e78a72e&location=101010100')
        .then(response => {
          console.log(response);
          commit("getData", response); // commit触发mutation
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default historyPageStore
