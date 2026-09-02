<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改机器人中奖配置' : '新建机器人中奖配置'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="" name="id">
            {{ id }}
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="12">
          <el-form-item label="游戏ID" name="gameId">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.gameId" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="游戏名称" name="gameName">
            <el-input clearable :maxlength="50" v-model="form.gameName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="抽取权重" name="weight">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.weight" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="下注金额" name="betAmounts">
            <el-input clearable v-model="form.betAmountsStr" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="状态">
            <el-select v-model="form.state" placeholder="请选择" clearable style="width: 100%">
              <el-option label="CLOSE" :value="false" />
              <el-option label="OPEN" :value="true" />
            </el-select>
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

  import type { RobotWinConf } from '@/api/config/model/robotWinConf';
  import { addRobotWinConf, updateRobotWinConf } from '@/api/config/robotWinConfApi';

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: RobotWinConf | null;
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
  const [form, resetFields, assignFields] = useFormData<RobotWinConf>({
    id: undefined,
    gameId: undefined,
    gameName: undefined,
    weight: undefined,
    betAmountsStr: '[]',
    state: true
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    id: [
      {
        required: true,
        type: 'number',
        message: '请输入',
        trigger: 'blur'
      }
    ],
    gameId: [
      {
        required: true,
        type: 'number',
        message: '请输入游戏ID',
        trigger: 'blur'
      }
    ],
    gameName: [
      {
        required: true,
        type: 'string',
        message: '请输入游戏名称',
        trigger: 'blur'
      }
    ],
    weight: [
      {
        required: true,
        type: 'number',
        message: '请输入抽取权重',
        trigger: 'blur'
      }
    ],
    betAmountsStr: [
      {
        required: true,
        type: 'number',
        message: '请输入下注金额列表',
        trigger: 'blur'
      }
    ],
    state: [
      {
        required: true,
        type: 'number',
        message: '请输入启用/禁用',
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
    form.betAmounts = JSON.parse(form.betAmountsStr || '[]');
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;

      const saveOrUpdate = isUpdate.value ? updateRobotWinConf : addRobotWinConf;
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
      form.betAmountsStr = JSON.stringify(props.data.betAmounts);
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
