//封装请求
import axios from 'axios'
import {FreshToken} from '../../../assets/js/loginApi/login'


/*axios.defaults.baseURL = 'http://47.99.159.70:8006/'*/

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    },).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//返回header层
export function getPages(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    },).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function putParam(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method:'PUT',
      url:url,
      params:params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function put(url, data) {
  return new Promise((resolve, reject) => {
    axios({
      method:'put',
      url:url,
      data:data,
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url,data
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
//返回header层
export function postPage(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url,data
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function postParam(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method:'POST',
      url:url,
      params:params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}


