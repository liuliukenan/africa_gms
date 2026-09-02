<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改搜索热门游戏配置' : '新建搜索热门游戏配置'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- 搜索内容 - 改为普通输入框 -->
        <el-col :sm="24" :xs="24">
          <el-form-item label="国家" prop="countryCode">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%" :disabled="isUpdate">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="游戏ID" prop="gameId">
            <el-input clearable v-model.trim="form.gameId" type="number" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="游戏名称" prop="gameName">
            <!-- {{ form.gameName }} -->
            <el-input clearable v-model.trim="form.gameName" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="排序" name="sortNumber">
            <el-input clearable v-model.trim="form.sortNumber" type="number" placeholder="请输入" />
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
  import { GameHots } from '@/api/config/model/gameHots';
  import { addGameHots, updateGameHots } from '@/api/config/hot/gameHotsApi';
  import { useConfigStore } from '@/store/modules/config'; // 导入store
  // 初始化store
  const configStore = useConfigStore();
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: GameHots | null;
  }>();
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
  const [form, resetFields, assignFields] = useFormData<GameHots>({
    id: undefined,
    countryCode: undefined,
    gameId: undefined,
    sortNumber: 100,
    gameName: ''
  });
  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    gameId: [{ required: true, message: '请输入搜索内容', trigger: 'blur' }],
    sortNumber: [{ required: true, message: '请输入排序', trigger: 'blur' }]
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
      const submitData = {
        ...form,
        sortNumber: form.sortNumber ? Number(form.sortNumber) : undefined
      };

      const saveOrUpdate = isUpdate.value ? updateGameHots : addGameHots;
      saveOrUpdate(submitData)
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
