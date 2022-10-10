<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        @change="dataChange"
        v-model="currentYear"
        size="small"
        style="width: 120px"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-select
        @change="dataChange"
        size="small"
        style="width: 120px; margin-left: 10px"
        v-model="currentMonth"
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yearList: [],
      currentYear: null,
      currentMonth: null,
      currentDate: null,
    };
  },
  filters: {
    getDay(value) {
      const day = value.split("-")[2];
      return day.startsWith("0") ? day.substr(1) : day;
    },
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  created() {
    this.currentYear = this.startDate.getFullYear();
    this.currentMonth = this.startDate.getMonth() + 1;
    this.yearList = Array.from(
      Array(11),
      (value, index) => index + this.currentYear - 5
    );
    this.dataChange();
  },
  methods: {
    dataChange() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`);
    },
    isWeek(date) {
      return date.getDay() === 0 || date.getDay() === 6;
    },
  },
};
</script>

<style scoped >
/deep/.el-calendar-day {
  height: auto;
}
/deep/ .el-calendar-table__row td,
/deep/ .el-calendar-table tr td:first-child,
/deep/ .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
/deep/ .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
/deep/ .el-calendar__header {
  display: none;
}
</style>