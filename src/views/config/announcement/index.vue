<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- <announcement-search ref="searchRef" style="margin-bottom: -14px" @search="reload" /> -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true" :headerEllipsis="false" :export-config="{ fileName: '跑马灯', datasource: exportSource }" :print-config="{ datasource: exportSource }" :footer-style="{ paddingBottom: '16px' }" cache-key="proAnnouncement">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()" v-permission="'config:announcement:add'"> 新建 </el-button>
        </template>
        <template #type="{ row }">
          <dict-data code="announceType" v-model="row.type" valueType="number" type="tag" />
        </template>
        <template #cancel="{ row }">
          <el-tag v-if="row.cancel == 1">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)" v-permission="'config:announcement:edit'"> 修改 </el-link>
          <el-divider direction="vertical" v-permission="'config:announcement:delete'" />
          <el-link type="danger" :underline="false" @click="remove(row)" v-permission="'config:announcement:delete'"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <announcement-edit :data="current" v-model="showEdit" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined } from '@/components/icons';
  // import AnnouncementSearch from "./components/announcement-search.vue";
  import AnnouncementEdit from './components/announcement-edit.vue';
  import { pageAnnouncements, removeAnnouncement } from '@/api/config/announcementApi';
  import type { Announcement, AnnouncementParam } from '@/api/model/announcement';

  /** 搜索栏实例 */
  // const searchRef = ref<InstanceType<typeof AnnouncementSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: 'ID',
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'intervalTime',
      label: '间隔秒数',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'totalCount',
      label: '总次数',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'sendCount',
      label: '已发次数',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'en',
      label: 'en',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'zh',
      label: 'zh',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'uca',
      label: 'uca',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'vn',
      label: 'vn',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'th',
      label: 'th',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'mm',
      label: 'mm',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'my',
      label: 'my',
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'indon',
      label: 'indon',
      minWidth: 110,
      align: 'center'
    },
    // {
    //   prop: "status",
    //   label: "状态",
    //   minWidth: 110,
    //   align: 'center',
    // },
    // {
    //   prop: "type",
    //   slot: "type",
    //   label: "类型",
    //   minWidth: 110,
    //   align: "center",
    // },
    // {
    //   prop: "cancel",
    //   label: "是否可取消",
    //   slot: "cancel",
    //   minWidth: 110,
    //   align: 'center',
    // },
    {
      label: '时间',
      prop: 'createTime',
      align: 'center',
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
  const selections = ref<Announcement[]>([]);

  /** 当前编辑数据 */
  const current = ref<Announcement | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageAnnouncements(
      {
        ...where,
        ...orders,
        ...pages
      },
      0
    );
  };

  /** 搜索 */
  const reload = (where?: AnnouncementParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: Announcement) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: Announcement) => {
    ElMessageBox.confirm('确定要删除ID为“' + row.id + '”的数据吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeAnnouncement(row.id)
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
    return pageAnnouncements({
      ...where,
      ...orders
    });
  };
</script>
<script lang="ts">
  export default {
    name: 'Announcement'
  };
</script>
