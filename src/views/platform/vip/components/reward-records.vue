<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <reward-records-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :headerEllipsis="false" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="rewardRecords">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>

        <!-- 业务类型 -->
        <template #businessType="{ row }">
          <span>{{ getBusinessTypeLabel(row.businessType) }}</span>
        </template>

        <!-- 奖励物品类型 -->
        <template #goodsType="{ row }">
          <dict-data code="goods_type" v-model="row.goodsType" value-type="number" type="tag" />
        </template>
        <template #settlementTime="{ row }">
          <div>{{ toDateZone(row.settlementTime, row.countryCode) || '--' }}</div>
          <div>{{ toDateZone(row.expireTime, row.countryCode) || '--' }}</div>
          <div>{{ toDateZone(row.claimTime, row.countryCode) || '--' }}</div>
          <div>{{ toDateZone(row.createTime, row.countryCode) || '--' }}</div>
        </template>

        <!-- 领取状态 -->
        <template #claimStatus="{ row }">
          <el-tag :type="row.claimStatus === 1 ? 'success' : 'danger'" size="small">
            {{ row.claimStatus === 1 ? t('platform.vip.rewardRecords.claimStatus1') : t('platform.vip.rewardRecords.claimStatus0') }}
          </el-tag>
        </template>

        <!-- 奖励状态 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { dayjs, ElMessage } from 'element-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { UploadOutlined } from '@/components/icons';
  import RewardRecordsSearch from './reward-records-search.vue';
  import { pageVipRewardRecords, exportVipRewardRecords } from '@/api/platform/rewardRecordsApi';
  import type { VipRewardRecordVO, VipRewardRecordParam } from '@/api/platform/model/rewardRecords';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const searchRef = ref<InstanceType<typeof RewardRecordsSearch> | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const getBusinessTypeLabel = (type?: string) => {
    const map: Record<string, string> = {
      vipUpgrade: t('platform.vip.configEdit.vipUpgrade'),
      vipWeekly: t('platform.vip.configEdit.vipWeekly'),
      vipMonthly: t('platform.vip.configEdit.vipMonthly'),
      vipDailyRebate: t('platform.vip.configEdit.vipDailyRebate'),
      vipWeeklyLossRebate: t('platform.vip.configEdit.vipWeeklyLossRebate')
    };
    return map[type || ''] || type || '-';
  };

  const getStatusLabel = (status?: number) => {
    const map: Record<number, string> = {
      0: t('platform.vip.rewardRecords.status0'),
      1: t('platform.vip.rewardRecords.status1'),
      2: t('platform.vip.rewardRecords.status2'),
      3: t('platform.vip.rewardRecords.status3')
    };
    return map[status ?? -1] || '-';
  };

  const getStatusType = (status?: number) => {
    const map: Record<number, any> = {
      0: 'success',
      1: 'warning',
      2: 'danger',
      3: 'info'
    };
    return map[status ?? -1] || 'info';
  };

  const columns = ref<Columns>([
    // {
    //   prop: 'id',
    //   label: t('platform.vip.rewardRecords.id'),
    //   width: 80,
    //   fixed: 'left',
    //   align: 'center'
    // },
    // {
    //   prop: 'rewardConfigId',
    //   label: t('platform.vip.rewardRecords.rewardConfigId'),
    //   minWidth: 120,
    //   align: 'center'
    // },
    {
      prop: 'uid',
      label: t('platform.vip.rewardRecords.uid'),
      minWidth: 80,
      fixed: 'left',
      align: 'center'
    },
    {
      prop: 'countryCode',
      label: t('platform.vip.rewardRecords.countryCode'),
      minWidth: 90,
      align: 'center'
    },
    {
      prop: 'vipLevel',
      label: t('platform.vip.rewardRecords.vipLevel'),
      minWidth: 80,
      align: 'center'
    },
    {
      prop: 'businessType',
      label: t('platform.vip.rewardRecords.businessType'),
      minWidth: 110,
      align: 'center',
      slot: 'businessType'
    },
    {
      prop: 'totalRewards',
      label: t('platform.vip.rewardRecords.totalRewards'),
      minWidth: 100,
      align: 'center',
      children: [
        {
          prop: 'goodsId',
          label: t('platform.vip.rewardRecords.goodsId'),
          minWidth: 80,
          align: 'center'
        },
        {
          prop: 'goodsType',
          label: t('platform.vip.rewardRecords.goodsType'),
          minWidth: 80,
          align: 'center',
          slot: 'goodsType'
        },
        {
          prop: 'amount',
          label: t('platform.vip.rewardRecords.amount'),
          minWidth: 80,
          align: 'center'
        }
      ]
    },
    {
      prop: 'flowMultiple',
      label: t('platform.vip.rewardRecords.flowMultiple'),
      minWidth: 90,
      align: 'center'
    },
    {
      prop: 'businessId',
      label: t('platform.vip.rewardRecords.businessId'),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'periodKey',
      label: t('platform.vip.rewardRecords.periodKey'),
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'claimStatus',
      label: t('platform.vip.rewardRecords.claimStatus'),
      minWidth: 100,
      align: 'center',
      slot: 'claimStatus'
    },
    {
      prop: 'status',
      label: t('platform.vip.rewardRecords.status'),
      minWidth: 100,
      align: 'center',
      slot: 'status'
    },

    {
      prop: 'totalIP',
      label: t('platform.vip.rewardRecords.totalIP'),
      minWidth: 130,
      align: 'center',
      children: [
        {
          prop: 'ip',
          label: t('platform.vip.rewardRecords.ip'),
          minWidth: 110,
          align: 'center'
        },
        {
          prop: 'deviceId',
          label: t('platform.vip.rewardRecords.deviceId'),
          minWidth: 130,
          align: 'center'
        },
        {
          prop: 'riskReason',
          label: t('platform.vip.rewardRecords.riskReason'),
          minWidth: 120,
          align: 'center'
        }
      ]
    },

    {
      prop: 'settlementTime',
      slot: 'settlementTime',
      label: t('platform.vip.rewardRecords.settlementTime'),
      minWidth: 160,
      align: 'center'
      // formatter: (row) => toDateZone(row.settlementTime, row.countryCode)
    }
    // {
    //   prop: 'expireTime',
    //   label: t('platform.vip.rewardRecords.expireTime'),
    //   minWidth: 160,
    //   align: 'center',
    //   formatter: (row) => toDateZone(row.expireTime, row.countryCode)
    // },
    // {
    //   prop: 'claimTime',
    //   label: t('platform.vip.rewardRecords.claimTime'),
    //   minWidth: 160,
    //   align: 'center',
    //   formatter: (row) => toDateZone(row.claimTime, row.countryCode)
    // },
    // {
    //   prop: 'createTime',
    //   label: t('platform.vip.rewardRecords.createTime'),
    //   minWidth: 160,
    //   align: 'center',
    //   formatter: (row) => toDateZone(row.createTime, row.countryCode)
    // }
  ]);

  const selections = ref<VipRewardRecordVO[]>([]);

  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || ''
    // startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    // endDate: dayjs().format('YYYY-MM-DD')
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageVipRewardRecords({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: VipRewardRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportVipRewardRecords({ ...searchRef.value!.searchParams() }, 'VIP-reward-records').then((res) => {
      ElMessage.success(res);
    });
  };
</script>
