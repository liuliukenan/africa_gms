<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="600" v-model="visible" :confirm-loading="loading" :title="isUpdate ? '修改游戏服务' : '新建游戏服务'"
    :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="渠道类型" prop="channelId">
            <el-select v-model="form.channelId" placeholder="请选择渠道类型" clearable style="width: 100%">
              <el-option v-for="item in channelArr" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="服务器名称" prop="name">
            <el-input clearable placeholder="请输入服务器名称" v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="服务器类型" prop="serverType">
            <dict-data code="serverType" v-model="form.serverType" valueType="number" placeholder="请选择服务器类型" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="服务器地址" prop="addr">
            <el-input clearable placeholder="请输入服务器地址" v-model="form.addr" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="启用" prop="state">
            <el-switch v-model="form.state" style="--el-switch-on-color: #13ce66; "></el-switch>
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

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { addGameServer, updateGameServer } from '@/api/game/gameServer/index';
import type { GameServer, GameChannels } from '@/api/game/model/index';
import { FormInstance, FormRules } from 'element-plus';
const props = defineProps<{
  /** 修改回显的数据 */
  data?: GameServer | null;
  channelArr: GameChannels[]
}>();

const emit = defineEmits<{
  (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });
const formRef = ref<FormInstance | null>(null);

// 是否是修改
const isUpdate = ref(false);

// 提交状态
const loading = ref(false);


// 表单数据
const { form, resetFields, assignFields } = useFormData<GameServer>({
  id: undefined,
  name: undefined,
  serverType: undefined,
  addr: undefined,
  port: undefined,
  channelId: undefined,
  state: true
});

// 表单验证规则
const rules = reactive<FormRules>({
  id: [
    {
      required: true,
      type: 'number',
      message: '请输入id',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      type: 'string',
      message: '请输入服务器名称',
      trigger: 'blur'
    }
  ],
  serverType: [
    {
      required: true,
      type: 'number',
      message: '请输入服务器类型',
      trigger: 'blur'
    }
  ],
  addr: [
    {
      required: true,
      type: 'string',
      message: '请输入服务器地址',
      trigger: 'blur'
    }
  ],
  port: [
    {
      required: true,
      type: 'number',
      message: '请输入端口',
      trigger: 'blur'
    }
  ],
  channelId: [
    {
      required: true,
      type: 'number',
      message: '请选择渠道',
      trigger: 'blur'
    }
  ]
});

/* 保存编辑 */
const save = () => {
  console.log(form);
  
  if (!formRef.value) {
    return;
  }
  formRef.value?.validate?.((valid) => {
    if (!valid)  return;
    
    loading.value = true;
    const saveOrUpdate = isUpdate.value ? updateGameServer : addGameServer;;
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
