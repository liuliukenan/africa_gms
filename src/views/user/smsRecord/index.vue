<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <sms-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :headerEllipsis="false" :columns="columns" :max-height="650"  :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="SmsRecord">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { EleMessage, type EleProTable } from 'ele-admin-plus';
  import { UploadOutlined } from '@/components/icons';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import SmsRecordSearch from './components/sms-record-search.vue';
  import { pageSmsRecords, exportSmsRecords } from '@/api/user/smsRecordApi';
  import type { SmsRecord, SmsRecordParam } from '@/api/model/smsRecord';
  import { toDateString } from '@/utils/utils';
  import { addSecret } from '@/utils/common';
  import dayjs from 'dayjs';
  import { useConfigStore } from '@/store/modules/config';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const configStore = useConfigStore();
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof SmsRecordSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: t('user.smsRecord.table.id'),
      width: 70,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'senderName',
      label: t('user.smsRecord.table.senderName'),
      // minWidth: 110,
      align: 'center'
    },

    {
      prop: 'fullPhone',
      label: t('user.smsRecord.table.fullPhone'),
      // minWidth: 110,
      formatter: (row) => addSecret(row.fullPhone),
      align: 'center'
    },
    {
      prop: 'code',
      label: t('user.smsRecord.table.code'),
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'type',
      label: t('user.smsRecord.table.type'),
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'status',
      label: t('user.smsRecord.table.status'),
      // minWidth: 110,
      align: 'center',
      formatter: (row) => (row.status ? t('user.smsRecord.statusSuccess') : t('user.smsRecord.statusFail'))
    },
    {
      label: t('user.smsRecord.table.createTime'),
      prop: 'createTime',
      align: 'center',
      // minWidth: 110,
      formatter: (row) => toDateString(row.createTime)
    },
    {
      prop: 'message',
      label: t('user.smsRecord.table.message'),
      minWidth: 310,
      align: 'left'
    }
  ]);
  /** 表格选中数据 */
  const selections = ref<SmsRecord[]>([]);

  // /** 当前编辑数据 */
  // const current = ref<SmsRecord | null>(null);
  //
  // /** 是否显示编辑弹窗 */
  // const showEdit = ref(false);
  const defaultWhere = reactive<SmsRecordParam>({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  });
  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageSmsRecords({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: SmsRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 导出（异步任务模式） */
  const openExport = () => {
    exportSmsRecords({ ...searchRef.value!.searchParams() }, 'DXJL').then((res) => {
      EleMessage.success(res);
    });
  };
</script>
<script lang="ts">
  export default {
    name: 'SmsRecord'
  };
</script>
