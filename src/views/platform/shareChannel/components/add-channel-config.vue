<template>
  <ele-page>
    <!-- <el-card :bordered="false"> -->
    <channelConfigSearch :groupOptions="groupOptions" ref="searchRef" style="margin-bottom: -14px" @search="reload" />
    <!-- 表格 -->
    <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :max-height="650"  :header-ellipsis="false" :show-overflow-tooltip="true" :border="true" :highlight-current-row="true" :footer-style="{ paddingBottom: '16px' }" cache-key="companyGameRecord">
      <template #toolbar>
        <el-button type="primary" class="ele-btn-icon" @click="openEdit()" v-permission="'game:gameChannel:add'">
          <template #icon>
            <plus-outlined />
          </template>
          <span>新建</span>
        </el-button>
        <el-button type="warning" class="ele-btn-icon" @click="openChangeChannelDialog()">
          <span>修改渠道</span>
        </el-button>
        <el-popconfirm title="确认导出渠道配置数据吗?" @confirm="openExport()">
          <template #reference>
            <el-button type="warning" class="ele-btn-icon" :icon="UploadOutlined">导出</el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #state="{ row }">
        <el-tag :type="row.state ? 'success' : 'danger'">{{ row.state ? '开启' : '关闭' }}</el-tag>
      </template>
      <template #useVerification="{ row }">
        <el-tag :type="row.useVerification ? 'success' : 'danger'">{{ row.useVerification ? '开启' : '关闭' }}</el-tag>
      </template>
      <template #groupLeader="{ row }">
        <dict-data code="groupLeader" valueType="number" type="tag" v-model="row.groupLeader" />
      </template>
      <template #resigned="{ row }">
        <dict-data code="resignedType" valueType="number" type="tag" v-model="row.resigned" />
      </template>
     <template #roleId="{ row }">
        <div> {{ roleOptions.find((item) => item.roleId === row.roleId)?.roleName }}</div>
      </template>
       <template #groupId="{ row }">
        <div><span v-if="row.groupId">( {{row.groupId}} ) </span>{{ groupOptions.find((item) => item.id === row.groupId)?.groupName }}</div>
      </template>
      <template #sourceType="{ row }">
        <el-tag :type="row.sourceType === 1 ? 'primary' : row.sourceType === 2 ? 'success' : 'info'">
          {{ row.sourceType === 1 ? 'Facebook' : row.sourceType === 2 ? 'TikTok' : '普通' }}
        </el-tag>
      </template>
      <template #pixelState="{ row }">
        <el-tag v-if="row.sourceType === 1 || row.sourceType === 2" :type="row.sourceConfig?.enabled ? 'success' : 'warning'">
          {{ row.sourceConfig?.enabled ? '已启用' : '未启用' }}
        </el-tag>
        <span v-else>-</span>
      </template>
      <template #createTime="{ row }">
        <div style="font-size: 12px">{{ toDateString(row.createTime) }}</div>
        <div style="font-size: 12px">{{ toDateString(row.updateTime) }}</div>
      </template>
      <template #channelType="{ row }">
        <dict-data code="channelNewType" valueType="number" type="tag" v-model="row.channelType"  />
      </template>
      <template #action="{ row }">
        <el-link type="primary" :underline="false" @click="openEdit(row)"> 编辑 </el-link>
        <template v-if="row.sourceType === 1 || row.sourceType === 2">
          <el-divider direction="vertical" />
          <el-link type="success" :underline="false" @click="testPurchase(row)"> 测试充值 </el-link>
        </template>
        <!-- <el-link type="danger" :underline="false" @click="openChangeChannelDialog()">
          修改渠道
        </el-link> -->
        <el-divider direction="vertical" />
        <el-link type="danger" :underline="false" @click="resetPwd(row)"> 重置密码 </el-link>
        <el-divider direction="vertical" />
        <el-link type="warning" :underline="false" @click="resetGoogle(row)"> 重置Google </el-link>
        <!-- <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link> -->
      </template>
    </ele-pro-table>
    <!-- 编辑弹窗 -->
    <GameChannelsEdit v-model="showEdit" :data="current" @done="reload" :roleOptions="roleOptions" :groupOptions="groupOptions" />
    <!-- 修改渠道弹窗 -->
    <ChangeChannelDialog v-model="showChangeChannel" :uid="changeChannelUid" @done="reload" />
    <!-- 测试充值弹窗 -->
    <ele-modal :width="420" title="测试 Purchase" v-model="showTestPurchase">
      <p style="margin: 0 0 4px;">
        确定使用渠道"{{ testPurchaseRow?.channelName }}"的配置模拟一笔金额为 1 的充值吗？
      </p>
      <el-checkbox v-model="withTestCode">同时发送测试代码 (Test Code)</el-checkbox>
      <template #footer>
        <el-button @click="showTestPurchase = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="doTestPurchase">发送</el-button>
      </template>
    </ele-modal>
    <!-- </el-card> -->
  </ele-page>
