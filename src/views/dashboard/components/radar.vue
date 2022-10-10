<template>
  <div ref="radar" class="radar-echart"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { RadarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";
// // 标签自动布局，全局过渡动画等特性
// import { LabelLayout, UniversalTransition } from "echarts/features";
// // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  RadarChart,
  LegendComponent,
  //   LabelLayout,
  //   UniversalTransition,
  CanvasRenderer,
]);

export default {
  mounted() {
    var myChart = echarts.init(this.$refs.radar);
    var option = {
      title: {
        text: "员工",
      },
      //   legend: {
      //     data: ["Allocated Budget", "Actual Spending"],
      //   },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: "工作效率", max: 6500 },
          { name: "考勤", max: 16000 },
          { name: "积极性", max: 30000 },
          { name: "帮助同事", max: 38000 },
          { name: "自主学习", max: 52000 },
          { name: "bug", max: 25000 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: "Allocated Budget",
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: "Actual Spending",
            },
          ],
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>

<style scoped>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>