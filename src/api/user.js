import request from '@/utils/request'

export const userLogin = (data) => request({
  url: '/sys/login',
  method: 'POST',
  data
})

export const getUserInfo = () => request({
  url: '/sys/profile',
  method: 'POST',
})

export const getUserPhoto = (Id) => request({
  url: `/sys/user/${Id}`,
  method: 'GET'
})


export function logout() {

}
