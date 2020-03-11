// 该文件是home页面的网页请求封装,将首页的请求都封装在一起
// 首页将直接面向home。js开发
import { request } from './request'

export function getHomeMutidata () {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods (type, page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}
