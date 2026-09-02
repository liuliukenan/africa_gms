<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '审核合伙人申请' : '新建合伙人申请'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="id" prop="id">
            <el-input-number v-model="form.id" :min="0" :controls="false" style="width:100%;" placeholder="请输入" />
             <span>{{form.id}}</span>
          </el-form-item>
        </el-col> -->
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="UID:" prop="uid">
            <!-- <el-input-number v-model="form.uid" :min="0" :controls="false" style="width:100%;" placeholder="请输入" /> -->
            <span>{{ form.uid }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="等级:" prop="level"
            :rules="form.status === 2 ? [{ required: true, message: '请选择等级', trigger: 'change' }] : []">
            <el-select v-model="form.level" style="width:100%;" placeholder="请选择等级">
              <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="状态:" prop="status">
            <el-radio-group v-model="form.status" >
              <el-radio :value="2">同意</el-radio>
              <el-radio :value="1">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import { addParterApply, updateParterApply, auditParterApply } from "@/api/welfare/parterApplyApi";
import type { ApplyParam, ParterApply } from "@/api/welfare/model/parterApply";

const props = defineProps<{
  /** 修改回显的数据 */
  data?: ParterApply | null;
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
const [form, resetFields, assignFields] = useFormData<ApplyParam>({
  id: undefined,
  uid: undefined,
  level: undefined,
  status: undefined,
});
const levelOptions = [
  { label: '一级', value: 1 },
  // { label: '二级', value: 2 },
  // { label: '三级', value: 3 },
  // { label: '四级', value: 4 },
  // { label: '五级', value: 5 },
];
/** 表单验证规则 */
const rules = reactive<FormRules>({
  status: [
    {
      required: true,
      type: 'number',
      message: '请输入状态',
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
    // const saveOrUpdate = isUpdate.value ? updateParterApply : addParterApply;;
    let params = { ...form }
    if (params.status === 1) params.level = 0; // 默认0

    auditParterApply(params)
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
