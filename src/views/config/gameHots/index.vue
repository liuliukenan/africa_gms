<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <game-hots-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '搜索热门游戏配置', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
          <!-- 新增发送到服务器按钮 -->
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServerToReload()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon" v-permission="'config:userWinLimitConf:send'">
                <span>发送</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>

        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>

        <!-- 创建时间格式化模板 -->
        <template #createTime="{ row }">
          <span>{{ toDateString(row.createTime) }}</span>
        </template>

        <!-- 修改时间格式化模板 -->
        <template #updateTime="{ row }">
          <span>{{ toDateString(row.updateTime) }}</span>
        </template>
      </ele-pro-table>
    </ele-card>
    <game-hots-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElButton, ElDivider, ElMessageBox, ElPopconfirm } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import GameHotsSearch from './components/game-hots-search.vue';
  import GameHotsEdit from './components/game-hots-edit.vue';
  // 导入你的API方法
  import { pageGameHotss, removeGameHots, sendGameHotsToServer } from '@/api/config/hot/gameHotsApi'; // 假设你有这个API
  import type { GameHots, GameHotsParam } from '@/api/config/model/gameHots';
  import { toDateString } from '@/utils/utils';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof GameHotsSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    { prop: 'id', label: 'id', width: 60, align: 'left', fixed: 'left' },
    { prop: 'gameId', label: '游戏ID', width: 80, align: 'left', fixed: 'left' },
    { prop: 'gameName', label: '游戏名称', minWidth: 150, align: 'left' },
    { prop: 'sortNumber', label: '排序', minWidth: 80, align: 'left' },
    { prop: 'createBy', label: '更新人', minWidth: 100, align: 'left' },
    {
      label: '创建时间',
      prop: 'createTime',
      align: 'left',
      minWidth: 160,
      slot: 'createTime'
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      align: 'left',
      minWidth: 160,
      slot: 'updateTime'
    },
    { columnKey: 'action', label: '操作', width: 220, align: 'center', slot: 'action', hideInPrint: true, hideInExport: true }
  ]);

  /** 表格选中数据 */
  const selections = ref<GameHots[]>([]);

  /** 当前编辑数据 */
  const current = ref<GameHots | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGameHotss({ ...where, ...orders, ...pages });
  };

  /** 搜索 */
  const reload = (where?: GameHotsParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: GameHots) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: GameHots) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({ message: '请求中..', plain: true });
        removeGameHots(row.id)
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

  /** 发送到服务器 */
  const sendServerToReload = () => {
    const loading = EleMessage.loading({ message: '请求中..', plain: true });
    sendGameHotsToServer() // 调用你的发送到服务器API
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
        reload(); // 发送成功后重新加载数据
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return pageGameHotss({ ...where, ...orders });
  };
</script>

<style scoped>
  /* 可选样式优化 */
  .time-cell {
    font-family: monospace;
  }

  /* 确保时间单元格有合适的内边距 */
  .ele-pro-table td {
    padding: 8px 12px;
  }

  /* 工具栏按钮间距 */
  .ele-btn-icon {
    margin-left: 8px;
  }
</style>
