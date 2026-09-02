<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <company-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> {{ t('action.add') }} </el-button>
          <el-popconfirm :title="t('common.confirmSendServer')" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>{{ t('action.sendServer') }}</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #appUrl="{ row }">
          {{ JSON.stringify(row.appUrl || '{}') || '-' }}
        </template>
        <template #companyId="{ row }">
          <dict-data code="companyType" valueType="number" type="tag" v-model="row.companyId" />
        </template>

        <template #exend="{ row }">
          {{ JSON.stringify(row.exend || '{}') || '-' }}
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> {{ t('action.edit') }} </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> {{ t('action.delete') }} </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <company-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import CompanySearch from './components/company-search.vue';
  import CompanyEdit from './components/company-edit.vue';
  import { pageCompanys, removeCompany, sendConfServer } from '@/api/platform/companyApi';
  import type { Company, CompanyParam } from '@/api/platform/model/company';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof CompanySearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: t('platform.company.id'),
      width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'companyId',
      label: 'company',
      align: 'left',
      slot: 'companyId'
    },
    {
      prop: 'appkey',
      label: t('platform.company.appkey'),
      minWidth: 140,
      align: 'left'
    },

    {
      prop: 'userPrefix',
      label: t('platform.company.userPrefix'),
      // minWidth: 110,
      align: 'left'
    },
    {
      prop: 'appUrl',
      slot: 'appUrl',
      label: t('platform.company.appUrl'),
      minWidth: 150,
      align: 'left'
    },
    {
      prop: 'exend',
      slot: 'exend',
      label: t('platform.company.exend'),
      minWidth: 150,
      align: 'left'
    },
    {
      label: t('platform.company.createTime'),
      prop: 'createTime',
      align: 'left'
      // minWidth: 110
    },
    {
      columnKey: 'action',
      label: t('action.action'),
      width: 130,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<Company[]>([]);

  /** 当前编辑数据 */
  const current = ref<Company | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageCompanys({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: CompanyParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: Company) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: Company) => {
    ElMessageBox.confirm(t('common.sureDel', String(row.id)), t('action.confirm'), { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: t('common.loading'),
          plain: true
        });
        removeCompany(row.id)
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
  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: t('common.loading'),
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
    return pageCompanys({
      ...where,
      ...orders
    });
  };
</script>
