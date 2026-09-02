<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="900" v-model="visible" :confirm-loading="loading" :title="isUpdate ? '修改推广渠道' : '新建推广渠道'" :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="国家" prop="countryCode">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="渠道名称" prop="channelName">
            <el-input clearable placeholder="请输入渠道名称" v-model="form.channelName" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="渠道角色" prop="roleId">
            <el-select v-model="form.roleId" placeholder="请选择渠道角色" style="width: 100%">
              <el-option v-for="item in props.roleOptions || []" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="手机号" prop="phone">
            <el-input clearable placeholder="请输入手机号" v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="渠道分组" prop="groupId">
            <el-select v-model="form.groupId" placeholder="请选择渠道分组" style="width: 100%" clearable>
              <el-option v-for="item in groupOptions" :key="item.id" :label="item.groupName" :value="item.id || 0" />
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="渠道类型" prop="channelType">
            <dict-data code="channelNewType" valueType="number" v-model="form.channelType" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="来源类型" prop="sourceType">
            <el-select v-model="form.sourceType" placeholder="请选择来源类型" style="width: 100%" @change="handleSourceTypeChange">
              <el-option label="普通" :value="0" />
              <el-option label="Facebook" :value="1" />
              <el-option label="TikTok" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <template v-if="form.sourceType === 1">
          <el-col :md="24" :sm="24" :xs="24">
            <el-alert type="info" show-icon :closable="false" title="注册成功仅由玩家前端 Facebook Pixel 上报；支付成功由支付后端 CAPI 回传；Token 不会下发给玩家前端。" />
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="Pixel启用" prop="sourceConfig.enabled">
              <el-switch v-model="form.sourceConfig!.enabled" style="--el-switch-on-color: #13ce66" :active-value="true" :inactive-value="false"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="Pixel ID" prop="sourceConfig.pixelId">
              <el-input clearable placeholder="请输入 Facebook Pixel ID" v-model.trim="form.sourceConfig!.pixelId" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="Access Token" prop="sourceConfig.accessToken">
              <el-input clearable type="textarea" :rows="4" placeholder="请输入 Facebook CAPI Access Token；留空表示保留原值" v-model.trim="form.sourceConfig!.accessToken" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="注册测试模式" prop="sourceConfig.testMode">
              <el-switch v-model="form.sourceConfig!.testMode" style="--el-switch-on-color: #f56c6c" :active-value="true" :inactive-value="false" @change="handleTestModeChange"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="测试事件码" prop="sourceConfig.testEventCode">
              <el-input clearable placeholder="可选，Meta Events Manager 测试用 Test Event Code" v-model.trim="form.sourceConfig!.testEventCode" />
            </el-form-item>
          </el-col>
          <el-col v-if="form.sourceConfig!.testMode" :md="24" :sm="24" :xs="24">
            <el-alert type="error" show-icon :closable="false" title="注册测试模式已开启：服务器 CompleteRegistration 只进入 Meta 测试事件，不计入正式广告数据。正式投放前必须关闭。" />
          </el-col>
        </template>
        <template v-if="form.sourceType === 2">
          <el-col :md="24" :sm="24" :xs="24">
            <el-alert type="info" show-icon :closable="false" title="注册成功由玩家前端 TikTok Pixel 上报；支付成功由支付后端 Events API 回传；Token 不会下发给玩家前端。" />
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="Pixel启用" prop="sourceConfig.enabled">
              <el-switch v-model="form.sourceConfig!.enabled" style="--el-switch-on-color: #13ce66" :active-value="true" :inactive-value="false"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="Pixel Code" prop="sourceConfig.pixelCode">
              <el-input clearable placeholder="请输入 TikTok Pixel Code" v-model.trim="form.sourceConfig!.pixelCode" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="Access Token" prop="sourceConfig.accessToken">
              <el-input clearable type="textarea" :rows="4" placeholder="请输入 TikTok Events API Access Token；留空表示保留原值" v-model.trim="form.sourceConfig!.accessToken" />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="测试事件码" prop="sourceConfig.testEventCode">
              <el-input clearable placeholder="可选，TikTok Events Manager 测试用 Test Event Code" v-model.trim="form.sourceConfig!.testEventCode" />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="启用" prop="state">
            <el-switch v-model="form.state" style="--el-switch-on-color: #13ce66" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="启用谷歌验证码" prop="useVerification">
            <el-switch v-model="form.useVerification" style="--el-switch-on-color: #13ce66" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="职位" prop="groupLeader">
            <!-- <el-select v-model="form.groupLeader" placeholder="请选择职位" style="width: 100%" clearable>
              <el-option label="组员" :value="0" />
              <el-option label="组长" :value="1" />
            </el-select> -->
            <dict-data code="groupLeader" valueType="number" v-model="form.groupLeader" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="在职状态" prop="resigned">
            <!-- <el-select v-model="form.resigned" placeholder="请选择在职状态" style="width: 100%" clearable>
              <el-option label="在职" :value="0" />
              <el-option label="离职" :value="1" />
            </el-select> -->
            <dict-data code="resignedType" valueType="number" v-model="form.resigned" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="备注" prop="remark">
            <el-input clearable placeholder="请输入备注" v-model="form.remark" type="textarea" :rows="3" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, nextTick } from 'vue';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addShareChannel, updateShareChannel } from '@/api/platform/shareChannelApi';
  // import ChannelSelect from '@/views/game/gameChannel/components/channel-select.vue';

  import type { ChannelSourceConf, FacebookChannelSourceConf, ShareChannel, TikTokChannelSourceConf } from '@/api/platform/model/shareChannel';
  import { FormInstance, FormRules } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config'; // 导入store
  import { ChannelGroupVO } from '@/api/platform/model/channelGroup';
  // 初始化store
  const configStore = useConfigStore();

  // 组别选项
  // const groupOptions = ref<{ label: string; value: number }[]>([]);

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: ShareChannel | null;
    roleOptions: any;
    groupOptions: ChannelGroupVO[];
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });
  const formRef = ref<FormInstance | null>(null);

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);
  const FACEBOOK_SOURCE_TYPE = 1;
  const TIKTOK_SOURCE_TYPE = 2;
  const FACEBOOK_CONF_CLASS = 'com.gaming.api.channel.model.dto.FacebookChannelSourceConf';
  const TIKTOK_CONF_CLASS = 'com.gaming.api.channel.model.dto.TikTokChannelSourceConf';

  const createFacebookConf = (conf?: FacebookChannelSourceConf | null): FacebookChannelSourceConf => {
    return {
      '@class': FACEBOOK_CONF_CLASS,
      classType: FACEBOOK_CONF_CLASS,
      jsonType: 'FacebookChannelSourceConf',
      enabled: conf?.enabled ?? false,
      pixelId: conf?.pixelId ?? '',
      accessToken: conf?.accessToken ?? '',
      testEventCode: conf?.testEventCode ?? '',
      testMode: conf?.testMode ?? false
    };
  };

  const createTikTokConf = (conf?: ChannelSourceConf | null): TikTokChannelSourceConf => {
    return {
      '@class': TIKTOK_CONF_CLASS,
      classType: TIKTOK_CONF_CLASS,
      jsonType: 'TikTokChannelSourceConf',
      enabled: conf?.enabled ?? false,
      pixelCode: conf?.pixelCode ?? '',
      accessToken: conf?.accessToken ?? '',
      testEventCode: conf?.testEventCode ?? ''
    };
  };

  // 表单数据
  const { form, resetFields, assignFields } = useFormData<ShareChannel>({
    channel: undefined,
    id: undefined,
    channelName: undefined,
    phone: undefined,
    countryCode: configStore.countryArr?.[0]?.code || '',
    remark: undefined,
    createBy: undefined,
    updateBy: undefined,
    createTime: undefined,
    updateTime: undefined,
    shareUrl: undefined,
    roleId: undefined,
    useVerification: 1,
    state: 1,
    groupId: undefined,
    channelType: undefined,
    groupLeader: 0,
    resigned: 0,
    sourceType: 0,
    sourceConfig: createFacebookConf()
  });

  // 表单验证规则
  const rules = reactive<FormRules>({
    channel: [
      {
        required: true,
        type: 'number',
        message: '请输入渠道id',
        trigger: 'blur'
      }
    ],
    channelName: [
      {
        required: true,
        type: 'string',
        message: '请输入渠道名称',
        trigger: 'blur'
      }
    ],
    roleId: [
      {
        required: true,
        type: 'number',
        message: '请选择',
        trigger: 'change'
      }
    ],
    channelType: [
      {
        required: true,
        type: 'number',
        message: '请选择',
        trigger: 'change'
      }
    ],
    phone: [
      {
        required: true,
        type: 'string',
        message: '请输入手机号',
        trigger: 'blur'
      }
    ],
    sourceType: [
      {
        required: true,
        type: 'number',
        message: '请选择来源类型',
        trigger: 'change'
      }
    ],
    'sourceConfig.pixelId': [
      {
        validator: (_rule, value, callback) => {
          if (form.sourceType === FACEBOOK_SOURCE_TYPE && form.sourceConfig?.enabled && !value) {
            callback(new Error('请输入 Facebook Pixel ID'));
            return;
          }
          callback();
        },
        trigger: 'blur'
      }
    ],
    'sourceConfig.pixelCode': [
      {
        validator: (_rule, value, callback) => {
          if (form.sourceType === TIKTOK_SOURCE_TYPE && form.sourceConfig?.enabled && !value) {
            callback(new Error('请输入 TikTok Pixel Code'));
            return;
          }
          callback();
        },
        trigger: 'blur'
      }
    ],
    'sourceConfig.accessToken': [
      {
        validator: (_rule, value, callback) => {
          if (form.sourceType !== 0 && form.sourceConfig?.enabled && shouldRequireAccessToken() && !value) {
            callback(new Error(form.sourceType === TIKTOK_SOURCE_TYPE
              ? '请输入 TikTok Events API Access Token'
              : '请输入 Facebook CAPI Access Token'));
            return;
          }
          callback();
        },
        trigger: 'blur'
      }
    ],
    'sourceConfig.testEventCode': [
      {
        validator: (_rule, value, callback) => {
          if (form.sourceType === FACEBOOK_SOURCE_TYPE && form.sourceConfig?.testMode && !value) {
            callback(new Error('开启注册测试模式时必须填写 Meta 测试事件码'));
            return;
          }
          callback();
        },
        trigger: ['blur', 'change']
      }
    ]
  });

  const shouldRequireAccessToken = () => {
    // 新增广告渠道或切换平台时必须填 Token；同平台修改时留空表示保留服务端旧值。
    return !isUpdate.value || props.data?.sourceType !== form.sourceType;
  };

  const handleSourceTypeChange = () => {
    if (form.sourceType === FACEBOOK_SOURCE_TYPE) {
      form.sourceConfig = createFacebookConf();
    } else if (form.sourceType === TIKTOK_SOURCE_TYPE) {
      form.sourceConfig = createTikTokConf();
    } else {
      form.sourceConfig = undefined;
    }
    nextTick(() => {
      formRef.value?.clearValidate?.(['sourceConfig.pixelId', 'sourceConfig.pixelCode', 'sourceConfig.accessToken', 'sourceConfig.testEventCode']);
    });
  };

  const handleTestModeChange = () => {
    nextTick(() => {
      formRef.value?.validateField?.('sourceConfig.testEventCode');
    });
  };

  const buildSubmitData = (): ShareChannel => {
    const submitData: ShareChannel = { ...form };
    if (submitData.sourceType === FACEBOOK_SOURCE_TYPE) {
      submitData.sourceConfig = createFacebookConf(submitData.sourceConfig);
    } else if (submitData.sourceType === TIKTOK_SOURCE_TYPE) {
      submitData.sourceConfig = createTikTokConf(submitData.sourceConfig);
    } else {
      submitData.sourceType = 0;
      submitData.sourceConfig = undefined;
    }
    return submitData;
  };

  /* 保存编辑 */
  const save = () => {
    if (!formRef.value) return;
    // let params = {}
    // if (form.ip&& !Array.isArray(form.ip)) {
    //   params = { ...form, ip: convertToArray(form.ip) }
    // } else {
    //   params = { ...form }
    // }

    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      loading.value = true;
      const saveOrUpdate = isUpdate.value ? updateShareChannel : addShareChannel;
      saveOrUpdate(buildSubmitData())
        .then((msg) => {
          loading.value = false;
          EleMessage.success(msg);
          handleCancel();
          emit('done');
        })
        .catch((e) => {
          loading.value = false;
          EleMessage.error(e.message);
        });
    });
  };
  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };
  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      const sourceType = props.data.sourceType ?? 0;
      assignFields({
        ...props.data,
        sourceType,
        sourceConfig: sourceType === FACEBOOK_SOURCE_TYPE
          ? createFacebookConf(props.data.sourceConfig)
          : sourceType === TIKTOK_SOURCE_TYPE
            ? createTikTokConf(props.data.sourceConfig)
            : undefined
      });
      // form.state = String(props.data.state) == '1' ? '1' : '0';
      isUpdate.value = true;
    } else {
      resetFields();
      form.sourceType = 0;
      form.sourceConfig = createFacebookConf();
      isUpdate.value = false;
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
<style lang="scss" scoped>
  .tips {
    color: red;
  }
</style>
