<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-wallet-example-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '钱包模板', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建
          </el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #iconUrl="{ row }">
          <el-image :src="imgBaseUrl + row.iconUrl" style="width: 60px;" />
        </template>
        <template #gameGroupId="{ row }">
          <!-- {{ getGroupName(row.gameGroupId) }} -->
          <dict-data v-model="row.gameGroupId" code="gameGroup" value-type="number" placeholder="请选择" type="tag" />
        </template>
        <template #companyId="{ row }">
          <dict-data code="serverType" value-type="number" v-model="row.companyId" type="tag" />
          <!-- <dict-data v-model="form.companyId" code="serverType" value-type="number" placeholder="请选择" :disabled="true"
              style="width: 100%;" /> -->
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
    </ele-card>
    <user-wallet-example-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
import UserWalletExampleSearch from "./components/user-wallet-example-search.vue";
import UserWalletExampleEdit from "./components/user-wallet-example-edit.vue";
import { pageUserWalletExamples, removeUserWalletExample, sendConfServer } from "@/api/platform/userWalletExampleApi";
import type { UserWalletExample, UserWalletExampleParam } from "@/api/platform/model/userWalletExample";
import { useConfigStore } from "@/store/modules/config";
import { toDateString } from "@/utils/utils";

const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
const configStore = useConfigStore()
const getAllGameGroup = () => {
  configStore.getGameGroup()
}
getAllGameGroup()
const getGroupName = (id: number) => {
  const gameGroup = configStore.gameGroupArr.find(item => item.groupId === id)
  return gameGroup?.groupName
}
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserWalletExampleSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: "id",
    width: 60,
    align: 'left',
    fixed: 'left',
  },
  {
    prop: "name",
    label: "名称",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "iconUrl",
    slot: "iconUrl",
    label: "图片",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "companyId",
    slot: "companyId",
    label: "公司ID",
    minWidth: 80,
    align: 'left',
  },
  {
    prop: "gameGroupId",
    slot: "gameGroupId",
    label: "游戏分组",
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameId",
    label: "游戏ID",
    minWidth: 110,
    align: 'left',
  },
  {
    label: '时间',
    prop: 'createTime',
    formatter: (row) => toDateString(row.createTime),
    align: 'left',
    minWidth: 110
  },
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
const selections = ref<UserWalletExample[]>([]);

/** 当前编辑数据 */
const current = ref<UserWalletExample | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);


/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserWalletExamples({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserWalletExampleParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: UserWalletExample) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: UserWalletExample) => {
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
      removeUserWalletExample(row.id)
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

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageUserWalletExamples({
    ...where,
    ...orders
  });
};
</script>
