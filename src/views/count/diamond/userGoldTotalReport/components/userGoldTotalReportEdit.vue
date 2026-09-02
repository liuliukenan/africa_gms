<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="680" v-model="visible" :confirm-loading="loading" :title="isUpdate ? '修改用户金币统计' : '新建用户金币统计'"
    :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" :label-col="{ md: 7, sm: 4, xs: 24 }"
      :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="uid" name="uid">
            <el-input-number  :controls="false" v-model.trim="form.uid" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="总下注" name="totalBet">
            <el-input-number  :controls="false" v-model.trim="form.totalBet" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="总赢取" name="totalWin">
            <el-input-number  :controls="false" v-model.trim="form.totalWin" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="净利" name="totalResult">
            <el-input-number  :controls="false" v-model.trim="form.totalResult" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="下注次数" name="betNum">
            <el-input-number  :controls="false" v-model.trim="form.betNum" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="赢取次数" name="winNum">
            <el-input-number  :controls="false" v-model.trim="form.winNum" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="" name="rollNum">
            <el-input-number  :controls="false" v-model.trim="form.rollNum" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from '@/utils/use-form-data';
import { addUserGoldTotalReport, updateUserGoldTotalReport } from '@/api/count/userGoldTotalReport'
import { FormInstance, FormRules } from 'element-plus';
import type { UserGoldTotalReport } from '@/api/count/model'
const emit = defineEmits<{
  (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

const props = defineProps<{
  // 修改回显的数据
  data?: Object | null;
}>();

//
const formRef = ref<FormInstance | null>(null);

// 是否是修改
const isUpdate = ref(false);

// 提交状态
const loading = ref(false);

// 表单数据
const { form, resetFields, assignFields } = useFormData<UserGoldTotalReport>({
  uid: undefined,
  totalBet: 0,
  totalWin: 0,
  totalResult: 0,
  betNum: 0,
  winNum: 0,
  rollNum: 0,
});

// 表单验证规则
const rules = reactive<FormRules>({
  uid: [
    {
      required: true,
      type: 'number',
      message: '请输入uid',
      trigger: 'blur'
    }
  ],
  totalBet: [
    {
      required: true,
      type: 'number',
      message: '请输入总下注',
      trigger: 'blur'
    }
  ],
  totalWin: [
    {
      required: true,
      type: 'number',
      message: '请输入总赢取',
      trigger: 'blur'
    }
  ],
  totalResult: [
    {
      required: true,
      type: 'number',
      message: '请输入净利',
      trigger: 'blur'
    }
  ],
  betNum: [
    {
      required: true,
      type: 'number',
      message: '请输入下注次数',
      trigger: 'blur'
    }
  ],
  winNum: [
    {
      required: true,
      type: 'number',
      message: '请输入赢取次数',
      trigger: 'blur'
    }
  ],
  rollNum: [
    {
      required: true,
      type: 'number',
      message: '请输入',
      trigger: 'blur'
    }
  ]
});

/* 保存编辑 */
const save = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value?.validate?.((valid) => {
    if (!valid) return;
    loading.value = true;
    const saveOrUpdate = isUpdate.value ? updateUserGoldTotalReport : addUserGoldTotalReport;
    saveOrUpdate(form)
      .then((msg) => {
        loading.value = false;
        EleMessage.success(msg);

        emit('done');
      })
      .catch((e) => {
        loading.value = false;
        EleMessage.error(e.message);
      });
  })
    .catch(() => { });
};
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
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
