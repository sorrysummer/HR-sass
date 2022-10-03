<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="hight: 200px; width: 100%"
  >
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>
              操作
              <i class="el-icon-arrow-down"></i>
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项  -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除部门
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deleteDepartmentApi } from "../../../api/index";
export default {
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    operateDepts(command) {
      if (command === "del") {
        this.$confirm("确定删除次部门吗")
          .then(() => {
            return deleteDepartmentApi(this.treeNode.id);
          }) /* 请求成功进入下一个then */
          .then(() => {
            // 自定义事件，接口数据已修改，修改html的数据
            this.$emit("delete");
            this.$message.success("删除成功");
          });
      } else if (command === "add") {
        // 在当前点击部门下添加子部门，所以传出部门信息
        this.$emit("addFn", this.treeNode);
      } else {
        this.$emit("editDept", this.treeNode);
      }
    },
  },
};
</script>

<style>
</style>