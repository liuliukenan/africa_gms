<template>
  <ele-page>
    <!--    <role-search @search="reload" />-->
    <ele-card :body-style="{ paddingTop: '8px' }">
      <!-- 表格 -->
      <ele-pro-table ref="tableRef" row-key="roleId" :columns="columns" :datasource="datasource"
        :border="true" :show-overflow-tooltip="true" v-model:selections="selections" :highlight-current-row="true" :headerEllipsis="false"
        :export-config="{ fileName: '角色数据', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        cache-key="systemRoleTable">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建
          </el-button>
          <el-button type="danger" class="ele-btn-icon" :icon="Delete" @click="remove()">
            删除
          </el-button>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)">
            修改
          </el-link>
          <el-divider direction="vertical" />
          <el-link v-if="!row.hasSupper"  type="primary" :underline="false" @click="openAuth(row)">
            分配权限
          </el-link>
          <el-divider direction="vertical"  v-if="!row.hasSupper"/>
          <el-link type="danger" :underline="false" @click="remove(row)">
            删除
          </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <!-- 编辑弹窗 -->
    <role-edit v-model="showEdit" :data="current" @done="reload" />
    <!-- 权限分配弹窗 -->
    <role-auth v-model="showAuth" :data="current" />
  </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
import { Delete } from '@element-plus/icons-vue'
import RoleEdit from './components/role-edit.vue';
import RoleAuth from './components/role-auth.vue';
import { pageRoles, removeRole, removeRoles } from '@/api/system/roleApi';
import type { Role, RoleParam } from '@/api/model/role';
import { toDateString } from "@/utils/utils";

defineOptions({ name: 'SystemRole' });

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  {
    type: 'selection',
    columnKey: 'selection',
    width: 50,
    align: 'center',
    fixed: 'left'
  },
  {
    type: 'index',
    columnKey: 'index',
    label: '序号',
    width: 70,
    align: 'center',
    fixed: 'left'
  },
  {
    prop: 'roleId',
    label: '角色ID',
    sortable: 'custom',
    // minWidth: 120
  },
  {
    prop: 'roleName',
    label: '角色名称',
    sortable: 'custom',
    // minWidth: 120
  },
  {
    prop: 'createTime',
    label: '创建时间',
    sortable: 'custom',
    // width: 180,
    align: 'center',
    formatter: (row) => toDateString(row.createTime)
  },
  {
    prop: 'comments',
    label: '备注',
    sortable: 'custom',
    // minWidth: 140
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
const selections = ref<Role[]>([]);

/** 当前编辑数据 */
const current = ref<Role | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);

/** 是否显示权限分配弹窗 */
const showAuth = ref(false);

/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  // 后端期望的参数名是 size，不是 pageSize 或 limit
  return pageRoles({
    ...where,
    ...orders,
    page: pages.page,
    size: pages.limit,  // 将 limit 转换为 size
    userGroup: 0
  });
};
/** 搜索 */
const reload = (where?: RoleParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: Role) => {
  current.value = row ?? null;
  showEdit.value = true;
};

/** 打开权限分配弹窗 */
const openAuth = (row?: Role) => {
  current.value = row ?? null;
  showAuth.value = true;
};

/** 删除单个或多个数据   */
const remove = (row?: Role) => {
  let rowIds = selections.value.map((d) => d.roleId).filter(id => id !== undefined);

  // 如果没有选中任何行，且传入了row，则删除单行
  if (rowIds.length === 0 && row) {
    ElMessageBox.confirm(
      '确定要删除该数据吗?',
      '系统提示',
      { type: 'warning', draggable: true }
    )
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeRole(row.roleId)
          .then((msg) => {
            EleMessage.success(msg);
            loading.close();
            reload();
          })
          .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
          });
      })
      .catch(() => {});
  } else if (rowIds.length > 0) {
    // 如果有选中的行，批量删除
    let str = '所选中的数据'
    ElMessageBox.confirm(
      '确定要删除' + str + '吗?',
      '系统提示',
      { type: 'warning', draggable: true }
    )
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeRoles(rowIds)
          .then((msg) => {
            EleMessage.success(msg);
            loading.close();
            reload();
          })
          .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
          });
      })
      .catch(() => {});
  } else {
    EleMessage.warning('请先选择要删除的数据');
  }
};

/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageRoles({ ...where, ...orders });
};
</script>
