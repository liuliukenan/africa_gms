<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <country-code-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :pagination="false" :footer-style="{ paddingBottom: '16px' }"  :tools="['reload', 'density', 'columns', 'maximized']"
        cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            {{t('action.add')}}
          </el-button>
          <el-popconfirm :title="t('common.sureSend')" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span> {{t('action.sendServer')}}</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)">
             {{t('action.edit')}}
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">
             {{t('action.delete')}}
          </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <country-code-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus/es";
import { EleMessage } from "ele-admin-plus/es";
import type { EleProTable } from "ele-admin-plus";
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import { PlusOutlined } from "@/components/icons";
import CountryCodeSearch from "./components/country-code-search.vue";
import CountryCodeEdit from "./components/country-code-edit.vue";
import { pageCountryCodes, removeCountryCode, sendConfServer } from "@/api/platform/countryCodeApi";
import type { CountryCode, CountryCodeParam } from "@/api/platform/model/countryCode";
import { useConfigStore } from "@/store/modules/config"; // 导入store
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// 初始化store
const configStore = useConfigStore();


/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof CountryCodeSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: "id",
    label: t('platform.countryCode.id'),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "code",
    label: t('platform.countryCode.code'),
    // width: 60,
    align: 'center',
  },
  {
    prop: "name",
    label: t('platform.countryCode.name'),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "note",
    label: t('platform.countryCode.note'),

    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "timezone",
    label:t('platform.countryCode.timezone'),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "currency",
    label: t('platform.countryCode.currency'),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "phoneLen",
    label: t('platform.countryCode.phoneLen'),
    // minWidth: 110,
    align: 'center',
  },
  {
    prop: "state",
    label:t('platform.countryCode.state'),
    // minWidth: 110,
    formatter: (row: CountryCode) => {
      return row.state === 1 ? t('action.yes') : t('action.no');
    },
    align: 'center',
  },
  {
    label: t('platform.countryCode.masterWalletCleanFlowAmount'),
    prop: 'masterWalletCleanFlowAmount',
    align: 'center',
    minWidth: 110
  },
  {
    label: t('platform.countryCode.childWalletCleanFlowAmount'),
    prop: 'childWalletCleanFlowAmount',
    align: 'center',
    minWidth: 110
  },
  {
    columnKey: "action",
    label: t('action.action'),
    width: 200,
    align: "center",
    slot: "action",
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<CountryCode[]>([]);

/** 当前编辑数据 */
const current = ref<CountryCode | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);


/** 表格数据源 */
const datasource = () => {
  return pageCountryCodes().then((data) => {
    // 将数据存储到store中
    configStore.setCountryCode(data || []);
    // 返回数据给表格组件
    return data;
  });
};

/** 搜索 */
const reload = (where?: CountryCodeParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: CountryCode) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: CountryCode) => {
  ElMessageBox.confirm(
    t('platform.countryCode.sureDel',[row.code]),
    '系统提示',
    { type: 'warning', draggable: true }
  )
    .then(() => {
      const loading = EleMessage.loading({
        message: t('common.loading'),
        plain: true
      });
      removeCountryCode(row.id)
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
    message:t('common.loading'),
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
</script>
