<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <agent-user-profile-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '代理用户列表', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      -->
      </ele-pro-table>
    </ele-card>
    <agent-user-profile-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import AgentUserProfileSearch from './components/agent-user-profile-search.vue';
  import AgentUserProfileEdit from './components/agent-user-profile-edit.vue';
  import { pageAgentUserProfiles, removeAgentUserProfile } from '@/api/agent/agentUserProfileApi';
  import type { AgentUserProfile, AgentUserProfileParam } from '@/api/agent/model/agentUserProfile';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';
  import { addSecret } from '@/utils/common';
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof AgentUserProfileSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'uid',
      label: '玩家ID',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'countryCode',
      label: '国家代码',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'phone',
      label: '手机号',
      minWidth: 110,
      align: 'left',
      formatter: (row) => addSecret(row.phone)
    },
    {
      prop: 'inviterAgentId',
      label: '上级代理ID',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'inviterAgentType',
      label: '上级代理类型',
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
      minWidth: 110,
      align: 'left'
    },

    {
      prop: 'channelName',
      label: '渠道',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'createTime',
      label: '玩家注册时间',
      formatter: (row) => toDateZone(row.createTime, row.countryCode),
      minWidth: 110,
      align: 'left'
    }
    // {
    //   prop: 'totalContribution',
    //   label: '贡献',
    //   minWidth: 110,
    //   align: 'left'
    // },
    // {
    //   columnKey: 'action',
    //   label: '操作',
    //   width: 200,
    //   align: 'center',
    //   slot: 'action',
    //   hideInPrint: true,
    //   hideInExport: true
    // }
  ]);

  /** 表格选中数据 */
  const selections = ref<AgentUserProfile[]>([]);

  /** 当前编辑数据 */
  const current = ref<AgentUserProfile | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);
  const configStore = useConfigStore();
  const defaultWhere = reactive<AgentUserProfileParam>({
    countryCode: configStore.countryArr?.[0]?.code || ''
  });

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAgentUserProfiles({
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

  /** 删除单个 */
  const remove = (row: AgentUserProfile) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeAgentUserProfile(row.id)
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
    return pageAgentUserProfiles({
      ...where,
      ...orders
    });
  };
</script>
