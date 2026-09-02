<template>
  <el-form :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }" :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }">
    <el-row :gutter="8">
      <el-col :xl="4" :lg="8" :md="12" :sm="24" :xs="24">
        <el-form-item label="uid">
          <el-input-number v-model="form.uid" :controls="false" placeholder="请输入uid" clearable style="width: 100%"
            class="ele-fluid custom-input-number" @keyup.enter.native="search" @blur="getSearchParams" />
        </el-form-item>
      </el-col>
      <el-col :xl="5" :lg="5" :md="12" :sm="24" :xs="12">
        <el-form-item label="日期">
          <el-date-picker v-model="form.tableName" value-format="YYYY-MM" type="month" placeholder="请选择日期"
            @change="onMonthChange" @focus="onFocusMonth" clearable style="width: 100%" @keyup.enter.native="search" />
        </el-form-item>
      </el-col>
      <el-col :xl="5" :lg="8" :md="12" :sm="24" :xs="24">
        <el-form-item label="具体范围">
          <el-date-picker v-model="timeArr" type="daterange" range-separator="至" start-placeholder="开始"
            @change="getSearchParams" :value-format="'YYYY-MM-DD'" end-placeholder="结束" :disabled-date="disabledDate" />
        </el-form-item>
      </el-col>
      <el-col v-show="searchExpand" :xl="5" :lg="8" :md="12" :sm="24" :xs="24">
        <el-form-item label="场次">
          <el-input-number v-model="form.limitTag" :controls="false" placeholder="请输入场次" clearable style="width: 100%"
            class="ele-fluid custom-input-number" @keyup.enter.native="search" @blur="getSearchParams" />
        </el-form-item>
      </el-col>
      <el-col v-show="searchExpand" :xl="5" :lg="8" :md="12" :sm="24" :xs="24">
        <el-form-item label="游戏类型">
          <dict-data code="serverType" valueType="number" placeholder="请选择游戏类型" v-model="form.sid" clearable
            @blur="getSearchParams" @keyup.enter.native="search" />
        </el-form-item>
      </el-col>
      <el-col v-show="searchExpand" :xl="5" :lg="8" :md="12" :sm="24" :xs="24">
        <el-form-item label="金币变化类型">
          <dict-data code="moneySourceType" valueType="number" placeholder="请选择金币变化类型" v-model="form.type" clearable
            @blur="getSearchParams" @keyup.enter.native="search" />
        </el-form-item>
      </el-col>
      <el-col v-show="searchExpand" :xl="5" :lg="8" :md="12" :sm="24" :xs="24">
        <el-form-item label="游戏ID">
          <!-- <el-select v-model="form.gameId" placeholder="请选择游戏名称" clearable style="width: 100%" @change="getSearchParams"
            @keyup.enter.native="search">
            <el-option v-for="item in gameArr" :key="item.gameId" :label="item?.name" :value="item?.gameId">
            </el-option>
          </el-select> -->
          <el-input-number v-model="form.gameId" :controls="false" placeholder="请输入游戏ID" clearable style="width: 100%"
            @blur="getSearchParams" @keyup.enter.native="search" />
        </el-form-item>
      </el-col>
      <el-col v-show="searchExpand" :xl="5" :lg="8" :md="12" :sm="24" :xs="24">
        <el-form-item label="关联ID">
          <el-input-number v-model="form.refer" :controls="false" placeholder="请输入关联ID" clearable style="width: 100%"
            @blur="getSearchParams" @keyup.enter.native="search" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="8" :md="12" :sm="24" :xs="24">
        <el-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
            <template v-if="searchExpand">
              <span>收起</span>
              <el-icon style="vertical-align: -1px">
                <ArrowUp />
              </el-icon>
            </template>
            <template v-else>
              <span>展开</span>
              <el-icon style="vertical-align: -2px">
                <ArrowDown />
              </el-icon>
            </template>
          </el-link>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { pageSlotsGameConfigs } from '@/api/slots/slotsGameConfigApi';
import { useFormData } from '@/utils/use-form-data';
import dayjs from 'dayjs';
import { ref } from 'vue';
const emit = defineEmits(['search', 'blurWhere']);
// 表单数据
const { form, resetFields } = useFormData({
  uid: undefined,
  type: undefined,
  limitTag: undefined,
  sid: undefined,
  refer: undefined,
  startDay: dayjs().startOf('month').format('YYYY-MM-DD'),
  endDay: dayjs().endOf('month').format('YYYY-MM-DD'),
  tableName: dayjs().format('YYYY-MM'),
  gameName: "",
  gameId: undefined,
});
// const gameArr = ref<{ name: string; gameId: number }[]>([]);
// const gameList = () => {
//   pageSlotsGameConfigs().then(res => {
//     if (Array.isArray(res)) {
//       gameArr.value = res?.map((v: { name: string; gameId: number }) => {
//         return { name: v.name, gameId: v.gameId };
//       });
//     }
//   });
// };
// gameList();
const getSearchParams = () => {
  // emit('blurWhere', { ...form });
  search()

}
let timeArr = ref<[string, string]>([dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().endOf('month').format('YYYY-MM-DD')]);

// 处理月份选择
const onMonthChange = (value: string) => {
  const startDate = dayjs(value).startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs(value).endOf('month').format('YYYY-MM-DD');
  timeArr.value = [startDate, endDate]; // 设置日期范围
  getSearchParams()
};

// 禁用不可选日期（防止选择不在当前月的日期）
const disabledDate = (date: Date) => {
  const selectedMonth = dayjs(form.tableName, 'YYYY-MM'); // 获取选中的月份
  return !dayjs(date).isSame(selectedMonth, 'month'); // 禁用不属于该月的日期
};

// 当日期选择框获得焦点时，确保默认显示选中月份的日历
const onFocusMonth = () => {
  if (form.tableName) {
    // 如果已经选择了月份，设置日期选择器默认显示该月份
    const selectedMonth = dayjs(form.tableName, 'YYYY-MM');
    timeArr.value = [selectedMonth.startOf('month').format('YYYY-MM-DD'), selectedMonth.endOf('month').format('YYYY-MM-DD')];
  }
};

/* 搜索 */
const search = () => {
  if (timeArr.value && timeArr.value[0] && timeArr.value[1]) {
    form.startDay = dayjs(timeArr.value[0]).format("YYYYMMDD");
    form.endDay = dayjs(timeArr.value[1]).format("YYYYMMDD");
  } else {
    form.startDay =''
    form.endDay = ''
  }
  let params = { ...form }
  params.tableName = dayjs(params.tableName).format("YYYYMM");
  emit('search', params);
};
const searchExpand = ref(false);
/** 搜索展开/收起 */
const toggleExpand = () => {
  searchExpand.value = !searchExpand.value;
};
/* 重置 */
const reset = () => {
  resetFields();
  timeArr.value = ['', ''];
  search();
};
</script>
