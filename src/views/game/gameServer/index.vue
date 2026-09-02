<template>
  <div class="ele-body">
    <el-card :bordered="false" style="margin: 20px;">
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }"
        :where="defaultWhere" cache-key="proSystemUserTable" :headerEllipsis="false">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" @click="openEdit()" v-permission="'game:gameServer:add'">
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
        <template #channelId="{ row }">
          <el-tag>{{channelArr.find(v=>v.id==row.channelId)?.name}}</el-tag>
        </template>
        <template #serverType="{ row }">
          <dict-data code="serverType" v-model="row.serverType" type="tag" valueType="number" />
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'game:gameServer:edit'">
            修改
          </el-link>
          <el-divider direction="vertical" v-permission="'game:gameServer:delete'"/>
          <el-link type="danger" :underline="false" @click="remove(row)" v-permission="'game:gameServer:delete'"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <GameServerEdit v-model="showEdit" :data="current" @done="reload" :channelArr="channelArr"/>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PlusOutlined } from "@/components/icons";
import { EleMessage, EleProTable } from 'ele-admin-plus/es';
import { pageGameServers, removeGameServer } from '@/api/game/gameServer/index';
import GameServerEdit from './components/gameServer-edit.vue';
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import type { GameChannels, GameServer } from '@/api/game/model/index';
import { ElMessageBox } from 'element-plus';
import { pageGameChannels } from '@/api/game/gameChannel/index';
// 表格实例
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    prop: 'id',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    label: '服务器名称',
    prop: 'name',
    minWidth: 110,
    align: 'center',
  },
  {
    label: '服务器类型',
    prop: 'serverType',
    slot: 'serverType',
    minWidth: 110,
    align: 'center'
  },
  {
    label: '服务器地址',
    prop: 'addr',
    minWidth: 110,
    align: 'center',
  },
  {
    label: '渠道类型',
    prop: 'channelId',
    minWidth: 110,
    slot: 'channelId',
    align: 'center'
  },
  {
    label: '状态',
    prop: 'state',
    minWidth: 110,
    align: 'center',
    formatter: (row) => row.state ? '启用' : '停用'
  },
  {
    label: '创建|更新',
    prop: 'createTime',
    align: 'left',
    width: 130,
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
const current = ref<GameServer | null>(null);

// 是否显示编辑弹窗
const showEdit = ref(false);

// 默认搜索条件
const defaultWhere = reactive({});

// 表格数据源
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageGameServers({ ...where, ...orders, ...pages });
};
const channelArr = ref<GameChannels[]>([]);
// 获取渠道类型
const getGameChannels = () => {
  pageGameChannels().then((list) => {
    channelArr.value = list || [];
  })
    .catch((e) => {
      EleMessage.error(e.message);
    });
}
getGameChannels()
/* 搜索 */
const reload = (where?: GameServer) => {
  selection.value = [];
  tableRef?.value?.reload({ page: 1, where });
};

/* 打开编辑弹窗 */
const openEdit = (row?: GameServer) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/* 删除单个 */
const remove = (row: GameServer) => {

  ElMessageBox.confirm("确定要删除ID为“" + row.id + "”的数据吗?", "系统提示", {
    type: "warning",
    draggable: true,
  })
    .then(() => {
      const loading = EleMessage.loading({
        message: "请求中..",
        plain: true,
      });
      if(!row.id) return
      removeGameServer(row.id)
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
  name: 'GameServer'
};
</script>
