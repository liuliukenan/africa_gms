<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="680" :confirm-loading="loading" title="详情" :body-style="{ paddingBottom: '5px' }" v-model="visible"
    @open="handleOpen">
    <el-form ref="formRef" :model="form" :label-col="{ md: 7, sm: 4, xs: 24 }"
      :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="ID: " prop="id">
            {{ form.id }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="日期: " prop="daykey">
            {{ form.daykey }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="ukey: " prop="ukey">
            {{ form.ukey }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="充值渠道: " prop="channelType">
            {{ form.channelType }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="unit: " prop="unit">
            {{ form.unit }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="充值金额: " prop="payAmount">
            {{ form.payAmount }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="提现金额: " prop="withdrawAmount">
            {{ form.withdrawAmount }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="充值次数: " prop="payTimes">
            {{ form.payTimes }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="提现次数: " prop="withdrawTimes">
            {{ form.withdrawTimes }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useFormData } from '@/utils/use-form-data';
import { FormInstance } from 'element-plus';
import type { SysPayCount } from '@/api/count/model';
const emit = defineEmits(['done']);
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const props = defineProps<{
  // 修改回显的数据
  data: SysPayCount| null
}>();

const formRef = ref<FormInstance | null>(null);

// 是否是修改
const isUpdate = ref(false);

// 提交状态
const loading = ref(false);

// 表单数据
const { form, resetFields, assignFields } = useFormData<SysPayCount>({
  id: undefined,
  daykey: undefined,
  ukey: undefined,
  channelType: undefined,
  unit: undefined,
  payAmount: undefined,
  withdrawAmount: undefined,
  payTimes: undefined,
  withdrawTimes: undefined,
});
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};
/** 弹窗打开事件 */
const handleOpen = () => {
  if (props.data && props.data?.id) {
    assignFields({ ...props.data });
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
