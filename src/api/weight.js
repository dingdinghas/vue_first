import fetch from '@/utils/fetch'
export function saveWeight (query) {
  return fetch({
    url: 'api/weight/save',
    method: 'post',
    params: query
  })
}
export function getData () {
  return fetch({
    url: 'api/weight',
    method: 'get'
  })
}
