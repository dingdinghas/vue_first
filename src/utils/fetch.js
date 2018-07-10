import axios from 'axios'
import vueCookie from 'vue-cookie'
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(config => {
  // Do something before request is sent
  if (vueCookie.get('NToken') !== null) {
    config.headers['Authorization'] = 'Bearer ' + vueCookie.get('NToken')
  } else {
    window.location = 'http://sso.example.com/recordUrl?url=www.example.com:8081'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

export default service
