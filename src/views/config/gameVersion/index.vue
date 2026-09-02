<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <ele-pro-table ref="tableRef" row-key="id" :headerEllipsis="false" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '游戏版本号', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="proGameVersion">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()" v-permission="'config:gameVersion:add'"> 新建</el-button>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'config:gameVersion:edit'"> 修改</el-link>
          <el-divider direction="vertical" v-permission="'config:gameVersion:delete'"/>
          <el-link type="danger" :underline="false" @click="remove(row)" v-permission="'config:gameVersion:delete'"> 删除</el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <game-version-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';

  import GameVersionEdit from './components/game-version-edit.vue';
  import { pageGameVersions, removeGameVersion } from '@/api/config/gameVersionApi';
  import type { GameVersion, GameVersionParam } from '@/api/model/gameVersion';

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'ID',
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '基础域名',
      align: 'left'
    },
    {
      prop: 'clientType',
      label: '客户端类型',
      align: 'center',
      formatter: (row) => {
        if (row.clientType == 1) {
          return '客户端';
        } else {
          return 'WEB';
        }
      }
    },
    {
      prop: 'type',
      label: '测试类型',
      align: 'center',
      formatter: (row) => {
        if (row.type === 1) {
          return '测试';
        } else {
          return '正式';
        }
      }
    },
    {
      prop: 'state',
      label: '状态',
      align: 'center',
      formatter: (row) => {
        if (row.state === 1) {
          return '启用';
        } else {
          return '禁用';
        }
      }
    },
    {
      label: '时间',
      prop: 'createTime',
      align: 'center',
    },
    {
      prop: 'gameVerItem',
      label: '信息',
      align: 'left',
      minWidth: 120,
      formatter: (row) => {
        return JSON.stringify(row.gameVerItem);
      }
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
  const selections = ref<GameVersion[]>([]);

  /** 当前编辑数据 */
  const current = ref<GameVersion | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGameVersions({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: GameVersionParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: GameVersion) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: GameVersion) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeGameVersion(row.id)
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
    return pageGameVersions({
      ...where,
      ...orders
    });
  };
</script>
<script lang="ts">
export default {
  name: 'GameVersion'
};
</script>
