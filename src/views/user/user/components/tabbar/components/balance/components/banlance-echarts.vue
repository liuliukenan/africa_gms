<template>
    <ele-page>
        <!-- <el-form >
        <el-row :gutter="8">
          <el-col :xl="5" :lg="8" :md="12" :sm="12" :xs="24">
            <el-form-item class="ele-text-center" label="日期">
            <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始"
              :value-format="'YYYY-MM-DD'" end-placeholder="结束" />
            </el-form-item>
          </el-col>
          <el-col :xl="4" :lg="8" :md="12" :sm="12" :xs="24">
            <el-form-item class="ele-text-center" >
              <el-space>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="reset">重置</el-button>
              </el-space>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>-->
        <v-chart v-if="current && current.length" ref="onLineCountChartRef" :option="onLineCountData"
            style="height: 430px ;width: 100vw;" />
        <div class="empty-img" v-else>
            <el-empty :image-size="200" />
        </div>
    </ele-page>
</template>

<script setup>
import { reactive, ref } from "vue";

import { pageOnlineCounts } from "@/api/count/onlineCount";
import { useFormData } from "@/utils/use-form-data";
import dayjs from "dayjs";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { useEcharts } from "@/utils/use-echarts";
import { toDateString } from "@/utils/utils";
import { EleMessage } from "ele-admin-plus/es";
import data from '@/utils/data.json'
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent]);

//
const onLineCountChartRef = ref(null);

useEcharts([onLineCountChartRef]);

const onLineCountData = reactive({});

/* 获取最近 1 小时访问情况数据 */
const writeChart = (data) => {
    Object.assign(onLineCountData, {
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: ["余额"],
            // data: ["余额", "代理人数"],
            right: 20,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: data.map((d) => toDateString(d.createTime, "MM-DD HH:mm")),
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "余额",
                type: "line",
                smooth: true,
                symbol: "none",
                // areaStyle: {
                //     opacity: 0.5,
                // },
                data: data.map((d) => d.playerCount),
            },
            // {
            //     name: "代理人数",
            //     type: "line",
            //     smooth: true,
            //     symbol: "none",
            //     areaStyle: {
            //         opacity: 0.5,
            //     },
            //     data: data.map((d) => d.agentCount),
            // },
        ],
    });
};
let timeArr = ref([dayjs().add(-1, "day"), dayjs()]);

// 当前编辑数据
const current = ref(null);

// 表格数据源
const datasource = (where) => {
    // const loading = EleMessage.loading({
    //     message: "请求中..",
    //     plain: true,
    // });
    //   pageOnlineCounts(where).then((data) => {
    //     loading.close();
    //     writeChart(data);
    //     current.value = data;
    //   });
    writeChart(data);
    current.value = data;
};

/* 搜索 */
const search = () => {
    if (timeArr.value[0] && timeArr.value[1]) {
        form.startDate = dayjs(timeArr.value[0]).format("YYYYMMDD");
        form.endDate = dayjs(timeArr.value[1]).format("YYYYMMDD");
    }
    datasource(form);
};

// 表单数据
const { form, resetFields } = useFormData({
    id: null,
    uid: null,
    startDate: null,
    endDate: null,
});

const reset = () => {
    resetFields();
    timeArr.value = [dayjs().add(-1, "day"), dayjs()];
    search();
};

search();
</script>

<script>
export default {
    name: "OnlineCount",
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
