<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-free-game-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '用户免费游戏', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="systemUserTable"
        :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
        </template>
        <template #action="{ row }">
          <!-- <el-link type="primary" :underline="false" @click="openEdit(row)">
            修改
          </el-link>
          <el-divider direction="vertical" />-->
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <user-free-game-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
import UserFreeGameSearch from './components/user-free-game-search.vue';
import UserFreeGameEdit from './components/user-free-game-edit.vue';
import { pageUserFreeGames, removeUserFreeGame } from '@/api/platform/userFreeGameApi';
import type { UserFreeGame, UserFreeGameParam } from '@/api/platform/model/userFreeGame';
import { toDateString, toDateZone } from '@/utils/utils';

/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserFreeGameSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'left',
    fixed: 'left'
  },

  {
    prop: 'uid',
    label: 'uid',
    minWidth: 80,
    align: 'center'
  },
  {
    prop: 'triggerSpinType',
    formatter: (row) => {
      return row.triggerSpinType === 1 ? '免费次数' : '免费游戏';
    },
    label: '类型',
    minWidth: 110,
    align: 'center'
  },
  {
    prop: 'freeGameConfId',
    label: '免费模板',
    minWidth: 100,
    align: 'center'
  },
  {
    prop: 'name',
    label: '名称',
    minWidth: 110,
    align: 'center'
  },
  {
    prop: 'gameId',
    label: '游戏ID',
    minWidth: 110,
    align: 'center'
  },
  {
    prop: 'betAmount',
    label: '下注金额',
    minWidth: 110,
    align: 'center'
  },
  {
    prop: 'base',
    label: '基础',
    minWidth: 110,
    align: 'center',
    children: [
      {
        prop: 'base',
        label: 'base',
        minWidth: 90,
        align: 'center'
      },
      {
        prop: 'rtpIndex',
        label: 'rtpIndex',
        minWidth: 90,
        align: 'center'
      },
      {
        prop: 'bet',
        label: 'bet',
        minWidth: 90,
        align: 'center'
      },
      {
        prop: 'level',
        label: 'level',
        minWidth: 90,
        align: 'center'
      }
    ]
  },
  {
    prop: 'flowMutl',
    label: '流水倍数',
    minWidth: 110,
    align: 'center'
  },
  {
    prop: 'usedSpins',
    label: '已用次数|总次数',
    formatter: (row) => {
      return row.usedSpins + ' / ' + row.totalSpins;
    },
    minWidth: 130,
    align: 'center'
  },
  // {
  //   prop: "totalSpins",
  //   label: "总次数",
  //   minWidth: 110,
  //   align: 'center',
  // },
  {
    prop: 'status',
    label: '状态',
    formatter: (row) => {
      switch (row.status) {
        case 0:
          return 'pending';
        case 1:
          return 'in_progress';
        case 2:
          return 'completed';
        case 3:
          return 'expired';
        case 4:
          return 'forfeited';
        default:
          return 'pending';
      }
    }
  },
  {
    prop: 'totalWin',
    label: '累积赢取',
    minWidth: 110,
    align: 'center'
  },
  {
    prop: 'exampleId',
    label: '钱包模板',
    minWidth: 110,
    align: 'center'
  },
  {
    prop: 'controlSet',
    label: 'rtp信息',
    minWidth: 180,
    align: 'left',
    formatter: (row) => JSON.stringify(row.controlSet)
  },
  {
    prop: 'expireTime',
    // formatter: (row) => toDateString(row.expireTime),
    formatter: (row) => {
      return toDateZone(row.expireTime, row.countryCode);
    },
    label: '有效结束时间',
    minWidth: 110,
    align: 'center'
  },
  {
    label: '时间',
    prop: 'createTime',
    // formatter: (row) => toDateString(row.createTime),
    formatter: (row) => {
      return toDateZone(row.createTime, row.countryCode);
    },
    align: 'center',
    minWidth: 110
  },
  {
    columnKey: 'action',
    label: '操作',
    width: 100,
    align: 'center',
    slot: 'action',
    fixed: 'right',
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<UserFreeGame[]>([]);

/** 当前编辑数据 */
const current = ref<UserFreeGame | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUserFreeGames({
    ...where,
    ...orders,
    ...pages
  });
};

/** 搜索 */
const reload = (where?: UserFreeGameParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: UserFreeGame) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 删除单个 */
const remove = (row: UserFreeGame) => {
  ElMessageBox.confirm('确定要删除用户“' + row.uid + '”吗?', '系统提示', { type: 'warning', draggable: true })
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      removeUserFreeGame(row.id)
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
    .catch(() => { });
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageUserFreeGames({
    ...where,
    ...orders
  });
};
</script>
