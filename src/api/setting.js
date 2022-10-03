import request from '@/utils/request'


export const getRoleList = (params) => request({
    url: "/sys/role",
    method: 'GET',
    params
})

export const getCompanyList = (id) => request({
    url: `/company/${id}`,
    method: "GET"
})

export const deleteRole = (id) => request({
    url: `/sys/role/${id}`,
    method: "DELETE"
})

export const updateRole = (data) => request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'PUT'
})

export const getRoleDetail = (id) => request({
    url: `/sys/role/${id}`,
    method: "GET"
})


export const addRole = (data) => request({
    url: "/sys/role",
    method: "POST",
    data
})