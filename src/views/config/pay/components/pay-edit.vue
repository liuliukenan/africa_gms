<!-- 编辑弹窗 -->
<template>
  <ele-modal form width="70vw" v-model="visible" :title="isUpdate ? '修改' : '添加'" @open="handleOpen" position="center">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="渠道名称:" prop="name">
            <el-input clearable v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="渠道类型:" prop="channelType">
            <dict-data code="channelType" v-model="form.channelType" value-type="number" placeholder="请选择" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="api地址:" prop="baseUrl">
            <el-input clearable v-model="form.baseUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="身份验证阈值:" prop="identityVerificationThreshold">
            <el-input-number :min="0" :controls="false" clearable v-model="form.identityVerificationThreshold" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="提现检查游戏转账:" prop="withdrawCheckGameTransfers">
            <el-input-number :min="0" :controls="false" clearable v-model="form.withdrawCheckGameTransfers" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="充值手续费:" prop="rechargeFee">
            <el-input-number :min="0" :max="1" :controls="false" clearable v-model="form.rechargeFee" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="提现手续费:" prop="withdrawFee">
            <el-input-number :min="0" :max="1" :controls="false" clearable v-model="form.withdrawFee" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="最小支付限制:" prop="minPayLimit">
            <el-input-number :min="0" :controls="false" clearable v-model="form.minPayLimit" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="最大支付限制:" prop="maxPayLimit">
            <el-input-number :min="0" :controls="false" clearable v-model="form.maxPayLimit" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="最小提现限制:" prop="minWithdrawLimit">
            <el-input-number :min="0" :controls="false" clearable v-model="form.minWithdrawLimit" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="最大提现限制:" prop="maxWithdrawLimit">
            <el-input-number :min="0" :controls="false" clearable v-model="form.maxWithdrawLimit" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label=" 每日提现次数:" prop="withdrawDailyLimit">
            <el-input-number :min="0" :controls="false" clearable v-model="form.withdrawDailyLimit" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label=" 每日提现总额:" prop="withdrawDailyAmountLimit">
            <el-input-number :min="0" :controls="false" clearable v-model="form.withdrawDailyAmountLimit" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="小额免审阈值:" prop="withdrawAutoAuditMin">
            <el-input-number :min="0" :controls="false" clearable v-model="form.withdrawAutoAuditMin" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="大额强制复核阈值:" prop="withdrawAutoAuditMax">
            <el-input-number :min="0" :controls="false" clearable v-model="form.withdrawAutoAuditMax" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <!-- <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="充值邮件模版:" prop="payMailConfId">
            <MailSelect v-model="form.payMailConfId" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="充值Tips模版" prop="payTipsConfId">
            <TipsSelect v-model="form.payTipsConfId" />
          </el-form-item>
        </el-col> -->
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="充值短信模板ID" prop="paySmsConfId">
            <el-select v-model="form.paySmsConfId" :placeholder="t('common.placeholder.select')" filterable>
              <el-option v-for="item in smsList" :key="item.id" :label="item.templateName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      <!--  </el-row>
      <el-row :gutter="16">
       <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="提现邮件模版:" prop="withdrawMailConfId">
            <MailSelect v-model="form.withdrawMailConfId" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="提现Tips模版" prop="withdrawTipsConfId">
            <TipsSelect v-model="form.withdrawTipsConfId" />
          </el-form-item>
        </el-col> -->

        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="提现短信模板ID" prop="withdrawSmsConfId">
            <el-select v-model="form.withdrawSmsConfId" :placeholder="t('common.placeholder.select')" filterable>
              <el-option v-for="item in smsList" :key="item.id" :label="item.templateName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="提现失败邮件模版:" prop="withdrawFailMailConfId">
            <MailSelect v-model="form.withdrawFailMailConfId" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="提现失败Tips模版" prop="withdrawFailTipsConfId">
            <TipsSelect v-model="form.withdrawFailTipsConfId" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xs="24">
          <el-form-item label="提现失败短信模板ID" prop="withdrawFailSmsConfId">
            <el-select v-model="form.withdrawFailSmsConfId" :placeholder="t('common.placeholder.select')" filterable>
              <el-option v-for="item in smsList" :key="item.id" :label="item.templateName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :md="8" :sm="24" :xs="24">
        <el-form-item label="状态:" prop="status">
          <el-switch v-model="form.status" active-text="启用" inactive-text="禁用" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-col>
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="提现失败短信模版:">
            <div style="width: 100%">
              <el-row :gutter="16">
                <el-col :md="8" :sm="20" :xs="20"> Code: </el-col>
                <el-col :md="8" :sm="20" :xs="20"> 短信模版: </el-col>
              </el-row>
              <div v-for="(item, index) in smsMapEntries" :key="index" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px">
                <el-col :md="8" :sm="20" :xs="20">
                  <el-input v-model="item.code" placeholder="Code" style="width: 100%" />
                </el-col>
                <el-col :md="8" :sm="20" :xs="20">
                  <el-select v-model="item.smsId" :placeholder="t('common.placeholder.select')" style="width: 100%" filterable>
                    <el-option v-for="opt in smsList" :key="opt.id" :label="opt.templateName" :value="opt.id" />
                  </el-select>
                </el-col>
                <el-col :md="8" :sm="4" :xs="4">
                  <el-button type="danger"  circle size="small" link @click="removeSmsMapEntry(index)" >删除</el-button>
                </el-col>
              </div>
              <el-button type="primary" size="small" @click="addSmsMapEntry">新增</el-button>
            </div>
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

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addPayChannel, updatePayChannel } from '@/api/pay/payChannel';
  // import StringSelect from '@/components/StringSelect/index.vue';
  // import DictData from '@/components/DictData/index.vue';
  import { pageSmsTemplates } from '@/api/platform/smsTemplateApi';
  import type { PayChannelParams, PayChannel } from '@/api/pay/model/index';
  import MailSelect from '@/components/MailSelect/index.vue';
  import { useI18n } from 'vue-i18n';
  import TipsSelect from '@/components/TipsSelect/index.vue';
  import { useConfigStore } from '@/store/modules/config';
  import { Delete } from '@element-plus/icons-vue';
  const configStore = useConfigStore();
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: PayChannel | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  const { t } = useI18n();
  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 是否是修改 */
  const isUpdate = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<PayChannelParams>({
    channelId: undefined,
    channelType: undefined,
    withdrawFee: undefined,
    rechargeFee: undefined,
    withdrawSmsConfId: undefined,
    paySmsConfId: undefined,
    withdrawFailMailConfId: undefined,
    withdrawFailSmsConfId: undefined,
    withdrawFailTipsConfId: undefined,
    name: '',
    // secretKey: '',
    // status: undefined,
    minPayLimit: undefined,
    status: undefined,
    maxPayLimit: undefined,
    minWithdrawLimit: undefined,
    maxWithdrawLimit: undefined,
    withdrawAutoAuditMin: undefined,
    withdrawAutoAuditMax: undefined,
    // withdrawFee: undefined,
    withdrawDailyLimit: undefined,
    identityVerificationThreshold: undefined,
    withdrawCheckGameTransfers: undefined,
    payTipsConfId: undefined,
    payMailConfId: undefined,
    withdrawMailConfId: undefined,
    withdrawTipsConfId: undefined,
    withdrawFailSmsMap: undefined,
    withdrawDailyAmountLimit: undefined,
    baseUrl: ''
    // notifyUrl: '',
    // hasAssignItem: false,
    // annex: ''
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    name: [
      {
        required: true,
        message: '请输入渠道名称',
        type: 'string',
        trigger: 'blur'
      }
    ],
    baseUrl: [
      {
        required: true,
        message: '请输入api地址',
        type: 'string',
        trigger: 'blur'
      }
    ],
    channelType: [
      {
        required: true,
        message: '请输入类型',
        type: 'number',
        trigger: 'change'
      }
    ],
    withdrawFee: [
      {
        required: true,
        message: '请输入提现手续费',
        type: 'number',
        trigger: 'blur'
      }
    ],
    rechargeFee: [
      {
        required: true,
        message: '请输入充值手续费',
        type: 'number',
        trigger: 'blur'
      }
    ],
    // minWithdrawLimit: [
    //   {
    //     required: true,
    //     message: '请输入最小提现限制',
    //     type: 'number',
    //     trigger: 'blur'
    //   }
    // ],
    // maxWithdrawLimit: [
    //   {
    //     required: true,
    //     message: '请输入最大提现限制',
    //     type: 'number',
    //     trigger: 'blur'
    //   }
    // ],
    minPayLimit: [
      {
        required: true,
        message: '请输入最小支付限制',
        type: 'number',
        trigger: 'blur'
      }
    ],
    maxPayLimit: [
      {
        required: true,
        message: '请输入最大支付限制',
        type: 'number',
        trigger: 'blur'
      }
    ],
    // withdrawDailyLimit: [
    //   {
    //     required: true,
    //     message: '请输入 每日提现次数',
    //     type: 'number',
    //     trigger: 'blur'
    //   }
    // ]
    // status: [
    //   {
    //     required: true,
    //     message: '请选择状态',
    //     type: 'number',
    //     trigger: 'blur'
    //   }
    // ],
  });
  const smsList = ref<any[]>([]);
  const getSMSList = () => {
    pageSmsTemplates({ page: 1, limit: 1000, countryCode: configStore.countryArr?.[0]?.code || 254 }).then((res) => {
      if (res && res.list) {
        smsList.value = res.list || [];
      }
    });
  };

  /** withdrawFailSmsMap 的数组表示，用于表格渲染 */
  interface SmsMapEntry {
    code: string;
    smsId: number | undefined;
  }
  const smsMapEntries = ref<SmsMapEntry[]>([]);

  /** 将 withdrawFailSmsMap 对象转为数组 */
  const buildSmsMapEntries = (map?: Record<string, number>) => {
    if (!map) {
      smsMapEntries.value = [];
      return;
    }
    smsMapEntries.value = Object.entries(map).map(([code, smsId]) => ({ code, smsId }));
  };

  /** 将数组转回 withdrawFailSmsMap 对象 */
  const buildSmsMapFromEntries = (): Record<string, number> | undefined => {
    const entries = smsMapEntries.value.filter((e) => e.code !== '' && e.smsId !== undefined);
    if (entries.length === 0) return undefined;
    const map: Record<string, number> = {};
    entries.forEach((e) => {
      map[e.code] = e.smsId!;
    });
    return map;
  };

  /** 新增一行 */
  const addSmsMapEntry = () => {
    smsMapEntries.value.push({ code: '', smsId: undefined });
  };

  /** 删除一行 */
  const removeSmsMapEntry = (index: number) => {
    smsMapEntries.value.splice(index, 1);
  };

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      // 保存前将 smsMapEntries 数组转回对象
      form.withdrawFailSmsMap = buildSmsMapFromEntries();
      const saveOrUpdate = isUpdate.value ? updatePayChannel : addPayChannel;
      saveOrUpdate(form)
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

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields(props.data);
      isUpdate.value = true;
      // 将 withdrawFailSmsMap 对象转为数组供表格渲染
      buildSmsMapEntries(props.data.withdrawFailSmsMap);
    } else {
      resetFields();
      isUpdate.value = false;
      smsMapEntries.value = [];
    }
    getSMSList();
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
