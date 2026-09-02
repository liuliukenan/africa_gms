<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <mail-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :headerEllipsis="false"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :max-height="650" 
        :export-config="{ fileName: '邮件列表', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="proMailRecord">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            {{ t('action.add') }}
          </el-button>
        </template>
      </ele-pro-table>
    </ele-card>
    <mail-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import MailSearch from './components/mail-search.vue';
import MailEdit from './components/mail-edit.vue';
import { PlusOutlined } from "@/components/icons";
import { pageMails } from '@/api/user/mailApi';
import type { Mail, MailParam } from '@/api/model/mail';
import { toDateString, toDateZone } from '@/utils/utils';
import { numTo100s } from '@/utils/common';
import { useConfigStore } from '@/store/modules/config';
import { GlobalMail } from '@/api/platform/model/globalMail';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof MailSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: 'id',
    label: t('user.mail.table.id'),
    width: 70,
    align: 'left',
    fixed: 'left'
  },
  {
    prop: 'fromUid',
    label: t('user.mail.table.fromUid'),
    // minWidth: 110,
    align: 'center'
  },
  {
    prop: 'toUid',
    label: t('user.mail.table.toUid'),
    // minWidth: 110,
    align: 'center'
  },
  {
    prop: 'title',
    label: t('user.mail.table.title'),
    minWidth: 100,
    align: 'left'
  },
  {
    prop: 'content',
    label: t('user.mail.table.content'),
    minWidth: 300,
    align: 'left'
  },
  {
    prop: 'amount',
    label: t('user.mail.table.amount'),
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'duty',
    label: t('user.mail.table.duty'),
    formatter: (row) => numTo100s(row.duty),
    // minWidth: 110,
    align: 'left'
  },
  {
    label: t('user.mail.table.createTime'),
    prop: 'createTime',
    align: 'left',
    formatter: (row) => {
      return toDateZone(row.createTime, row.countryCode);
    },
    minWidth: 100
  }
]);
/** 打开编辑弹窗 */
const openEdit = (row?: GlobalMail) => {
  current.value = row ?? null;
  showEdit.value = true;
};
/** 表格选中数据 */
const selections = ref<Mail[]>([]);

/** 当前编辑数据 */
const current = ref<Mail | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
// 初始化store
const configStore = useConfigStore();
// 默认搜索条件
const defaultWhere = reactive({
  countryCode: configStore.countryArr?.[0]?.code || '',
  startDate: dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageMails({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: MailParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageMails({
    ...where,
    ...orders
  });
};
</script>
<script lang="ts">
export default {
  name: 'Mail'
};
</script>
