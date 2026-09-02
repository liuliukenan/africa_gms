<template>
  <div class="records-container">
    <!-- 搜索表单 -->
    <RecordsSearch @search="handleSearch" ref="searchRef" />

    <!-- 数据表格 -->
    <ele-pro-table ref="tableRef" cache-key="register-daily-bonus-records" :datasource="datasource" :columns="columns" :where="where" :response-processor="responseProcessor" :toolbar="true" :toolbar-config="{ tools: ['export'] }" :is-show-card="true">
      <template #toolbar>
        <el-popconfirm :title="t('common.sureExport')" @confirm="openExport" width="250px">
          <template #reference>
            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">
              {{ t('action.export') }}
            </el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #subType="{ row }">
        <span>{{ row.subType || '-' }}</span>
      </template>
      <template #goodsType="{ row }">
        <dict-data :code="'goods_type'" v-model="row.goodsType" value-type="number" size="small" type="tag" />
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 0" type="success">正常</el-tag>
        <el-tag v-else-if="row.status === 1" type="warning">IP风控</el-tag>
        <el-tag v-else-if="row.status === 2" type="danger">设备风控</el-tag>
        <span v-else>-</span>
      </template>
      <template #compensation="{ row }">
        <el-tag v-if="row.compensation" type="info">已补发</el-tag>
        <span v-else>-</span>
      </template>
    </ele-pro-table>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import type { ActRecordQuery, ActRecordVO } from '@/api/welfare/model/registerDailyBonus';
  import { pageRegisterDailyBonusRecords, exportRegisterDailyBonusRecords } from '@/api/welfare/registerDailyBonusApi';
  import type { ApiResult, PageResult } from '@/api/model';
  import RecordsSearch from './records-search.vue';
  import { toDateZone } from '@/utils/utils.js';
  import { useConfigStore } from '@/store/modules/config.js';
  import { UploadOutlined } from '@/components/icons';
  import { ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  // 搜索条件
  const where = reactive<ActRecordQuery>({});
  const { t } = useI18n();
  // 表格引用
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  const searchRef = ref<InstanceType<typeof RecordsSearch> | null>(null);
  // 列定义
  const columns = ref<Columns>([
    { prop: 'id', label: 'ID', align: 'center' },
    { prop: 'uid', label: '用户ID', align: 'center' },
    // { prop: 'countryCode', label: '国家代码',  align: 'center' },
    // { prop: 'subType', label: '二级类型',  align: 'center', slot: 'subType' },
    { prop: 'goodsType', label: '奖励类型', align: 'center', slot: 'goodsType' },
    { prop: 'amount', label: '奖励数量', align: 'center' },
    { prop: 'flowMultiple', label: '流水倍数', align: 'center' },
    { prop: 'status', label: '状态', align: 'center', slot: 'status' },
    { prop: 'compensation', label: '补发', align: 'center', slot: 'compensation' },
    { prop: 'createTime', label: '创建时间', align: 'center', formatter: (row) => toDateZone(row.createTime, row.countryCode) }
  ]);

  // 搜索事件
  const handleSearch = (params?: ActRecordQuery) => {
    Object.assign(where, params || {});
    tableRef.value?.reload();
  };
  const configStore = useConfigStore();
  const defaultWhere = reactive({
    countryCode: configStore.countryArr?.[0]?.code || '',
    startDate: '',
    endDate: ''
  });
  // 数据源
  const datasource: DatasourceFunction = ({ page, limit }) => {
    return pageRegisterDailyBonusRecords({
      ...defaultWhere,
      ...where,
      page,
      limit
    });
  };

  // 响应处理
  const responseProcessor = (res: ApiResult<PageResult<ActRecordVO>>) => {
    return {
      data: res.data?.list || [],
      total: res.data?.total || 0
    };
  };
  const openExport = () => {
    exportRegisterDailyBonusRecords({ ...searchRef.value!.searchParams() }, 'RegisterDailyBonusRecords').then((res) => {
      ElMessage.success(res);
    });
  };
</script>

<style scoped>
  .records-container {
    padding: 16px;
  }
</style>
