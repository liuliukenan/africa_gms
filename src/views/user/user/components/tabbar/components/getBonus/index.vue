<template>
  <ele-page>
    <ele-pro-table row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :footer-style="{ paddingBottom: '16px' }" cache-key="getBonusTable" :tools="['reload', 'columns', 'maximized']" :show-summary="true" :summary-method="getSummaries">
      <template #type="{ row }">
        <dict-data v-model="row.type" code="money_source" value-type="number" type="tag" />
      </template>
    </ele-pro-table>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Column, Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { getUserWelfareWalletRecordPage } from '@/api/user/userApi';
  import type { UserWelfareWalletRecordVO } from '@/api/model/user';
  import { toDateZone } from '@/utils/utils';
  import { formatNumber } from '@/utils/common';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps<{
    /** 修改回显的数据 */
    uid: number;
  }>();

  /** 表格列配置 */
  const columns = ref<Columns>([
    // {
    //   prop: 'id',
    //   label: t('user.userList.getBonus.id'),
    //   align: 'center'
    // },
    // {
    //   prop: 'countryCode',
    //   label: t('user.userList.getBonus.countryCode'),
    //   align: 'center'
    // },
    {
      prop: 'createTime',
      label: t('user.userList.getBonus.createTime'),
      align: 'center',
      formatter: (row) => toDateZone(row.createTime, row.countryCode)
    },
    {
      prop: 'type',
      slot: 'type',
      label: t('user.userList.getBonus.type'),
      align: 'center'
    },
    {
      prop: 'amount',
      label: t('user.userList.getBonus.amount'),
      align: 'center'
    },
    {
      prop: 'afterAmount',
      label: t('user.userList.getBonus.afterAmount'),
      align: 'center'
    },
    {
      prop: 'walletId',
      label: t('user.userList.getBonus.walletId'),
      align: 'center'
    },
    {
      prop: 'orderNo',
      label: t('user.userList.getBonus.orderNo'),
      align: 'center'
    }
  ]);
  /** 表格选中数据 */
  const selections = ref<UserWelfareWalletRecordVO[]>([]);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    where = {
      ...where,
      sortName: orders.sort,
      orderName: orders.order,
      ...pages,
      size: pages.limit,
      countryCode: 254,
      uid: props!.uid
    };
    return getUserWelfareWalletRecordPage(where);
  };
  /** 表格合计行：仅合计 amount 列 */
  const getSummaries = ({ columns, data }) => {
    const sums: string[] = [];
    const labelIndex = 0;
    columns.forEach((column: Column, index: number) => {
      if (index === labelIndex) {
        sums[index] = t('user.userList.userTabbar.total');
      } else if (column.property === 'amount') {
        const total = data.reduce((prev: number, curr: UserWelfareWalletRecordVO) => prev + Number(curr.amount ?? 0), 0);
        sums[index] = formatNumber(total);
      } else {
        sums[index] = '';
      }
    });
    return sums;
  };
</script>
