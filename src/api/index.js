import { userLogin, getUserInfo, getUserPhoto } from "./user";
import { getDefaultData, deleteDepartment, newDepartment, editDepartmentDetail, updateDepartment } from "./departments";
import { getSimpleList, getStaffList } from "./employees";
import { getRoleList, getCompanyList, deleteRole, updateRole, getRoleDetail, addRole } from "./setting";
export const userLoginApi = userLogin  /* 登陆接口 */
export const getUserInfoApi = getUserInfo  /* 用户信息接口 */
export const getUserPhotoApi = getUserPhoto  /* 用户头像接口 */

export const getDefaultDataApi = getDefaultData  /* 组织架构后台数据接口 */
export const deleteDepartmentApi = deleteDepartment  /* 删除部门接口 */
export const newDepartmentApi = newDepartment  /* 新增部门接口 */
export const editDepartmentDetailApi = editDepartmentDetail /* 获取编辑部门详细信息接口 */
export const updateDepartmentApi = updateDepartment  /* 更新部门信息 */

export const getSimpleListApi = getSimpleList /* 获取员工简单列表接口 */
export const getStaffListApi = getStaffList /* 获取员工列表 */


export const getRoleListApi = getRoleList /* 获取所有角色列表 */
export const getCompanyListApi = getCompanyList /* 根据id获取公司信息 */
export const deleteRoleApi = deleteRole  /* 删除角色接口 */
export const updateRoleApi = updateRole /* 更新角色接口 */
export const getRoleDetailApi = getRoleDetail   /* 根据id获取角色详情 */
export const addRoleApi = addRole /* 新增角色接口 */