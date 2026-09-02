<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <agent-profile-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '代理列表', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template> -->
        <template #status="{ row }">
          <el-tag :type="row.status ? 'danger' : 'success'">{{ row.status ? '关闭' : '开启' }}</el-tag>
        </template>
        <template #useVerification="{ row }">
          <el-tag :type="row.useVerification ? 'success' : 'danger'">{{ row.useVerification ? '开启' : '关闭' }}</el-tag>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <!-- <el-link type="danger" :underline="false" @click="updateStatus(row)"> 删除 </el-link> -->
          <el-link :type="row.status ? 'success' : 'danger'" :underline="false" @click="updateStatus(row)"> {{ row.status === 0 ? '禁用' : '启用' }} </el-link>
          <el-divider direction="vertical" />
          <el-link :type="row.useVerification ? 'danger' : 'success'" :underline="false" @click="updateGoogle(row)"> {{ row.useVerification === 1 ? '禁用Google' : '启用Google' }} </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="resetGoogle(row)"> 重置Google </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <agent-profile-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  // import { PlusOutlined } from '@/components/icons';
  import AgentProfileSearch from './components/agent-profile-search.vue';
  import AgentProfileEdit from './components/agent-profile-edit.vue';
  import { pageAgentProfiles, resetAgentGoogle, updateAgentStatus, updateAgentGoogle } from '@/api/agent/agentProfileApi';
  import type { AgentProfile, AgentProfileParam } from '@/api/agent/model/agentProfile';
  import { useConfigStore } from '@/store/modules/config';
  import { addSecret } from '@/utils/common';
  import { toDateZone } from '@/utils/utils';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof AgentProfileSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'agentId',
      label: '代理id',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'countryCode',
      label: '国家代码',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'channel',
      label: '渠道',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'phone',
      label: '手机号',
      // minWidth: 110,
      align: 'left',
      formatter: (row) => addSecret(row.phone)
    },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateZone(row.createTime, row.countryCode),
      align: 'left',
      minWidth: 110
    },
    {
      prop: 'agentLevel',
      label: '代理等级',
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'inviterAgentId',
      label: '父级代理ID',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'agentType',
      label: '代理类型',
      formatter: (row) => {
        return row.agentType === 1 ? '总代理' : '普通代理';
      },
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'commissionModel',
      label: '佣金模式',
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
            return 'Unknown';
        }
      },
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'status',
      slot: 'status',
      label: '状态',
      minWidth: 110,
      // formatter: (row) => {
      //   return row.status === 0 ? '启用' : '禁用';
      // },
      align: 'left'
    },
    {
      label: '谷歌验证码状态',
      prop: 'useVerification',
      slot: 'useVerification',
      minWidth: 110,
      align: 'center'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 200,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<AgentProfile[]>([]);

  /** 当前编辑数据 */
  const current = ref<AgentProfile | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);
  const configStore = useConfigStore();
  const defaultWhere = reactive<AgentProfileParam>({
    countryCode: configStore.countryArr?.[0]?.code || ''
  });

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAgentProfiles({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: AgentProfileParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: AgentProfile) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const updateStatus = (row: AgentProfile) => {
    let statusStr;
    statusStr = row.status === 0 ? '禁用' : '启用';
    ElMessageBox.confirm('确定要' + statusStr + '“' + row.agentId + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        updateAgentStatus({ agentId: row.agentId, status: row.status === 0 ? 1 : 0 })
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
  const resetGoogle = (row: AgentProfile) => {
    ElMessageBox.confirm('确定要重置 ' + row.agentId + ' 的谷歌验证码吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        resetAgentGoogle(row.agentId as number)
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
  //
  const updateGoogle = (row: AgentProfile) => {
    let statusStr;
    statusStr = row.useVerification === 1 ? '禁用' : '启用';
    ElMessageBox.confirm('确定要' + statusStr + '“' + row.agentId + '”的谷歌验证码吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        updateAgentGoogle({ agentId: row.agentId, useVerification: row.useVerification === 0 ? 1 : 0 })
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
    return pageAgentProfiles({
      ...where,
      ...orders
    });
  };
</script>
