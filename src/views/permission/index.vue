<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <el-button
          slot="after"
          type="primary"
          size="small"
          @click="addPe(1, '0')"
        >
          添加权限</el-button
        >
      </PageTools>
      <!-- key是行的唯一标识 -->
      <el-table :data="list" row-key="id" border>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column
          align="center"
          label="标识"
          prop="code"
        ></el-table-column>
        <el-table-column
          align="center"
          label="描述"
          prop="description"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button
              type="text"
              v-if="row.type !== 2"
              @click="addPe(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="updatePe(row.id)">编辑</el-button>
            <el-button type="text" @click="deletePe(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出层 -->
      <el-dialog
        :visible="showDialog"
        :title="this.formData.id ? '编辑' : '新增'"
        @close="btnCancel"
      >
        <el-form
          label-width="120px"
          :model="formData"
          :rules="rules"
          ref="form"
        >
          <el-form-item label="名称" style="width: 90%" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="标识" style="width: 90%" prop="code">
            <el-input v-model="formData.code"></el-input>
          </el-form-item>
          <el-form-item label="描述" style="width: 90%" prop="description">
            <el-input v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item label="开启" prop="enVisible">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOk"
              >确定</el-button
            >
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getAllPermissionApi,
  deletePermissionApi,
  addPermissionApi,
  updatePermissionApi,
  getDetailPermissionApi,
} from "../../api/index";
import { makeTreeData } from "../../utils/index";
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      },
      rules: {
        name: [
          { required: true, message: "权限名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "权限标识不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getAllPermission();
  },
  methods: {
    async getAllPermission() {
      // 将数据属性转化
      this.list = makeTreeData(await getAllPermissionApi(), "0");
    },
    async deletePe(id) {
      await this.$confirm("确定删除此权限吗");
      await deletePermissionApi(id);
      this.getAllPermission();
      this.$message.success("删除权限成功");
    },
    btnOk() {
      this.$refs.form
        .validate()
        .then(() => {
          if (this.formData.id) {
            return updatePermissionApi(this.formData);
          }
          return addPermissionApi(this.formData);
        })
        .then(() => {
          this.$message.success("操作成功");
          this.getAllPermission();
          this.showDialog = false;
        });
    },
    btnCancel() {
      this.formData = {
        id: "",
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      };
      this.$refs.form.resetFields();
      this.showDialog = false;
    },
    addPe(type, pid) {
      // 访问权type=1,按钮操作权的type=2
      this.formData.type = type;
      this.formData.pid = pid;
      this.showDialog = true;
    },
    async updatePe(id) {
      this.formData = await getDetailPermissionApi(id);
      this.showDialog = true;
      this.formData.id = id;
    },
  },
};
</script>

<style>
</style>
