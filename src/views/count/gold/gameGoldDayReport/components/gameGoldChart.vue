<template>
  <ele-modal width="80%" v-model="visible" title="指定游戏每分钟的数据" :body-style="{ paddingBottom: '5px' }" @open="handleOpen"
    position="center">
    <el-form ref="formRef" :model="defaultWhere">
      <el-row>
        <el-col :md="4" :xs="12">
          <el-form-item label="游戏ID:">{{ props.data.gameId }}</el-form-item>
        </el-col>
        <el-col :md="6" :xs="12">
          <el-form-item label="游戏名称:">{{ props.data.gameName }}</el-form-item>
        </el-col>
        <el-col :md="6" :xs="12">
          <el-form-item label="日期:">
            <el-date-picker v-model="timeArr" type="daterange" placeholder="开始日期" value-format="YYYYMMDD"
              :clearable="false" style="width: 100%" @change="changeTime"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <v-chart v-if="curData && curData.length" ref="visitHourChartRef" :option="visitHourChartOption"
      style="height: 362px;width: 100%;" />
    <div class="empty-img" v-else>
      <el-empty :image-size="200" />
    </div>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { useEcharts } from '@/utils/use-echarts';
import type { GameGoldDayReportsEcharts } from '@/api/count/model';
import { gameGoldDayReportEcharts } from '@/api/count/gameGoldDayReport';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { EleMessage } from 'ele-admin-plus';

const props = defineProps<{
  // 修改回显的数据
  data?: any | null;
}>();
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent]);
const timeArr = ref<[string, string]>([dayjs().subtract(3, 'day').format('YYYYMMDD'), dayjs().format('YYYYMMDD')]);
const changeTime = (val: any) => {
  if (val[0] && val[1]) {
    const startDate = dayjs(val[0]);
    const endDate = dayjs(val[1]);

    // 计算时间差（天数）
    const diffInDays = endDate.diff(startDate, 'day');

    if (diffInDays > 3) {
      ElMessage.error('所选的时间范围不能超过3天');
      // 清空时间范围
      timeArr.value = ['', ''];
      return;
    }
    defaultWhere.startDay = startDate.format('YYYYMMDD');
    defaultWhere.endDay = endDate.format('YYYYMMDD');
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    getDataList();
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const visitHourChartRef = ref<InstanceType<typeof VChart> | null>(null);

useEcharts([visitHourChartRef]);

// 最近 1 小时访问情况折线图配置
const visitHourChartOption = reactive({});

/* 获取最近 1 小时访问情况数据 */
const writeChart = (data: GameGoldDayReportsEcharts[]) => {
  Object.assign(visitHourChartOption, {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['所有', '低级场', '中级场', '高级场', '黑名单'],
      right: 20
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      // top:'50%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.map((d) => d?.time)
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '所有',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          opacity: 0.5
        },
        data: data.map((d) => d.rtp)
      },
      {
        name: '低级场',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          opacity: 0.5
        },
        data: data.map((d) => d.rtp0)
      },
      {
        name: '中级场',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          opacity: 0.5
        },
        data: data.map((d) => d.rtp1)
      },
      {
        name: '高级场',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          opacity: 0.5
        },
        data: data.map((d) => d.rtp2)
      },
      {
        name: '黑名单',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          opacity: 0.5
        },
        data: data.map((d) => d.rtp3)
      }
    ]
  });
};
const curData = ref<GameGoldDayReportsEcharts[]>([]);
const defaultWhere = reactive({
  gameId: 0,
  sid: 0,
  startDay: '',
  endDay: ''
});
/** 弹窗打开事件 */
const handleOpen = () => {
  defaultWhere.gameId = props.data?.gameId || 0;
  defaultWhere.sid = props.data?.sid || 0;
  (defaultWhere.startDay = dayjs().subtract(3, 'day').format('YYYYMMDD')), (defaultWhere.endDay = dayjs().format('YYYYMMDD')), getDataList();
 // 打开弹窗时延迟触发 resize
  setTimeout(() => {
    if (visitHourChartRef.value) {
      visitHourChartRef.value.resize();
    }
  }, 100);
};
const getDataList = async () => {
  let res = await gameGoldDayReportEcharts(defaultWhere);
  if (Array.isArray(res)) {
    curData.value = res;
    writeChart(res);
  }
};
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
</script>
<script lang="ts">
export default {
  name: 'gameGoldChart'
};
</script>
<style lang="scss">
.empty-img {
  width: 100%;
  margin: auto;
  padding: 20px 0;
  text-align: center;
}
</style>
