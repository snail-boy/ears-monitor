import {GOODS, GOODS_COLUMNS, MONITOR_MAIN_ONE_URL, MONITOR_BY_ORDER_NO_URL } from './api'
import {METHOD, request} from '@/utils/request'

export async function goodsList(params) {
  return request(GOODS, METHOD.GET, params)
}

export async function goodsColumns() {
  return request(GOODS_COLUMNS, METHOD.GET)
}

// 视频回放list接口
export async function monitorMainOneUrl(params) {
  return request(MONITOR_MAIN_ONE_URL, METHOD.POST, params)
}

// 视频播放接口
export async function monitorByOrderNoUrl() {
  return request(MONITOR_BY_ORDER_NO_URL, METHOD.POST)
}



export default {goodsList, goodsColumns}
