<template>
  <ele-modal form :width="680" v-model="visible"
             :title="isUpdate ? '修改搜索查询记录' : '新建搜索查询记录'"
             @open="handleOpen">

    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- ID - 改为普通输入框（因为id是自增长的） -->
        <el-col :sm="12" :xs="12">
          <el-form-item label="游戏ID" name="uid">
            <el-input clearable v-model.trim="form.uid" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <!-- 搜索内容 - 保持为普通输入框 -->
        <el-col :sm="12" :xs="12">
          <el-form-item label="搜索内容" name="keyText">
            <el-input clearable :maxlength="50" v-model.trim="form.keyText" placeholder="请输入" />
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
import {GameSearchRecord} from "@/api/config/model/gameSearchRecord";
import {addGameSearchRecord, updateGameSearchRecord} from "@/api/config/gameSearchRecord/gameSearchRecordApi";
const props = defineProps<{
  /** 修改回显的数据 */
  data?: GameSearchRecord | null;
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
const [form, resetFields, assignFields] = useFormData<GameSearchRecord>({
  id: undefined,
  uid: "",           // 改为字符串类型
  keyText: ""        // 改为字符串类型
});
/** 表单验证规则 */
const rules = reactive<FormRules>({
  uid: [
    { required: true, message: '请输入游戏ID', trigger: 'blur' }
  ],
  keyText: [
    { required: true, message: '请输入搜索内容', trigger: 'blur' }
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
      uid: form.uid ? Number(form.uid) : undefined
    };

    const saveOrUpdate = isUpdate.value ? updateGameSearchRecord : addGameSearchRecord;

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
