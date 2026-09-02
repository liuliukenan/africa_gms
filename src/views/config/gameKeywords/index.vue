<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <game-keywords-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '搜索关键字配置', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
          <!-- 新增发送到服务器按钮 -->
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServerToGameReload()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon" >
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
    <game-keywords-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElButton, ElDivider, ElMessageBox, ElPopconfirm } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import GameKeywordsSearch from './components/game-keywords-search.vue';
  import GameKeywordsEdit from './components/game-keywords-edit.vue';
  // 导入你的API方法
  import { pageGameKeywordss, removeGameKeywords, sendServerToReload } from '@/api/config/gameKeywords/gameKeywordsApi'; // 导入新的发送API
  import type { GameKeywords, GameKeywordsParam } from '@/api/config/model/gameKeywords';
  import { toDateString } from '@/utils/utils';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof GameKeywordsSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    { prop: 'id', label: 'id', width: 60, align: 'left', fixed: 'left' },
    { prop: 'keyText', label: '名称', minWidth: 150, align: 'left' },
    { prop: 'sortNumber', label: '排序', minWidth: 80, align: 'left' },
    { prop: 'createBy', label: '创建人', minWidth: 100, align: 'left' },
    {
      label: '创建时间',
      prop: 'createTime',
      align: 'left',
      minWidth: 160,
      slot: 'createTime'
    },
    {
      label: '更新人',
      prop: 'updateBy',
      align: 'left',
      minWidth: 100
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
  const selections = ref<GameKeywords[]>([]);

  /** 当前编辑数据 */
  const current = ref<GameKeywords | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 详情弹窗相关 */
  const detailData = ref<GameKeywords | null>(null);
  const showDetail = ref(false);

  /** 加载状态 */
  const loading = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGameKeywordss({ ...where, ...orders, ...pages });
  };

  /** 搜索 */
  const reload = (where?: GameKeywordsParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: GameKeywords) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: GameKeywords) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({ message: '请求中..', plain: true });
        removeGameKeywords(row.id)
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
  const sendServerToGameReload = () => {
    const loading = EleMessage.loading({ message: '请求中..', plain: true });
    sendServerToReload()
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
    return pageGameKeywordss({ ...where, ...orders });
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
</style>
