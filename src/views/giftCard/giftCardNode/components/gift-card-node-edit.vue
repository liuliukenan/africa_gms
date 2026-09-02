<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" title="修改节点" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="节点名称：" prop="nodeName">
            <el-input clearable :maxlength="50" v-model="form.nodeName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="推广/渠道标识：" prop="nodeCode">
            <!-- <el-input clearable v-model="form.nodeCode" placeholder="请输入" /> -->
            {{ form.nodeCode }}
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="生成数量：" prop="totalCount">
            <!-- <el-input-number style="width: 100%" :controls="false" clearable v-model="form.totalCount" :min="0" :max="5000" placeholder="请输入" /> -->
            {{ form.totalCount }}
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="卡号前缀：" name="codePrefix">
            <!-- <el-input clearable :maxlength="50" v-model="form.codePrefix" placeholder="请输入4位大写字母" /> -->
            {{ form.codePrefix }}
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="继承系列配置:">
            <span v-if="form.targetWallet">目标钱包{{ form.targetWallet }} · </span> 面额{{ form.amount }} · 流水x{{ form.flowMultiple }} · 策略{{ form.useStrategy === 1 ? '永久一次' : form.useStrategy === 2 ? '每日一次' : '' }}
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
  import { nextTick, reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { updateGiftCardNode } from '@/api/giftCard/giftCardNodeApi';
  import { getGiftCardSerie } from '@/api/giftCard/giftCardSerieApi';
  import type { GiftCardNode } from '@/api/giftCard/model/giftCardNode';
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: GiftCardNode | null;
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
    walletName: undefined,
    amount: undefined,
    nodeCode: undefined,
    useStrategy: undefined,
    codePrefix: undefined,
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
    amount: [
      {
        required: true,
        type: 'number',
        message: '请输入推广员)',
        trigger: 'blur'
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
      // const [startDate, endDate] = timeRange.value;
      // const params = { ...form, startDate, endDate };
      updateGiftCardNode(form)
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
  const getSerieInfo = (id: number) => {
    getGiftCardSerie(id)
      .then((data) => {
        form.walletName = data.walletName;
        form.amount = data.amount;
        form.flowMultiple = data.flowMultiple;
        form.useStrategy = data.useStrategy;
      })
      .catch((e) => {
        EleMessage.error(e.message);
      });
  };
  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields({ ...props.data });
      form.id = props.data.id;
      if (props.data.serieId)  getSerieInfo(props.data.serieId);
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
