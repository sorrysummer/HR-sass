import request from '@/utils/request'

export const userLogin = (data) => request({
  url: '/sys/login',
  method: 'POST',
  data
})

export function getInfo(token) {

}

export function logout() {

}
