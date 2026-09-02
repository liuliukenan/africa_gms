<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('platform.countryCode.name')">
            <el-select v-model="form.countryCode" :placeholder="t('common.placeholder.select')" style="width: 100%" @change="search">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="7" :md="7" :sm="12" :xs="24">
          <el-form-item :label="t('user.userWalletRecord.timeArr')">
            <el-date-picker v-model="timeArr" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="search" :range-separator="t('common.time.to')" :start-placeholder="t('common.time.start')" :end-placeholder="t('common.time.end')" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userWalletRecord.table.uid')">
            <el-input clearable v-model.trim="form.uid" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userWalletRecord.table.phone')">
            <el-input clearable v-model.trim="form.phone" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
        <!-- <el-col   :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="uuid">
                        <el-input  clearable  v-model.trim="form.uuid"  placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item :label="t('user.userWalletRecord.table.type')">
            <!-- <el-input clearable v-model.trim="form.type" placeholder="请输入" /> -->
            <dict-data code="money_source" v-model="form.type" valueType="number" filterable/>
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="游戏ID">
            <el-input clearable v-model.trim="form.gameId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
          <el-form-item label="钱包ID">
            <el-input clearable v-model.trim="form.walletId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!--
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="钱包名称">
                        <el-input  clearable  v-model.trim="form.walletName"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="公司ID">
                        <el-input  clearable  v-model.trim="form.companyId"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏分组">
                        <el-input  clearable  v-model.trim="form.gameGroupId"  placeholder="请输入" />
                    </el-form-item>
                </el-col>
              
                <el-col  v-show="searchExpand" :lg="6" :md="6" :sm="12" :xs="24">
                    <el-form-item label="游戏名称">
                        <el-input  clearable  v-model.trim="form.gameName"  placeholder="请输入" />
                    </el-form-item>
                </el-col>-->
        <el-col :lg="5" :md="5" :sm="12" :xs="24">
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
  import type { UserWalletRecordParam } from '@/api/user/model/userWalletRecord';
  import dayjs from 'dayjs';
  import { useConfigStore } from '@/store/modules/config';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const configStore = useConfigStore();
  const emit = defineEmits<{
    (e: 'search', where?: UserWalletRecordParam): void;
  }>();
  /** 表单数据 */
  const [form, resetFields] = useFormData<UserWalletRecordParam>({
    id: undefined,
    uid: undefined,
    uuid: undefined,
    type: undefined,
    walletId: undefined,
    walletName: '',
    companyId: undefined,
    gameGroupId: undefined,
    gameId: undefined,
    startDate: undefined,
    endDate: undefined,
    phone: undefined,
    gameName: '',
    orderNo: '',
    countryCode: 254,
    extInfo: undefined
  });

  /** 搜索表单是否展开 */
  const searchExpand = ref(false);

  /** 日期时间选择器默认时间 */
  const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];

  let timeArr = ref<[string, string] | undefined>([
    dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ]);

  /* 搜索 */
  const search = () => {
    const [startDay, endDay] = timeArr.value || [];
    emit('search', { ...form, startDate: startDay, endDate: endDay });
  };

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
    searchParams
  });
</script>
