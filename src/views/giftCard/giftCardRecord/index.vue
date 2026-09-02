<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <gift-card-record-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '礼包卡记录', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <!-- <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template> -->
        <template #action="{ row }">
          <el-link type="danger" :underline="false" @click="handleVoid(row)" v-if="row.status === 0"> 作废 </el-link>
          <!-- <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link> -->
        </template>
      </ele-pro-table>
    </ele-card>
    <gift-card-record-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import GiftCardRecordSearch from './components/gift-card-record-search.vue';
  import GiftCardRecordEdit from './components/gift-card-record-edit.vue';
  import { pageGiftCardRecords, voidGiftCardRecord } from '@/api/giftCard/giftCardRecordApi';
  import type { GiftCardRecord, GiftCardRecordParam } from '@/api/model/giftCardRecord';
  import { toDateString } from '@/utils/utils.js';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof GiftCardRecordSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: '主键ID',
      width: 80,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'serieId',
      label: '系列名称(ID)',
      formatter: (row) => row.serieName + ' (' + row.serieId + ')',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'nodeId',
      label: '节点名称(ID)',
      formatter: (row) => row.nodeName + ' (' + row.nodeId + ')',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'walletName',
      label: '钱包名称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'cardCode',
      label: '唯一卡号',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'amount',
      label: '金额',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'useStrategy',
      label: '领取策略',
      formatter: (row) => (row.useStrategy === 1 ? '永久一次' : row.useStrategy === 2 ? '每日一次' : ''),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'userId',
      label: '用户ID',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'status',
      label: '卡状态',
      formatter: (row) => (row.status === 0 ? '待使用' : row.status === 1 ? '已核销' : row.status === 2 ? '已作废' : '-'),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'useTime',
      formatter: (row) => toDateString(row.useTime) ?? '-',
      label: '核销时间',
      minWidth: 110,
      align: 'left'
    },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateString(row.createTime) ?? '-',
      align: 'left',
      minWidth: 110
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 150,
      align: 'center',
      fixed: 'right',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<GiftCardRecord[]>([]);

  /** 当前编辑数据 */
  const current = ref<GiftCardRecord | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGiftCardRecords({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: GiftCardRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: GiftCardRecord) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const handleVoid = (row: GiftCardRecord) => {
    ElMessageBox.confirm('确定要作废id为“' + row.id + '”的数据吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        voidGiftCardRecord(row.id)
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
    return pageGiftCardRecords({
      ...where,
      ...orders
    });
  };
</script>
