<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <global-mail-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '全局邮件', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="onSendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #status="{ row }">
          <el-link :type="row.status == 1 ? 'success' : 'danger'">{{ row.status == 1 ? '启用' : '禁用' }}</el-link>
        </template>
        <template #action="{ row }">
          <div>
            <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
            <el-divider direction="vertical" />
            <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
            <el-divider direction="vertical" />
            <el-link type="warning" :underline="false" @click="openRecords(row)"> 领取记录 </el-link>
          </div>
          <div style="margin-top: 5px">
            <span v-if="row.type === 1">
              <el-link type="success" :underline="false" @click="openAssignUser(row)"> 指定用户 </el-link>
            </span>
          </div>
        </template>
      </ele-pro-table>
    </ele-card>
    <global-mail-edit :data="current" v-model="showEdit" @done="reload" />
    <global-mail-records :data="current" v-model="showRecords" @done="reload" />
    <global-mail-assign-user :data="current" v-model="showAssignUser" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
import GlobalMailSearch from './components/global-mail-search.vue';
import GlobalMailEdit from './components/global-mail-edit.vue';
import GlobalMailRecords from './components/global-mail-records.vue';
import GlobalMailAssignUser from './components/global-mail-assign-user.vue';
import { pageGlobalMails, removeGlobalMail, sendServer } from '@/api/platform/globalMailApi';
import type { GlobalMail, GlobalMailParam } from '@/api/platform/model/globalMail';
import { toDateString } from '@/utils/utils';
import { useConfigStore } from "@/store/modules/config"; // 导入store
// 初始化store
const configStore = useConfigStore();
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof GlobalMailSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: 'id',
    label: 'id',
    width: 60,
    align: 'left',
    fixed: 'left'
  },
  {
    prop: 'type',
    label: '类型',
    formatter: (row) => (row.type === 0 ? '所有人' : '提定人'),
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'countryCode',
    label: '指定国家',
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'title',
    label: '邮件主题',
    minWidth: 110,
    align: 'left'
  },
  // {
  //   prop: 'content',
  //   label: '内容',
  //   width: 110,
  //   showOverflowTooltip: true,
  //   align: 'left'
  // },
  {
    prop: 'fromName',
    label: '发件人名称',
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'status',
    slot: 'status',
    // formatter: (row) => (row.status === 1 ? '启用' : '禁用'),
    label: '状态',
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'amount',
    label: '数量',
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'flowMutl',
    label: '流水倍数',
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'startDate',
    label: '开始时间',
    formatter: (row) => toDateString(row.startDate),
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'endDate',
    label: '结束时间',
    formatter: (row) => toDateString(row.endDate),
    minWidth: 110,
    align: 'left'
  },
  // {
  //   label: '时间',
  //   prop: 'createTime',
  //   formatter: (row) => toDateString(row.createTime),
  //   align: 'left',
  //   minWidth: 110
  // },
  {
    columnKey: 'action',
    label: '操作',
    width: 200,
    align: 'left',
    slot: 'action',
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<GlobalMail[]>([]);

/** 当前编辑数据 */
const current = ref<GlobalMail | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
const showRecords = ref(false);
const showAssignUser = ref(false);
const defaultWhere = {
  countryCode: configStore.countryArr?.[0]?.code || ''
};
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageGlobalMails({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: GlobalMailParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

// 发送到服务器
const onSendServer = () => {
  const loading = EleMessage.loading({
    message: '请求中..',
    plain: true
  });
  sendServer()
    .then((msg) => {
      loading.close();
      EleMessage.success(msg);
    })
    .catch((e) => {
      loading.close();
      EleMessage.error(e.message);
    });
};

/** 打开编辑弹窗 */
const openEdit = (row?: GlobalMail) => {
  current.value = row ?? null;
  showEdit.value = true;
};
const openRecords = (row?: GlobalMail) => {
  current.value = row ?? null;
  showRecords.value = true;
};
const openAssignUser = (row?: GlobalMail) => {
  current.value = row ?? null;
  showAssignUser.value = true;
};

/** 删除单个 */
const remove = (row: GlobalMail) => {
  ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      removeGlobalMail(row.id)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          reload();
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    })
    .catch(() => { });
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageGlobalMails({
    ...where,
    ...orders
  });
};
</script>
