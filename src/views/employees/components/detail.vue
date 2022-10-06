<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form
              ref="form"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :model="userInfo"
              :rules="rules"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input style="width: 300px" v-model="userInfo.username" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="userInfo.password2"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveStaffInfo"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 动态组件，is后边必须是变量，可以动态切换组件 -->
            <component :is="userComponent" />
          </el-tab-pane>

          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="jobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import UserInfo from "./user-info.vue";
import JobInfo from "./job-info.vue";
import { saveStaffInfoApi, getUserPhotoApi } from "../../../api/index";
export default {
  components: {
    UserInfo,
    JobInfo,
  },
  data() {
    return {
      jobComponent: "JobInfo",
      userComponent: "UserInfo",
      userId: this.$route.params.id /* 直接将路由中的参数赋值给userId */,
      userInfo: {
        username: "",
        // 后端返回的密码为密文，传入输入框会触发验证，
        password2: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 9, message: "密码为6-9位", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.getUserPhoto();
  },
  methods: {
    saveStaffInfo() {
      this.$refs.form.validate().then(async () => {
        // 解构，用输入的密码，替换密文password
        await saveStaffInfoApi({
          ...this.userInfo,
          password: this.userInfo.password2,
        });
        this.$message.success("修改成功");
      });
    },
    async getUserPhoto() {
      this.userInfo = await getUserPhotoApi(this.userId);
    },
  },
};
</script>

<style>
</style>