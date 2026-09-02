<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-wallet-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"  :header-ellipsis="false"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :max-height="650" 
        :footer-style="{ paddingBottom: '16px' }" cache-key="userWalletRecord">
        <template #toolbar>
          <!-- <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
                        新建
                    </el-button> -->
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport()" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #type="{ row }">
          <dict-data code="money_source" v-model="row.type" valueType="number" type="tag" />
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)">
            {{ t('action.edit') }}
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">
            {{ t('action.delete') }}
          </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { dayjs, ElMessage, ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { UploadOutlined } from '@/components/icons';
import UserWalletRecordSearch from "./components/user-wallet-record-search.vue";
import { pageUserWalletRecords, exportUserWalletRecords } from "@/api/user/userWalletRecordApi";
import type { UserWalletRecord, UserWalletRecordParam } from "@/api/user/model/userWalletRecord";
import { handleDownload } from "@/utils/file-util";
import { useI18n } from 'vue-i18n';
import { toDateZone } from "@/utils/utils";
import { useConfigStore } from '@/store/modules/config';
import { addSecret } from '@/utils/common';
const { t } = useI18n();

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserWalletRecordSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: t('user.userWalletRecord.table.id'),
    width: 60,
    align: 'left',
    fixed: 'left',
  },
  {
    prop: "uid",
    label: t('user.userWalletRecord.table.uid'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "phone",
    label: t('user.userWalletRecord.table.phone'),
    minWidth: 110,
    align: 'left',
    formatter: (row) => addSecret(row.phone)
  },
  {
    prop: "type",
    slot: "type",
    label: t('user.userWalletRecord.table.type'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "walletId",
    label: t('user.userWalletRecord.table.walletId'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "walletName",
    label: t('user.userWalletRecord.table.walletName'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "companyId",
    label: t('user.userWalletRecord.table.companyId'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameGroupId",
    label: t('user.userWalletRecord.table.gameGroupId'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameId",
    label: t('user.userWalletRecord.table.gameId'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameName",
    label: t('user.userWalletRecord.table.gameName'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "amount",
    label: t('user.userWalletRecord.table.amount'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "beforeAmount",
    label: t('user.userWalletRecord.table.beforeAmount'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "afterAmount",
    label: t('user.userWalletRecord.table.afterAmount'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "orderNo",
    label: t('user.userWalletRecord.table.orderNo'),
    minWidth: 110,
    align: 'left',
  },
  // {
  //   prop: "extInfo",
  //   label: "扩展信息",
  //   minWidth: 110,
  //   align: 'left',
  // },
  {
    label: t('user.userWalletRecord.table.createTime'),
    prop: 'createTime',
    formatter: (row) => toDateZone(row.createTime, row.countryCode),
    align: 'left',
    minWidth: 110
  },
  // {
  //   columnKey: "action",
  //   label: "操作",
  //   width: 200,
  //   align: "center",
  //   slot: "action",
  //   hideInPrint: true,
  //   hideInExport: true
  // }
]);

/** 表格选中数据 */
const selections = ref<UserWalletRecord[]>([]);

/** 当前编辑数据 */
const current = ref<UserWalletRecord | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
// 初始化store
const configStore = useConfigStore();
// 默认搜索条件
const defaultWhere = reactive({
  countryCode: configStore.countryArr?.[0]?.code || 254,
  startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserWalletRecords({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserWalletRecordParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: UserWalletRecord) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: UserWalletRecord) => {
  ElMessageBox.confirm(
    t('common.sureDel', [row.id]),
    t('common.tips'),
    { type: 'warning', draggable: true }
  )
    .then(() => {
      // const loading = EleMessage.loading({
      //   message: '请求中..',
      //   plain: true
      // });
      // removeUserWalletRecord(row.id)
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

// 导出
const openExport = () => {
  exportUserWalletRecords({ ...searchRef.value!.searchParams() }, 'QBJL').then((res) => {
    ElMessage.success(res);
  });
};
</script>
<script lang="ts">
export default {
  name: 'userWalletRecord'
};
</script>
