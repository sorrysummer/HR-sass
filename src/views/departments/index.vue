<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 -->
      <el-card class="tree-card">
        <TreeTools :treeNode="company" :isRoot="true" />
        <!-- 树结构 -->
        <!-- 作用域插槽，data为每个节点的名称 -->
        <el-tree :data="departs" :props="defaultProps">
          <!-- 有多少个节点，循环多少次 -->
          <TreeTools
            slot-scope="{ data }"
            :treeNode="data"
            @delete="getData()"
          />
        </el-tree>
      </el-card>
      <AddDept />
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
        manager: "李航",
      },
      departs: [],
      defaultProps: {
        label: "name",
        children: "children",
      },
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
    async getData() {
      try {
        const data = await getDefaultDataApi();
        console.log(data);
        this.departs = makeTreeData(data.depts, "");
      } catch (error) {
        console.log(error);
      }
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
