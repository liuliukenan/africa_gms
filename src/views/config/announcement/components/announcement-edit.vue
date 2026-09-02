<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改跑马灯' : '新建跑马灯'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="72px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="间隔秒" prop="intervalTime">
            <el-input-number v-model="form.intervalTime" :min="60" :controls="false" placeholder="请输入"
              style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="总次数" prop="totalCount">
            <el-input-number v-model="form.totalCount" :min="1" :controls="false" placeholder="请输入"
              style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="类型" prop="type">
            <dict-data code="announceType" v-model="form.type" valueType="number" placeholder="请输入类型" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 滚动0 弹窗1  如果是弹窗1时，code固定为0，并且展示【是否取消】字段-->
      <el-row :gutter="16">
        <!-- <el-col :sm="form.type == 1 ? 6 : 12" :xs="12">
          <el-form-item label="code" prop="code">
            <el-input-number v-if="form.type === 0 || form.type === undefined" v-model="form.code" :min="0"
              :controls="false" placeholder="请输入code" style="width: 100%;" />
            <span v-else>: 0</span>
          </el-form-item>
        </el-col>
        <el-col :sm="form.type == 1 ? 6 : 12" :xs="12" v-if="form.type == 1">
          <el-form-item label="是否取消" prop="cancel">
            <el-radio-group v-model="form.cancel">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="中文" prop="zh">
            <el-input clearable type="textarea" :rows="3" v-model="form.zh" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="英文" prop="en">
            <el-input clearable type="textarea" :rows="3" v-model="form.en" placeholder="请输入内容" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="泰文" prop="th">
            <el-input clearable type="textarea" :rows="3" v-model="form.th" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="缅甸" prop="mm">
            <el-input clearable type="textarea" :rows="3" v-model="form.mm" placeholder="请输入内容" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="马来" prop="my">
            <el-input clearable type="textarea" :rows="3" v-model="form.my" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="越南" prop="vn">
            <el-input clearable type="textarea" :rows="3" v-model="form.vn" placeholder="请输入内容" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="印尼" prop="indon">
            <el-input clearable type="textarea" :rows="3" v-model="form.indon" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="繁体" prop="uca">
            <el-input clearable type="textarea" :rows="3" v-model="form.uca" placeholder="请输入内容" />
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

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { addAnnouncement, updateAnnouncement } from '@/api/config/announcementApi';
import type { Announcement } from '@/api/model/announcement';

const props = defineProps<{
  /** 修改回显的数据 */
  data?: Announcement | null;
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
const [form, resetFields, assignFields] = useFormData<Announcement>({
  id: undefined,
  intervalTime: undefined,
  type: 0,
  content: undefined,
  code: 0,
  status: 1,
  cancel: 0,
  // nextTime: undefined,
  totalCount: undefined,
  // sendCount: undefined,
  zh: undefined,
  en: undefined,
  th: undefined,
  mm: undefined,
  my: undefined,
  vn: undefined,
  indon: undefined,
  uca: undefined,
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  id: [
    {
      required: true,
      type: 'number',
      message: '请输入id',
      trigger: 'blur'
    }
  ],
  intervalTime: [
    {
      required: true,
      type: 'number',
      message: '请输入秒',
      trigger: 'blur'
    }
  ],
  type: [
    {
      required: true,
      type: 'number',
      message: '请输入类型',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      type: 'number',
      message: '请输入code',
      trigger: 'blur'
    }
  ],
  nextTime: [
    {
      required: true,
      type: 'number',
      message: '请输入下次时间',
      trigger: 'blur'
    }
  ],
  totalCount: [
    {
      required: true,
      type: 'number',
      message: '请输入总次数',
      trigger: 'blur'
    }
  ],
  sendCount: [
    {
      required: true,
      type: 'number',
      message: '请输入已发次数',
      trigger: 'blur'
    }
  ],
  zh: [
    {
      required: true,
      type: 'string',
      message: '请输入zh',
      trigger: 'blur'
    }
  ],
  en: [
    {
      required: true,
      type: 'string',
      message: '请输入en',
      trigger: 'blur'
    }
  ],
  th: [
    {
      required: true,
      type: 'string',
      message: '请输入th',
      trigger: 'blur'
    }
  ],
  mm: [
    {
      required: true,
      type: 'string',
      message: '请输入mm',
      trigger: 'blur'
    }
  ],
  my: [
    {
      required: true,
      type: 'string',
      message: '请输入my',
      trigger: 'blur'
    }
  ],
  vn: [
    {
      required: true,
      type: 'string',
      message: '请输入vn',
      trigger: 'blur'
    }
  ],
  indon: [
    {
      required: true,
      type: 'string',
      message: '请输入indon',
      trigger: 'blur'
    }
  ],
  uca: [
    {
      required: true,
      type: 'string',
      message: '请输入uca',
      trigger: 'blur'
    }
  ],
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
    if (form.type == 1) form.code = 0;
    if (!valid) {
      return;
    }
    loading.value = true;
    const saveOrUpdate = isUpdate.value ? updateAnnouncement : addAnnouncement;
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
<style lang="scss" scoped>
:deep(.el-input-number__inner::placeholder) {
  text-align: left !important;
}
</style>
