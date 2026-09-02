<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
      <template #toolbar>
        <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建</el-button>
      </template>
      <ele-pro-table ref="tableRef" row-key="userId" :columns="columns" :headerEllipsis="false" :datasource="datasource"
        :show-overflow-tooltip="true" :border="true" v-model:selections="selections" :highlight-current-row="true"
        :export-config="{ fileName: '用户数据', datasource: exportSource }" :print-config="{ datasource: exportSource }"
        :footer-style="{ paddingBottom: '16px' }" cache-key="proSysUser">
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建</el-button>
        </template>
        <template #status="{ row }">
          <el-switch size="small" :model-value="row.status == 0"
            @change="(checked: boolean) => editStatus(checked, row)" />
        </template>
        <template #isMask="{ row }">
          <el-switch size="small" :model-value="row.isMask"
                     @change="(checked: boolean) => editMask(checked, row)" />
        </template>
        <template #useVerification="{ row }">
          <el-switch size="small" :model-value="row.useVerification == 1"
            @change="(checked: boolean) => editVerification(checked, row)" />
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改</el-link>
          <el-divider direction="vertical" />
          <el-link v-if="row.useVerification === 1" type="info" :underline="false" @click="openCode(row)"> 二维码</el-link>
          <el-divider v-if="row.useVerification === 1" direction="vertical" />
          <el-link type="warning" :underline="false" @click="openReset(row)"> 重置密码</el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="openDelete(row)"> 删除</el-link>
        </template>
      </ele-pro-table>
      <!-- <el-table :data="">
        <el-table-column  type="selection" width="55" align="center"></el-table-column>
      </el-table> -->
    </ele-card>
    <user-edit :data="current" v-model="showEdit" @done="reload" />
    <user-edit-pwd :data="current" v-model="showReset" @done="reload" />
    <user-code :data="current" v-model="showCode" />
  </ele-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import type { EleProTable } from 'ele-admin-plus';
import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
import { PlusOutlined } from '@/components/icons';
import UserSearch from './components/user-search.vue';
import UserEdit from './components/user-edit.vue';
import UserEditPwd from './components/user-updatePwd.vue';
import UserCode from './components/user-code.vue';
import {pageUsers, updateUserStatus, updateUser, removeUser, updateUserMask} from '@/api/system/sysUserApi';
import type { SysUser, SysUserParam } from '@/api/model/sysUser';
import { ElMessageBox } from 'element-plus';
/** 搜索栏实例 */
const searchRef = ref<InstanceType<typeof UserSearch> | null>(null);

/** 表格实例 */
const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

/** 表格列配置 */
const columns = ref<Columns>([
  // {
  //   type: 'selection',
  //   columnKey: 'selection',
  //   width: 50,
  //   align: 'center',
  //   fixed: 'left'
  // },
  // {
  //   type: 'index',
  //   columnKey: 'index',
  //   width: 50,
  //   align: 'center',
  //   fixed: 'left'
  // },
  {
    prop: 'username',
    label: '用户账号',
    // minWidth: 110
  },
  {
    prop: 'realname',
    label: '真实姓名',
    // minWidth: 110,
    slot: 'userName'
  },
  {
    prop: 'roleName',
    label: '角色',
    // minWidth: 110
  },
  {
    prop: 'phone',
    label: '手机号',
    // minWidth: 110,
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    // width: 180,
    align: 'center'
  },
  {
    prop: 'isMask',
    label: '掩码',
    // width: 90,
    align: 'center',
    slot: 'isMask',
    formatter: (row) => (row.isMask == true ? '开启' : '冻结')
  },
  {
    prop: 'status',
    label: '状态',
    // width: 90,
    align: 'center',
    slot: 'status',
    formatter: (row) => (row.status == 0 ? '开启' : '冻结')
  },
  {
    prop: 'useVerification',
    label: '谷歌验证码',
    // width: 90,
    align: 'center',
    slot: 'useVerification',
    formatter: (row) => (row.useVerification == 1 ? '启用' : '不启用')
  },
  {
    columnKey: 'action',
    label: '操作',
    width: 300,
    align: 'center',
    slot: 'action',
    hideInPrint: true,
    hideInExport: true
  }
]);

/** 表格选中数据 */
const selections = ref<SysUser[]>([]);

/** 当前编辑数据 */
const current = ref<SysUser | null>(null);

/** 是否显示编辑弹窗 */
const showEdit = ref(false);
const showCode = ref(false);
const showReset = ref(false);

// /** 是否显示用户导入弹窗 */
// const showImport = ref(false);
/** 表格数据源 */
const datasource: DatasourceFunction = ({ pages, where, orders }) => {
  return pageUsers({
    ...where,
    ...orders,
    ...pages
  });
};



/** 搜索 */
const reload = (where?: SysUserParam) => {
  selections.value = [];
  tableRef.value?.reload?.({ page: 1, where });
};

/** 打开编辑弹窗 */
const openEdit = (row?: SysUser) => {
  current.value = row ?? null;
  showEdit.value = true;
};
const openCode = (row?: SysUser) => {
  current.value = row ?? null;
  showCode.value = true;
};
const openReset = (row?: SysUser) => {
  current.value = row ?? null;
  showReset.value = true;
};

/** 修改用户状态 */
const editStatus = (checked: boolean, row: SysUser) => {
  const status = checked ? 0 : 1;
  updateUserStatus(row.id, status)
    .then((msg) => {
      row.status = status;
      EleMessage.success(msg);
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};

const editMask = (checked: boolean, row: SysUser) => {
  updateUserMask(row.id, checked)
    .then((msg) => {
      row.isMask = checked;
      EleMessage.success(msg);
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};

/** 修改用户谷歌验证码状态 */
const editVerification = (checked: boolean, row: SysUser) => {
  const useVerification = checked ? 1 : 0;
  updateUser({
    id: row.id,
    useVerification
  } as SysUser)
    .then((msg) => {
      row.useVerification = useVerification;
      EleMessage.success(msg);
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};
const openDelete = (row: SysUser) => {
  let rowIds = selections.value.map((d) => d.id);
  let ids = rowIds.length ? rowIds : row!.id
  let str = rowIds.length ? '所选中的数据' : '该数据'
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
      removeUser(ids as any)
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
    .catch(() => {
    });
};
/** 导出和打印全部数据的数据源 */
const exportSource: DatasourceFunction = ({ where, orders }) => {
  return pageUsers({
    ...where,
    ...orders
  });
};
</script>
<script lang="ts">
export default {
  name: 'SysUser'
};
</script>
