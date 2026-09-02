<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <agent-level-config-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" :header-ellipsis="false" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '代理等级配置', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <agent-level-config-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import AgentLevelConfigSearch from './components/agent-level-config-search.vue';
  import AgentLevelConfigEdit from './components/agent-level-config-edit.vue';
  import { pageAgentLevelConfigs, removeAgentLevelConfig, getCommissionConf } from '@/api/agent/agentLevelConfigApi';
  import type { AgentLevelConfig, AgentLevelConfigParam } from '@/api/agent/model/agentLevelConfig';
  import { toDateZone } from '@/utils/utils';
  import { AgentProfileParam } from '@/api/agent/model/agentProfile';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof AgentLevelConfigSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'ID',
      width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'agentType',
      label: '代理类型',
      minWidth: 100,
      align: 'left',
      formatter: (row) => {
        switch (row.agentType) {
          case 1:
            return '总代理';
          case 2:
            return '普通代理';
          default:
            return '无';
        }
      }
    },
    {
      prop: 'agentLevel',
      label: '代理等级',
      minWidth: 100,
      align: 'left'
    },
    {
      prop: 'commissionModel',
      label: '分润模式',
      minWidth: 130,
      align: 'left',
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
      }
    },
    {
      prop: 'rate',
      label: '分润比例',
      minWidth: 100,
      align: 'left'
    },
    {
      prop: 'upgradeConditionCount',
      label: '升级条件满足个数',
      minWidth: 130,
      align: 'left'
    },
    {
      prop: "cpaTotalPaidUserCount",
      label: "总付费人数阈值（仅普代直属下属）",
      minWidth: 130,
      align: 'left',
    },
    {
      prop: "cpaTotalRechargeAmount",
      label: "总充值金额阈值（仅普代直属下属）",
      minWidth: 130,
      align: 'left',
    },
    // {
    //   prop: "cpaCycleRechargeAmount",
    //   label: "周期内总充值金额阈值（仅普代直属下属）",
    //   minWidth: 130,
    //   align: 'left',
    // },
    // {
    //   prop: "cpaCycleNewPaidUserCount",
    //   label: "周期内新增付费用户阈值（仅普代直属下属）",
    //   minWidth: 130,
    //   align: 'left',
    // },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateZone(row.createTime, row.countryCode),
      align: 'left',
      minWidth: 110
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
  const selections = ref<AgentLevelConfig[]>([]);

  /** 当前编辑数据 */
  const current = ref<AgentLevelConfig | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  const defaultWhere = reactive<AgentProfileParam>({
    agentType: 2, //普通代理
    commissionModel: 0 //CPA
  });
  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAgentLevelConfigs({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: AgentLevelConfigParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: AgentLevelConfig) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: AgentLevelConfig) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeAgentLevelConfig(row.id)
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
      .catch(() => {});
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageAgentLevelConfigs({
      ...where,
      ...orders
    });
  };
</script>
