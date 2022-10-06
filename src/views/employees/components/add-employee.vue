<template>
  <el-dialog title="新增员工" :visible="isDialogShow" :before-close="close">
    <el-form label-width="120px" :model="formData" :rules="rules" ref="form">
      <el-form-item label="姓名" prop="username">
        <el-input
          style="width: 50%"
          placeholder="请输入姓名"
          v-model="formData.username"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          style="width: 50%"
          placeholder="请输入手机号"
          v-model="formData.mobile"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          style="width: 50%"
          placeholder="请选择入职时间"
          v-model="formData.timeOfEntry"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          style="width: 50%"
          placeholder="请选择"
          v-model="formData.formOfEmployment"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          style="width: 50%"
          placeholder="请输入工号"
          v-model="formData.workNumber"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          @focus="getDefaultData"
          style="width: 50%"
          placeholder="请选择部门"
          v-model="formData.departmentName"
        />
        <!-- 绑定数据 -->
        <el-tree
          v-if="isTreeShow"
          v-loading="loading"
          :data="treeData"
          :props="{ label: 'name' }"
          :default-expand-all="true"
          @node-click="select"
        ></el-tree>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          style="width: 50%"
          placeholder="请选择转正时间"
          v-model="formData.correctionTime"
        />
      </el-form-item>
    </el-form>

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import EmployeeEnum from "../../../api/constant/employees";
import { addStaffApi, getDefaultDataApi } from "../../../api/index";
import { makeTreeData } from "../../../utils/index";
export default {
  data() {
    return {
      EmployeeEnum,
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 1, max: 4, message: "用户姓名为1-4位" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
      },
      treeData: [],
      isTreeShow: false,
      loading: false,
    };
  },
  props: {
    isDialogShow: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {
    close() {
      //  sync修饰符，传值
      this.$emit("update:isDialogShow", false);
      this.formData = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      };
      this.$refs.form.resetFields(); /* 移除校验 */
    },
    btnCancel() {
      this.close();
    },
    async btnOk() {
      // 校验成功再去调用接口
      console.log(this.$parent);
      await this.$refs.form.validate();
      await addStaffApi(this.formData);
      this.$emit("update");
      this.$emit("update:isDialogShow", false);
      this.$message.success("增加成功");
    },
    async getDefaultData() {
      this.isTreeShow = true;
      this.loading = true;
      const { depts } = await getDefaultDataApi();
      this.treeData = makeTreeData(depts, "");
      this.loading = false;
    },
    select(node) {
      this.formData.departmentName = node.name;
      this.isTreeShow = false;
    },
  },
};
</script>

<style>
</style>