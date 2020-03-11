import axios from 'axios'
// // 最终方案,使用promise就不需要特地传入success和failure函数，直接用
// // reslove和reject函数
export function request (config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/wh',
    timeout: 10000
  })
  // // // axios拦截器,instance局部拦截，全局直接用axios.interceptors
  instance.interceptors.request.use(config => {
  //   console.log(config)
  //   // 拦截器的用处：
  //   // 1.假如config中的一些信息不符合服务器的要求，可以通过拦截来修改或者配置信息
  //   // 2.每次发送网络请求时，在界面中显示等着请求的图标
  //   // 3.某些网络请求必须携带一些特殊信息，比图登录的时候需要携带token
    return config
  },
  err => {
    console.log(err)
  })
  // 响应拦截
  // instance.interceptors.response.use(res => {
  //   console.log(res)
  // },
  // err => {
  //   console.log(err)
  // }
  // )
  return instance(config)
}
