<template>
  <ele-page>
    <ele-card :body-style="{ padding: '0px' }">
      <records-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :header-ellipsis="false" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" :tools="['reload', 'columns', 'maximized']" cache-key="cashWheelRecords">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <!-- 奖励类型 -->
        <template #goodsType="{ row }">
          <dict-data code="goods_type" v-model="row.goodsType" value-type="number" type="tag" size="small" />
        </template>
        <template #channel="{ row }">
          <div>{{ configStore.ShareChannelArr.find((v) => v.channel === row.channel).channelName ?? '' }}</div>
        </template>
        <!-- 状态 -->
        <template #status="{ row }">
          <el-tag v-if="row.status === 0" type="success">{{ t('welfare.cashWheel.status0') }}</el-tag>
          <el-tag v-else-if="row.status === 3" type="warning">{{ t('welfare.cashWheel.status3') }}</el-tag>
          <el-tag v-else-if="row.status === 4" type="primary">{{ t('welfare.cashWheel.status4') }}</el-tag>
          <el-tag v-else-if="row.status === 5" type="danger">{{ t('welfare.cashWheel.status5') }}</el-tag>
        </template>
        <!-- 周期开始结束时间 -->
        <template #periodStartTime="{ row }">
          <div>{{ row.periodStartTime ? toDateZone(row.periodStartTime, row.countryCode) : '--' }}</div>
          <div>{{ row.periodEndTime ? toDateZone(row.periodEndTime, row.countryCode) : '--' }}</div>
        </template>

        <!-- 有效期结束 -->
        <template #validEndTime="{ row }">
          {{ row.validEndTime ? toDateZone(row.validEndTime, row.countryCode) : '--' }}
        </template>
        <!-- 领取时间 -->
        <!-- 创建时间 -->
        <template #createTime="{ row }">
          <div> {{ row.createTime ? toDateZone(row.createTime, row.countryCode) : '--' }}</div>
          <div> {{ row.claimTime ? toDateZone(row.claimTime, row.countryCode) : '--' }}</div>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { UploadOutlined } from '@/components/icons';
  import RecordsSearch from './records-search.vue';
  import { pageCashWheelRecord, exportCashWheelRecord } from '@/api/welfare/cashWheelApi';
  import type { CashWheelRecordVO, CashWheelRecordParam } from '@/api/welfare/model/cashWheel';
  import { useI18n } from 'vue-i18n';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const searchRef = ref<{ searchParams: () => CashWheelRecordParam } | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const columns = ref<Columns>([
    { prop: 'id', label: t('welfare.cashWheel.table.id'), width: 80, fixed: 'left', align: 'center' },
    { prop: 'uid', label: t('welfare.cashWheel.table.uid'), minWidth: 100, align: 'center' },
    { prop: 'phone', label: t('welfare.cashWheel.table.phone'), minWidth: 120, align: 'center' },
    { prop: 'countryCode', label: t('welfare.cashWheel.table.countryCode'), minWidth: 100, align: 'center' },
    { prop: 'channel', label: t('welfare.cashWheel.table.channel'), minWidth: 80, align: 'center', slot: 'channel' },
    { prop: 'agentId', label: t('welfare.cashWheel.table.agentId'), minWidth: 100, align: 'center' },
    { prop: 'periodId', label: t('welfare.cashWheel.table.periodId'), minWidth: 100, align: 'center' },
    { prop: 'periodStartTime', label: t('welfare.cashWheel.table.periodStartTime'), minWidth: 160, slot: 'periodStartTime', align: 'center' },
    // { prop: 'periodEndTime', label: t('welfare.cashWheel.table.periodEndTime'), minWidth: 160, slot: 'periodEndTime' },
    { prop: 'validEndTime', label: t('welfare.cashWheel.table.validEndTime'), minWidth: 160, slot: 'validEndTime', align: 'center' },
    { prop: 'round', label: t('welfare.cashWheel.table.round'), minWidth: 80, align: 'center' },
    { prop: 'drawConfigId', label: t('welfare.cashWheel.table.drawConfigId'), minWidth: 100, align: 'center' },
    { prop: 'usedDrawCount', label: t('welfare.cashWheel.table.usedDrawCount'), minWidth: 100, align: 'center' },
    { prop: 'availableDrawCount', label: t('welfare.cashWheel.table.availableDrawCount'), minWidth: 110, align: 'center' },
    { prop: 'finishRequiredDrawCount', label: t('welfare.cashWheel.table.finishRequiredDrawCount'), minWidth: 120, align: 'center' },
    { prop: 'baseAmount', label: t('welfare.cashWheel.table.baseAmount'), minWidth: 100, align: 'center' },
    { prop: 'currentAmount', label: t('welfare.cashWheel.table.currentAmount'), minWidth: 100, align: 'center' },
    { prop: 'goodsType', label: t('welfare.cashWheel.table.goodsType'), minWidth: 100, slot: 'goodsType', align: 'center' },
    { prop: 'flowMultiple', label: t('welfare.cashWheel.table.flowMultiple'), minWidth: 100, align: 'center' },
    { prop: 'status', label: t('welfare.cashWheel.table.status'), minWidth: 110, slot: 'status', align: 'center' },
    // { prop: 'claimTime', label: t('welfare.cashWheel.table.claimTime'), minWidth: 160, slot: 'claimTime' },
    { prop: 'createTime', label: t('welfare.cashWheel.table.createTime'), minWidth: 160, slot: 'createTime', align: 'center' }
    // { prop: 'updateTime', label: t('welfare.cashWheel.table.updateTime'), minWidth: 160, slot: 'updateTime' }
  ]);

  const selections = ref<CashWheelRecordVO[]>([]);

  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || ''
    // startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    // endDate: dayjs().format('YYYY-MM-DD')
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageCashWheelRecord({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: CashWheelRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportCashWheelRecord({ ...searchRef.value!.searchParams() }, 'cashWheelRecords').then((res) => {
      ElMessage.success(res);
    });
  };
</script>

<script lang="ts">
  export default { name: 'cashWheelRecords' };
</script>
