<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="1000" v-model="visible" :confirm-loading="loading" :title="isUpdate ? '修改裂变配置' : '新建裂变配置'"
    :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="游戏ID" prop="gameId">
            <el-input-number :controls="false" clearable v-model="form.gameId" style="width: 100%"
              placeholder="请输入游戏ID" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="前置任务ID" prop="preTask">
            <el-input-number :controls="false" clearable v-model="form.preTask" style="width: 100%"
              placeholder="请输入前置任务ID" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="中文名称" prop="questNameCn">
            <el-input clearable placeholder="请输入中文名称" v-model="form.questNameCn" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="英文名称" prop="questNameEn">
            <el-input clearable placeholder="请输入英文名称" v-model="form.questNameEn" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="中文描述" prop="questChineseCn">
            <el-input clearable placeholder="请输入中文描述" type="textarea" v-model="form.questChineseCn" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="英文描述" prop="questChineseEn">
            <el-input clearable placeholder="请输入英文描述" type="textarea" v-model="form.questChineseEn" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="泰语名称" prop="questNameTh">
            <el-input clearable placeholder="请输入泰语名称" v-model="form.questNameTh" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="马来名称" prop="questNameMy">
            <el-input clearable placeholder="请输入马来名称" v-model="form.questNameMy" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="泰语描述" prop="questChineseTh">
            <el-input clearable placeholder="请输入泰语描述" type="textarea" v-model="form.questChineseTh" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="马来描述" prop="questChineseMy">
            <el-input clearable placeholder="请输入马来描述" type="textarea" v-model="form.questChineseMy" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="印尼名称" prop="questNameIdn">
            <el-input clearable placeholder="请输入印尼名称" v-model="form.questNameIdn" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="越南名称" prop="questNameVn">
            <el-input clearable placeholder="请输入越南名称" v-model="form.questNameVn" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="印尼描述" prop="questChineseIdn">
            <el-input clearable placeholder="请输入印尼描述" type="textarea" v-model="form.questChineseIdn" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="越南描述" prop="questChineseVn">
            <el-input clearable placeholder="请输入越南描述" type="textarea" v-model="form.questChineseVn" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="缅甸名称" prop="questNameMya">
            <el-input clearable placeholder="请输入缅甸名称" v-model="form.questNameMya" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="缅甸描述" prop="questChineseMya">
            <el-input clearable placeholder="请输入缅甸描述" type="textarea" v-model="form.questChineseMya" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="任务类型" prop="taskType">
            <dict-data code="qustType" v-model="form.taskType" valueType="number" placeholder="请选择任务类型" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="任务目标数量" prop="needNum">
            <el-input-number :controls="false" clearable placeholder="请输入任务目标数量" v-model="form.needNum"
              style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="奖励类型" prop="rewardType">
            <dict-data code="rewardType" v-model="form.rewardType" valueType="number" placeholder="请选择奖励类型" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="奖励数量" prop="rewardNum">
            <el-input-number :controls="false" clearable placeholder="请输入奖励数量" v-model="form.rewardNum"
              style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :lg="12" :md="12" :sm="24" :xs="24">
        <el-form-item label="任务关联" prop="taskRefer">
          <dict-data code="taskReferType" valueType="number" v-model="form.taskRefer" placeholder="请选择任务关联" style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="可否重复" prop="isReturn">
            <el-radio-group v-model="form.isReturn">
              <el-radio :value="1">可</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="同时进行" prop="isTogether">
            <el-radio-group v-model="form.isTogether">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { updateFission, addFission } from '@/api/taskConfig/fission';
import type { Fission } from '@/api/taskConfig/model';
import { FormInstance, FormRules } from 'element-plus';

