<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <ele-split-panel ref="splitRef" flex-table size="256px" allow-collapse
        :custom-style="{ borderWidth: '0 1px 0 0', padding: '16px 0' }"
        :body-style="{ padding: '16px 16px 0 0', overflow: 'hidden' }" :style="{ height: '100%', overflow: 'visible' }">

        <ele-pro-table ref="tableRef" row-key="id"  highlight-current-row  :headerEllipsis="false" :columns="columns" :datasource="datasource"  @done="done"
          v-model:current="current" :pagination="false" @update:current="rowClick" bordered :tools="false"  
          class="dict-table" cache-key="proReback">
          <template #toolbar>
            <el-space :size="10">
              <el-button type="primary" class="ele-btn-icon" @click="openEdit()" >
                <template #icon>
                  <plus-outlined />
                </template>
                <span>新建1</span>
              </el-button>
              <el-button type="warning" :disabled="!current" class="ele-btn-icon" @click="openEdit(current ? current : undefined)" >
                <template #icon>
                  <edit-outlined />
                </template>
                <span>修改</span>
              </el-button>
              <el-button danger type="danger" :disabled="!current" class="ele-btn-icon" @click="remove" >
                <template #icon>
                  <delete-outlined />
                </template>
                <span>删除</span>
              </el-button>
            </el-space>
          </template>
        </ele-pro-table>
        <template #body>
          <RightList v-if="current && current.channelId" :channel-id="current.channelId"
            :has-assign-item="current.hasAssignItem||false" :type="current.channelType||''" />
        </template>
      </ele-split-panel>
      <left-edit v-model="showEdit" :data="current" @done="reload" />
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
import { onMounted, ref, } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable, EleSplitPanel } from 'ele-admin-plus/es';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@/components/icons';
// import { useMobile } from '@/utils/use-mobile';
import RightList from './components/right-list.vue';
import LeftEdit from './components/left-edit.vue';
import { payChannels, removePayChannel } from '@/api/pay/payChannel';
import type { Columns, DatasourceFunction } from "ele-admin-plus/es/ele-pro-table/types";
import type { PayChannel } from '@/api/pay/model/index'
defineOptions({ name: 'SystemDictionary' });

/** 分割面板组件 */
const splitRef = ref<InstanceType<typeof EleSplitPanel> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 选中数据 */
const current = ref<PayChannel | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
// 表格列配置
const columns = ref<Columns>([
  {
    label: 'ID',
    prop: 'channelId',
    width: 60,
    fixed: 'left'
  },
  {
    label: '返水渠道',
    prop: 'channelType'
  }
]);

// 表格数据源
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return payChannels({
    ...where,
    ...orders,
    ...pages,
  });
};
/* 刷新表格 */
const reload = () => {
  tableRef?.value?.reload();
};
/* 行点击事件 */
const rowClick = (row: PayChannel) => {
  current.value = row;
  console.log('row', row);
}
  /* 表格渲染完成回调 */
  const done = (res:any) => {
    if (res.data?.length) {
      current.value = res.data[0];
    }
  };
/* 打开编辑弹窗 */
const openEdit = (row?: PayChannel) => {
  current.value = row ?? null;
  showEdit.value = true;
};
/** 删除 */
const remove = () => {
  const row = current.value;
  if (!row) {
    return;
  }
  ElMessageBox.confirm(`确定要删除“${row.account}”吗?`, '系统提示', {
    type: 'warning',
    draggable: true
  })
    .then(() => {
      const loading = EleMessage.loading({
        message: '请求中..',
        plain: true
      });
      if (!row.channelId) return;

      removePayChannel(row.channelId)
        .then((msg) => {
          loading.close();
          EleMessage.success(msg);
          reload()
        })
        .catch((e) => {
          loading.close();
          EleMessage.error(e.message);
        });
    })
    .catch(() => { });
};
// 在组件挂载后设置默认选中第一条数据
onMounted(() => {
 
});
</script>
<script lang="ts">
  export default {
    name: 'Pay'
  };
</script>