<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="国家">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="生成日期">
            <el-date-picker v-model="timeArr" type="daterange" :value-format="'YYYY-MM-DD'" @change="search" range-separator="至" start-placeholder="开始" end-placeholder="结束" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="用户ID">
            <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="公司ID">
                        <el-input clearable v-model.trim="form.companyId" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏分组ID">
                        <el-input clearable v-model.trim="form.gameGroupId" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏ID">
                    </el-form-item>
                </el-col> -->
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="流水类型">
            <dict-data code="pay_flow_type" v-model="form.flowType" valueType="number" multiple />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择" clearable>
              <el-option label="进行中" :value="0"></el-option>
              <el-option label="已完成" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
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
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ArrowDown, ArrowUp } from '@/components/icons';
  import { useFormData } from '@/utils/use-form-data';
  import type { UserFlowRecordParam } from '@/api/user/model/userFlowRecord';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config';

  const emit = defineEmits<{
    (e: 'search', where?: UserFlowRecordParam): void;
  }>();
  const configStore = useConfigStore();
  /** 表单数据 */
  const [form, resetFields] = useFormData<UserFlowRecordParam>({
    id: undefined,
    uid: undefined,
    companyId: undefined,
    gameGroupId: undefined,
    gameId: undefined,
    flowType: undefined,
    status: undefined,
    startDate: undefined,
    endDate: undefined,
    countryCode: 254,
    nickname: undefined
  });

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

  let timeArr = ref<[string, string]>([dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
  /* 搜索 */
  const search = () => {
    const [startDay, endDay] = timeArr.value || [];
    if (startDay && endDay) {
      const start = dayjs(startDay);
      const end = dayjs(endDay);
      const diffDays = end.diff(start, 'day');
      if (diffDays > 90) {
        ElMessage.warning('最大时间跨度不能超过90天');
        timeArr.value = ['', ''];
        return;
      }
    }
    emit('search', { ...form, startDate: startDay, endDate: endDay });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    timeArr.value = [dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
    search();
  };

  /** 搜索展开/收起 */
  const toggleExpand = () => {
    searchExpand.value = !searchExpand.value;
  };
  const searchParams = () => {
    const [startDate, endDate] = timeArr.value || [];
    return { ...form, startDate, endDate };
  };

  defineExpose({
    searchParams
  });
</script>
