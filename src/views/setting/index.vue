<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理" name="first">
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="isDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <el-table border stripe :data="list">
              <el-table-column
                prop="date"
                label="序号"
                width="120"
                type="index"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="name" label="角色名" width="240">
              </el-table-column>
              <el-table-column prop="description" label="描述">
              </el-table-column>
              <el-table-column label="操作">
                <!-- 从作用域结构出row -->
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignPe(row.id)"
                    >分配权限</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                layout="prev,pager,next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.name"
                ></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.companyAddress"
                ></el-input>
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.companyPhone"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.mailbox"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  disabled
                  style="width: 400px"
                  v-model="formData.remarks"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- 新添角色弹出层 -->

    <el-dialog title="新增角色" :visible="isDialog" :before-close="handleClose">
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="分配权限" :visible="showDialog" @close="btnPeCancel">
      <el-tree
        :data="permData"
        :props="defaultProps"
        :default-expand-all="true"
        :show-checkbox="true"
        :check-strictly="true"
        :default-checked-keys="selectCheck"
        node-key="id"
        ref="check"
      ></el-tree>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPeOk">
            确定</el-button
          >
          <el-button size="small" @click="btnPeCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleListApi,
  getCompanyListApi,
  deleteRoleApi,
  updateRoleApi,
  getRoleDetailApi,
  addRoleApi,
  getAllPermissionApi,
  assignRolePermissionApi,
} from "@/api/index";
import { mapGetters } from "vuex";
import { makeTreeData } from "../../utils/index";
export default {
  data() {
    return {
      list: [],
      roleId: "",
      permData: [],
      defaultProps: {
        label: "name",
      },
      selectCheck: [],
      roleForm: { name: "", description: "" },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
      },
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10,
        total: 0 /* 记录总数 */,
      },
      formData: {},
      isDialog: false,
      showDialog: false /* 控制分配权限弹层 */,
      data: {},
    };
  },
  created() {
    this.getRoleList();
    this.getCompanyInfo();
  },
  computed: {
    ...mapGetters["companyId"],
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleListApi(this.page);
      this.page.total = total;
      this.list = rows;
      console.log(total, rows);
    },

    changePage(newPage) {
      this.page.page = newPage;
      this.getRoleList();
    },
    async getCompanyInfo() {
      this.formData = await getCompanyListApi(this.companyId);
    },
    async deleteRole(id) {
      try {
        await this.$confirm(
          "确认删除此角色吗？"
        ); /* 只有点击了确认才能进入下方 */
        await deleteRoleApi(id);
        // 刷新页面数据
        this.getRoleList();
        this.$message.success("删除角色成功");
      } catch (error) {
        console.log(error);
      }
    },
    handleClose() {
      // 关闭弹出层，清空输入框
      this.isDialog = false;
      this.roleForm = {
        name: "",
        description: "",
      };
      //清空验证
      this.$refs.roleForm.resetFields();
    },
    async btnOk() {
      // 验证通过才会执行await后边
      // 也可以传入回调函数
      await this.$refs.roleForm.validate();
      // 如果有id就是编辑，没有id就是新增
      if (this.roleForm.id) {
        await updateRoleApi(this.roleForm);
      } else {
        // 没有id就是新增
        await addRoleApi(this.roleForm);
        this.handleClose();
      }

      // 重新获取数据渲染页面
      this.getRoleList();
      this.isDialog = false;
      this.$message.success("操作成功");
    },
    btnCancel() {
      this.handleClose();
    },
    async editRole(id) {
      // 根据id获取角色数据后，渲染到弹出层
      this.roleForm = await getRoleDetailApi(id);
      this.isDialog = true;
    },

    async assignPe(id) {
      this.roleId = id; /* 保存id */
      const { permIds } = await getRoleDetailApi(id); /* 当前角色拥有的权限点 */
      this.selectCheck = permIds;
      // 把所有权限转化为树形
      this.permData = makeTreeData(await getAllPermissionApi(), "0");
      this.showDialog = true;
    },

    async btnPeOk() {
      await assignRolePermissionApi({
        permIds: this.$refs.check.getCheckedKeys(),
        id: this.roleId,
      });
      this.$message.success("分配权限成功");
      this.showDialog = false; /* 触发close事件，重置数据 */
    },
    btnPeCancel() {
      // 重置默认数据放在取消里
      this.selectCheck = [];
      this.showDialog = false;
    },
  },
};
</script>

<style>
</style>
