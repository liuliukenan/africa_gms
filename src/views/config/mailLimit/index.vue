<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <mail-limit-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :headerEllipsis="false" :columns="columns" :datasource="datasource" :pagination="false"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '邮件记录', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="proMailLimit">
        <!-- <template #toolbar>
                    <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
                        新建
                    </el-button>
                </template> -->
        <template #fromType="{ row }">
          <span v-for="item in vipTypes" :key="item.dictDataId">
            <el-tag v-if="row.fromType == item.dictDataCode" :color="item.dictDataColor">
              {{ item.dictDataName }}
            </el-tag>
          </span>
        </template>
        <template #toType="{ row }">
          <span v-for="item in vipTypes" :key="item.dictDataId">
            <el-tag v-if="row.toType == item.dictDataCode" :color="item.dictDataColor">
              {{ item.dictDataName }}
            </el-tag>
          </span>
        </template>
        <template #action="{ row }" v-permission="'config:mailLimit:edit'">
          <el-link type="primary" :underline="false" @click="openEdit(row)">
            修改
          </el-link>
          <!-- <el-divider direction="vertical"/> -->
          <!-- <el-link type="danger" :underline="false" @click="remove(row)">
                        删除
                    </el-link> -->
        </template>
      </ele-pro-table>
    </ele-card>
    <mail-limit-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
// import { PlusOutlined } from "@/components/icons";
// import MailLimitSearch from "./components/mail-limit-search.vue";
import MailLimitEdit from "./components/mail-limit-edit.vue";
import { pageMailLimits, removeMailLimit } from "@/api/config/mailLimitApi";
import type { MailLimit, MailLimitParam } from "@/api/model/mailLimit";

import { formatNumber } from 'ele-admin-plus';
import { listByCode } from "@/api/system/dictDataApi";
import { DictionaryData } from "@/api/model/dictdata";
/** 搜索栏实例 */
// const searchRef = ref<InstanceType<typeof MailLimitSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: "ID",
    width: 70,
    align: 'center',
    fixed: 'left',
  },
  {
    prop: "fromType",
    label: "转出",
    slot: "fromType",
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "toType",
    label: "接收",
    slot: "toType",
    minWidth: 110,
    align: 'center',
  },
  {
    prop: "min",
    label: "下限",
    minWidth: 110,
    align: 'center',
    formatter: (row) => formatNumber(row.min)
  },
  {
    prop: "max",
    label: "上限",
    minWidth: 110,
    align: 'center',
    formatter: (row) => formatNumber(row.max)
  },
  {
    prop: "duty",
    label: "税率百分比",
    minWidth: 110,
    align: 'center',
    formatter: (row) => row.duty + '%'
  },
  {
    prop: "rebate",
    label: "返利百分比",
    minWidth: 110,
    align: 'center',
    formatter: (row) => row.rebate + '%'
  },
  // {
  //   prop: "ownMoney",
  //   label: "",
  //   minWidth: 110,
  //   align: 'center',
  // },
  // {
  //   prop: "unbindMoney",
  //   label: "",
  //   minWidth: 110,
  //   align: 'center',
  // },
  //  {
  //     label: '时间',
  //     prop: 'createTime',
  //     align: 'center',
  //     minWidth: 110
  // },
  {
    columnKey: "action",
    label: "操作",
    width: 200,
    align: "center",
    slot: "action",
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<MailLimit[]>([]);

/** 当前编辑数据 */
const current = ref<MailLimit | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
//用户类型
const vipTypes = ref<DictionaryData[]>([]);
listByCode('svip').then((data) => {
  vipTypes.value = data;
});

/** 表格数据源 */
const datasource: DatasourceFunction = ({  where, orders }) => {
  return pageMailLimits({
    ...where,
    ...orders
  });
};

/** 搜索 */
const reload = (where?: MailLimitParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: MailLimit) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: MailLimit) => {
  ElMessageBox.confirm(
    '确定要删除“' + row.id + '”吗?',
    '系统提示',
    { type: 'warning', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      removeMailLimit(row.id)
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
    .catch(() => {
    });
};


/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageMailLimits({
    ...where,
    ...orders
  });
};
</script>
<script lang="ts">
export default {
  name: 'MailLimit'
};
</script>
<style lang="scss" scoped>
:deep(.el-tag__content) {
  color: white !important;
}
</style>
