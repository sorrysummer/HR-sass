import { userLogin, getUserInfo, getUserPhoto } from "./user";
import { getDefaultData, deleteDepartment, newDepartment } from "./departments";
export const userLoginApi = userLogin  /* 登陆接口 */
export const getUserInfoApi = getUserInfo  /* 用户信息接口 */
export const getUserPhotoApi = getUserPhoto  /* 用户头像接口 */

export const getDefaultDataApi = getDefaultData  /* 组织架构后台数据接口 */
export const deleteDepartmentApi = deleteDepartment  /* 删除部门接口 */
export const newDepartmentApi = newDepartment  /* 新增部门接口 */