<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <gift-card-serie-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '礼包卡系列', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template>
        <template #action="{ row }">
          <el-link type="success" :underline="false" @click="openNodeAdd(row)"> 创建节点 </el-link>
          <el-divider direction="vertical" />
          <el-link type="warning" :underline="false" @click="openNodeInfo(row)"> 节点详情 </el-link>
          <el-divider direction="vertical" />
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <gift-card-serie-edit :data="current" v-model="showEdit" @done="reload" />
    <gift-card-node-add :data="current" v-model="showNode" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  import GiftCardSerieSearch from './components/gift-card-serie-search.vue';
  import GiftCardSerieEdit from './components/gift-card-serie-edit.vue';
  import GiftCardNodeAdd from './components/gift-card-node-add.vue';
  import { pageGiftCardSeries, removeGiftCardSerie } from '@/api/giftCard/giftCardSerieApi';
  import type { GiftCardSerie, GiftCardSerieParam } from '@/api/giftCard/model/giftCardSerie.js';
  import { toDateString } from '@/utils/utils.js';
  import { useRouter } from 'vue-router';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof GiftCardSerieSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: '主键ID',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '系列名称',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'hasMaster',
      label: '是否主钱包',
      formatter: (row) => (row.hasMaster ? '主钱包' : '钱包模板'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'walletName',
      label: '钱包模板类型',
      formatter: (row) => row.walletName ?? '-',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'useType',
      label: '使用类型',
      formatter: (row) => (row.useType === 0 ? '不限制' : row.useType === 1 ? '充值后才能使用' : '-'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'amount',
      label: '礼品卡面额',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'flowMultiple',
      label: '流水倍数',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'useStrategy',
      label: '领取策略',
      formatter: (row) => (row.useStrategy === 1 ? '永久一次' : row.useStrategy === 2 ? '每日一次' : '-'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'startDate',
      label: '启用开始时间',
      formatter: (row) => toDateString(row.startDate) ?? '-',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'endDate',
      label: '启用结束时间',
      formatter: (row) => toDateString(row.endDate) ?? '-',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      formatter: (row) => (row.status === 1 ? '启用' : '禁用'),
      minWidth: 110,
      align: 'center'
    },
    {
      label: '时间',
      prop: 'createTime',
      formatter: (row) => toDateString(row.createTime) ?? '-',
      align: 'center',
      minWidth: 110
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 200,
      fixed: 'right',
      align: 'left',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<GiftCardSerie[]>([]);

  /** 当前编辑数据 */
  const current = ref<GiftCardSerie | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);
  const showNode = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageGiftCardSeries({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: GiftCardSerieParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: GiftCardSerie) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  const openNodeAdd = (row?: GiftCardSerie) => {
    current.value = row ?? null;
    showNode.value = true;
  };

  /** 删除单个 */
  const remove = (row: GiftCardSerie) => {
    ElMessageBox.confirm('确定要删除“' + row.id + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeGiftCardSerie(row.id)
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
    return pageGiftCardSeries({
      ...where,
      ...orders
    });
  };
  const router = useRouter();
  const openNodeInfo = (row?: GiftCardSerie) => {
    current.value = row ?? null;
    router.push('/giftCard/giftCardNode?serieId=' + current.value?.id);
  };
</script>
