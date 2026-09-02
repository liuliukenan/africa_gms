<template>
  <ele-page>
    <el-card :bordered="false">
      <GameConfSearch ref="searchRef" style="margin-bottom: -14px" @search="reload" :where="defaultWhere" />
      <!-- 表格 -->
      <!--   :pagination="{
          pageSize: 50,
          pageSizes: [50, 100, 200],
          layout: 'total, prev, pager, next, sizes, jumper',
          style: { margin: 'auto' },
          autoAmend: false
        }" -->
      <ele-pro-table ref="tableRef" :striped="true" :bordered="true" row-key="id" :max-height="650"  :columns="columns" size="small" :headerEllipsis="false" :datasource="datasource" :scroll="{ x: 1000 }" :where="defaultWhere" cache-key="progameConf">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" @click="openEdit()" v-permission="'game:gameConf:add'">
            <span>新建</span>
          </el-button>
          <el-button type="success" class="ele-btn-icon" @click="openImport()">
            <span>导入导出</span>
          </el-button>
          <el-popconfirm title="确认发送到服务器吗？" @confirm="sendServer()">
            <template #reference>
              <el-button type="danger" class="ele-btn-icon">
                <span>发送服务器</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #sid="{ row }">
          <dict-data code="serverType" v-model="row.sid" type="tag" valueType="number" />
        </template>
        <template #tag="{ row }">
          <dict-data code="serverType" v-model="row.tag" type="tag" valueType="number" />
        </template>
        <template #gameType="{ row }">
          <dict-data code="myGameType" v-model="row.gameType" type="tag" valueType="number" />
        </template>

        <template #gameTag="{ row }">
          <!-- <dict-data code="gameType" v-model="row.gameTag" type="tag" valueType="number" /> -->
          <!-- <tag /> -->
          <div v-for="tag in tagArr" :key="tag.tagId">
            <div v-if="tag.tagId == row.gameTag">{{ tag.tagName }}</div>
          </div>
        </template>
        <template #icon="{ row }">
          <el-image :src="row.icon" width="100px" height="90px" />
        </template>
        <template #flowCalcType="{ row }">
           <el-tag v-if="row.flowCalcType==1">按下注金额</el-tag>
           <el-tag v-if="row.flowCalcType==2" >按单局净差</el-tag>
        </template>
        <template #flowSettleType="{ row }">
           <el-tag v-if="row.flowSettleType==1">实时结算</el-tag>
           <el-tag v-if="row.flowSettleType==2" >结束事件结算</el-tag>
           <el-tag v-if="row.flowSettleType==3" >超时结算</el-tag>
        </template>
        <template #state="{ row }">
          <dict-data code="gameConfState" v-model="row.state" type="tag" valueType="number" :typeColor="stateColor(row.state)" />
        </template>
        <template #createTime="{ row }">
          <div style="font-size: 12px">{{ toDateString(row.createTime) }}</div>
          <div style="font-size: 12px">{{ toDateString(row.updateTime) }}</div>
        </template>
        <template #serverType="{ row }">
          <dict-data code="serverType" v-model="row.serverType" type="tag" valueType="number" />
        </template>
        <template #gameGroup="{ row }">
          <dict-data code="gameGroup" v-model="row.gameGroup" type="tag" valueType="number" />
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'game:gameConf:edit'"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)" v-permission="'game:gameConf:delete'"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <GameConfEdit v-model="showEdit" :data="current" @done="reload" :tagArr="tagArr" />
    <SlotsGameUpload v-model="showImport" @done="reload" />
  </ele-page>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { EleMessage, EleProTable } from 'ele-admin-plus/es';
  import GameConfEdit from './components/gameConf-edit.vue';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import type { GameConf } from '@/api/game/model/index';
  import { ElMessageBox } from 'element-plus';
  import { pageGameConf, removeGameConf, sendConfServer } from '@/api/game/gameConf/index';
  import SlotsGameUpload from './components/gameConf-import.vue';
  import GameConfSearch from './components/gameConf-search.vue';
  import { toDateString } from '@/utils/utils';
  import { pageGameTags } from '@/api/platform/gameTagApi';

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof GameConfSearch> | null>(null);

  const stateColor = (state: number) => {
    return state == 0 ? 'success' : state == 1 ? 'danger' : 'info';
  };

  // 表格列配置
  const columns = ref<Columns>([
    {
      label: '游戏ID',
      prop: 'gameId',
      width: 90,
      align: 'center',
      fixed: 'left',
      sortable: 'custom'
    },
    {
      label: '原游戏ID',
      prop: 'orgGameId',
      // minWidth: 140,
      align: 'left'
    },
    {
      label: '公司ID',
      prop: 'companyId',
      // width: 80,
      align: 'center'
    },
    {
      label: '厂商编码',
      prop: 'factoryCode',
      // width: 80,
      align: 'center'
    },
    {
      label: '图片',
      prop: 'icon',
      slot: 'icon',
      // width: 110,
      align: 'center'
    },
    {
      label: '图片大小',
      prop: 'iconType',
      align: 'center',
      formatter: (row) => {
        return row.iconType == 0 ? '小图标' : '大图标';
      }
    },
    {
      label: '货币类型',
      prop: 'moneyType',
      align: 'center',
      formatter: (row) => {
        return row.moneyType == 0 ? '金币' : '钻石';
      }
    },
    {
      label: '英文名称',
      prop: 'en',
      // minWidth: 110,
      align: 'center'
    },
    {
      label: '分组类型',
      prop: 'gameGroup',
      slot: 'gameGroup',
      align: 'center'
    },
    {
      label: '火热',
      prop: 'hot',
      formatter: (row) => {
        return row.hot ? '是' : '否';
      },
      align: 'center'
    },
    {
      label: '版本号',
      prop: 'version',
      slot: 'version',
      // minWidth: 110,
      align: 'center'
    },
    {
      label: '游戏标签',
      prop: 'gameTag',
      slot: 'gameTag',
      // minWidth: 110,
      align: 'center'
    },
    {
      label: '游戏类型',
      prop: 'gameType',
      align: 'center',
      slot: 'gameType'
    },
    {
      label: '横竖屏',
      prop: 'direct',
      // minWidth: 110,
      align: 'center',
      formatter: (row) => {
        return row.direct == 0 ? '横屏' : '竖屏';
      }
    },
    {
      label: '状态',
      prop: 'state',
      slot: 'state',
      // minWidth: 110,
      align: 'center'
    },
    {
      label: '流水计算类型',
      prop: 'flowCalcType',
      slot: 'flowCalcType',
      minWidth: 110,
      align: 'center'
    },
    {
      label: '流水结算方式',
      prop: 'flowSettleType',
      slot: 'flowSettleType',
      minWidth: 100,
      align: 'center'
    },
    {
      label: '流水超时结算等待秒数',
      prop: 'flowSettleDelaySeconds',
      // minWidth: 100,
      align: 'center'
    },
    {
      label: '排序',
      prop: 'sortNumber',
      // minWidth: 110,
      align: 'center',
      sortable: 'custom'
    },
    {
      label: '创建|更新',
      prop: 'createTime',
      align: 'center',
      // width: 130,
      slot: 'createTime'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 150,
      align: 'center',
      slot: 'action'
    }
  ]);

  // 表格选中数据
  const selection = ref([]);

  // 当前编辑数据
  const current = ref<GameConf | null>(null);

  // 是否显示编辑弹窗
  const showEdit = ref(false);

  const showImport = ref(false);

  /* 打开编辑弹窗 */
  const openImport = () => {
    showImport.value = true;
  };

  // 默认搜索条件
  const defaultWhere = reactive({
    sortName: 'gameId',
    orderName: 'asc'
  });
  // 发送到服务器
  const sendServer = () => {
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    });
    sendConfServer()
      .then((msg) => {
        loading.close();
        EleMessage.success(msg);
      })
      .catch((e) => {
        loading.close();
        EleMessage.error(e.message);
      });
  };
  // 表格数据源
  const datasource: DatasourceFunction = ({ pages, limit, where, orders }) => {
    where = { ...defaultWhere, ...where, orderName: orders.order || defaultWhere.orderName, sortName: orders.sort || defaultWhere.sortName };
    return pageGameConf({ ...where, ...pages, limit });
  };
  const tagArr = ref<any[]>([]);
  const getTag = () => {
    pageGameTags().then((res) => {
      console.log(res);
      tagArr.value = res as any;
    });
  };
  getTag();
  /* 搜索 */
  const reload = (where?: GameConf) => {
    selection.value = [];
    tableRef?.value?.reload({ page: 1, where });
  };

  /* 打开编辑弹窗 */
  const openEdit = (row?: GameConf) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /* 删除单个 */
  const remove = (row: GameConf) => {
    ElMessageBox.confirm('确定要删除ID为“' + row.gameId + '”的数据吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        if (!row.gameId) return;
        removeGameConf(row.gameId)
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

<script lang="ts">
  export default {
    name: 'GameConf'
  };
</script>
