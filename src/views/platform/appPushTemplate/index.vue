<template>
  <ele-page>
    <app-push-template-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
    <ele-card :body-style="{ paddingTop: '8px' }">
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        :border="true"
        v-model:selections="selections"
        :highlight-current-row="true"
        :export-config="{ fileName: 'APP Push推送模板', datasource: exportSource }"
        :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }"
        cache-key="appPushTemplateTable"
      >
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">新建</el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <!-- <template #countryCode="{ row }">
          <dict-data code="countryCode" :value="row.countryCode" type="tag" />
        </template> -->
        <template #status="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
        <!-- <template #paramNames="{ row }">
          <span v-if="row.paramNames && row.paramNames.length">
            <el-tag v-for="name in row.paramNames" :key="name" size="small" style="margin-right: 4px">
              {{ name }}
            </el-tag>
          </span>
          <span v-else>--</span>
        </template> -->
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)">修改</el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">删除</el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <app-push-template-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
import AppPushTemplateSearch from './components/app-push-template-search.vue';
import AppPushTemplateEdit from './components/app-push-template-edit.vue';
import { pageAppPushTemplates, removeAppPushTemplate, reloadAppPushTemplate } from '@/api/platform/appPushTemplateApi';
import type { AppPushTemplateVO, AppPushTemplateQuery } from '@/api/platform/model/appPushTemplate';
import { useConfigStore } from '@/store/modules/config';
const configStore = useConfigStore();
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof AppPushTemplateSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center',
    fixed: 'left'
  },
  // {
  //   prop: 'templateCode',
  //   label: '模板编码',
  //   minWidth: 130,
  //   align: 'left'
  // },
  {
    prop: 'templateName',
    label: '模板名称',
    minWidth: 140,
    align: 'left'
  },
  {
    prop: 'countryCode',
    slot: 'countryCode',
    label: '国家',
    minWidth: 100,
    align: 'center'
  },
  {
    prop: 'title',
    label: '推送标题',
    minWidth: 200,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    prop: 'content',
    label: '推送内容',
    minWidth: 200,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    prop: 'paramNames',
     formatter: (row) => {
        return JSON.stringify(row.paramNames);
      },
    label: '参数列表',
    minWidth: 180,
    align: 'left'
  },
  {
    prop: 'status',
    slot: 'status',
    label: '状态',
    width: 80,
    align: 'center'
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
const selections = ref<AppPushTemplateVO[]>([]);

/** 当前编辑数据 */
const current = ref<AppPushTemplateVO | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || undefined
});
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageAppPushTemplates({
    ...defaultWhere,
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: AppPushTemplateQuery) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: AppPushTemplateVO) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: AppPushTemplateVO) => {
  ElMessageBox.confirm('确定要删除"' + row.templateName + '"吗?', '系统提示', {
    type: 'warning',
    draggable: true
  })
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      removeAppPushTemplate(row.id)
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
    .catch(() => {});
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageAppPushTemplates({
    ...where,
    ...orders
  });
};

/** 发送到服务器 */
const sendServer = () => {
  reloadAppPushTemplate()
    .then((msg) => {
      EleMessage.success(msg || '发送成功');
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};
</script>
