<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <game-search-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
                     :show-overflow-tooltip="true" :border="true" v-model:selections="selections"
                     :highlight-current-row="true" :export-config="{ fileName: '搜索查询记录', datasource: exportSource }"
                     :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }"
                     cache-key="systemUserTable">

<!--        <template #toolbar>-->
<!--          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>-->
<!--        </template>-->

        <template #action="{ row }">
<!--          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>-->
          <!-- 新增详情按钮 -->
          <el-link type="info" :underline="false" @click="openDetail(row)" style="color: #909399;">
            详情
          </el-link>
          <el-divider direction="vertical"/>
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>

        <!-- 创建时间格式化模板 -->
        <template #createTime="{ row }">
          <span>{{ formatTimestamp(row.createTime) }}</span>
        </template>

      </ele-pro-table>
    </ele-card>
    <game-search-record-edit :data="current" v-model="showEdit" @done="reload" />
    <!-- 新增详情弹窗 -->
    <el-dialog v-model="showDetail" title="详情" width="600px" @close="closeDetail">
      <div v-if="detailData" class="detail-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="ID">
            {{ detailData.id }}
          </el-descriptions-item>

          <el-descriptions-item label="游戏ID">
            {{ detailData.uid }}
          </el-descriptions-item>

          <el-descriptions-item label="搜索内容">
            {{ detailData.keyText }}
          </el-descriptions-item>

          <el-descriptions-item label="创建时间">
            {{ formatTimestamp(detailData.createTime) }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-else v-loading="true" class="loading-text" element-loading-text="加载中..."></div>
      <template #footer>
        <el-button @click="closeDetail">关闭</el-button>
      </template>
    </el-dialog>
  </ele-page>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElButton, ElDescriptions, ElDescriptionsItem, ElDivider, ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
import GameSearchRecordSearch from "./components/game-search-record-search.vue";
import GameSearchRecordEdit from "./components/game-search-record-edit.vue";
// 导入你的API方法
import { getGameSearchRecord, pageGameSearchRecords, removeGameSearchRecord } from "@/api/config/gameSearchRecord/gameSearchRecordApi";
import type { GameSearchRecord, GameSearchRecordParam } from "@/api/config/model/gameSearchRecord";
/** 时间戳格式化函数 */
const formatTimestamp = (timestamp: string | number | undefined) => {
  // 处理空值/无效值
  if (!timestamp) return "-";

  // 统一转为数字（处理字符串类型的时间戳）
  let ts = Number(timestamp);

  // 兼容10位时间戳（秒）和13位时间戳（毫秒）
  if (ts.toString().length === 10) {
    ts = ts * 1000;
  }

  try {
    const date = new Date(ts);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } catch (e) {
    return "-";
  }
};
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof GameSearchRecordSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  { prop: "id", label: "id", width: 60, align: 'left', fixed: 'left' },
  { prop: "uid", label: "游戏ID", minWidth: 110, align: 'left' },
  { prop: "keyText", label: "搜索内容", minWidth: 150, align: 'left' },
  {
    label: '创建时间',
    prop: 'createTime',
    align: 'left',
    minWidth: 160,
    slot: "createTime"
  },
  { columnKey: "action", label: "操作", width: 220, align: "center", slot: "action", hideInPrint: true, hideInExport: true }
]);

/** 表格选中数据 */
const selections = ref<GameSearchRecord[]>([]);

/** 当前编辑数据 */
const current = ref<GameSearchRecord | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 详情弹窗相关 */
const detailData = ref<GameSearchRecord | null>(null);
const showDetail = ref(false);

/** 加载状态 */
const loading = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageGameSearchRecords({ ...where, ...orders, ...pages });
};

/** 搜索 */
const reload = (where?: GameSearchRecordParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: GameSearchRecord) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 打开详情弹窗 */
const openDetail = async (row: GameSearchRecord) => {
  try {
    loading.value = true;
// 调用你的API获取详情数据
    detailData.value = await getGameSearchRecord(row.id!); // 假设返回格式是{ data: GameSearchRecord }
    showDetail.value = true;
  } catch (error) {
    console.error('获取详情失败:', error);
    EleMessage.error('获取详情失败');
  } finally {
    loading.value = false;
  }
};

/** 关闭详情弹窗 */
const closeDetail = () => {
  showDetail.value = false;
  detailData.value = null;
  loading.value = false;
};

/** 删除单个 */
const remove = (row: GameSearchRecord) => {
  ElMessageBox.confirm(
    '确定要删除“' + row.id + '”吗?',
    '系统提示',
    {type: 'warning', draggable: true}
  ).then(() => {
    const loading = EleMessage.loading({ message: '请求中..', plain: true });
    removeGameSearchRecord(row.id)
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
        reload();
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  }).catch(() => {});
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({where, orders}) => {
  return pageGameSearchRecords({ ...where, ...orders });
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

/* 详情弹窗内容样式 */
.detail-content {
  padding: 16px 0;
}

/* 加载文本样式 */
.loading-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

/* 操作链接样式 */
.action-link {
  margin-right: 8px;
}

.action-link:last-child {
  margin-right: 0;
}
</style>
