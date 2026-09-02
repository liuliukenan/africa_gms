<!-- 渠道分组编辑弹窗 -->
<template>
  <ele-modal :width="560" v-model="visible" :confirm-loading="loading" :title="isUpdate ? '修改渠道分组' : '新建渠道分组'" :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="国家" prop="countryCode">
        <el-select v-model="form.countryCode" placeholder="请选择" clearable style="width: 100%">
          <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="分组名称" prop="groupName">
        <el-input clearable placeholder="请输入分组名称" v-model="form.groupName" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input clearable placeholder="请输入备注" v-model="form.remark" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, nextTick } from 'vue';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addChannelGroup, updateChannelGroup } from '@/api/platform/channelGroupApi';
  import type { ChannelGroupVO } from '@/api/platform/model/channelGroup';
  import type { FormInstance, FormRules } from 'element-plus';
  import { useConfigStore } from '@/store/modules/config';

  const configStore = useConfigStore();
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: ChannelGroupVO | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });
  const formRef = ref<FormInstance | null>(null);

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);

  // 表单数据
  const { form, resetFields, assignFields } = useFormData<ChannelGroupVO>({
    id: undefined,
    countryCode: undefined,
    groupName: undefined,
    remark: undefined
  });

  // 表单验证规则
  const rules = reactive<FormRules>({
    groupName: [{ required: true, message: '请输入分组名称', trigger: 'blur' }],
    countryCode: [{ required: true, message: '请选择国家', trigger: 'change' }]
  });

  /* 保存编辑 */
  const save = () => {
    if (!formRef.value) return;
    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      loading.value = true;
      const saveOrUpdate = isUpdate.value ? updateChannelGroup : addChannelGroup;
      saveOrUpdate({ ...form } as any)
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

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };

  /** 弹窗打开事件 */
  const handleOpen = () => {
    nextTick(() => {
      if (props.data) {
        assignFields({ ...props.data });
        isUpdate.value = true;
      } else {
        resetFields();
        isUpdate.value = false;
      }
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
