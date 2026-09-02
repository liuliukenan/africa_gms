<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <company-game-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :footer-style="{ paddingBottom: '16px' }" cache-key="companyGameRecord">
        <template #toolbar>
          <!-- <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建
          </el-button> -->
          <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined" @click="openExport()">{{ t('action.export') }}</el-button>
        </template>
        <template #gameGroupId="{ row }">
          <dict-data code="gameGroup" v-model="row.gameGroupId" valueType="number" type="tag" />
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
import { UploadOutlined } from "@/components/icons";
import CompanyGameRecordSearch from "./components/company-game-record-search.vue";
import { pageCompanyGameRecords,exportCompanyGameRecords} from "@/api/user/companyGameRecordApi";
import type { CompanyGameRecord, CompanyGameRecordParam } from "@/api/user/model/companyGameRecord";
import { useI18n } from 'vue-i18n';
import { toDateString, toDateZone } from "@/utils/utils";
import { handleDownload } from "@/utils/file-util";
import { useConfigStore } from "@/store/modules/config";
const { t } = useI18n();


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof CompanyGameRecordSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: t('user.companyGameRecord.table.id'),
    width: 60,
    align: 'left',
    fixed: 'left',
  },
  {
    prop: "uid",
    label: t('user.companyGameRecord.table.uid'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameId",
    label: t('user.companyGameRecord.table.gameId'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameName",
    label: t('user.companyGameRecord.table.gameName'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameGroupId",
    slot: "gameGroupId",
    label: t('user.companyGameRecord.table.gameGroupId'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "companyId",
    label: t('user.companyGameRecord.table.companyId'),
    minWidth: 110,
    align: 'left',
  },
  // {
  //   prop: "agencyUid",
  //   label: "代理识别码",
  //   minWidth: 110,
  //   align: 'left',
  // },
  // {
  //   prop: "memberAccount",
  //   label: "玩家账号名",
  //   minWidth: 110,
  //   align: 'left',
  // },
  {
    prop: "countryCode",
    label: t('user.companyGameRecord.table.countryCode'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "factoryCode",
    label: t('user.companyGameRecord.table.factoryCode'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "channel",
    label: t('user.companyGameRecord.table.channel'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "betAmount",
    sortable: 'custom',
    label: t('user.companyGameRecord.table.betAmount'),
    minWidth: 110,
    align: 'left',
  },
  {
    label: t('user.companyGameRecord.table.betDetail'),
    prop: 'betDetail',
    align: 'center',
    children: [
      {
        prop: "cashBet",
        label: t('user.companyGameRecord.table.cashBet'),
        minWidth: 90,
        align: 'center',
      },
      {
        prop: "categoryBet",
        label: t('user.companyGameRecord.table.categoryBet'),
        minWidth: 90,
        align: 'center',
      },
      {
        prop: "gameBet",
        label: t('user.companyGameRecord.table.gameBet'),
        minWidth: 90,
        align: 'center',
      },
    ]
  },
  {
    prop: "winAmount",
    label: t('user.companyGameRecord.table.winAmount'),
    sortable: 'custom',
    minWidth: 110,
    align: 'left',
  },
  {
    label: t('user.companyGameRecord.table.winDetail'),
    prop: 'winDetail',
    align: 'center',
    children: [
      {
        prop: "cashWin",
        label: t('user.companyGameRecord.table.cashWin'),
        minWidth: 90,
        align: 'center',
      },
      {
        prop: "categoryWin",
        label: t('user.companyGameRecord.table.categoryWin'),
        minWidth: 90,
        align: 'center',
      },
      {
        prop: "gameWin",
        label: t('user.companyGameRecord.table.gameWin'),
        minWidth: 90,
        align: 'center',
      },
    ]
  },
  // {
  //   prop: "currencyCode",
  //   label: "币种",
  //   minWidth: 110,
  //   align: 'left',
  // },
  {
    prop: "serialNumber",
    label: t('user.companyGameRecord.table.serialNumber'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "gameRound",
    label: t('user.companyGameRecord.table.gameRound'),
    minWidth: 110,
    align: 'left',
  },
  // {
  //   prop: "gameUid",
  //   label: "游戏UID",
  //   minWidth: 110,
  //   align: 'left',
  // },
  {
    prop: "calcFlow",
    label: t('user.companyGameRecord.table.calcFlow'),
    minWidth: 110,
    align: 'left',
  },
  {
    prop: "triggerSpinType",
    label: t('user.companyGameRecord.table.triggerSpinType'),
    minWidth: 100,
    align: 'center',
  },
  {
    prop: "triggerOrderNo",
    label: t('user.companyGameRecord.table.triggerOrderNo'),
    minWidth: 140,
    align: 'left',
  },
  {
    prop: "recordTime",
    label: t('user.companyGameRecord.table.recordTime'),
    formatter: (row) => toDateZone(row.recordTime, row.countryCode),
    minWidth: 140,
    align: 'left',
  },
  // {
  //   prop: "gameGroupId",
  //   label: "游戏组ID",
  //   minWidth: 110,
  //   align: 'left',
  // },


  // {
  //   prop: "agentId",
  //   label: "代理ID（0表示没有代理）",
  //   minWidth: 110,
  //   align: 'left',
  // },
  // {
  //   prop: "clientType",
  //   label: "客户端类型0.all 1.android 2.IOS 3.WEB",
  //   minWidth: 110,
  //   align: 'left',
  // },


  // {
  //   label: '时间',
  //   prop: 'createTime',
  //   align: 'left',
  //   minWidth: 110
  // },
]);

/** 表格选中数据 */
const selections = ref<CompanyGameRecord[]>([]);

/** 当前编辑数据 */
const current = ref<CompanyGameRecord | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
  // 初始化store
const configStore = useConfigStore();
// 默认搜索条件
const defaultWhere = reactive({
  uid: undefined,
  countryCode: configStore.countryArr?.[0]?.code || '',
  type: 0,
  sortName: 'totalResult',
  gameId: undefined,
  startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD')
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  where = { ...defaultWhere, ...where, orderName: orders.order, sortName: orders.sort };
  return pageCompanyGameRecords({
    ...where,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: CompanyGameRecordParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: CompanyGameRecord) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: CompanyGameRecord) => {
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
      // removeCompanyGameRecord(row.id)
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
const openExport = async () => {
  try {
    const { value } = await ElMessageBox.prompt(
      t('common.exportLimitTip'),
      t('action.export'),
      {
        confirmButtonText: t('action.confirm'),
        cancelButtonText: t('action.cancel'),
        inputPattern: /^(|[1-9]\d*)$/,
        inputErrorMessage: t('common.exportLimitError'),
        inputPlaceholder: t('common.exportLimitPlaceholder')
      }
    );

    const exportLimit = value ? Number(value) : undefined;
    const loading = EleMessage.loading({
      message: t('common.loading'),
      plain: true
    });

    try {
      const res = await exportCompanyGameRecords({
        ...searchRef.value!.searchParams(),
        exportLimit
      }, 'companyGameRecord');
      loading.close();
      handleDownload('companyGameRecord.xlsx', res.data as Blob);
      ElMessage.success('导出成功');
    } catch (error: any) {
      loading.close();
      EleMessage.error(error.message || '导出失败');
    }
  } catch {
    // 用户取消操作
  }
};
</script>
<script lang="ts">
export default {
  name: 'companyGameRecord'
};
</script>
