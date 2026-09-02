<template>
  <ele-modal form :width="980" v-model="visible" :title="t('user.payRecord.info.title')" @open="handleOpen" destroyOnClose>
    <el-descriptions :column="2">
      <el-descriptions-item :label="t('user.payRecord.info.orderNo') + ': '">{{ form.orderNo }}</el-descriptions-item>
      <el-descriptions-item :label="t('user.payRecord.info.uid') + ': '">{{ form.uid }}</el-descriptions-item>
      <el-descriptions-item :label="t('user.payRecord.info.channel') + ': '">
        {{ getChannel() }}
      </el-descriptions-item>
      <!-- <el-descriptions-item :label="t('user.payRecord.info.moneyType') + ': '">
        <dict-data code="moneyType" valueType="number" type="tag" v-model="form.moneyType" />
        {{form.moneyType}}
      </el-descriptions-item> -->
      <el-descriptions-item :label="t('user.payRecord.info.amount') + ': '">
        {{ form.amount }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('user.payRecord.info.duty') + ': '">
        {{ form.duty }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('user.payRecord.info.payStatus') + ': '">
        <dict-data code="payStatus" v-model="form.payStatus" valueType="number" type="tag" :typeColor="setPayStatus(form?.payStatus)" />
      </el-descriptions-item>
      <el-descriptions-item :label="t('user.payRecord.info.orderStatus') + ': '">
        <dict-data code="pay_order_status" v-model="form.status" valueType="number" type="tag" :typeColor="setOrderStatus(form?.status)" />
      </el-descriptions-item>
      <el-descriptions-item :label="t('user.payRecord.info.notifyUrl') + ': '" :span="2" v-if="form.notifyUrl">
        {{ form.notifyUrl }}
      </el-descriptions-item>
      <el-descriptions-item :label="t('user.payRecord.info.jumpUrl') + ': '" :span="2" v-if="form.jumpUrl">
        {{ form.jumpUrl }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="2">
      <el-descriptions-item :label="t('user.payRecord.info.callback') + ': '" :span="2" v-if="form.callback">
        <JsonObjectViewer v-if="form.callback" :data="form.callback" />
      </el-descriptions-item>
      <el-descriptions-item :label="t('user.payRecord.info.response') + ': '" :span="2" v-if="form.response">
        <JsonObjectViewer v-if="form.response" :data="form.response" /> </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
    </template>
  </ele-modal>
</template>
<script lang="ts" setup>
  import type { PayRecord } from '@/api/model/payRecord';
  import { DictionaryData } from '@/api/model/dictdata';
  import { nextTick, ref } from 'vue';
  import { FormInstance } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useFormData } from '@/utils/use-form-data';
  import JsonObjectViewer from './JsonObjectViewer.vue';
  import { useConfigStore } from '@/store/modules/config.js';
  const configStore = useConfigStore();
  const { t } = useI18n();
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: PayRecord | null;
    statusArr?: DictionaryData[];
    payStatusArr?: DictionaryData[];
  }>();
  const getChannel = () => {
    return configStore.ShareChannelArr.find((item) => item.channel === form.channel)?.channelName;
  };
  const setOrderStatus = (status?: number) => {
    switch (status) {
      case 0: //未审核
        return 'primary';
      case 1: //已审核
        return 'success';
      case 2: //已拒绝
        return 'danger';
      case 3: //已成功
        return 'success';
      case 4: //已失败
        return 'danger';
      default:
        return 'info';
    }
  };
  const setPayStatus = (status?: number) => {
    if (status == 0) {
      return 'primary';
    } else if (status == 1) {
      return 'success';
    } else if (status == 2) {
      return 'danger';
    } else {
      return 'primary';
    }
  };

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);
  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });
  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };
  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<PayRecord>({
    orderNo: undefined,
    uid: undefined,
    channel: undefined,
    amount: undefined,
    duty: undefined,
    payStatus: undefined,
    status: undefined,
    moneyType: undefined,
    notifyUrl: undefined,
    jumpUrl: undefined,
    callback: undefined,
    response: undefined
  });
  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields({ ...props.data });
    } else {
      resetFields();
    }
    nextTick(() => {
      formRef.value?.clearValidate?.();
    });
  };
</script>
