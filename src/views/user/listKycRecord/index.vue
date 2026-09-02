<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <listKycRecord-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="listKycRecord">
        <!-- <template #toolbar>
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
                {{ t('action.export') }}
              </el-button>
            </template>
          </el-popconfirm>
        </template> -->

        <!-- 国家代码 -->
        <template #countryCode="{ row }">
          {{ configStore.countryArr?.find((item: { code: number; name: string }) => item.code === row.countryCode)?.name || row.countryCode }}
        </template>

        <!-- 身份证正面 -->
        <template #idCardFrontUrl="{ row }">
          <el-image v-if="row.idCardFrontUrl" :src="row.idCardFrontUrl" style="width: 48px; height: 32px" :preview-src-list="[row.idCardFrontUrl]" :preview-teleported="true" fit="cover" lazy />
          <span v-else>-</span>
        </template>

        <!-- 身份证背面 -->
        <template #idCardBackUrl="{ row }">
          <el-image v-if="row.idCardBackUrl" :src="row.idCardBackUrl" style="width: 48px; height: 32px" :preview-src-list="[row.idCardBackUrl]" :preview-teleported="true" fit="cover" lazy />
          <span v-else>-</span>
        </template>

        <!-- 手持自拍 -->
        <template #selfieUrl="{ row }">
          <el-image v-if="row.selfieUrl" :src="row.selfieUrl" style="width: 48px; height: 32px" :preview-src-list="[row.selfieUrl]" :preview-teleported="true" fit="cover" lazy />
          <span v-else>-</span>
        </template>

        <!-- 是否满18岁 -->
        <template #ageConfirmed="{ row }">
          <el-tag :type="row.ageConfirmed ? 'success' : 'info'" size="small">
            {{ row.ageConfirmed ? '是' : '否' }}
          </el-tag>
        </template>

        <!-- 审核状态 -->
        <template #status="{ row }">
          <dict-data code="kycStatus" v-model="row.status" value-type="number" type="tag" />
        </template>
        <!-- 操作列 -->
        <template #action="{ row }">
          <el-button type="warning" link @click="openDetail(row)"> 详情</el-button>
          <el-button type="primary" v-if="!row.status" link @click="openAudit(row)"> 审核 </el-button>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- KYC审核弹窗 -->
    <listKycRecord-audit :data="currentAuditRow" v-model="showAudit" @done="reload" />

    <!-- KYC详情弹窗 -->
    <listKycRecord-detail :id="currentDetailId" v-model="showDetail" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { dayjs, ElMessage } from 'element-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { UploadOutlined, CheckOutlined, EyeOutlined } from '@/components/icons';
  import ListKycRecordSearch from './components/listKycRecord-search.vue';
  import ListKycRecordAudit from './components/listKycRecord-audit.vue';
  import ListKycRecordDetail from './components/listKycRecord-detail.vue';
  import { pageListKycRecord, exportListKycRecord } from '@/api/user/listKycRecordApi';
  import type { ListKycRecordVO, ListKycRecordParam } from '@/api/user/model/listKycRecord';
  import { useI18n } from 'vue-i18n';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';

  const { t } = useI18n();
  const configStore = useConfigStore();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof ListKycRecordSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'ID',
      width: 70,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'uid',
      label: '用户ID',
      minWidth: 90,
      align: 'left'
    },
    {
      prop: 'countryCode',
      slot: 'countryCode',
      label: '国家',
      minWidth: 100,
      align: 'left'
    },
    {
      prop: 'realName',
      label: '真实姓名',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'nationalId',
      label: '证件号',
      minWidth: 150,
      align: 'left'
    },
    {
      prop: 'phone',
      label: '手机号',
      minWidth: 150,
      align: 'left'
    },
    // {
    //   prop: 'idCardFrontUrl',
    //   slot: 'idCardFrontUrl',
    //   label: '身份证正面',
    //   width: 100,
    //   align: 'center'
    // },
    // {
    //   prop: 'idCardBackUrl',
    //   slot: 'idCardBackUrl',
    //   label: '身份证背面',
    //   width: 100,
    //   align: 'center'
    // },
    // {
    //   prop: 'selfieUrl',
    //   slot: 'selfieUrl',
    //   label: '手持自拍',
    //   width: 100,
    //   align: 'center'
    // },
    {
      prop: 'ageConfirmed',
      slot: 'ageConfirmed',
      label: '已满18岁',
      width: 100,
      align: 'center'
    },
    {
      prop: 'status',
      slot: 'status',
      label: '审核状态',
      width: 90,
      align: 'center'
    },
    {
      prop: 'handleRemark',
      label: '审核备注',
      minWidth: 130,
      align: 'left'
    },
    {
      prop: 'handleBy',
      label: '审核人ID',
      minWidth: 100,
      align: 'left'
    },
    {
      prop: 'handleTime',
      label: '审核时间',
      formatter: (row) => toDateZone(row.handleTime, row.countryCode),
      minWidth: 160,
      align: 'left'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      formatter: (row) => toDateZone(row.createTime, row.countryCode),
      minWidth: 160,
      align: 'left'
    },
    {
      prop: 'updateTime',
      label: '更新时间',
      formatter: (row) => toDateZone(row.updateTime, row.countryCode),
      minWidth: 160,
      align: 'left'
    },
   {
      columnKey: 'action',
      label: '操作',
      width: 150,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<ListKycRecordVO[]>([]);

  /** 默认搜索条件 */
  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  });

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageListKycRecord({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  /** 审核弹窗 */
  const showAudit = ref(false);
  const currentAuditRow = ref<ListKycRecordVO | null>(null);

  /** 详情弹窗 */
  const showDetail = ref(false);
  const currentDetailId = ref<number | null>(null);

  /** 打开审核弹窗 */
  const openAudit = (row: ListKycRecordVO) => {
    currentAuditRow.value = row;
    showAudit.value = true;
  };

  /** 打开详情弹窗 */
  const openDetail = (row: ListKycRecordVO) => {
    currentDetailId.value = row.id ?? null;
    showDetail.value = true;
  };

  /** 搜索 */
  const reload = (where?: ListKycRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 导出 */
  const openExport = () => {
    exportListKycRecord({ ...searchRef.value!.searchParams() }, 'KYC-audit-records').then((res) => {
      ElMessage.success(res);
    });
  };

  /** 审核状态标签类型 */
  const statusTagType = (status?: string): 'success' | 'warning' | 'info' | 'danger' => {
    const map: Record<string, 'success' | 'warning' | 'info' | 'danger'> = {
      '0': 'info',
      '1': 'success',
      '2': 'danger'
    };
    return map[status || ''] || 'info';
  };

  /** 审核状态文本 */
  const statusLabel = (status?: string) => {
    const map: Record<string, string> = {
      '0': '待审核',
      '1': '通过',
      '2': '拒绝'
    };
    return map[status || ''] || status || '-';
  };
</script>

<script lang="ts">
  export default { name: 'listKycRecord' };
</script>
