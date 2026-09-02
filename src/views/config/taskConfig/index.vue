<template>
  <div class="ele-body">
    <el-card :bordered="false" style="margin: 20px">
      <!-- <FissionSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" :where="defaultWhere" /> -->
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :columns="columns" size="small"
        :pagination="{
          pageSize: 50,
          pageSizes: [50, 100, 200],
          layout: 'total, prev, pager, next, sizes, jumper',
          style: { margin: 'auto' },
          autoAmend: false
        }" :headerEllipsis="false" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere"
        cache-key="progameConf">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建</el-button>
          <el-popconfirm title="确定导出所有数据？" @confirm="doExcelExport()" width="250px">
            <template #reference>
              <el-button type="warning" :icon="UploadOutlined">导出</el-button>
            </template>
          </el-popconfirm>
          <el-button type="success" class="ele-btn-icon" @click="openImport()">
            <template #icon>
              <DownloadOutlined />
            </template>
            <span>导入</span>
          </el-button>
        </template>
        <template #taskType="{ row }">
          <dict-data code="qustType" v-model="row.taskType" type="tag" valueType="number" />
        </template>
        <template #rewardType="{ row }">
          <dict-data code="rewardType" v-model="row.rewardType" type="tag" valueType="number" />
        </template>
        <template #taskRefer="{ row }">
          <dict-data code="taskReferType" v-model="row.taskRefer" type="tag" valueType="number" />
        </template>
        <template #createTime="{ row }">
          <div style="font-size: 12px">{{ row.createTime }}</div>
          <div style="font-size: 12px">{{ row.updateTime }}</div>
        </template>

        <template #action="{ row }">
          <el-link type="warning" :underline="false" @click="openInfo(row)"> 详情
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除
          </el-link>

        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <FissionEdit v-model="showEdit" :data="current" @done="reload" />
    <FissionInfo v-model="showInfo" :data="current" @done="reload" />
    <FissionUpload v-model="showImport" @done="reload" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { EleMessage, EleProTable } from 'ele-admin-plus/es';
import { UploadOutlined, DownloadOutlined, PlusOutlined } from '@/components/icons';
import FissionEdit from './components/fission-edit.vue';
import FissionInfo from './components/fission-info.vue';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import type { Fission } from '@/api/taskConfig/model';
import { ElMessageBox } from 'element-plus';
import { exportFission, pageFission, removeFission } from '@/api/taskConfig/fission';
import FissionUpload from './components/fission-import.vue';
import FissionSearch from './components/fission-search.vue';
import { handleDownload } from '@/utils/file-util';

// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof FissionSearch> | null>(null);
// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    prop: 'id',
    width: 65,
    align: 'center',
    fixed: 'left'
  },
  {
    label: '游戏ID',
    prop: 'gameId',
    minWidth: 65,
    align: 'center',
  },
  {
    label: '前置任务ID',
    prop: 'preTask',
    minWidth: 70,
    align: 'center',
  },
  {
    label: '奖励类型',
    prop: 'rewardType',
    slot: 'rewardType',
    minWidth: 120,
    align: 'center',
  },
  {
    label: '奖励数量',
    prop: 'rewardNum',
    align: 'center',
  },
  {
    label: '任务类型',
    prop: 'taskType',
    slot: 'taskType',
    minWidth: 120,
    align: 'center'
  },
  {
    label: '任务关联',
    prop: 'taskRefer',
    slot: 'taskRefer',
    minWidth: 120,
    align: 'center'
  },
  {
    label: '任务目标数量',
    prop: 'needNum',
    width: 60,
    align: 'center'
  },
  {
    label: '可否重复',
    prop: 'isReturn',
    // minWidth: 110,
    align: 'center',
    formatter: (row) => {
      return row.isReturn == 0 ? '否' : '可';
    }
  },
  {
    label: '中文',
    prop: 'questNameCn',
    // minWidth: 110,
    align: 'center'
  },
  {
    label: '英语',
    prop: 'questNameEn',
    // minWidth: 110,
    align: 'center'
  },
  {
    label: '泰语',
    prop: 'questNameTh',
    // minWidth: 110,
    align: 'center'
  },
  {
    label: '马来',
    prop: 'questNameMy',
    // minWidth: 110,
    align: 'center'
  },
  {
    label: '印尼',
    prop: 'questNameIdn',
    // minWidth: 110,
    align: 'center'
  },
  {
    label: '越南',
    prop: 'questNameVn',
    // minWidth: 110,
    align: 'center'
  },
  {
    label: '缅甸',
    prop: 'questNameMya',
    // minWidth: 110,
    align: 'center'
  },

  {
    label: '创建|更新',
    prop: 'createTime',
    align: 'center',
    // width: 130,
    slot: 'createTime'
  },
  {
    columnKey: 'action',
    label: '操作',
    width: 150,
    align: 'center',
    slot: 'action'
  }
]);

// 表格选中数据
const selection = ref([]);

// 当前编辑数据
const current = ref<Fission | null>(null);

// 是否显示编辑弹窗
const showEdit = ref(false);
const showInfo = ref(false);

const showImport = ref(false);

/* 打开编辑弹窗 */
const openImport = () => {
  showImport.value = true;
};

// 默认搜索条件
const defaultWhere = reactive({
  sortName: '',
  orderName: "asc"
});

// 表格数据源
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  where = { ...defaultWhere, ...where, orderName: orders.order || defaultWhere.orderName, sortName: orders.sort || defaultWhere.sortName };
  return pageFission({ ...where, ...pages });
};

/* 搜索 */
const reload = (where?: Fission) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
};

/* 打开编辑弹窗 */
const openEdit = (row?: Fission) => {
  current.value = row ?? null;
  showEdit.value = true;
};
const openInfo = (row?: Fission) => {
  current.value = row ?? null;
  showInfo.value = true;
};

/* 删除单个 */
const remove = (row: Fission) => {
  ElMessageBox.confirm('确定要删除ID为“' + row.id + '”的数据吗?', '系统提示', {
    type: 'warning',
    draggable: true
  })
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      if (!row.id) return;
      removeFission(row.id)
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
    .catch(() => { });
};
// 导出Excel
const doExcelExport = () => {
  exportFission().then((res) => {
    handleDownload('裂变配置', res.data as any);
  });
};
</script>

<script lang="ts">
export default {
  name: 'Fission'
};
</script>