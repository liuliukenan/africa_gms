<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? t('config.payItem.edit.titleEdit') : t('config.payItem.edit.titleAdd')" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- <el-col :sm="24" :xs="24">
                        <el-form-item label="id" prop="id">
                            <el-input-number   v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col> -->
      </el-row>
      <el-row :gutter="16">
        <!-- <el-col :sm="24" :xs="24">
          <el-form-item label="ID" prop="id">
            <el-input-number :controls="false" :min="0" clearable v-model="form.id" placeholder="请输入" style="width: 100%;"/>
          </el-form-item>
        </el-col> -->
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('config.payItem.edit.amount')" prop="amount">
            <el-input-number :controls="false" :min="0" clearable v-model="form.amount" :placeholder="t('common.placeholder.input')"
              style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('config.payItem.edit.status')" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">{{ t('config.payItem.edit.statusEnabled') }}</el-radio>
              <el-radio :label="0">{{ t('config.payItem.edit.statusDisabled') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('config.payItem.edit.remark')" prop="remark">
            <el-input type="textarea" clearable v-model="form.remark" :placeholder="t('common.placeholder.input')" :rows="3" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        {{ t('action.save') }}
      </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { addPayItem, updatePayItem } from "@/api/config/payItemApi";
import type { PayItem, PayItemParam } from "@/api/config/model/payItem";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps<{
  /** 修改回显的数据 */
  data?: PayItem | null;
}>();

const emit = defineEmits<{
  (e: "done"): void;
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
const [form, resetFields, assignFields] = useFormData<PayItem>({
  id: undefined,
  amount: undefined,
  remark: undefined,
  status: 1,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  id: [
    {
      required: true,
      type: 'number',
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
  ]
});

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
    const saveOrUpdate = isUpdate.value ? updatePayItem : addPayItem;;
    saveOrUpdate(form)
      .then((msg) => {
        loading.value = false;
        EleMessage.success(msg);
        handleCancel();
        emit("done");
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
