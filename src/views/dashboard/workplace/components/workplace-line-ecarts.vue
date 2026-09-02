<template>
  <el-card style="width: 100%;height: 100%;" :bordered="false">
    <v-chart v-if="curData && curData.length" ref="visitHourChartRef" :option="visitHourChartOption"
      style="height: 200px" />
    <div class="empty-img" v-else>
      <el-empty :image-size="200" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { useEcharts } from '@/utils/use-echarts';
const props = defineProps<{
  // 修改回显的数据
  data: any[] | null,
  // rechargeTitle: string | null
}>();
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent]);

//
const visitHourChartRef = ref(null);

useEcharts([visitHourChartRef]);

// 最近 1 小时访问情况折线图配置
const visitHourChartOption = reactive({});

/* 获取最近 1 小时访问情况数据 */
const writeChart = (data: any[]) => {
  Object.assign(visitHourChartOption, {
    tooltip: {
      trigger: 'axis'
    },
    title: {
      text: '在线人数折线图',
      left: 'center'
    },
    legend: {
      data: ['在线人数'],
      right: 20
    },
    grid: {
      left: '3%',
      right: '0%',
      bottom: '0%',
      top: '20%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.map((d) => d.time),
        axisLabel: {
          rotate: 25, // 旋转标签45度
          interval: 0 // 显示所有标签，可以根据需要调整
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '在线人数',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: data.map((d) => d.num)
      },
      // {
      //   name: '总赢取',
      //   type: 'line',
      //   smooth: true,
      //   symbol: 'none',
      //   data: data.map((d) => d.totalWin)
      // }
    ]
  });
};
const curData = ref<any[]>([]);
watch(
  () => props.data,
  (data) => {
    if (Array.isArray(data)) {
      writeChart(data);
      curData.value = data
    } else {
      writeChart([]);
      curData.value = []
    }
  }
);
</script>
<script lang="ts">
export default {
  name: 'gameGoldChart'
};
</script>
<style lang="scss" scoped>
.empty-img {
  width: 100%;
  height: 100%;
  margin: auto;
  // padding: 20px 0; 
  text-align: center;

  img {
    width: 30%;
    // height: 100%;
  }
}

:deep(.el-empty) {
  margin: 0 !important;
  padding: 0 !important;
  --el-empty-description-margin-top: 0 !important;
}

:deep(.el-empty__image svg) {
  width: 83%;
}
</style>