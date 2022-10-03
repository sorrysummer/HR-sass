import request from '@/utils/request'
export const getSimpleList = () => request({
    url: '/sys/user/simple',
    method: "GET"
})

export const getStaffList = (params) => request({
    url: "/sys/user",
    mrthod: 'GET',
    params
})