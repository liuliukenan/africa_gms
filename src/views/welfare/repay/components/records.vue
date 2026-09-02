<template>
  <ele-page>
    <ele-card :body-style="{ padding: '0px' }">
      <records-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :header-ellipsis="false" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" :tools="['reload', 'columns', 'maximized']" cache-key="firstPayRecords">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <!-- 二级类型 -->
        <template #subType="{ row }">
          <dict-data code="act_sub_type" v-model="row.subType" type="tag" value-type="string" />
        </template>
        <template #goodsType="{ row }">
         <dict-data code="goods_type" v-model="row.goodsType" value-type="number" type="tag"  size="small"/>
        </template>
        <!-- 状态 -->
        <template #status="{ row }">
          <el-tag v-if="row.status === 0" type="success">{{ t('welfare.repay.statusNormal') }}</el-tag>
          <el-tag v-else-if="row.status === 1" type="danger">{{ t('welfare.repay.statusIpRisk') }}</el-tag>
          <el-tag v-else-if="row.status === 2" type="warning">{{ t('welfare.repay.statusDeviceRisk') }}</el-tag>
        </template>
        <!-- 补发标志 -->
        <template #compensation="{ row }">
          <el-tag v-if="row.compensation" type="success">{{ t('welfare.repay.statusYes') }}</el-tag>
          <el-tag v-else type="info">{{ t('welfare.repay.statusNo') }}</el-tag>
        </template>
        <!-- 注册时间 -->
        <template #regTime="{ row }">
          {{ toDateZone(row.regTime, row.countryCode) }}
        </template>
        <!-- 创建时间 -->
        <template #createTime="{ row }">
          {{ toDateZone(row.createTime, row.countryCode) }}
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { dayjs, ElMessage } from 'element-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { UploadOutlined } from '@/components/icons';
  import RecordsSearch from './records-search.vue';
  import { pageRepayRecord, exportRepayRecord } from '@/api/welfare/repayApi';
  import type { RepayRecordVO, RepayRecordParam } from '@/api/welfare/model/repay';
  import { useI18n } from 'vue-i18n';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  const searchRef = ref<InstanceType<typeof RecordsSearch> | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const columns = ref<Columns>([
    { prop: 'id', label: t('welfare.repay.table.id'), width: 80, fixed: 'left' },
    // { prop: 'subType', label: t('welfare.repay.table.subType'), minWidth: 140, slot: 'subType' },
    { prop: 'uid', label: t('welfare.repay.table.uid'), minWidth: 100 },
   // { prop: 'invitedUid', label: '被邀请人UID', minWidth: 130 },
    { prop: 'invitedPhone', label: t('welfare.repay.table.invitedPhone'), minWidth: 100 },
    { prop: 'regTime', label: t('welfare.repay.table.regTime'), minWidth: 100, slot: 'regTime' },
   // { prop: 'inviterId', label: '邀请人ID', minWidth: 100 },
    { prop: 'goodsType', label: t('welfare.repay.table.goodsType'),slot:"goodsType", minWidth: 100 },
    { prop: 'amount', label: t('welfare.repay.table.amount'), minWidth: 130, align: 'left' },
    { prop: 'flowMultiple', label: t('welfare.repay.table.flowMultiple'), minWidth: 90, align: 'left' },
    { prop: 'mailId', label: t('welfare.repay.table.mailId'), minWidth: 120 },
    { prop: 'status', label: t('welfare.repay.table.status'), minWidth: 110, slot: 'status' },
    { prop: 'riskReason', label: t('welfare.repay.table.riskReason'), minWidth: 140 },
    { prop: 'compensation', label: t('welfare.repay.table.compensation'), minWidth: 110, slot: 'compensation' },
    { prop: 'expire', label: t('welfare.repay.table.expire'), minWidth: 110 },
    // { prop: 'createTime', label: t('welfare.repay.table.createTime'), minWidth: 160, slot: 'createTime' }
  ]);

  const selections = ref<RepayRecordVO[]>([]);

  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageRepayRecord({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: RepayRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportRepayRecord({ ...searchRef.value!.searchParams() }, 'repayRecords').then((res) => {
      ElMessage.success(res);
    });
  };
</script>

<script lang="ts">
  export default { name: 'firstPayRecords' };
</script>
