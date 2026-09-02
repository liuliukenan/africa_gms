<template>
  <ele-page>
    <ele-card :body-style="{ paddingTop: '8px' }">
      <user-search ref="searchRef" style="margin-bottom: -14px" @search="reload" :where="defaultWhere" />
      <ele-pro-table ref="tableRef" row-key="uid" :columns="columns" :datasource="datasource" @done="onDone" :max-height="650" :header-ellipsis="false" :where="defaultWhere" :show-overflow-tooltip="false" :border="true" v-model:selections="selections" :highlight-current-row="true" size="small" :footer-style="{ paddingBottom: '16px' }" cache-key="proUserUser" :tools="['reload', 'columns', 'maximized']">
        <template #toolbar>
          <!-- <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openAdd()"
            v-permission="'user:user:addAgent'"> 创建代理 </el-button> -->
          <!-- <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined" @click="openExport()" > 导出 </el-button> -->
          <el-popconfirm :title="t('common.sureExport')" @confirm="openExport()" width="250px">
            <template #reference>
              <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">{{ t('action.export') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
        <template #uid="{ row }">
          <el-link type="primary" :underline="false" @click="openEdit(row)">{{ row.uid }}</el-link>
        </template>
        <template #countryCode="{ row }">
          <div>{{ getCountryName(row.countryCode) }}</div>
        </template>
        <template #channel="{ row }">
          <div>{{ getChannel(row.channel) }}</div>
        </template>
        <template #username="{ row }">
          <div style="font-size: 12px">{{ row.username }}</div>
          <div style="font-size: 12px">{{ row.nickname }}</div>
        </template>
        <template #state="{ row }">
          <dict-data code="userState" valueType="number" type="tag" v-model="row.state" :typeColor="row.state === 0 ? 'success' : row.state === 1 ? 'warning' : 'danger'" />
        </template>
        <template #channelType="{ row }">
          <dict-data code="channelNewType" valueType="number" type="tag" v-model="row.channelType"  />
        </template>
        <template #kycOpen="{ row }">
          <el-tag :type="row.kycOpen ? 'success' : 'danger'" size="small">{{ row.kycOpen ? t('action.enable') : t('action.disable') }}</el-tag>
        </template>
        <template #kycStatus="{ row }">
          <div v-if="row.kycOpen"> 
         <dict-data code="kycAuthStatus" valueType="number" type="tag" v-model="row.kycStatus" :typeColor="row.kycStatus == 0 ? 'danger' : row.kycStatus == 2 ? 'danger' : 'success'" />
           </div>
          <div v-else>--</div>
        </template>
        <template #online="{ row }">
          <dict-data code="onlineType" valueType="number" type="tag" v-model="row.online" :typeColor="row.online ? 'success' : 'danger'" />
        </template>
        <template #action="{ row }">
          <div>
            <el-link type="primary" style="margin-right: 5px" :underline="false" v-permission="'user:user:info'" @click="openInfo(row)">{{ t('action.info') }} </el-link>
            <el-link type="warning" style="margin-right: 5px" :underline="false" v-permission="'user:user:send'" @click="openEdit(row, 'send')">{{ t('user.userList.action.send') }} </el-link>
            <el-link type="success" style="margin-right: 5px" :underline="false" v-permission="'user:user:send2'" @click="openEdit(row, 'send2')">{{ t('user.userList.action.send2') }} </el-link>
            <!-- <el-link type="success" :underline="false" @click="openEdit(row, 'code')"> google验证码 </el-link> -->
          </div>
          <div>
            <el-link type="danger" style="margin-right: 5px" :underline="false" v-permission="'user:user:decGold'" @click="openEdit(row, 'decGold')">{{ t('user.userList.action.decGold') }}</el-link>
            <el-link type="primary" style="margin-right: 5px" :underline="false" @click="openEdit(row, 'flow')" v-permission="'user:user:flow'">{{ t('user.userList.action.operationFlow') }} </el-link>
            <el-link type="danger" style="margin-right: 5px" :underline="false" @click="unseal(row)" v-permission="'user:user:unseal'">{{ row.state == 1 ? t('user.userList.action.unseal') : t('user.userList.action.seal') }} </el-link>
          </div>
          <div>
            <el-link type="primary" style="margin-right: 5px" :underline="false" @click="openEdit(row, 'pwd')" v-permission="'user:user:pwd'">{{ t('user.userList.action.changePwd') }} </el-link>
            <el-link :type="row.kycOpen ? 'danger' : 'success'" style="margin-right: 5px" :underline="false" @click="handellKYC(row)" v-permission="'user:user:kyc'">{{ row.kycOpen ? t('action.disable') : t('action.enable') }}KYC </el-link>
          </div>
        </template>
      </ele-pro-table>
      <!-- 详情Tabbar -->
      <div v-if="isShowTabbar">
        <TabBar :uid="currUid" :data="current" v-model="isShowTabbar"></TabBar>
      </div>
    </ele-card>
    <mail-edit :uid="currUid" v-model="showMail" @done="reload" :showTag="showTag"/>
    <user-flow :data="current" v-model="showFlow" @done="reload" />
    <user-seal :data="current" v-model="showSeal" @done="reload" />
    <user-pwd :data="current" v-model="showPwd" @done="reload" />
    <UserDecAmount :uid="currUid" :data="current" v-model="showdecGold" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { EleMessage, type EleProTable } from 'ele-admin-plus';
  import { UploadOutlined } from '@/components/icons';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import UserSearch from './components/user-search.vue';
  import MailEdit from '@/views/user/mail/components/mail-edit.vue';
  import UserPwd from './components/user-pwd.vue';
  import UserFlow from './components/user-flow.vue';
  import UserSeal from './components/user-seal.vue';
  import UserDecAmount from './components/user-decAmount.vue';
  import { pageUsers, exportUsers, updateKycOpen } from '@/api/user/userApi';
  import type { User, UserBlack, UserParam, UserSimple } from '@/api/model/user';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useRoute } from 'vue-router';
  import TabBar from './components/tabbar/index.vue';
  import { toDateZone } from '@/utils/utils';
  import { useConfigStore } from '@/store/modules/config';
  import { addSecret } from '@/utils/common';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof UserSearch> | null>(null);
  const isShowTabbar = ref(false);
  const openInfo = (row: User) => {
    isShowTabbar.value = true;
    currUid.value = row.uid;
    current.value = row as any;
  };
  const configStore = useConfigStore();
  configStore.getShareChannels();
  const getCountryName = (countryCode: string) => {
    const country = configStore.countryArr?.find((item) => item.code === countryCode);
    return country?.name || countryCode;
  };
