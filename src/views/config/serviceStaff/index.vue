<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <service-staff-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="uid" :columns="columns" :datasource="datasource" :headerEllipsis="false" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '客服列表', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="proServiceStaff">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()" v-permission="'config:serviceStaff:add'"> 新建 </el-button>
        </template>
        <template #createTime="{ row }">
          <div style="font-size: 12px">{{ row.createTime }}</div>
          <div style="font-size: 12px">{{ row.updateTime }}</div>
        </template>
        <template #status="{ row }">
          <div>{{ row.status?'开启':'关闭' }}</div>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'config:serviceStaff:edit'"> 修改 </el-link>
          <el-divider direction="vertical" />
          <el-button link type="success" size="small" @click="goChat(row)" v-permission="'config:serviceStaff:chat'"> 聊天 </el-button>
          <el-divider direction="vertical" />
          <el-button link type="danger" size="small" @click="remove(row)" v-permission="'config:serviceStaff:delete'"> 删除 </el-button>
        </template>
      </ele-pro-table>
    </ele-card>
    <service-staff-edit :data="current" v-model="showEdit" @done="reload" />
    <!-- <service-staff-chat :iframeUrl="iframeUrl" v-model="showChat" /> -->
    <!-- <div v-if="showIframe" class="iframe-container">
      <iframe :src="iframeUrl" frameborder="0"></iframe>
    </div> -->
  </ele-page>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { assignObject, EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  // import ServiceStaffSearch from "./components/service-staff-search.vue";
  import ServiceStaffEdit from './components/service-staff-edit.vue';
  import ServiceStaffChat from './components/service-staff-chat.vue';
  import { getAppConf } from '@/api/conf';
  import { pageServiceStaffs, removeServiceStaff } from '@/api/config/serviceStaffApi';
  import type { ServiceStaff, ServiceStaffParam } from '@/api/model/serviceStaff';
  import { Base64 } from 'js-base64';

  /** 搜索栏实例 */
  // const searchRef = ref<InstanceType<typeof ServiceStaffSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'uid',
      label: 'id',
      width: 60,
      align: 'left',
      fixed: 'left'
    },
    {
      prop: 'avatar',
      label: ' 头像',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'nickanme',
      label: '呢称',
      minWidth: 110,
      align: 'left'
    },
    {
      prop: 'status',
      slot: 'status',
      label: '状态',
      minWidth: 110,
      align: 'left'
    },
    {
      label: '创建|更新',
      prop: 'createTime',
      align: 'left',
      slot: 'createTime',
      minWidth: 110
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 200,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<ServiceStaff[]>([]);

  /** 当前编辑数据 */
  const current = ref<ServiceStaff | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);
  const showChat = ref(false);
  const appData = ref({ chatAddress: '', gameCode: '' });
  onMounted(() => {
    getAppConf().then((data) => {
      appData.value = assignObject(appData.value, data);
    });
  });
  const iframeUrl = ref('');
  // 聊天
  const goChat = (row: ServiceStaff) => {
    showChat.value = true;
    let reqMsg = {
      uid: row.uid,
      game: appData.value.gameCode,
      token: row.token,
      avatar: row.avatar,
      name: row.nickanme,
      type: 2,
      clientType: 'Browser'
    };
    var p = Base64.encode(JSON.stringify(reqMsg));

    (iframeUrl.value = appData.value.chatAddress + 'list?p=' + p), '_blank', `toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,fullscreen=yes`;
    console.log('地址', iframeUrl.value);
    window.open(iframeUrl.value, '_blank');
  };

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageServiceStaffs({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 搜索 */
  const reload = (where?: ServiceStaffParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: ServiceStaff) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: ServiceStaff) => {
    ElMessageBox.confirm('确定要删除昵称为“' + row.nickanme + '”的数据吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeServiceStaff(row.uid)
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
    return pageServiceStaffs({
      ...where,
      ...orders
    });
  };
</script>
<script lang="ts">
  export default {
    name: 'ServiceStaff'
  };
</script>
