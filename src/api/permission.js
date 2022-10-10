import request from '@/utils/request'

export const getAllPermission = () => request({
    url: '/sys/permission',
    method: 'GET'
})

export const addPermission = (data) => request({
    url: '/sys/permission',
    method: 'POST',
    data
})


export const deletePermission = (id) => request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
})

export const updatePermission = (data) => request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
})


export const getDetailPermission = (id) => request({
    url: `/sys/permission/${id}`
    , method: "GET"
})


export const assignRolePermission = (data) => request({
    url: "/sys/role/assignPrem",
    method: 'PUT',
    data
})