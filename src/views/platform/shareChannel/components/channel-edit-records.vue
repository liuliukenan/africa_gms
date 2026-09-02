<template>
  <ele-page>
    <!-- <ele-card :body-style="{ paddingTop: '8px' }"> -->
    <ChannelEditRecordsSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="channelEditRecords">
      <template #toolbar>
        <el-popconfirm title="确认导出表格数据吗？" @confirm="openExport" width="250px">
          <template #reference>
            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined"> 导出 </el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #oldChannel="{ row }">
        <span>{{ row.oldChannel }}</span>
        <span style="margin-left: 4px"> ({{ row.oldChannelName }}) </span>
      </template>
      <template #newChannel="{ row }">
        <span>{{ row.newChannel }}</span>
        <span style="margin-left: 4px"> ({{ row.newChannelName }}) </span>
      </template>
    </ele-pro-table>
    <!-- </ele-card> -->
  </ele-page>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { UploadOutlined } from '@/components/icons';
  import ChannelEditRecordsSearch from './channel-edit-records-search.vue';
  import { pageChannelChangeRecord, exportChannelChangeRecord } from '@/api/platform/channelChangeRecordApi';
  import type { ChannelChangeRecordVO, ChannelChangeRecordQuery } from '@/api/platform/model/channelChangeRecord';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';
  import { ElMessage } from 'element-plus';

  const configStore = useConfigStore();
  configStore.getShareChannels();
  const getCountryName = (countryCode: number) => {
    return configStore.countryArr?.find((item) => item.code == countryCode)?.name || 254;
  };
  const searchRef = ref<InstanceType<typeof ChannelEditRecordsSearch> | null>(null);
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  const columns = ref<Columns>([
    {
      prop: 'id',
      label: '记录ID',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'uid',
      label: '玩家ID',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'countryCode',
      label: '国家代码',
      formatter: (row: ChannelChangeRecordVO) => getCountryName(row.countryCode || 254),
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'oldChannel',
      label: '原渠道',
      minWidth: 120,
      align: 'center',
      slot: 'oldChannel'
    },
    {
      prop: 'newChannel',
      label: '新渠道',
      minWidth: 120,
      align: 'center',
      slot: 'newChannel'
    },
    {
      prop: 'operatorId',
      label: '操作人ID',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'remark',
      label: '备注',
      minWidth: 120,
      align: 'center'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: 160,
      align: 'center',
      formatter: (row: ChannelChangeRecordVO) => toDateZone(row.createTime, row.countryCode)
    }
  ]);

  const selections = ref<ChannelChangeRecordVO[]>([]);

  const defaultWhere = reactive<ChannelChangeRecordQuery>({
    countryCode: configStore.countryArr?.[0]?.code,
    startDate: undefined,
    endDate: undefined
  });

  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageChannelChangeRecord({ ...defaultWhere, ...where, ...orders, ...pages });
  };

  const reload = (where?: ChannelChangeRecordQuery) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  const openExport = () => {
    exportChannelChangeRecord({ ...searchRef.value!.searchParams() }, 'QDXGJL').then((res) => {
      ElMessage.success(res);
    });
  };

  const getChannelName = (channel?: number): string => {
    if (!channel) return '';
    const found = configStore.ShareChannelArr?.find((item: any) => item.channel === channel);
    return found?.channelName || '';
  };
</script>

<script lang="ts">
  export default { name: 'channelEditRecords' };
</script>
