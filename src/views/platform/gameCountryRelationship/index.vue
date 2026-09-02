<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <game-country-relationship-search ref="searchRef" style="margin-bottom: -14px" @search="reload" :where="defaultWhere" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '国家与游戏关系配置表', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable" :where="defaultWhere">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
          <el-button type="success" @click="showImport = true">导入导出</el-button>
        </template>
        <template #state="{ row }">
          <dict-data code="gameConfState" v-model="row.state" valueType="number" type="tag" />
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <game-country-relationship-edit :data="current" v-model="showEdit" @done="reload" />
    <GameCountryRelationshipImport v-model="showImport" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import GameCountryRelationshipSearch from './components/game-country-relationship-search.vue';
  import GameCountryRelationshipEdit from './components/game-country-relationship-edit.vue';
  import { pageGameCountryRelationships, removeGameCountryRelationship, sendConfServer } from '@/api/platform/gameCountryRelationshipApi';
  import type { GameCountryRelationship, GameCountryRelationshipParam } from '@/api/platform/model/gameCountryRelationship';
  import { useConfigStore } from '@/store/modules/config'; // 导入store
  import GameCountryRelationshipImport from './components/game-country-relationship-import.vue';
  import { toDateString } from '@/utils/utils';
  // 初始化store
  const configStore = useConfigStore();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof GameCountryRelationshipSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'countryName',
      label: '国家',
      // width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'gameId',
      label: '游戏ID',
      minWidth: 110,
      sortable: true,
      align: 'left'
    },
    {
      prop: 'name',
      label: '名称',
      minWidth: 110,
      align: 'left'
    },
    // {
    //   prop: "hot",
    //   label: "是否火热",
    //   formatter: (row: GameCountryRelationship) => row.hot ? '是' : '否',
    //   minWidth: 110,
    //   align: 'left',
    // },
    // {
    //   prop: "hasNew",
    //   label: "是否新游戏",
    //   formatter: (row: GameCountryRelationship) => row.hasNew ? '是' : '否',
    //   minWidth: 110,
    //   align: 'left',
    // },
    {
      prop: 'sortNumber',
      label: '排序',
      minWidth: 110,
      sortable: true,
      align: 'left'
    },
    {
      prop: 'state',
      label: '状态',
      slot: 'state',
      minWidth: 110,
      align: 'left'
    },
    {
      label: '时间',
      prop: 'createTime',
      align: 'left',
      formatter: (row: GameCountryRelationship) => toDateString(row.createTime),
      minWidth: 110
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
  const selections = ref<GameCountryRelationship[]>([]);

  /** 当前编辑数据 */
  const current = ref<GameCountryRelationship | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);
  const showImport = ref(false);

  const defaultWhere = {
    countryCode: configStore.countryArr?.[0]?.code || ''
  };

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGameCountryRelationships({
      ...defaultWhere,
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: GameCountryRelationshipParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };
  /** 打开编辑弹窗 */
  const openEdit = (row?: GameCountryRelationship) => {
    current.value = row ?? null;
    showEdit.value = true;
  };
  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    sendConfServer()
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };
  /** 删除单个 */
  const remove = (row: GameCountryRelationship) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeGameCountryRelationship(row.id)
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
    return pageGameCountryRelationships({
      ...where,
      ...orders
    });
  };
</script>
