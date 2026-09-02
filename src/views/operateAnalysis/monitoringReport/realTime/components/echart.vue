<template>
  <div class="ele-body">
    <v-chart v-if="current && current.length" ref="onLineCountChartRef" :option="onLineCountData"
      style="height: 562px" />
    <div class="empty-img" v-else>
      <el-empty :image-size="200" />
    </div>

    <!-- </el-card> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { pageOnlineCounts } from "@/api/count/onlineCount";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { useEcharts } from "@/utils/use-echarts";
// import { toDateString } from "@/utils/utils";
import { EleMessage } from "ele-admin-plus/es";
import data from '@/utils/data.json'
const props = defineProps<{
  where: any;
}>();
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent]);

//
const onLineCountChartRef = ref(null);

useEcharts([onLineCountChartRef]);

const onLineCountData = reactive({});

/** 根据指标值获取名称 */
const getMetricName = (metric?: number) => {
  const map: Record<number, string> = {
    0: "在线人数",
    1: "充值次数",
    2: "充值金额",
    3: "提现次数",
    4: "提现金额",
    5: "cash下注次数",
    6: "cash下注金额",
    7: "cash返奖金额",
    8: "bonus下注次数",
    9: "bonus下注金额",
    10: "bonus返奖金额",
  };
  return map[metric ?? 0] ?? "在线人数";
};

/* 获取最近 1 小时访问情况数据 */
const writeChart = (data: any) => {
  const metricName = getMetricName(props.where?.metric);
  const todayName = `今日${metricName}`;
  const compareName = `对比日${metricName}`;
  Object.assign(onLineCountData, {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [todayName, compareName],
      right: 20,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data.map((d) => d.timePoint),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: todayName,
        type: "line",
        smooth: true,
        symbol: "none",
        // areaStyle: {
        //   opacity: 0.5,
        // },
        data: data.map((d) => d.currentValue),
      },
      {
        name: compareName,
        type: "line",
        smooth: true,
        symbol: "none",
        // areaStyle: {
        //   opacity: 0.5,
        // },
        data: data.map((d) => d.previousValue),
      },
    ],
  });
};

// 当前编辑数据
const current = ref<any>(null);

// 表格数据源
const getData = (where?: any) => {
  const loading = EleMessage.loading({
    message: "请求中..",
    plain: true,
  });
  pageOnlineCounts(where).then((res) => {
    if (res) {
      writeChart(res.list || []);
      current.value = res.list || [];
    }

  }).finally(() => loading.close());

  // writeChart(data);
  current.value = data;
};

watch(() => props.where, (nval, oval) => {
  getData(props.where);
}, {
  immediate: true
})
</script>

<script lang="ts">
export default {
  name: "realTime",
};
</script>
<style scoped lang="scss">
.ele-body {
  height: 1005;
}

.empty-img {
  width: 100%;
  padding: 20px 0;
  margin: auto;
  text-align: center;
}
</style>
