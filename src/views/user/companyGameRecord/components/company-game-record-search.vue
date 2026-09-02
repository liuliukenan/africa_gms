<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="公司ID">
                        <el-input  clearable  v-model.trim="form.companyId"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="玩家账号名">
                        <el-input  clearable  v-model.trim="form.memberAccount"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <!-- <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏ID">
                        <el-input  clearable  v-model.trim="form.gameUid"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.countryCode.name')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyGameRecord.timeArr')">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyGameRecord.table.uid')">
            <el-input clearable v-model.trim="form.uid" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
         <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyGameRecord.table.phone')">
            <el-input clearable v-model.trim="form.phone" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyGameRecord.table.gameId')">
            <el-input clearable v-model.trim="form.gameId" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyGameRecord.table.factoryCode')">
            <el-input clearable v-model.trim="form.factoryCode" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyGameRecord.table.gameName')">
            <el-input clearable v-model="form.gameName" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyGameRecord.table.serialNumber')">
            <el-input clearable v-model.trim="form.serialNumber" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.companyGameRecord.table.gameRound')">
            <el-input clearable v-model.trim="form.gameRound" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>

        <el-col :lg="5" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">{{ t('action.search') }}</el-button>
            <el-button @click="reset">{{ t('action.reset') }}</el-button>
            <el-link type="primary" :underline="false" @click="toggleExpand" style="margin-left: 12px">
              <template v-if="searchExpand">
                <span>{{ t('action.collapse') }}</span>
                <el-icon style="vertical-align: -1px">
                  <ArrowUp />
                </el-icon>
              </template>
              <template v-else>
                <span>{{ t('action.expand') }}</span>
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
  import type { CompanyGameRecordParam } from '@/api/user/model/companyGameRecord.ts';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const emit = defineEmits<{
      (e: 'search', where?: CompanyGameRecordParam): void;
  }>();
  const configStore = useConfigStore();
  /** 表单数据 */
  const [form, resetFields] = useFormData<CompanyGameRecordParam>({
      id: undefined,
      uid: undefined,
      countryCode: 254,
      channel: undefined,
      agentId: undefined,
      companyId: undefined,
      factoryCode: undefined,
      gameGroupId: undefined,
      gameId: undefined,
      gameName: undefined,
      gameRound: undefined,
      serialNumber: undefined,
      phone: undefined,
      betAmount: undefined,
      winAmount: undefined,
      cashBet: undefined,
      categoryBet: undefined,
      gameBet: undefined,
      cashWin: undefined,
      categoryWin: undefined,
      gameWin: undefined,
      triggerSpinType: undefined,
      triggerOrderNo: undefined,
      calcFlow: undefined,
      recordTime: undefined,
      startDate: undefined,
      endDate: undefined
  });

  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];

  let timeArr = ref<[string, string] | undefined>([
    dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ]);
  /** 搜索表单是否展开 */
  const searchExpand = ref(false);
  /* 搜索 */
  const search = () => {
      const [startDay, endDay] = timeArr.value || [];
      // if (startDay && endDay) {
      //     const start = dayjs(startDay);
      //     const end = dayjs(endDay);
      //     const diffDays = end.diff(start, 'day');
      //     if (diffDays > 30) {
      //         ElMessage.warning(t('user.companyGameRecord.maxTimeSpanWarning'));
      //         timeArr.value = undefined;
      //         return;
      //     }
      // }
      emit('search', { ...form, startDate: startDay, endDate: endDay });
  }

  /**  重置 */
  const reset = () => {
      resetFields();
      timeArr.value = [
        dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      ];
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
      searchParams,
  });
</script>
