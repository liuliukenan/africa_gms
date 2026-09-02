<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <AgentSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :header-ellipsis="false" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: t('agentApplyRecords.exportFileName'), datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-popconfirm :title="t('agentApplyRecords.sureExport')" @confirm="openExport()">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #status="{ row }">
          <el-tag :type="getColor(row.status)">{{ getStatus(row.status) }}</el-tag>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openAudit(row)" v-if="row.status === 0">{{ t('action.audit') }}</el-link>
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
  import { PlusOutlined, UploadOutlined } from '@/components/icons';
  import AgentSearch from './components/agent-search.vue';
  //   import AgentUserProfileEdit from './components/agent-user-profile-edit.vue';
  import AgentAudit from './components/agent-audit.vue';
  import { pageApplyRecords, exportApplyRecords } from '@/api/agent/applyRecordsApi';
  import type { AgentUserProfile, AgentUserProfileParam } from '@/api/agent/model/agentUserProfile';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

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
        return t('agentApplyRecords.status0');
      case 1:
        return t('agentApplyRecords.status1');
      case 2:
        return t('agentApplyRecords.status2');
      default:
        return '';
    }
  };
  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'uid',
      label: t('agentApplyRecords.table.agentId'),
      minWidth: 90,
      align: 'left'
    },
    {
      prop: 'countryCode',
      label: t('agentApplyRecords.table.countryCode'),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'phone',
      label: t('agentApplyRecords.table.phone'),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'channel',
      label: t('agentApplyRecords.table.channel'),
      minWidth: 110,
      formatter: (row) => {
        return configStore.ShareChannelArr.find((item) => item.channel == row.channel)?.channelName || '';
      },
      align: 'left'
    },
    {
      prop: 'whatsApp',
      label: t('agentApplyRecords.table.whatsApp'),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'inviterAgentId',
      label: t('agentApplyRecords.table.inviterAgentId'),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'inviterAgentType',
      label: t('agentApplyRecords.table.inviterAgentType'),
      formatter: (row) => {
        switch (row.inviterAgentType) {
          case 1:
            return t('agentApplyRecords.agentType1');
          case 2:
            return t('agentApplyRecords.agentType2');
          default:
            return t('agentApplyRecords.agentTypeNone');
        }
      },
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'createTime',
      label: t('agentApplyRecords.table.createTime'),
      formatter: (row) => toDateZone(row.createTime, row.countryCode),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'status',
      slot: 'status',
      label: t('agentApplyRecords.table.status'),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'agentLevel',
      label: t('agentApplyRecords.table.agentLevel'),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'commissionModel',
      label: t('agentApplyRecords.table.commissionModel'),
      formatter: (row) => {
        switch (row.commissionModel) {
          case 0:
            return t('agentApplyRecords.commissionModel0');
          case 1:
            return t('agentApplyRecords.commissionModel1');
          case 2:
            return t('agentApplyRecords.commissionModel2');
          case 3:
            return t('agentApplyRecords.commissionModel3');
          default:
            return '';
        }
      },
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'createType',
      label: t('agentApplyRecords.table.createType'),
      formatter: (row) => {
        switch (row.createType) {
          case 0:
            return t('agentApplyRecords.createType0');
          case 1:
            return t('agentApplyRecords.createType1');
          default:
            return '';
        }
      },
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'handleRemark',
      label: t('agentApplyRecords.table.handleRemark'),
      minWidth: 110,
      align: 'left'
    },
    {
      columnKey: 'action',
      label: t('action.action'),
      width: 120,
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
    queryType: 0 //申请审核
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
    ElMessageBox.confirm(t('common.sureDel', [row.id]), t('common.tips'), { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: t('common.loading'),
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
      .catch(() => {});
  };

  /** 导出按钮点击 */
  const openExport = () => {
    exportApplyRecords({ ...searchRef.value!.searchParams() }, 'agent-apply-records').then((res) => {
      EleMessage.success(res);
    });
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageApplyRecords({
      ...where,
      ...orders
    });
  };
</script>
