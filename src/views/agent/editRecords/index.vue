<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <AgentSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '代理用户列表', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable" size="small" :ellipsis="false">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建代理 </el-button>
        </template> -->
        <template #status="{ row }">
          <el-tag :type="getColor(row.status)">{{ getStatus(row.status) }}</el-tag>
        </template>
        <template #action="{ row }">
          <!--  -->
          <el-link type="primary" :underline="false" @click="openAudit(row)" v-if="row.status === 0"> 审核 </el-link>
          <!-- <el-link type="primary" :underline="false" @click="openAudit(row)" > 修改 </el-link> -->
          <!-- <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link> -->
        </template>
      </ele-pro-table>
    </ele-card>
    <agent-audit :data="current" v-model="showAudit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
import AgentSearch from './components/agent-search.vue';
//   import AgentUserProfileEdit from './components/agent-user-profile-edit.vue';
import AgentAudit from './components/agent-audit.vue';
import { pageApplyRecords } from '@/api/agent/applyRecordsApi';
import type { AgentUserProfile, AgentUserProfileParam } from '@/api/agent/model/agentUserProfile';
import { toDateZone } from '@/utils/utils';
import { useConfigStore } from '@/store/modules/config';

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof AgentSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
const getColor = (status: number) => {
  switch (status) {
    case 0:
      return 'primary';
    case 1:
      return 'success';
    case 2:
      return 'danger';
    default:
      return 'info';
  }
};
const getStatus = (status: number) => {
  switch (status) {
    case 0:
      return '待审核';
    case 1:
      return '已通过';
    case 2:
      return '已拒绝';
    default:
      return '';
  }
};
/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: 'uid',
    label: '代理ID',
    // minWidth: 110,
    align: 'left'
  },
  // {
  //   prop: 'countryCode',
  //   label: '国家代码',
  //   // minWidth: 110,
  //   align: 'left'
  // },
  {
    prop: 'channel',
    label: '渠道',
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'agentType',
    label: '代理类型',
    formatter: (row) => {
      switch (row.inviterAgentType) {
        case 1:
          return '总代理';
        case 2:
          return '普通代理';
        default:
          return '无';
      }
    },
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'agentLevel',
    label: '代理等级',
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'oldCommissionModel',
    label: '现佣金模式',
    formatter: (row) => {
      switch (row.oldCommissionModel) {
        case 0:
          return 'CPA';
        case 1:
          return 'Revenue Share';
        case 2:
          return 'Hybrid';
        case 3:
          return 'Turnover';
        default:
          return '';
      }
    },
    minWidth: 110,
    align: 'left'
  },

  // {
  //   prop: 'phone',
  //   label: '手机号',
  //   minWidth: 110,
  //   align: 'left'
  // },
  // {
  //   prop: 'whatsApp',
  //   label: 'WhatsApp',
  //   minWidth: 110,
  //   align: 'left'
  // },
  {
    prop: 'inviterAgentId',
    label: '上级代理ID',
    // minWidth: 110,
    align: 'left'
  },
  // {
  //   prop: 'inviterAgentType',
  //   label: '上级代理类型',
  //   formatter: (row) => {
  //     switch (row.inviterAgentType) {
  //       case 1:
  //         return '总代理';
  //       case 2:
  //         return '普通代理';
  //       default:
  //         return '无';
  //     }
  //   },
  //   // minWidth: 110,
  //   align: 'left'
  // },
  {
    prop: 'createType',
    label: '创建方式',
    formatter: (row) => {
      switch (row.createType) {
        case 0:
          return 'GMS后台直接创建';
        case 1:
          return '代理自主申请';
        default:
          return '';
      }
    },
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'createTime',
    label: '申请时间',
    formatter: (row) => toDateZone(row.createTime, row.countryCode),
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'commissionModel',
    label: '申请新模式',
    formatter: (row) => {
      switch (row.commissionModel) {
        case 0:
          return 'CPA';
        case 1:
          return 'Revenue Share';
        case 2:
          return 'Hybrid';
        case 3:
          return 'Turnover';
        default:
          return '';
      }
    },
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'lastApplyCommissionModelTime',
    label: '上次申请修改佣金模式时间',
    formatter: (row) => toDateZone(row.lastApplyCommissionModelTime, row.countryCode),
    minWidth: 130,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    prop: 'lastUpdateTime',
    label: '上次更改时间',
    formatter: (row) => toDateZone(row.lastUpdateTime, row.countryCode),
    minWidth: 110,
    align: 'left'
  },
  {
    prop: 'status',
    slot: 'status',
    label: '状态',
    // minWidth: 110,
    align: 'left'
  },
  {
    prop: 'handleRemark',
    label: '审核备注',
    minWidth: 110,
    align: 'left'
  },
  {
    columnKey: 'action',
    label: '操作',
    width: 150,
    align: 'center',
    slot: 'action',
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<AgentUserProfile[]>([]);

/** 当前编辑数据 */
const current = ref<AgentUserProfile | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
const showAudit = ref(false);
const configStore = useConfigStore();
const defaultWhere = reactive<AgentUserProfileParam>({
  countryCode: configStore.countryArr?.[0]?.code || '',
  queryType: 1//申请审核
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageApplyRecords({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: AgentUserProfileParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: AgentUserProfile) => {
  current.value = row ?? null;
  showEdit.value = true;
};
const openAudit = (row?: AgentUserProfile) => {
  current.value = row ?? null;
  showAudit.value = true;
};

/** 删除单个 */
const remove = (row: AgentUserProfile) => {
  ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      // removeAgentUserProfile(row.id)
      //   .then((msg) => {
      //     loading.close();
      //     EleMessage.success(msg);
      //     reload();
      //   })
      //   .catch((e) => {
      //     loading.close();
      //     EleMessage.error(e.message);
      //   });
    })
    .catch(() => { });
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageApplyRecords({
    ...where,
    ...orders
  });
};
</script>
