<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" :title="t('user.mail.newMail')" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.mail.form.fromName')" prop="fromName">
            <el-input clearable :maxlength="20" :placeholder="t('user.mail.placeholder.fromName')" v-model="form.fromName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.mail.form.toUid')" prop="toUid">
            <el-input-number v-if="!isUpdate" :controls="false" v-model="form.toUid" :min="0" :placeholder="t('common.placeholder.input')"
              style="width: 100%" />
            <div v-else> {{ form.toUid }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.mail.form.title')" prop="title">
            <el-input clearable :maxlength="50" v-model="form.title" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.mail.form.tagType')" prop="tagType">
            <dict-data code="mailTag" v-model="form.tagType" valueType="number" :placeholder="t('user.mail.placeholder.tagType')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24" v-if="showTag">
          <el-form-item :label="t('user.mail.form.annexType')" prop="annexType">
            <!-- <dict-data code="annexType" v-model="form.annexType" valueType="number" placeholder="请选择附件类型" /> -->
            <dict-data code="goods_type" v-model="form.annexType" valueType="number" :placeholder="t('user.mail.placeholder.annexType')" />
            <!-- 0=cash 1=group 2=game 3=freeGame  10=none-->
          </el-form-item>
        </el-col>
        <!--cash和none 时不显示-->
        <el-col :sm="24" :xs="24" v-if="form.annexType != 10 && form.annexType !== 0&& form.annexType !== undefined">
          <el-form-item :label="t('user.mail.form.exampleId')" prop="exampleId">
            <!-- 钱包模板需要筛选一下 -->
            <!-- group：钱包模版， gameId==0 -->
            <template v-if="form.annexType == 1">
              <WalletSelect v-model="form.exampleId" filter-type="group" />
            </template>
            <!-- game：钱包模版，gameId>0 -->
            <template v-if="form.annexType == 2">
              <WalletSelect v-model="form.exampleId" filter-type="game" />
            </template>
            <!-- 免费游戏模板 -->
            <template v-if="form.annexType == 3">
              <FreeGameSelect v-model="form.exampleId" />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="类型: " prop="type">
            <el-radio-group v-model="form.type" placeholder="请选择类型">
              <el-radio :value="0">系统</el-radio>
              <el-radio :value="4">充值</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16" v-if="form.moneyType==0">
        <el-col :sm="24" :xs="24">
          <el-form-item label="金币" prop="gold">
            <el-input-number v-model="form.gold" :controls="false" :min="0" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16" v-if="form.moneyType==1">
        <el-col :sm="24" :xs="24">
          <el-form-item label="钻石" prop="diamond">
            <el-input-number v-model="form.diamond" :controls="false" :min="0" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="16" v-if="form.annexType != 10 && form.annexType != 3&&showTag">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.mail.form.amount')">
            <el-input-number :controls="false" clearable style="width: 100%" v-model="form.amount" :placeholder="t('common.placeholder.input')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24" v-if="(form.amount != undefined && form.amount > 0) || form.annexType == 3">
          <el-form-item :label="t('user.mail.form.flowMutl')" prop="flowMutl">
            <el-input-number :controls="false" clearable v-model="form.flowMutl" :placeholder="t('common.placeholder.input')"
              style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.mail.form.validHours')" prop="validHours" v-if="form.annexType == 3">
            <el-input-number :controls="false" clearable v-model="form.validHours" :placeholder="t('common.placeholder.input')"
              style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('user.mail.form.content')" prop="content">
            <el-input type="textarea" :rows="4" clearable :maxlength="500" v-model="form.content" :placeholder="t('common.placeholder.input')" />
            <!-- <Editor /> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="open"> {{ t('user.mail.send') }} </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from 'vue';
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { addMail } from '@/api/user/mailApi';
import type { Mail } from '@/api/model/mail';
// import Editor from '@/views/extension/editor/index.vue';
import WalletSelect from '@/components/WallteSelect/index.vue';
import FreeGameSelect from '@/components/FreeGameSelect/index.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    /** 修改回显的数据 */
    uid?: number | null;
    showTag?: boolean;
  }>(),
  {
    showTag: true
  }
);

const emit = defineEmits<{
  (e: 'done'): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<Mail>({
  fromName: 'System',
  toUid: undefined,
  title: undefined,
  content: undefined,
  amount: undefined,
  flowMutl: undefined,
  exampleId: undefined,
  tagType: undefined,
  validHours: 72,
  // diamond: undefined,
  // moneyType: 0,
  status: 0,
  type: 0,
  fromType: 0,
  toType: 0,
  duty: 0,
  rebate: 0,
  fromUid: 1
  // coupon: 0,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  fromName: [
    {
      required: true,
      type: 'string',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
  toUid: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
  annexType: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.select'),
      trigger: 'blur'
    }
  ],
  tagType: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.select'),
      trigger: 'blur'
    }
  ],
  exampleId: [
    {
      required: false,
      type: 'number',
      message: t('common.placeholder.select'),
      trigger: 'blur'
    }
  ],
  flowMutl: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
  title: [
    {
      required: true,
      type: 'string',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      type: 'string',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
  amount: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ],
  diamond: [
    {
      required: true,
      type: 'number',
      message: t('common.placeholder.input'),
      trigger: 'blur'
    }
  ]
});
const title = ref(t('user.mail.sendConfirm'));
// 更新提示语
const open = () => {
  formRef.value?.validate?.((valid) => {
    if (!valid) return;
    // title.value = `确认对用户 ${form.toUid} 发送 ${form.amount}  吗？`;
    save();
  });
};
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
const save = () => {
  ElMessageBox.confirm(title.value, t('common.tips'), { type: 'warning', draggable: true })
    .then(() => {
      loading.value = true;
      console.log('form', form);
      addMail(form)
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
    })
    .catch(() => { });
};
watch(
  () => form.annexType,
  (val) => {
    form.exampleId = undefined;
    const isBonus = val == 2;
    if (rules.exampleId) rules.exampleId[0].required = isBonus;
    if (!isBonus) {
      form.exampleId = undefined;
      // nextTick(() => formRef.value?.clearValidate?.(['exampleId']));
    }
    if (val == 0 || val == 3) {
      form.amount = undefined;
    }
  }
);
/** 弹窗打开事件 */
const handleOpen = () => {
  if (props.uid) {
    resetFields();
    form.toUid = props.uid;
    console.log('open', form);
    // assignFields({ toUid: props.uid });
    isUpdate.value = true;
  } else {
    resetFields();
    isUpdate.value = false;
  }
  nextTick(() => {
    nextTick(() => {
      formRef.value?.clearValidate?.();
    });
  });
};
</script>
