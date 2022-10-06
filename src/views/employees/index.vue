<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :isBeforeShow="true">
        <span slot="before"> 共{{ page.total }}条记录</span>
        <span slot="after">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="isDialogShow = true"
            >新增员工</el-button
          >
        </span>
      </PageTools>
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" align="center">
            <template slot-scope="{ row }">
              <img
                @click="showQrCode(row.staffPhoto)"
                slot="reference"
                v-imageerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column label="手机号" sortable="" prop="mobile" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}</template
            >
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteStaff(row.id)"
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
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.size"
            :current-page="page.page"
            @current-change="changepage"
          />
        </el-row>
        <!-- sync 语法糖 -->
        <add-staff
          :isDialogShow.sync="isDialogShow"
          @update="getStaffList"
        ></add-staff>
      </el-card>
      <el-dialog
        title="二维码"
        :visible.sync="showCodeDialog"
        @opened="showQrCode"
        @close="imgUrl = ''"
      >
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getStaffListApi, deleteStaffApi } from "../../api/index";
import EmployeeEnum from "../../api/constant/employees";
import AddStaff from "./components/add-employee.vue";
import { formatDate } from "../../filters/index";
import QrCode from "qrcode";
export default {
  data() {
    return {
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      list: [],
      isDialogShow: false,
      showCodeDialog: false,
    };
  },
  components: {
    AddStaff,
  },
  created() {
    this.getStaffList();
  },
  methods: {
    async getStaffList() {
      const { total, rows } = await getStaffListApi(this.page);
      console.log(rows);
      this.list = rows;
      this.page.total = total;
    },
    changepage(newpage) {
      this.page.page = newpage;
      this.getStaffList();
    },
    // 删除员工
    async deleteStaff(id) {
      await this.$confirm("确定删除此员工吗");
      await deleteStaffApi(id);
      this.getStaffList();
      this.$message.success("删除成功");
    },
    //把返回的值使用枚举，转换为固定格式
    formatEmployment(row, column, cellValue, index) {
      const value = EmployeeEnum.hireType.find((item) => item.id === cellValue);
      return value ? value.value : "未知";
    },

    exportExcel() {
      const headers = {
        姓名: "username",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      import("../../vendor/Export2Excel").then(async (excel) => {
        const { rows } = await getStaffListApi({
          page: 1,
          size: this.page.total,
        });
        const data = this.formatJson(headers, rows);
        const multiHeader = [["姓名", "主要信息", "", "", "", "", "部门"]];
        const merges = ["A1:A2", "B1:F1", "G1:G2"];
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          multiHeader,
          merges,
          filename: "excel-list",
          autoWidth: true,
          bookType: "xlsx",
        });
      });
    },

    formatJson(headers, rows) {
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === "timeOfEntry" ||
            headers[key] === "correctionTime"
          ) {
            return formatDate(item[headers[key]]);
          } else if (headers[key] === "formOfEmployment") {
            const obj = EmployeeEnum.hireType.find(
              (items) => items.id === item[headers[key]]
            );
            return obj ? obj.value : "未知";
          } else {
            return item[headers[key]];
          }
        });
      });
    },
    showQrCode(url) {
      // url存在的情况下 才弹出层
      if (url) {
        this.showCodeDialog = true;
        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.myCanvas, url); // 将地址转化成二维码
          // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
        });
      }
    },
  },
};
</script>

<style>
</style>
