<template>
  <el-dialog :title="showTitle" :visible="isDialog" :before-close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules" ref="form">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50个字符"
          v-model="formData.code"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getDefaultDataApi,
  getSimpleListApi,
  newDepartmentApi,
  editDepartmentDetailApi,
  updateDepartmentApi,
} from "../../../api/index";
export default {
  data() {
    const isNameRepeat = async (rule, value, callback) => {
      // 获取最新数据，避免编辑时，数据发生变化
      const { depts } = await getDefaultDataApi();
      let isRepeat = false;
      if (this.formData.id) {
        // 有id表示编辑
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.treeNode.pid && item.id !== this.treeNode.id
          )
          .some((item) => item.name === value);
      } else {
        // 没有id表示新增
        // 通过id找到子部门pid，对比名称是否相同，返回boolean值
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
      }

      isRepeat ? callback(new Error("已存在该部门")) : callback();
    };
    const isCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDefaultDataApi();

      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.treeNode.id)
          .some((item) => item.code === value && value);
      } else {
        // 找到是否有相同编码,避免value为空
        isRepeat = depts.some((item) => item.code === value && value);
      }

      isRepeat ? callback(new Error("已存在该部门编码")) : callback;
    };
    return {
      departmentList: null,
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "部门名称为1-50个字符", trigger: "blur" },
          { trigger: "blur", validator: isNameRepeat },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "部门编码为1-50个字符", trigger: "blur" },
          { trigger: "blur", validator: isCodeRepeat },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "部门介绍为1-300个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    isDialog: {
      type: Boolean,
      default: false,
    },
    treeNode: {
      type: Object,
      default: null,
    },
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    handleClose() {
      // resetfileds不能重置表单id
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      // 点击关闭
      this.$emit("update:isDialog", false);
      // resetFileds 重置校验，清空输入框
      this.$refs.form.resetFields();
    },
    async getDepartmentList() {
      const data = await getSimpleListApi();
      this.departmentList = data;
    },
    async editDepartments(id) {
      // props传值是异步，可能值进不来
      this.formData = await editDepartmentDetailApi(id);
    },
    btnOk() {
      // 确定
      this.$refs.form.validate(async (isOk) => {
        if (isOk) {
          if (this.formData.id) {
            // 根据有无id区分是编辑还是添加
            await updateDepartmentApi(this.formData);
            this.$message.success("编辑部门成功");
          } else {
            await newDepartmentApi({ ...this.formData, pid: this.treeNode.id });
          }

          // 数据上传成功，修改视图层
          this.$emit("addDept");
          // 确定之后关闭弹窗
          this.handleClose();
        }
      });
    },
  },
  computed: {
    showTitle() {
      return this.formData.id ? "编辑部门" : "添加部门";
    },
  },
};
</script>

<style>
</style>