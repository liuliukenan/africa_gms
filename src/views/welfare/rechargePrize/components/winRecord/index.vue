<template>
  <ele-page>
    <el-descriptions class="margin-top" title="已发奖励统计" :column="4" border direction="vertical" style="margin-bottom: 20px">
      <el-descriptions-item v-for="item in giftCounts"  :label="item.goodName" align="center">{{item.num}}</el-descriptions-item>
    </el-descriptions>
    <search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="openAwardTable">
      <template #type="{ row }">
        <dict-data code="winType" valueType="number" type="tag" v-model="row.type" />
      </template>
      <template #status="{ row }">
        <dict-data code="sendStatus" valueType="number" type="tag" v-model="row.status" />
      </template>
      <template #action="{ row }">
        <!-- 未处理显示发货 -->
        <el-link type="danger" v-if="row.status == 0" :underline="false" @click="openInfo(1, row)"> 发货 </el-link>
        <!-- 已发货显示完成 -->
        <el-link type="success" v-if="row.status == 1" :underline="false" @click="finish(row)"> 完成 </el-link>
        <el-divider v-if="row.status == 0 || row.status == 1" direction="vertical" />
        <el-link type="warning" :underline="false" @click="openInfo(0, row)"> 详情 </el-link>
      </template>
    </ele-pro-table>
    <!-- </ele-card> -->
    <Info :title="titleType" :data="current" v-model="showInfo" @done="reload" />
    <Info :title="titleType" :data="current" v-model="showInfo" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  // import { PlusOutlined } from "@/components/icons";
  import Search from './search.vue';
  import Info from './info.vue';
  import { pageWinAward, updateWinAward, winAwardGiftCount } from '@/api/welfare/rechargePrize';
  import type { WinAward, WinAwardParam } from '@/api/welfare/model';
  import { ElMessageBox } from 'element-plus';

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof Search> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'uid',
      label: '用户ID',
      // width: 60,
      align: 'center'
    },
    {
      prop: 'username',
      label: '用户名',
      // width: 60,
      align: 'center'
    },
    {
      prop: 'goodName',
      label: '物品名称',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'num',
      label: '数量',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'type',
      slot: 'type',
      label: '奖励类型',
      // minWidth: 110,
      align: 'center'
    },

    {
      prop: 'receiver',
      label: '收货人',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'address',
      label: '收货地址',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'expressNumer',
      label: '快递单号',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'expressCompany',
      label: '快递公司',
      // minWidth: 110,
      align: 'center'
    },
    // {
    //     prop: "addressStatus",
    //     label: "地址状态",
    //     minWidth: 110,
    //     align: 'center',
    // },
    {
      prop: 'status',
      slot: 'status',
      label: '状态',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'postalCode',
      label: '邮编',
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      // minWidth: 110,
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
  const selections = ref<WinAward[]>([]);

  /** 当前编辑数据 */
  const current = ref<WinAward | null>(null);

  /** 是否显示编辑弹窗 */
  const showInfo = ref(false);
  const titleType = ref(0);

  const giftCounts = ref<WinAward[]>([]);

  winAwardGiftCount().then((data) => {
    giftCounts.value = data
  });

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageWinAward({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: WinAwardParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
    winAwardGiftCount().then((res) => {
      giftCounts.value = data;
    });
  };

  /** 打开详情弹窗 */
  const openInfo = (type: number, row?: WinAward) => {
    current.value = row ?? null;
    titleType.value = type;
    showInfo.value = true;
  };
  /* 完成 */
  const finish = (row: WinAward) => {
    ElMessageBox.confirm('确定要完成用户ID为“' + row.uid + '”的数据吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        if (!row.id) return;
        let params = { ...row, status: 2 };
        updateWinAward(params)
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
</script>
