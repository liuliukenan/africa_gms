<template>
  <ele-modal form :width="680" v-model="visible"
             :title="isUpdate ? '修改搜索关键字配置' : '新建搜索关键字配置'"
             @open="handleOpen">

    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- ID - 改为普通输入框（因为id是自增长的） -->
        <el-col :sm="24" :xs="24">
          <el-form-item label="名称" name="keyText">
            <el-input clearable :maxlength="50" v-model.trim="form.keyText" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- 排序ID - 改为普通输入框 -->
        <el-col :sm="24" :xs="24">
          <el-form-item label="排序ID" name="sortNumber">
            <el-input clearable v-model.trim="form.sortNumber" placeholder="请输入" type="number" />
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
import { ref, reactive, nextTick } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { EleMessage } from "ele-admin-plus/es";
import { useFormData } from "@/utils/use-form-data";
import {GameKeywords} from "@/api/config/model/gameKeywords";
import {addGameKeywords, updateGameKeywords} from "@/api/config/gameKeywords/gameKeywordsApi";
const props = defineProps<{
  /** 修改回显的数据 */
  data?: GameKeywords | null;
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
const [form, resetFields, assignFields] = useFormData<GameKeywords>({
  id: undefined,
  keyText: "",           // 改为字符串类型
  sortNumber: ""         // 改为字符串类型
});
/** 表单验证规则 */
const rules = reactive<FormRules>({
  keyText: [
    { required: true, message: '请输入名称', trigger: 'blur' }
  ],
  sortNumber: [
    { required: true, message: '请输入排序ID', trigger: 'blur' }
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

    // 转换数据类型（如果需要）
    const submitData = {
      ...form,
      sortNumber: form.sortNumber ? Number(form.sortNumber) : undefined
    };

    const saveOrUpdate = isUpdate.value ? updateGameKeywords : addGameKeywords;

    saveOrUpdate(submitData)
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
    assignFields({
      ...props.data
    });
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
<style scoped>
/* 可选样式优化 */
.el-input {
  width: 100%;
}
/* 确保表单布局美观 */
.el-form-item {
  margin-bottom: 16px;
}
</style>