const getChannel = (channel?: string) => {
    return configStore.ShareChannelArr.find((item) => item.channel == channel)?.channelName;
  };
  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'uid',
      label: t('user.userList.table.uid'),
      // width: 90,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'nickname',
      label: t('user.userList.table.nickname'),
      // minWidth: 110,
      align: 'center',
      slot: 'nickname'
    },
    {
      prop: 'countryCode',
      slot: 'countryCode',
      label: t('user.userList.table.countryCode'),
      // minWidth: 130,
      align: 'center'
    },
    {
      prop: 'lang',
      label: t('user.userList.table.lang'),
      // minWidth: 90,
      align: 'center'
    },
    {
      prop: 'agentType',
      label: t('user.userList.table.agentType'),
      formatter: (row) => {
        switch (row.agentType) {
          case 0:
            return t('user.userList.table.agentType0');
          case 1:
            return t('user.userList.table.agentType1');
          case 2:
            return t('user.userList.table.agentType2');
          default:
            return t('user.userList.table.agentType0');
        }
      },
      // minWidth: 90,
      align: 'center'
    },
    {
      prop: 'channel',
      slot: 'channel',
      label: t('user.userList.table.channel'),
      // minWidth: 90,
      align: 'center'
    },
    // {
    //   prop: 'channelType',
    //   slot: 'channelType',
    //   label: t('user.userList.table.channelType'),
    //   // minWidth: 90,
    //   align: 'center'
    // },
    {
      prop: 'inviterId',
      label: t('user.userList.table.inviterId'),
      // minWidth: 90,
      align: 'center'
    },
    {
      prop: 'inviterAgentId',
      label: t('user.userList.table.inviterAgentId'),
      // minWidth: 90,
      align: 'center'
    },
    {
      prop: 'phone',
      label: t('user.userList.table.phone'),
      minWidth: 110,
      align: 'center',
      formatter: (row) => addSecret(row.phone)
    },
    {
      prop: 'inviterCode',
      label: t('user.userList.table.inviterCode'),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'totalPaySuccessAmount',
      label: t('user.userList.table.totalPaySuccessAmount'),
      sortable: true,
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'totalWithdrawSuccessAmount',
      // slot: 'totalWithdrawSuccessAmount',
      sortable: true,
      label: t('user.userList.table.totalWithdrawSuccessAmount'),
      // formatter: (row) => numTo100s(row.totalWithdrawSuccessAmount),
      minWidth: 90,
      align: 'center'
    },
    {
      prop: 'totalGiftAmount',
      label: t('user.userList.table.totalGiftAmount'),
      sortable: true,
      // minWidth: 110,
      align: 'center'
    },
    {
      prop: 'vipLevel',
      label: t('user.userList.table.vipLevel'),
      sortable: true,
      // minWidth: 90,
      align: 'center'
    },
    {
      prop: 'kycStatus',
      label: t('user.userList.table.kyc'),
      // minWidth: 90,
      align: 'center',
      children: [
        {
          prop: 'kycOpen',
          slot: 'kycOpen',
          label: t('user.userList.table.kycOpen'),
          // minWidth: 90,
          align: 'center'
        },
        {
          prop: 'kycStatus',
          slot: 'kycStatus',
          label: t('user.userList.table.kycStatus'),
          // minWidth: 90,
          align: 'center'
        }
      ]
    },
    {
      prop: 'state',
      label: t('user.userList.table.state'),
      // minWidth: 90,
      align: 'center',
      slot: 'state'
    },
    {
      prop: 'online',
      label: t('user.userList.table.online'),
      // minWidth: 90,
      align: 'center',
      slot: 'online'
    },
    {
      prop: 'registerIp',
      label: t('user.userList.table.registerIp'),
      minWidth: 100,
      align: 'left'
    },
    {
      prop: 'loginIp',
      label: t('user.userList.table.loginIp'),
      minWidth: 100,
      align: 'left'
    },
    {
      prop: 'deviceId',
      label: t('user.userList.table.deviceId'),
      minWidth: 160,
      align: 'left'
    },
    {
      prop: 'createTime',
      label: t('user.userList.table.createTime'),
      sortable: true,
      formatter: (row) => toDateZone(row.createTime, row.countryCode),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'lastLoginTime',
      label: t('user.userList.table.lastLoginTime'),
      sortable: true,
      formatter: (row) => toDateZone(row.lastLoginTime, row.countryCode),
      minWidth: 110,
      align: 'center'
    },
    {
      prop: 'firstPayTime',
      label: t('user.userList.table.payTime'),
      // sortable: true,
      // minWidth: 110,
      align: 'center',
      children: [
        {
          prop: 'firstPayTime',
          label: t('user.userList.table.firstPayTime'),
          sortable: true,
          formatter: (row) => toDateZone(row.firstPayTime, row.countryCode),
          minWidth: 110,
          align: 'center'
        },
        {
          prop: 'lastPayTime',
          label: t('user.userList.table.lastPayTime'),
          sortable: true,
          formatter: (row) => toDateZone(row.lastPayTime, row.countryCode),
          minWidth: 110,
          align: 'center'
        }
      ]
    },

    {
      prop: 'firstWithdrawTime',
      label: t('user.userList.table.withdrawTime'),
      // sortable: true,
      // minWidth: 110,
      align: 'center',
      children: [
        {
          prop: 'firstWithdrawTime',
          label: t('user.userList.table.firstWithdrawTime'),
          sortable: true,
          formatter: (row) => toDateZone(row.firstWithdrawTime, row.countryCode),
          minWidth: 110,
          align: 'center'
        },
        {
          prop: 'lastWithdrawTime',
          label: t('user.userList.table.lastWithdrawTime'),
          sortable: true,
          formatter: (row) => toDateZone(row.lastWithdrawTime, row.countryCode),
          minWidth: 110,
          align: 'center'
        }
      ]
    },
    {
      prop: 'firstGameTime',
      label: t('user.userList.table.gameTime'),
      // minWidth: 110,
      align: 'center',
      children: [
        {
          prop: 'firstGameTime',
          label: t('user.userList.table.firstGameTime'),
          sortable: true,
          formatter: (row) => toDateZone(row.firstGameTime, row.countryCode),
          minWidth: 110,
          align: 'center'
        },
        {
          prop: 'lastGameTime',
          label: t('user.userList.table.lastGameTime'),
          sortable: true,
          formatter: (row) => toDateZone(row.lastGameTime, row.countryCode),
          minWidth: 110,
          align: 'center'
        }
      ]
    },
    {
      label: t('action.action'),
      minWidth: 120,
      align: 'left',
      slot: 'action',
      fixed: 'right',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<UserSimple[]>([]);

  /** 当前编辑数据 */
  const current = ref<UserSimple | null>(null);

  // 赠送邮件
  const showMail = ref(false);

  const showBlack = ref(false);
  const showdecGold = ref(false);
  const showTag = ref(false);
  const showPwd = ref(false);
  const showFlow = ref(false);
  const showSeal = ref(false);

  const currUid = ref<number>(0);
  const $route = useRoute();
  const query = $route.query as any;
  const defaultWhere = {
    uid: query.id ? query.id : undefined,
    countryCode: configStore.countryArr?.[0]?.code || ''
  };
  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    where = { ...defaultWhere, ...where, orderName: orders.order, sortName: orders.sort, ...pages };
    return pageUsers({ ...where, ...pages });
  };
  const onDone = (result: { data: any }, _: any) => {
    const { data } = result;
    nextTick(() => {
      if (query.id && data.length == 1) {
        openEdit(data[0], 'info');
      }
    });
  };
  onMounted(() => {
    if (query.id) {
      reload({ uid: query.id });
    }
  });
  /** 搜索 */
  const reload = (where?: UserParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row: UserSimple, type?: string) => {
    current.value = row;
    currUid.value = row.uid;
    switch (type) {
      case 'send':
        showMail.value = true;
        showTag.value = true;
        break;
      case 'send2':
        showMail.value = true;
        showTag.value = false;
        break;
      case 'decGold':
        showdecGold.value = true;
        break;
      case 'kyc':
        break;
      case 'flow':
        showFlow.value = true;
        break;
      // case 'code':
      //   showCode.value = true;
      //   break;
      case 'pwd':
        showPwd.value = true;
        break;
      default:
        break;
    }
  };
  const unseal = (row: any) => {
    showSeal.value = true;
    current.value = row;
  };
  const handellKYC = (row: User) => {
    const statusStr = row.kycOpen ? t('action.disable') : t('action.enable');
    ElMessageBox.confirm('确定要' + statusStr + '用户"' + row.uid + '"的KYC入口吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        updateKycOpen({ uid: row.uid, kycOpen: !row.kycOpen })
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
  const userBlack = reactive<UserBlack>({
    uid: 0,
    bwType: 0,
    bwState: 0,
    bwNum: 0,
    totalGoldResult: 0,
    bwGdp: 0,
    bwTime: 0,
    bwDesc: ''
  });

  /** 打开编辑弹窗 */
  const openBlack = (row: UserSimple) => {
    current.value = row;
    Object.assign(userBlack, row);
    showBlack.value = true;
  };
  // 导出
  const openExport = () => {
    exportUsers({ ...searchRef.value!.searchParams() }, 'YHLB').then((res) => {
      ElMessage.success(res);
    });
  };
</script>
<script lang="ts">
  export default {
    name: 'UserUser'
  };
</script>
<style lang="scss">
  /*  超出换行显示 */
  // :deep(.el-table .cell.el-tooltip) {
  //   white-space: normal;
  // }
</style>
