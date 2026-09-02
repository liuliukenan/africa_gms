<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" title="创建节点" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="节点名称" prop="nodeName">
            <el-input clearable :maxlength="50" v-model="form.nodeName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="推广/渠道标识" prop="nodeCode">
            <el-input clearable v-model="form.nodeCode" placeholder="请输入" @input="handleNodeCodeInput" inputmode="latin" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="生成数量" prop="totalCount">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.totalCount" :min="0" :max="5000" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="卡号前缀" prop="codePrefix">
            <el-input clearable :maxlength="4" v-model="form.codePrefix" placeholder="请输入4位大写字母" @input="handleCodePrefixInput" inputmode="latin" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="继承系列配置:">
            <span v-if="form.walletName">目标钱包 {{ form.walletName }} · </span> 面额 {{ form.amount }} · 流水 x{{ form.flowMultiple }} · 策略 {{ form.useStrategy === 1 ? '永久一次' : form.useStrategy === 2 ? '每日一次' : '' }}
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
  import { addGiftCardSerie, updateGiftCardSerie } from '@/api/giftCard/giftCardSerieApi';
  import type { GiftCardSerie } from '@/api/giftCard/model/giftCardSerie';
  import type { GiftCardNode } from '@/api/giftCard/model/giftCardNode';
  import { addGiftCardNode } from '@/api/giftCard/giftCardNodeApi';
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: GiftCardSerie | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();
  const timeRange = ref<string[]>([]);
  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 是否是修改 */
  const isUpdate = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<any>({
    serieId: undefined,
    nodeName: undefined,
    totalCount: undefined,
    flowMultiple: undefined,
    walletType: undefined,
    amount: undefined,
    nodeCode: undefined,
    useStrategy: undefined,
    codePrefix: undefined,
    walletName: undefined,
    status: 1
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    nodeName: [
      {
        required: true,
        type: 'string',
        message: '请输入节点名称',
        trigger: 'blur'
      }
    ],
    hasMaster: [
      {
        required: true,
        type: 'boolean',
        message: '请选择是否主钱包',
        trigger: 'blur'
      }
    ],
    walletType: [
      {
        required: true,
        type: 'number',
        message: '请选择',
        trigger: 'blur'
      }
    ],
    amount: [
      {
        required: true,
        type: 'number',
        message: '请输入推广员)',
        trigger: 'blur'
      }
    ],
    nodeCode: [
      {
        required: true,
        type: 'string',
        message: '请输入推广/渠道标识',
        trigger: ['blur', 'change']
      },
      {
        pattern: /^[A-Za-z0-9]+$/,
        message: '只能输入字母或数字',
        trigger: ['blur', 'change']
      }
    ],
    codePrefix: [
      {
        required: true,
        type: 'string',
        message: '请输入卡号前缀',
        trigger: ['blur', 'change']
      },
      {
        pattern: /^[A-Z]{1,4}$/, 
        message: '只能输入大写字母',
        trigger: ['blur', 'change']
      }
    ],
    totalCount: [
      {
        required: true,
        type: 'number',
        message: '请输入生成数量',
        trigger: 'blur'
      }
    ],
    useStrategy: [
      {
        required: true,
        type: 'number',
        message: '请选择领取策略',
        trigger: 'blur'
      }
    ],
    validityType: [
      {
        required: true,
        type: 'number',
        message: '请输入有效期类型',
        trigger: 'blur'
      }
    ],
    validityDays: [
      {
        required: true,
        type: 'number',
        message: '请输入有效天数',
        trigger: 'blur'
      }
    ],
    status: [
      {
        required: true,
        type: 'number',
        message: '请选择状态',
        trigger: 'blur'
      }
    ]
  });

  const handleNodeCodeInput = (value: string) => {
    form.nodeCode = value.replace(/[^A-Za-z0-9]/g, '');
  };

  const handleCodePrefixInput = (value: string) => {
    form.codePrefix = value.toUpperCase().replace(/[^A-Z]/g, '');
  };

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
      // const saveOrUpdate = isUpdate.value ? updateGiftCardSerie : addGiftCardSerie;
      // const [startDate, endDate] = timeRange.value;
      // const params = { ...form, startDate, endDate };
      addGiftCardNode(form)
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
      form.serieId = props.data.id;
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
