<template>

  <el-card :bordered="false" style="margin: 20px;">
    <!-- 表格 -->
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }" :pagination="false"
      :where="defaultWhere" cache-key="proSystemUserTable" :headerEllipsis="false">
      <template #toolbar>
        <el-button type="primary" class="ele-btn-icon" @click="openEdit()" v-permission="'game:gameChannel:add'">
          <template #icon>
            <plus-outlined />
          </template>
          <span>新建</span>
        </el-button>
      </template>
      <template #createTime="{ row }">
        <div style="font-size: 12px">{{ row.createTime }}</div>
        <div style="font-size: 12px">{{ row.updateTime }}</div>
      </template>
      <template #action="{ row }">
        <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'game:gameChannel:edit'">
          修改
        </el-link>
        <el-divider direction="vertical" v-permission="'game:gameChannel:delete'"/>
        <el-link type="danger" :underline="false" @click="remove(row)" v-permission="'game:gameChannel:delete'"> 删除 </el-link>
      </template>
    </ele-pro-table>
    <!-- 编辑弹窗 -->
    <GameChannelsEdit v-model="showEdit" :data="current" @done="reload" />
  </el-card>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PlusOutlined } from "@/components/icons";
import { EleMessage, EleProTable } from 'ele-admin-plus/es';
import GameChannelsEdit from './components/game-channels-edit.vue';
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import type { GameChannels } from '@/api/game/model/index';
import { ElMessageBox } from 'element-plus';
import { pageGameChannels, removeGameChannels } from '@/api/game/gameChannel/index';
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    prop: 'id',
    width: 70,
    align: 'center',
    fixed: 'left'
  },
  {
    label: 'CHANNEL',
    prop: 'name',
    align: 'center',
  },
  {
    label: 'token',
    prop: 'token',
    slot: 'token',
    align: 'center'
  },
  {
    label: 'IP限制',
    prop: 'ip',
    align: 'center',
    formatter: (row) => JSON.stringify(row.ip)
  },
  {
    label: '状态',
    prop: 'state',
    align: 'center',
    formatter: (row) => row.state ? '正常' : '关闭'
  },
  {
    label: '创建|更新',
    prop: 'createTime',
    align: 'center',
    slot: 'createTime'
  },
  {
    columnKey: "action",
    label: "操作",
    width: 200,
    align: "center",
    slot: "action",
  }
]);

// 表格选中数据
const selection = ref([]);

// 当前编辑数据
const current = ref<GameChannels | null>(null);

// 是否显示编辑弹窗
const showEdit = ref(false);

// 默认搜索条件
const defaultWhere = reactive({});

// 表格数据源
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageGameChannels({ ...where, ...orders, ...pages });
};
/* 搜索 */
const reload = (where?: GameChannels) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
};

/* 打开编辑弹窗 */
const openEdit = (row?: GameChannels) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/* 删除单个 */
const remove = (row: GameChannels) => {

  ElMessageBox.confirm("确定要删除ID为“" + row.id + "”的数据吗?", "系统提示", {
    type: "warning",
    draggable: true,
  })
    .then(() => {
      const loading = EleMessage.loading({
        message: "请求中..",
        plain: true,
      });
      if (!row.id) return
      removeGameChannels(row.id)
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
</script>

<script lang="ts">
export default {
  name: 'GameChannels'
};
</script>
