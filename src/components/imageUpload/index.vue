<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="handlePictureCardPreview"
      :fileList="fileList"
      :on-remove="handleRemove"
      :http-request="upload"
      :before-upload="beforeUpload"
      :on-change="changeFile"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgurl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import Cos from "cos-js-sdk-v5";
const cos = new Cos({
  SecretId: "AKID8kDf2HTinFWhlmhNsCd4GFY6i8N9i2Cw" /* 身份识别 */,
  SecretKey: "d4HI6i7IZfW9g3ESbYCeuxpZ8Ynvzvmj",
});
export default {
  data() {
    return {
      fileList: [],
      imgurl: "",
      showDialog: false,
      currentFileUid: "",
      showPercent: false,
      percent: 0,
    };
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter((item) => {
        item.uid !== file.uid;
      });
    },
    handlePictureCardPreview(file) {
      this.imgurl = file.url;
      this.showDialog = true;
    },
    beforeUpload(file) {
      // 文件上传的检查
      // 文件类型 文件大小
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      if (!types.includes(file.type)) {
        this.$message.error("上传图片只能是 JPG、GIF、BMP、PNG 格式!");
        return false;
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024;
      if (maxSize < file.size) {
        this.$message.error("图片大小最大不能超过5M");
        return false;
      }
      this.currentFileUid = file.uid;
      this.showPercent = true;
      return true;
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item);
    },
    upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: "hrsass-1314223155" /* 桶名 */,
            Region: "ap-chengdu" /* 地域 */,
            Key: params.file.name /* 文件名 */,
            Body: params.file /* 上传的对象 */,
            StorageClass: "STANDARD" /* 上传模式 */,
            onProgress: (params) => {
              this.percent = params.percent * 100;
            },
          },
          (err, data) => {
            if (!err && data.statusCode === 200) {
              this.fileList = this.fileList.map((item) => {
                if (item.uid === this.currentFileUid) {
                  return { url: "http://" + data.Location, upload: true };
                }
                return item;
              });
              setTimeout(() => {
                this.showPercent = false;
                this.percent = 0;
              }, 1000);
            }
          }
        );
      }
    },
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>