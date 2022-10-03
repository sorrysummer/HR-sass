<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 -->
      <el-card class="tree-card">
        <TreeTools :treeNode="company" :isRoot="true" @addFn="addFn" />
        <!-- 树结构 -->
        <!-- 作用域插槽，data为每个节点的名称 -->
        <el-tree :data="departs" :props="defaultProps">
          <!-- 有多少个节点，循环多少次 -->
          <TreeTools
            slot-scope="{ data }"
            :treeNode="data"
            @delete="getData()"
            @addFn="addFn"
            @editDept="editDept"
          />
        </el-tree>
      </el-card>
      <AddDept
        ref="edit"
        :isDialog.sync="isDialog"
        :treeNode="node"
        @addDept="getData()"
      />
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import { getDefaultDataApi } from "../../api/index";
import { makeTreeData } from "@/utils/index.js";
import AddDept from "./components/add-dept.vue";
export default {
  data() {
    return {
      company: {
        name: "西安工业大学教育科技股份有限公司",
        manager: "总裁:李航",
        id: "" /* 用来匹配根节点的子部门 */,
      },
      departs: [],
      defaultProps: {
        label: "name",
        children: "children",
      },
      isDialog: false,
      node: null /* 记录当前点击的节点 */,
    };
  },
  components: {
    TreeTools,
    AddDept,
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取部门信息
    async getData() {
      try {
        const data = await getDefaultDataApi();
        this.departs = makeTreeData(data.depts, "");
      } catch (error) {
        console.log(error);
      }
    },
    // 添加部门
    addFn(node) {
      this.isDialog = true;
      this.node = node;
    },
    // 编辑部门
    editDept(node) {
      this.isDialog = true;
      this.node = node;
      // 获取组件实例，调用内部方法
      this.$refs.edit.editDepartments(node.id);
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
