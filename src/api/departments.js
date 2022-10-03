import request from '@/utils/request'
export const getDefaultData = () => request({
    url: '/company/department',
    method: 'GET'
})

export const deleteDepartment = (id) => request({
    url: `/company/department/${id}`,
    method: "DELETE"
})

export const newDepartment = (data) => request({
    url: "/company/department",
    method: 'POST',
    data
})


export const editDepartmentDetail = (id) => request({
    url: `/company/department/${id}`,
})

export const updateDepartment = (data) => request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
})

