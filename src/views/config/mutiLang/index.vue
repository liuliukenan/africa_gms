<template>
  <div class="ele-body">
    <el-card :bordered="false">
      <!-- 搜索表单 -->
      <muti-lang-search ref="searchRef" :where="defaultWhere" @search="reload" />
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" :headerEllipsis="false" row-key="id" :columns="columns" :page-size="500"
        :page-size-options="[500, 1000]" :datasource="datasource" :bordered="true" :striped="true" :scroll="{ x: 1000 }"
        :where="defaultWhere" v-model:selections="selections" cache-key="proMutiLang">
        <template #toolbar>
          <el-button :loading="checkLoading" type="primary" class="ele-btn-icon" @click="checkNew()"
            v-permission="'config:mutiLang:add'">
            <span>新增检查</span>
          </el-button>
          <el-popconfirm title="确定导出Excel数据？" @confirm="doExcelExport()">
            <template #reference>
              <el-button type="success" v-permission="'config:mutiLang:exportExcel'">导出Excel</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" class="ele-btn-icon" @click="openImport"
            v-permission="'config:mutiLang:importExcel'">
            <span>导入Excel</span>
          </el-button>
          <el-popconfirm title="确认导出JSON数据吗？" @confirm="doJsonExport()">
            <template #reference>
              <el-button type="warning" v-permission="'config:mutiLang:exportJson'">导出JSON</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #createTime="{ row }">
          <div style="font-size: 12px">{{ toDateString(row.createTime) }}</div>
          <div style="font-size: 12px">{{ toDateString(row.updateTime) }}</div>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'config:mutiLang:edit'">
            修改</el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <MutiLangEdit :data="current" v-model="showEdit" @done="reload" />
    <mutil-lang-import v-model="showImport" @done="reload" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import MutiLangSearch from './components/mutiLang-search.vue';
import MutiLangEdit from './components/mutiLang-edit.vue';
import { checkNewMutiLang, exportExcelMutiLang, exportJsonMutilLang, pageMutiLangs, sendConfServer } from '@/api/mutiLang/mutiLang';
import { handleDownload } from '@/utils/file-util';
import { EleMessage, type EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import type { MutiLang, MutiLangParam } from '@/api/mutiLang/model/index';
import MutilLangImport from './components/mutilLang-import.vue';
import { toDateString } from '@/utils/utils';
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 表格列配置
const columns = ref<Columns>([
  {
    label: 'msgCode',
    prop: 'msgCode',
    align: 'left'
  },
  {
    label: 'msgKey',
    prop: 'msgKey',
    align: 'left'
  },
  {
    label: '类型',
    width: 70,
    prop: 'type',
    align: 'left'
  },
  {
    label: '内容',
    prop: 'content',
    align: 'left',
    formatter (row) {
      return JSON.stringify(row.content)
    }
  },
  {
    label: '创建|更新',
    prop: 'createTime',
    slot: 'createTime',
    align: 'left'
  },
  {
    label: '操作',
    columnKey: 'action',
    width: 120,
    align: 'left',
    slot: 'action'
  }
]);
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof MutiLangSearch> | null>(null);

/** 表格选中数据 */
const selections = ref<MutiLang[]>([]);

/** 当前编辑数据 */
const current = ref<MutiLang | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

const checkLoading = ref(false);

const showImport = ref(false);

// 默认搜索条件
const defaultWhere = reactive({
  type: null,
  msgCode: null
});
// 导出Excel
const doExcelExport = () => {
  exportExcelMutiLang(searchRef.value!.searchParams()).then((res) => {
    handleDownload('多语言', res.data as any);
  });
};
// 新增检查
const checkNew = async () => {
  var param = searchRef.value!.searchParams();
  checkLoading.value = true;
  await checkNewMutiLang();
  await reload(param);
  EleMessage.success('检查完成');
  checkLoading.value = false;
};
// 表格数据源
const datasource: DatasourceFunction = ({ page, limit, where, orders }) => {
  return pageMutiLangs({ ...where, ...orders, page, limit });
};

const openImport = () => {
  showImport.value = true;
};
// 导出JSON
const doJsonExport = () => {
  exportJsonMutilLang(searchRef.value!.searchParams()).then((res) => {
    // let fileName = getDownFileName(res as any);
    handleDownload('cfg_service', res.data as any);
  });
};

/* 搜索 */
const reload = (where?: MutiLangParam) => {
  selections.value = [];
  tableRef?.value?.reload({ page: 1, where });
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
/* 打开编辑弹窗 */
const openEdit = (row: MutiLang) => {
  current.value = row;
  showEdit.value = true;
};
</script>

<script lang="ts">
export default {
  name: 'MutiLang'
};
</script>
