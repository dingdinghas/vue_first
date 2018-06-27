import fetch from '@/utils/fetch.js'
export function login (query) {
  return fetch({
    url: 'api/login',
    method: 'post',
    params: query
  })
}
