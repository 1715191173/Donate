import Vue from 'vue'
import Router from 'vue-router'
import MainPage from "../components/MainPage/MainPage"
import HistoryPage from "../components/HistoryPage/HistoryPage"
import SpecificPage from "../components/SpecificPage/SpecificPage"
import Success from "../components/Pay/Success"
import Fail from "../components/Pay/Fail"

Vue.use(Router)

const routes =[
  {path: '', redirect: '/MainPage'},
  {path: '/MainPage', name: 'MainPage', component: MainPage, meta: {title: '导航页'}},
  {path: '/AlumDonate', name: 'Alum  Donate', component: SpecificPage, meta: {title: '校友捐赠'}},
  {path: '/HistoryPage', name: 'HistoryPage', component: HistoryPage, meta: {title:'历史记录'}},
  {path: '/Success', name: 'Success', component: Success, meta: {title:'支付成功'}},
  {path: '/Fail', name: 'Fail', component: Fail, meta: {title:'支付失败'}},
]

export default new Router({
  routes,
  mode:'hash'
})
