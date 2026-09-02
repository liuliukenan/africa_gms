<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <PayRecordSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :max-height="650"  :headerEllipsis="false" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: t('user.payRecord.title') }" :footer-style="{ paddingBottom: '16px' }" cache-key="PayRecord">
        <template #toolbar>
          <el-popconfirm :title="t('user.payRecord.exportConfirm')" @confirm="openExport()" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #payStatus="{ row }">
          <dict-data code="payStatus" v-model="row.payStatus" valueType="number" type="tag" :typeColor="setPayStatus(row.payStatus)" />
        </template>
        <template #status="{ row }">
          <dict-data code="pay_order_status" v-model="row.status" valueType="number" type="tag" :typeColor="setOrderStatus(row.status)" />
        </template>
        <template #channel="{ row }">
          <div>{{ getChannel(row.channel) }}</div>
        </template>
        <template #createTime="{ row }">
          <div>{{ toDateZone(row.createTime, row.countryCode) }}</div>
          <div>{{ toDateZone(row.updateTime, row.countryCode) }}</div>
        </template>
        <template #channelType="{ row }">
          <dict-data code="channelNewType" valueType="number" type="tag" v-model="row.channelType"  />
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'user:payRecord:info'"> {{ t('user.payRecord.table.detail') }} </el-link>
          <el-popconfirm :title="t('user.payRecord.simulateConfirm')" @confirm="doSimulate(row)">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon" link v-permission="'user:payRecord:simulate'" v-if="row.status != 4">
                <span>{{ t('user.payRecord.simulate') }}</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </ele-card>
    <PayRecordInfo :data="current" v-model="showEdit" :statusArr="statusArr" :payStatusArr="payStatusArr" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import { UploadOutlined } from '@/components/icons';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import PayRecordSearch from './components/pay_record-search.vue';
  import PayRecordInfo from './components/pay_record-info.vue';
  import { pagePayRecords, removePayRecord, simulatePay, exportPayRecord } from '@/api/user/payRecordApi';
  import type { PayRecord, PayRecordParam } from '@/api/model/payRecord';
  import { DictionaryData } from '@/api/model/dictdata';
  import { listByCode } from '@/api/system/dictDataApi';
  import { toDateZone } from '@/utils/utils';
  import { useI18n } from 'vue-i18n';
  import { addSecret } from '@/utils/common';
  import { useConfigStore } from '@/store/modules/config.js';
  const { t } = useI18n();
  const setPayStatus = (status: number) => {
    if (status == 0) {
      return 'primary';
    } else if (status == 1) {
      return 'success';
    } else if (status == 2) {
      return 'danger';
    } else {
      return 'primary';
    }
  };
  const setOrderStatus = (status: number) => {
    switch (status) {
      case 0: //未审核
        return 'primary';
      case 1: //已审核
        return 'success';
      case 2: //已拒绝
        return 'danger';
      case 3: //已成功
        return 'success';
      case 4: //已失败
        return 'danger';
      default:
        return 'info';
    }
  };
  const configStore = useConfigStore();
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof PayRecordSearch> | null>(null);
  const getChannel = (channel?: string) => {
    return configStore.ShareChannelArr.find((item) => item.channel === channel)?.channelName;
  };
  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    // {
    //   prop: 'id',
    //   label: 'ID',
    //   width: 60,
    //   align: 'center',
    //   fixed: 'left'
    // },
    {
      prop: 'uid',
      label: t('user.payRecord.table.uid'),
      fixed: 'left',
      align: 'center'
    },
    {
      prop: 'agentId',
      label: t('user.payRecord.table.agentId'),
      width: 80,
      align: 'center'
    },
    {
      prop: 'orderNo',
      label: t('user.payRecord.table.orderNo'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'phone',
      label: t('user.payRecord.table.phone'),
      minWidth: 110,
      align: 'center',
      formatter: (row) => addSecret(row.phone)
    },
    // {
    //   label: t('user.payRecord.table.moneyType'),
    //   prop: 'moneyType',
    //   align: 'center',
    //   formatter: (row) => {
    //     return row.moneyType == 0 ? t('user.payRecord.table.moneyType0') : t('user.payRecord.table.moneyType1');
    //   }
    // },
    {
      prop: 'channel',
      slot: 'channel',
      label: t('user.payRecord.table.channel'),
      align: 'center'
    },
    // {
    //   prop: 'channelType',
    //   slot: 'channelType',
    //   label: t('user.payRecord.table.channelType'),
    //   // minWidth: 90,
    //   align: 'center'
    // },
    // {
    //   prop: 'auxiliary',
    //   label: t('user.payRecord.table.auxiliary'),
    //   align: 'center'
    // },
    {
      prop: 'notifyUrl',
      label: t('user.payRecord.table.notifyUrl'),
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'amount',
      label: t('user.payRecord.table.amount'),
      align: 'center'
    },
    {
      prop: 'totalPayGold',
      formatter: (row) => (row.totalPayGold ? row.totalPayGold : 0),
      label: t('user.payRecord.table.totalPayGold'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'gold',
      label: t('user.payRecord.table.gold'),
      align: 'center'
    },
    {
      prop: 'actualPrice',
      label: t('user.payRecord.table.actualPrice'),
      align: 'center'
    },
    {
      prop: 'transactionId',
      label: t('user.payRecord.table.transactionId'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'payStatus',
      label: t('user.payRecord.table.payStatus'),
      slot: 'payStatus',
      align: 'center'
    },
    {
      prop: 'status',
      label: t('user.payRecord.table.status'),
      slot: 'status',
      align: 'center'
    },
    {
      prop: 'simulator',
      label: t('user.payRecord.table.simulator'),
      formatter: (row) => (row.simulator ? t('user.payRecord.table.simulatorYes') : t('user.payRecord.table.simulatorNo')),
      align: 'center'
    },
    // {
    //   prop: 'resultCode',
    //   label: t('user.payRecord.table.resultCode'),
    //   align: 'center'
    // },
    // {
    //   prop: 'resultDesc',
    //   label: t('user.payRecord.table.resultDesc'),
    //   minWidth: 110,
    //   align: 'left'
    // },
    {
      label: t('user.payRecord.table.createTime'),
      prop: 'createTime',
      slot: 'createTime',
      minWidth: 110,
      align: 'center'
    },
    {
      label: t('user.payRecord.table.remark'),
      prop: 'remark',
      align: 'center',
      minWidth: 110
    },
    {
      columnKey: 'action',
      label: t('action.action'),
      minWidth: 100,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<PayRecord[]>([]);

  /** 当前编辑数据 */
  const current = ref<PayRecord | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  //订单状态
  const statusArr = ref<DictionaryData[]>([]);
  listByCode('orderStatus').then((data) => {
    statusArr.value = data;
  });
  // 支付状态
  const payStatusArr = ref<DictionaryData[]>([]);
  listByCode('payStatus').then((data) => {
    payStatusArr.value = data;
  });
  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    where = { ...where, orderName: orders.order, sortName: orders.sort };
    return pagePayRecords({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: PayRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };
  onMounted(() => {
    // console.log(router.currentRoute.value.query.refresh)
    // if (router.currentRoute.value.query.refresh) {
    //   // 刷新数据
    //   reload();
    // }
  });
  /** 打开编辑弹窗 */
  const openEdit = (row?: PayRecord) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: PayRecord) => {
    ElMessageBox.confirm('确定要删除ID为“' + row.id + '”的数据吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removePayRecord(row.id)
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
  /* 模拟到账 */
  const doSimulate = (row: PayRecord) => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    console.log(row);
    let params = {
      orderNo: row.orderNo || ''
    };
    simulatePay(params)
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
        reload();
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };
  // 导出
  const openExport = () => {
    // exportPayRecord(searchRef.value!.searchParams()).then((res) => {
    //   handleDownload('充值记录', res.data as any);
    // });
    exportPayRecord({ ...searchRef.value!.searchParams() }, 'CZJL').then((res) => {
      ElMessage.success(res);
    });
  };
</script>
<script lang="ts">
  export default {
    name: 'PayRecord'
  };
</script>
<style lang="scss" scoped></style>
