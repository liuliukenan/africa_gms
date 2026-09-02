<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="1000" v-model="visible" :confirm-loading="loading" title="裂变配置详情"
    :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="针对游戏ID : " prop="gameId">
            {{ form.gameId }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="前置任务ID : " prop="preTask">
            {{ form.preTask }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="中文名称 : " prop="questNameCn">
            {{ form.questNameCn }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="英文名称 : " prop="questNameEn">
            {{ form.questNameEn }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="中文描述 : " prop="questChineseCn">
            {{ form.questChineseCn }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="英文描述 : " prop="questChineseEn">
            {{ form.questChineseEn }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="泰语名称 : " prop="questNameTh">
            {{ form.questNameTh }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="马来名称 : " prop="questNameMy">
            {{ form.questNameMy }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="泰语描述 : " prop="questChineseTh">
            {{ form.questChineseTh }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="马来描述 : " prop="questChineseMy">
            {{ form.questChineseMy }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="印尼名称 : " prop="questNameIdn">
            {{ form.questNameIdn }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="越南名称 : " prop="questNameVn">
            {{ form.questNameVn }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="印尼描述 : " prop="questChineseIdn">
            {{ form.questChineseIdn }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="越南描述 : " prop="questChineseVn">
            {{ form.questChineseVn }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="缅甸名称 : " prop="questNameMya">
            {{ form.questNameMya }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="缅甸描述 : " prop="questChineseMya">
            {{ form.questChineseMya }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="任务类型 : " prop="taskType">
            <dict-data code="qustType" type="tag" v-model="form.taskType" valueType="number" placeholder="请选择任务类型" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="任务目标数量 : " prop="needNum">
            {{ form.needNum }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="奖励类型 : " prop="rewardType">
            <dict-data code="rewardType" type="tag" v-model="form.rewardType" valueType="number"
              placeholder="请选择奖励类型" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="奖励数量 : " prop="rewardNum">
            {{ form.rewardNum }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="任务关联 : " prop="taskRefer">
            <dict-data code="taskReferType" v-model="form.taskRefer" type="tag" valueType="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="可否重复 : " prop="isReturn">
            {{ form.isReturn ? '可' : '否' }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="同时进行 : " prop="isTogether">
            {{ form.isTogether ? '是' : '否' }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
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
  preTask: undefined,
  taskType: undefined,
  needNum: undefined,
  taskRefer: undefined,
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