</template>

<script setup lang="ts">
  import { h, onMounted, reactive, ref } from 'vue';
  import { PlusOutlined, UploadOutlined } from '@/components/icons';
  import { EleMessage, EleProTable } from 'ele-admin-plus/es';
  import GameChannelsEdit from './share-channels-edit.vue';
  import ChangeChannelDialog from './change-channel-dialog.vue';
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types';
  import type { ShareChannel } from '@/api/platform/model/shareChannel';
  import { ElMessageBox } from 'element-plus';
  import { exportShareChannels, pageShareChannels, resetChannelGoogle, resetChannelPassword, testFacebookPurchase, testTikTokPurchase } from '@/api/platform/shareChannelApi';
  import { toDateString } from '@/utils/utils';
  import { pageRoles } from '@/api/system/roleApi';
  import { getChannelGroupOptions } from '@/api/platform/channelGroupApi.js';
  import { ChannelGroupVO } from '@/api/platform/model/channelGroup.js';
  import channelConfigSearch from './channel-config-search.vue'
  import { useConfigStore } from '@/store/modules/config.js';
  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  // 表格列配置
  const columns = ref<Columns>([
    {
      label: '渠道ID',
      prop: 'channel',
      width: 70,
      align: 'center',
      fixed: 'left'
    },
    {
      label: '渠道名称',
      prop: 'channelName',
      align: 'center'
    },
    {
      label: '渠道角色',
      prop: 'roleId',
      slot: 'roleId',
      align: 'center'
    },
    {
      label: '渠道类型',
      prop: 'channelType',
      slot: 'channelType',
      align: 'center'
    },
    {
      label: '国家代码',
      prop: 'countryCode',
      align: 'center'
    },
    {
      label: '来源类型',
      prop: 'sourceType',
      slot: 'sourceType',
      width: 110,
      align: 'center'
    },
    {
      label: 'Pixel状态',
      prop: 'pixelState',
      slot: 'pixelState',
      width: 100,
      align: 'center'
    },
    {
      label: '分享链接',
      prop: 'shareUrl',
      align: 'center'
    },
    {
      label: '手机号',
      prop: 'phone',
      align: 'center'
    },
    {
      label: '状态',
      prop: 'state',
      slot: 'state',
      align: 'center'
    },
    {
      label: '谷歌验证码状态',
      prop: 'useVerification',
      slot: 'useVerification',
      align: 'center'
    },
    {
      label: '(组ID)组名',
      prop: 'groupId',
      slot: 'groupId',
      align: 'center'
    },
    {
      label: '职位',
      prop: 'groupLeader',
      slot: 'groupLeader',
      align: 'center'
    },
    {
      label: '在职状态',
      prop: 'resigned',
      slot: 'resigned',
      align: 'center'
    },
    {
      label: '创建|更新',
      prop: 'createTime',
      align: 'center',
      slot: 'createTime'
    },
    {
      label: '备注',
      prop: 'remark',
      align: 'center'
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
  const current = ref<ShareChannel | null>(null);

  // 是否显示编辑弹窗
  const showEdit = ref(false);

  // 是否显示修改渠道弹窗
  const showChangeChannel = ref(false);

  // 是否显示测试充值弹窗
  const showTestPurchase = ref(false);
  // 测试充值的渠道
  const testPurchaseRow = ref<ShareChannel | null>(null);
  // 是否同时发送测试代码
  const withTestCode = ref(false);
  // 发送中
  const submitting = ref(false);

  // 修改渠道的用户ID
  const changeChannelUid = ref<number | undefined>(undefined);

  // 默认搜索条件
  const defaultWhere = reactive({});

  // 表格数据源
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageShareChannels({ ...where, ...orders, ...pages });
  };
  /* 搜索 */
  const reload = (where?: ShareChannel) => {
    selection.value = [];
    tableRef?.value?.reload({ page: 1, where });
  };

  /* 打开编辑弹窗 */
  const openEdit = (row?: ShareChannel) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /* 打开修改渠道弹窗 */
  const openChangeChannelDialog = () => {
    changeChannelUid.value = undefined;
    showChangeChannel.value = true;
  };
  const roleOptions = ref<any>([]);
  const getRoleArr = () => {
    pageRoles({ userGroup: 2 }).then((res) => {
      // 处理返回的角色数据
      roleOptions.value = res || [];
    });
  };
  onMounted(() => {
    getRoleArr();
    getOptions();
  });

  // 组别选项
  const groupOptions = ref<ChannelGroupVO[]>([]);

  const getOptions = () => {
    // 加载渠道分组选项
    getChannelGroupOptions()
      .then((data) => {
        groupOptions.value = data || [];
      })
      .catch(() => {});
  };

  const resetPwd = (row: ShareChannel) => {
    ElMessageBox.confirm('确定要重置"' + row.channelName + '"的密码吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });

        resetChannelPassword(row.channel as number)
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
  /** 导出按钮点击 */
  const openExport = () => {
    exportShareChannels({}, 'share-channel-config').then((res) => {
      EleMessage.success(res);
    });
  };

  const resetGoogle = (row: ShareChannel) => {
    ElMessageBox.confirm('确定要重置"' + row.channelName + '"的谷歌验证码吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });

        resetChannelGoogle(row.channel as number)
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

  const testPurchase = (row: ShareChannel) => {
    testPurchaseRow.value = row;
    withTestCode.value = false;
    showTestPurchase.value = true;
  };

  const doTestPurchase = async () => {
    const row = testPurchaseRow.value;
    if (!row) {
      return;
    }
    submitting.value = true;
    try {
      if (row.sourceType === 2) {
        const result = await testTikTokPurchase(row.channel as number, withTestCode.value);
        await ElMessageBox.alert(
          h('div', { style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: '1.7' } }, [
            `渠道：${result.channel}\n`,
            `Pixel Code：${result.pixelCode}\n`,
            `事件：${result.eventName}\n`,
            `测试金额：1（币种按渠道国家配置）\n`,
            `Event ID：${result.eventId}\n`,
            `TikTok响应：${result.tiktokResponse}`
          ]),
          'TikTok Purchase 测试成功',
          { type: 'success' }
        );
      } else {
        const result = await testFacebookPurchase(row.channel as number, withTestCode.value);
        await ElMessageBox.alert(
          h('div', { style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: '1.7' } }, [
            `渠道：${result.channel}\n`,
            `Pixel ID：${result.pixelId}\n`,
            `事件：${result.eventName}\n`,
            `测试金额：1（币种按渠道国家配置）\n`,
            `Event ID：${result.eventId}\n`,
            `Meta响应：${result.metaResponse}`
          ]),
          'Facebook Purchase 测试成功',
          { type: 'success' }
        );
      }
      showTestPurchase.value = false;
    } catch (e: any) {
      EleMessage.error(e.message);
    } finally {
      submitting.value = false;
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'ShareChannels'
  };
</script>
