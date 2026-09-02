<template>
  <ele-page>
    <ele-modal form :width="880" v-model="visible" title="邮件领取记录" @open="handleOpen">
      <user-global-mail-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <!-- <template #toolbar>
            <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
              新建
            </el-button>
          </template> -->
        <!-- <template #action="{ row }">
            <el-link type="primary" :underline="false" @click="openEdit(row)">
              修改
            </el-link>
            <el-divider direction="vertical" />
            <el-link type="danger" :underline="false" @click="remove(row)">
              删除
            </el-link>
          </template> -->
      </ele-pro-table>
      <!-- <user-global-mail-record-edit :data="current" v-model="showEdit" @done="reload" /> -->
    </ele-modal>
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
// import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import UserGlobalMailRecordSearch from "./user-global-mail-record-search.vue";
// import UserGlobalMailRecordEdit from "./components/user-global-mail-record-edit.vue";
import { pageUserGlobalMailRecords } from "@/api/platform/userGlobalMailRecordApi";
import type { UserGlobalMailRecord, UserGlobalMailRecordParam } from "@/api/platform/model/userGlobalMailRecord";
import { GlobalMail } from "@/api/platform/model/globalMail";
import { toDateString } from "@/utils/utils";
const props = defineProps<{
  /** 修改回显的数据 */
  data?: GlobalMail | null;
}>();

const emit = defineEmits<{
  (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
/** 弹窗打开事件 */
const handleOpen = () => {
  if (props.data) {
    console.log(props.data);
    // 传递mid参数给where并调用接口
    const where = { mid: props.data.id };
    reload(where);
  } else {
    // 无参数时重新加载
    reload();
  }
};
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserGlobalMailRecordSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: "id",
    // width: 60,
    align: 'left',
    fixed: 'left',
  },
  {
    prop: "mid",
    label: "全局邮件ID",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "uid",
    label: "用户ID",
    minWidth: 110,
    align: 'left',
  },
  {
    label: '时间',
    prop: 'createTime',
    formatter: (row: any) => toDateString(row.createTime),
    align: 'left',
    minWidth: 110
  },
]);

/** 表格选中数据 */
const selections = ref<UserGlobalMailRecord[]>([]);

/** 当前编辑数据 */
const current = ref<UserGlobalMailRecord | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);


/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserGlobalMailRecords({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserGlobalMailRecordParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: UserGlobalMailRecord) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: UserGlobalMailRecord) => {
  ElMessageBox.confirm(
    '确定要删除“' + row.id + '”吗?',
    '系统提示',
    { type: 'warning', draggable: true }
  )
    .then(() => {
      // const loading = EleMessage.loading({
      //   message: '请求中..',
      //   plain: true
      // });
      // removeUserGlobalMailRecord(row.id)
      //   .then((msg) => {
      //     loading.close();
      //     EleMessage.success(msg);
      //     reload();
      //   })
      //   .catch((e) => {
      //     loading.close();
      //     EleMessage.error(e.message);
      //   });
    })
    .catch(() => {
    });
};
</script>