const props = defineProps<{
  /** 修改回显的数据 */
  data?: Fission | null;
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
const { form, resetFields, assignFields } = useFormData<Fission>({
  id: undefined,
  questNameCn: undefined,
  questChineseCn: undefined,
  questNameEn: undefined,
  questChineseEn: undefined,
  questNameTh: undefined,
  questChineseTh: undefined,
  questNameMy: undefined,
  questChineseMy: undefined,
  questNameIdn: undefined,
  questChineseIdn: undefined,
  questNameVn: undefined,
  questChineseVn: undefined,
  questNameMya: undefined,
  questChineseMya: undefined,
  gameId: undefined,
  taskRefer: undefined,
  preTask: undefined,
  taskType: undefined,
  needNum: undefined,
  isTogether: 0,
  isReturn: 0,
  rewardNum: undefined,
  rewardType: undefined,
});

// 表单验证规则
const rules = reactive<FormRules>({
  gameId: [
    {
      required: true,
      type: 'number',
      message: '请输入针对游戏ID',
      trigger: 'blur'
    }
  ],
  preTask: [
    {
      required: true,
      type: 'number',
      message: '请输入前置任务ID',
      trigger: 'blur'
    }
  ],
  questNameCn: [
    {
      required: true,
      type: 'string',
      message: '请输入中文任务名称',
      trigger: 'blur'
    }
  ],
  questChineseCn: [
    {
      required: true,
      type: 'string',
      message: '请输入中文描述',
      trigger: 'blur'
    }
  ],
  questNameEn: [
    {
      required: true,
      type: 'string',
      message: '请输入英文任务名称',
      trigger: 'blur'
    }
  ],
  questChineseEn: [
    {
      required: true,
      type: 'string',
      message: '请输入英文描述',
      trigger: 'blur'
    }
  ],
  questNameTh: [
    {
      required: true,
      type: 'string',
      message: '请输入泰文任务名称',
      trigger: 'blur'
    }
  ],
  questChineseTh: [
    {
      required: true,
      type: 'string',
      message: '请输入泰语描述',
      trigger: 'blur'
    }
  ],
  questNameMy: [
    {
      required: true,
      type: 'string',
      message: '请输入马来任务名称',
      trigger: 'blur'
    }
  ],
  questChineseMy: [
    {
      required: true,
      type: 'string',
      message: '请输入马来描述',
      trigger: 'blur'
    }
  ],
  questNameIdn: [
    {
      required: true,
      type: 'string',
      message: '请输入印尼任务名称',
      trigger: 'blur'
    }
  ],
  questChineseIdn: [
    {
      required: true,
      type: 'string',
      message: '请输入印尼描述',
      trigger: 'blur'
    }
  ],
  questNameVn: [
    {
      required: true,
      type: 'string',
      message: '请输入越南任务名称',
      trigger: 'blur'
    }
  ],
  questChineseVn: [
    {
      required: true,
      type: 'string',
      message: '请输入越南描述',
      trigger: 'blur'
    }
  ],
  questNameMya: [
    {
      required: true,
      type: 'string',
      message: '请输入缅甸任务名称',
      trigger: 'blur'
    }
  ],
  questChineseMya: [
    {
      required: true,
      type: 'string',
      message: '请输入缅甸描述',
      trigger: 'blur'
    }
  ],
  taskType: [
    {
      required: true,
      type: 'number',
      message: '请选择任务类型',
      trigger: 'blur'
    }
  ],
  rewardNum: [
    {
      required: true,
      type: 'number',
      message: '请输入奖励数量',
      trigger: 'blur'
    }
  ],
  needNum: [
    {
      required: true,
      type: 'number',
      message: '请输入任务目标数量',
      trigger: 'blur'
    }
  ],
  rewardType: [
    {
      required: true,
      type: 'number',
      message: '请选择奖励类型',
      trigger: 'blur'
    }
  ],
});

/* 保存编辑 */
const save = () => {
  console.log(form);

  if (!formRef.value) {
    return;
  }
  formRef.value?.validate?.((valid) => {
    if (!valid) return;
    let params = { ...form };
    loading.value = true;
    const saveOrUpdate = isUpdate.value ? updateFission : addFission;
    saveOrUpdate(params)
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
