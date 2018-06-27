import fetch from '@/utils/fetch.js'

export function check () {
  return fetch({
    url: 'api/register/check'
  })
}
