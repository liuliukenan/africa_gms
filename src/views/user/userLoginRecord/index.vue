<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-login-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :max-height="650" 
        :headerEllipsis="false" :footer-style="{ paddingBottom: '16px' }" cache-key="proUserLoginRecord"
        :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport()">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #clientType="{ row }">
          <dict-data code="DeviceType" v-model="row.clientType" type="tag" />
        </template>
        <template #apk="{ row }">
          <el-tag v-if="row.apk" type="success">{{ t('action.yes') }}</el-tag>
          <el-tag v-else type="danger">{{ t('action.no') }}</el-tag>
        </template>
        <template #action="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="handleClick(row)"> 关联IP</el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="handleClick(row)">关联设备</el-link> -->
          <!-- <el-divider direction="vertical" /> -->
          <!-- <el-link type="warning" :underline="false" @click="handleClick(row)">关联手机号</el-link> -->
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import UserLoginRecordSearch from './components/user-login-record-search.vue';
import { pageUserLoginRecords, exportUserLoginRecords } from '@/api/user/userLoginRecordApi';
import type { UserLoginRecordParam } from '@/api/model/userLoginRecord';
import { getTimeZone, toDateZone } from '@/utils/utils';
import { UploadOutlined } from '@/components/icons';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { useConfigStore } from '@/store/modules/config';
import { addSecret } from '@/utils/common';
const { t } = useI18n();
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserLoginRecordSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 表格选中数据 */
const selections = ref<any[]>([]);
/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: 'id',
    label: t('user.userLoginRecord.table.id'),
    width: 90,
    align: 'left',
    fixed: 'left'
  },
  {
    prop: 'uid',
    label: t('user.userLoginRecord.table.uid'),
    // minWidth: 110,
    align: 'left'
  },
  // {
  //   prop: 'username',
  //   label: '昵称',
  //   // minWidth: 110,
  //   align: 'left'
  // },
  {
    prop: 'ip',
    label: t('user.userLoginRecord.table.ip'),
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'countryCode',
    label: t('user.userLoginRecord.table.countryCode'),
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'channel',
    label: t('user.userLoginRecord.table.channel'),
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'agentId',
    label: t('user.userLoginRecord.table.agentId'),
    formatter: (row) => row.agentId ?? t('user.userLoginRecord.noAgent'),
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'phone',
    label: t('user.userLoginRecord.table.phone'),
    // minWidth: 110,
    align: 'left',
    formatter: (row) => addSecret(row.phone)
  },
  {
    prop: 'deviceId',
    label: t('user.userLoginRecord.table.deviceId'),
    minWidth: 150,
    align: 'left'
  },
  {
    prop: 'clientType',
    slot: 'clientType',
    label: t('user.userLoginRecord.table.clientType'),
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'apk',
    slot: 'apk',
    label: 'APK',
    // minWidth: 110,
    align: 'left'
  },
  // {
  //   prop: 'clientType',
  //   slot: 'clientType',
  //   label: '操作类型',
  //   // minWidth: 110,
  //   align: 'left'
  // },
  {
    // label: '记录时间',
    label: t('user.userLoginRecord.table.recordTime'),
    prop: 'recordTime',
    // minWidth: 110,
    align: 'left',
    formatter: (row) => toDateZone(row.recordTime, row.countryCode),
    // minWidth: 110
  },
  // {
  //   label: '注册时间',
  //   prop: 'regTime',
  //   align: 'left',
  //   formatter: (row) => {
  //     return toDateString(row.createTime);
  //   },
  //   // minWidth: 110
  // },
  // {
  //   columnKey: 'action',
  //   label: t('action.action'),
  //   width: 200,
  //   align: 'center',
  //   slot: 'action',
  //   hideInPrint: true,
  //   hideInExport: true
  // }
]);
  // 初始化store
const configStore = useConfigStore();
// 默认搜索条件
const defaultWhere = reactive({
  countryCode: configStore.countryArr?.[0]?.code || '',
  startDate: dayjs().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserLoginRecords({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserLoginRecordParam) => {
  tableRef.value?.reload?.({ page: 1, where });
};
const handleClick = (row) => {
  console.log(row);
};
// 导出
const openExport = () => {
  exportUserLoginRecords({ ...searchRef.value!.searchParams() }, 'DLJL').then((res) => {
    ElMessage.success(res);
  });
};
</script>
<script lang="ts">
export default {
  name: 'UserLoginRecord'
};
</script>
