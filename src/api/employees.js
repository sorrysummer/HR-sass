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

export const deleteStaff = (id) => request({
    url: `/sys/user/${id}`,
    method: "DELETE"
})

export const addStaff = (data) => request({
    url: "/sys/user",
    method: "POST",
    data
})


export const importStaff = (data) => request({
    url: '/sys/user/batch',
    method: "POST",
    data
})

// 更新员工数据
// 读取数据在user模块下已经封装
export const saveStaffInfo = (data) => request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
})


export const getPersonlInfo = (id) => request({
    url: `/employees/${id}/personalInfo`
})

export const savePersonlInfo = (data) => request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'PUT',
    data
})


export const getJobInfo = (id) => request({
    url: `/employees/${id}/jobs`
})


export const saveJobInfo = (data) => request({
    url: `/employees/${data.userId}/jobs`,
    method: 'PUT',
    data
})

export const assignRole = (data) => request({
    url: "/sys/user/assignRoles",
    method: 'put',
    data
})