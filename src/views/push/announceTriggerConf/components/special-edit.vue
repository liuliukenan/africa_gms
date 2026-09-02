<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改' : '新建'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="触发类型" prop="triggerType">
            <dict-data code="announceType" v-model="form.triggerType" valueType="number" type="tag" placeholder="请选择跑马灯类型" style="width: 100%" />
          </el-form-item>
        </el-col>

        <el-col :sm="24" :xs="24" v-if="form.triggerType == 1 || form.triggerType == 2">
          <el-form-item label="最低倍数" prop="minMultiplier">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.minMultiplier" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24" v-if="form.triggerType == 1 || form.triggerType == 2">
          <el-form-item label="最低赢得金额" prop="minAmount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.minAmount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :sm="24" :xs="24" v-if="form.triggerType == 3">
          <el-form-item label="最低提款金额" prop="minAmount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.minAmount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24" v-if="form.triggerType == 4">
          <el-form-item label="单次邀请奖励最低值" prop="minAmount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.minAmount" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <!-- <el-col :sm="24" :xs="24">
                    <el-form-item label="是否机器人" prop="isRobot">
                        <el-radio-group v-model="form.isRobot">
                            <el-radio :value="0">否</el-radio>
                            <el-radio :value="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col> -->
        <!-- <el-col :sm="24" :xs="24">
                    <el-form-item label="倍数上限" prop="maxMultiplier">
                        <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.maxMultiplier"
                            :min="0" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->

        <el-col :sm="24" :xs="24">
          <el-form-item label="状态" prop="state">
            <el-switch v-model="form.state" :active-value="1" :inactive-value="0" :active-text="form.state == 1 ? '开启' : '关闭'" />
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
  import { addAnnounceTriggerConf, updateAnnounceTriggerConf } from '@/api/push/announceTriggerConfApi';
  import type { AnnounceTriggerConf } from '@/api/push/model/announceTriggerConf';

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: AnnounceTriggerConf | null;
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
  const [form, resetFields, assignFields] = useFormData<AnnounceTriggerConf>({
    id: undefined,
    triggerType: undefined,
    minMultiplier: undefined,
    maxAmount: undefined,
    minAmount: undefined,
    isRobot: false,
    maxMultiplier: undefined,
    state: undefined
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    triggerType: [
      {
        required: true,
        type: 'number',
        message: '请选择触发类型',
        trigger: 'blur'
      }
    ],
    minMultiplier: [
      {
        required: true,
        type: 'number',
        message: '请输入最低倍数',
        trigger: 'blur'
      }
    ],
    minAmount: [
      {
        required: true,
        type: 'number',
        message: '请输入最低提款金额',
        trigger: 'blur'
      }
    ],

    isRobot: [
      {
        required: true,
        type: 'number',
        message: '请输入是否机器人专属配置',
        trigger: 'blur'
      }
    ],
    maxMultiplier: [
      {
        required: true,
        type: 'number',
        message: '请输入倍数上限',
        trigger: 'blur'
      }
    ],
    state: [
      {
        required: true,
        type: 'number',
        message: '请选择状态',
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
      const saveOrUpdate = isUpdate.value ? updateAnnounceTriggerConf : addAnnounceTriggerConf;
      saveOrUpdate(form)
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
      assignFields({ ...props.data });
      form.state = form.state == 1 ? 1 : 0;
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
