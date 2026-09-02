<template>
  <ele-page>
  <!-- <dict-data-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
  <ele-pro-table ref="tableRef" row-key="dictDataId" :columns="columns" :datasource="datasource" :height="690"
    :show-overflow-tooltip="true" v-model:selections="selections" :highlight-current-row="true" :pagination="false"
    :export-config="{ fileName: '字典数据', datasource: exportSource }" :print-config="{ datasource: exportSource }"
    :footer-style="{ paddingBottom: '16px' }" cache-key="systemDictDataTable">
    <template #toolbar>
      <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
        新建
      </el-button>
      <!-- <el-button type="danger" class="ele-btn-icon" :icon="DeleteOutlined" @click="remove()" :disabled="!selections.length">
        删除
      </el-button> -->
    </template>
    <template #action="{ row }">
      <el-link type="primary" :underline="false" @click="openEdit(row)">
        修改
      </el-link>
      <el-divider direction="vertical" />
      <el-link type="danger" :underline="false" @click="remove(row)">
        删除
      </el-link>
    </template>
  </ele-pro-table>
  <dict-data-edit v-model="showEdit" :data="current" :dict-id="dictId" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type {
  DatasourceFunction,
  Columns
} from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
import DictDataSearch from './dict-data-search.vue';
import DictDataEdit from './dict-data-edit.vue';
import {
  listByDictId,
  removeDictionaryDataBatch, removeDictionaryData,
  listDictionaryData,
} from '@/api/system/dictionary-data';
import type {
  DictionaryData,
  DictionaryDataParam
} from '@/api/system/dictionary-data/model';
import { toDateString } from "@/utils/utils";
const props = defineProps<{
  /** 字典id */
  dictId: number;
}>();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof DictDataSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    type: 'selection',
    columnKey: 'selection',
    width: 50,
    align: 'center',
    fixed: 'left'
  },
  {
    prop: 'dictDataName',
    label: '字典数据名',
    // minWidth: 120
  },
  {
    prop: 'dictDataCode',
    label: '字典数据值',
    // minWidth: 120
  },
  {
    prop: 'sortNumber',
    label: '排序号',
    // width: 100,
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    // width: 180,
    align: 'center',
    formatter: (row) => toDateString(row.createTime)
  },
  {
    prop: 'remark',
    label: '备注',
    // minWidth: 120
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
const selections = ref<DictionaryData[]>([]);

/** 当前编辑数据 */
const current = ref<DictionaryData | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = () => {
  return listByDictId(props.dictId);
};

/** 刷新表格 */
const reload = (where?: DictionaryDataParam) => {
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: DictionaryData) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除 */
const remove = (row?: DictionaryData) => {
  const ids = row ? row.dictDataId : selections.value.map(v => v.dictDataId);
  console.log(11, ids);
  const str = row ? row.dictDataName : selections.value.map((d) => d.dictDataName).join(', ');
  ElMessageBox.confirm(
    '确定要删除“' + str + '”吗?',
    '系统提示',
    { type: 'warning', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      const oneOrMore = row ? removeDictionaryData : removeDictionaryDataBatch;
      oneOrMore(ids as any).then((msg) => {
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

// 监听字典id变化
watch(
  () => props.dictId,
  () => {
    searchRef.value?.resetFields?.();
    reload({});
  }
);

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return listDictionaryData({
    ...where,
    ...orders,
    dictId: props.dictId
  });
};
</script>
