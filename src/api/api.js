import { get, post } from './http'

// 捐赠项目主页面
export const getMainPage = config => post('api/Front/getItems', config)//192.168.200.51:8888/

// 发送ticket
export const sendTicket = config => post('api/Front/getUser', config)//192.168.200.51:8888/

// 获取历史页面
export const getHistory = config => get('api/Front/getHistory', config)//192.168.200.51:8888/

// 支付
export const payFor = config => post('api/Front/Pay', config)//192.168.200.51:8888/
