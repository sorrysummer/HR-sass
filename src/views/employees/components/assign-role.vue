<template>
  <div>
    <el-dialog title="分配角色" :visible="showDialog" @close="btnCancel">
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleListApi,
  getUserPhotoApi,
  assignRoleApi,
} from "../../../api/index";
export default {
  data() {
    return {
      list: [],
      roleIds: [] /* 存储用户拥有的角色id */,
    };
  },
  created() {
    this.getRoleList();
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleListApi({ page: 1, pagesize: 20 });
      this.list = rows;
    },
    // props异步传值，userId创建的时候还未传进来
    async getUserPhoto(id) {
      const { roleIds } = await getUserPhotoApi(id);
      this.roleIds = roleIds;
    },
    async btnOk() {
      await assignRoleApi({ id: this.userId, roleIds: this.roleIds });
      this.$emit("update:showDialog", false);
      this.$message.success("分配角色成功");
    },
    btnCancel() {
      this.roleIds = []; /* 关闭之前清空 */
      this.$emit("update:showDialog", false);
    },
  },
};
</script>

<style>
</style>