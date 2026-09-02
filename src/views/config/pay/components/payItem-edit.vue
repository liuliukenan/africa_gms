<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="800" form v-model="visible" :title="isUpdate ? '修改充值项' : '新建充值项'" :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="" label-width="80px">
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="类型" prop="channelType">
            <el-input disabled v-model.trim="form.channelType" placeholder="请输入" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="币种" prop="unit">
            <string-select :dict-code="'unitType'" v-model="form.unit" placeholder="请选择币种" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="活动类型" prop="jumpType">
            <dict-data code="bannerJumpType" v-model="form.jumpType" valueType="number" placeholder="所属平台" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="货币类型" prop="moneyType">
            <dict-data code="moneyType" v-model="form.moneyType" valueType="number" placeholder="请选择货币类型" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="所属平台" prop="payFlatType">
            <dict-data code="payFlatType" v-model="form.payFlatType" valueType="number" placeholder="所属平台" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24" v-if="form.payFlatType &&  form.payFlatType != 0">
          <el-form-item label="第三方代码" prop="payThirdItem">
            <el-input v-model="form.payThirdItem"   placeholder="第三方代码"   />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="金额" prop="amount">
            <el-input-number :precision="2" :controls="false" :min="0" v-model.trim="form.amount" placeholder="请输入金额" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="数量" prop="gold">
            <el-input v-model.trim="form.gold" type="number" placeholder="请输入金币" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="排序" prop="sortNumber">
            <el-input v-model.trim="form.sortNumber" type="number" :min="0" placeholder="请输入排序" clearable style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="是否隐藏" prop="hide">
            <el-radio-group v-model="form.hide">
              <el-radio :value="false">显示</el-radio>
              <el-radio :value="true">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="是否固定" prop="fix">
            <el-radio-group v-model="form.fix">
              <el-radio :value="false">不固定</el-radio>
              <el-radio :value="true">固定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" placeholder="请输入备注信息" clearable />
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
  import { useFormData } from '@/utils/use-form-data';
  import { addPayItem, updatePayItem } from '@/api/pay/payItem';
  import StringSelect from '@/components/StringSelect/index.vue';
  import type { PayItem } from '@/api/pay/model';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['done']);
  const props = defineProps<{
    channelId: number;
    type: string;
    hasAssignItem: boolean;
    // 修改回显的数据
    data: PayItem | null;
  }>();
  const visible = defineModel({ type: Boolean });
  //
  const formRef = ref<FormInstance | null>(null);

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);

  // 表单数据
  const { form, resetFields, assignFields } = useFormData<PayItem>({
    id: undefined,
    moneyType: undefined,
    payChannelId: undefined,
    channelType: undefined,
    payFlatType: undefined,
    payThirdItem: undefined,
    unit: undefined,
    amount: undefined,
    gold: undefined,
    sortNumber: undefined,
    jumpType: undefined,
    hide: false,
    fix: false
  });

  // 表单验证规则
  const rules = reactive<FormRules>({
    type: [
      {
        required: true,
        type: 'string',
        message: '请输入类型',
        trigger: 'blur'
      }
    ],
    unit: [
      {
        required: true,
        type: 'string',
        message: '请选择币种',
        trigger: 'blur'
      }
    ],
    jumpType: [
      {
        required: true,
        type: 'number',
        message: '请选择活动类型',
        trigger: 'blur'
      }
    ],
    amount: [
      {
        required: true,
        type: 'number',
        message: '请输入用户ID',
        trigger: 'blur'
      }
    ]
  });

  /* 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      loading.value = true;
      console.log('form', form);
      const saveOrUpdate = isUpdate.value ? updatePayItem : addPayItem;
      saveOrUpdate(form)
        .then((msg) => {
          loading.value = false;
          ElMessage.success(msg);
          handleCancel();
          emit('done');
        })
        .catch((e) => {
          loading.value = false;
          ElMessage.error(e.message);
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
      if (props.hasAssignItem) {
        form.channelType = props.type;
      } else {
        form.channelType = 'COMMON';
      }
      form.payChannelId = props.channelId;
      isUpdate.value = false;
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.();
      });
    });
  };
</script>
