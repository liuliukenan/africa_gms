<!-- KYC审核弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" title="KYC审核" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="90px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="审核记录ID:">
            {{ form.id }}
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="用户ID:">
            {{ form.uid }}
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="真实姓名:">
            {{ form.realName }}
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="证件号:">
            {{ form.nationalId }}
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 证件照片 -->
      <el-form-item label="证件照片:">
        <el-row :gutter="12">
          <el-col :span="8">
            <div class="id-card-image">
              <div class="image-label">身份证正面</div>
              <el-image v-if="images.idCardFront" :src="images.idCardFront"
                style="width: 100%;"
                :preview-src-list="[images.idCardFront]"
                :preview-teleported="true" />
              <span v-else class="no-image">暂无</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="id-card-image">
              <div class="image-label">身份证背面</div>
              <el-image v-if="images.idCardBack" :src="images.idCardBack"
                style="width: 100%;"
                :preview-src-list="[images.idCardBack]"
                :preview-teleported="true" />
              <span v-else class="no-image">暂无</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="id-card-image">
              <div class="image-label">手持自拍</div>
              <el-image v-if="images.selfie" :src="images.selfie"
                style="width: 100%;"
                :preview-src-list="[images.selfie]"
                :preview-teleported="true" />
              <span v-else class="no-image">暂无</span>
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="审核结果:" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1" style="margin-right: 20px">通过</el-radio>
              <el-radio :value="2">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审核备注:" prop="handleRemark"  :rules="form.status === 2 ? [{ required: true, message: '请输入审核备注', trigger: 'blur' }] : []">
            <el-input clearable type="textarea" :rows="3" v-model="form.handleRemark" placeholder="请输入审核备注" />
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
  import { ref, reactive, nextTick, shallowReactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { auditKyc, getKycImage } from '@/api/user/listKycRecordApi';
  import type { ListKycRecordVO } from '@/api/user/model/listKycRecord';

  const props = defineProps<{
    /** 审核回显的数据 */
    data?: ListKycRecordVO | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData({
    id: undefined as number | undefined,
    uid: undefined as number | undefined,
    realName: undefined as string | undefined,
    nationalId: undefined as string | undefined,
    status: 1,
    handleRemark: undefined as string | undefined
  });

  /** 证件照片 blob URLs */
  const images = shallowReactive<{ idCardFront: string; idCardBack: string; selfie: string }>({
    idCardFront: '',
    idCardBack: '',
    selfie: ''
  });

  /** 清理 blob URLs */
  const revokeImages = () => {
    if (images.idCardFront) URL.revokeObjectURL(images.idCardFront);
    if (images.idCardBack) URL.revokeObjectURL(images.idCardBack);
    if (images.selfie) URL.revokeObjectURL(images.selfie);
    images.idCardFront = '';
    images.idCardBack = '';
    images.selfie = '';
  };

  /** 加载证件照片 */
  const loadImages = () => {
    if (!form.id) return;
    const fields: ('idCardFront' | 'idCardBack' | 'selfie')[] = ['idCardFront', 'idCardBack', 'selfie'];
    fields.forEach((field) => {
      getKycImage(form.id!, field)
        .then((url) => {
          images[field] = url;
        })
        .catch(() => {
          // 图片加载失败不报错，显示"暂无"
        });
    });
  };

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    status: [
      {
        required: true,
        type: 'number',
        message: '请选择审核结果',
        trigger: 'change'
      }
    ],
    // handleRemark: [
    //   {
    //     required: true,
    //     type: 'string',
    //     message: '请输入审核备注',
    //     trigger: 'blur'
    //   }
    // ]
  });

  /** 关闭弹窗 */
  const handleCancel = () => {
    revokeImages();
    visible.value = false;
  };

  /** 提交审核 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      loading.value = true;
      auditKyc({
        id: form.id!,
        status: form.status!,
        handleRemark: form.handleRemark
      })
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
    revokeImages();
    if (props.data) {
      assignFields({ ...props.data, status: 1, handleRemark: undefined });
      loadImages();
    } else {
      resetFields();
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>

<style scoped>
  .id-card-image {
    text-align: center;
  }
  .image-label {
    font-size: 12px;
    color: #909399;
    margin-bottom: 4px;
  }
  .no-image {
    display: inline-block;
    width: 100%;
    height: 120px;
    line-height: 120px;
    color: #c0c4cc;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 13px;
  }
</style>
