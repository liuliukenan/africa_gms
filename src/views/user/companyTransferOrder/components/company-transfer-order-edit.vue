<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? t('user.companyTransferOrder.editTitle') : t('user.companyTransferOrder.addTitle')"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.id')" name="id">
                            <el-input-number   v-model="form.id"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.uid')" name="uid">
                            <el-input-number   v-model="form.uid"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.companyId')" name="companyId">
                            <el-input-number   v-model="form.companyId"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.gameId')" name="gameId">
                            <el-input-number   v-model="form.gameId"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.gameName')" name="gameName">
                            <el-input clearable :maxlength="100" v-model="form.gameName"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.transferType')" name="transferType">
                             <dict-data code="company_transfer_status" v-model="form.transferType" valueType="number" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.transferId')" name="transferId">
                            <el-input clearable :maxlength="50" v-model="form.transferId"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.status')" name="status">
                             <dict-data code="company_transfer_status" v-model="form.status" valueType="number" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.remark')" name="remark">
                            <el-input clearable :maxlength="200" v-model="form.remark"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.gameUid')" name="gameUid">
                            <el-input clearable :maxlength="50" v-model="form.gameUid"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.creditAmount')" name="creditAmount">
                            <el-input-number   v-model="form.creditAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.currencyCode')" name="currencyCode">
                            <el-input clearable :maxlength="10" v-model="form.currencyCode"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.language')" name="language">
                            <el-input clearable :maxlength="10" v-model="form.language"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.categoryWalletId')" name="categoryWalletId">
                            <el-input-number   v-model="form.categoryWalletId"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.gameWalletId')" name="gameWalletId">
                            <el-input-number   v-model="form.gameWalletId"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.cashAmount')" name="cashAmount">
                            <el-input-number   v-model="form.cashAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.categoryAmount')" name="categoryAmount">
                            <el-input-number   v-model="form.categoryAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.gameAmount')" name="gameAmount">
                            <el-input-number   v-model="form.gameAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.beforeAmount')" name="beforeAmount">
                            <el-input-number   v-model="form.beforeAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.afterAmount')" name="afterAmount">
                            <el-input-number   v-model="form.afterAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.beforeCashAmount')" name="beforeCashAmount">
                            <el-input-number   v-model="form.beforeCashAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.beforeCategoryAmount')" name="beforeCategoryAmount">
                            <el-input-number   v-model="form.beforeCategoryAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.beforeGameAmount')" name="beforeGameAmount">
                            <el-input-number   v-model="form.beforeGameAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.afterCashAmount')" name="afterCashAmount">
                            <el-input-number   v-model="form.afterCashAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.afterCategoryAmount')" name="afterCategoryAmount">
                            <el-input-number   v-model="form.afterCategoryAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item :label="t('user.companyTransferOrder.form.afterGameAmount')" name="afterGameAmount">
                            <el-input-number   v-model="form.afterGameAmount"  :min="0"  :placeholder="t('common.placeholder.input')" />
                        </el-form-item>
                    </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">{{ t('action.cancel') }}</el-button>
            <el-button type="primary" :loading="loading" @click="save">
                {{ t('action.save') }}
            </el-button>
        </template>
    </ele-modal>
</template>

<script lang="ts" setup>
    import { ref, reactive, nextTick } from "vue";
    import type { FormInstance, FormRules } from "element-plus";
    import { EleMessage } from "ele-admin-plus/es";
    import { useFormData } from "@/utils/use-form-data";
    import { addCompanyTransferOrder, updateCompanyTransferOrder } from "@/api/user/companyTransferOrderApi";
    import type { CompanyTransferOrder } from "@/api/user/model/companyTransferOrder";
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: CompanyTransferOrder | null;
    }>();

    const emit = defineEmits<{
      (e: "done"): void;
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
    const [form, resetFields, assignFields] = useFormData<CompanyTransferOrder>({
          id: undefined,
          uid: undefined,
          companyId: undefined,
          gameId: undefined,
          gameName: undefined,
          transferType: undefined,
          transferId: undefined,
          status: undefined,
          remark: undefined,
          gameUid: undefined,
          creditAmount: undefined,
          currencyCode: undefined,
          language: undefined,
          beforeAmount: undefined,
          afterAmount: undefined,
          cashAmount: undefined,
          categoryAmount: undefined,
          gameAmount: undefined,
          categoryWalletId: undefined,
          gameWalletId: undefined,
          beforeCashAmount: undefined,
          beforeCategoryAmount: undefined,
          beforeGameAmount: undefined,
          afterCashAmount: undefined,
          afterCategoryAmount: undefined,
          afterGameAmount: undefined,
    });

    /** 表单验证规则 */
    const rules = reactive<FormRules>({
      id: [
          {
              required: true,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      uid: [
          {
              required: true,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      companyId: [
          {
              required: true,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      gameId: [
          {
              required: true,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      gameName: [
          {
              required: true,
              type:  'string',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      transferType: [
          {
              required: true,
              type:  'number',
              message: t('common.placeholder.select'),
              trigger: 'blur'
          }
      ],
      transferId: [
          {
              required: true,
              type:  'string',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      status: [
          {
              required: true,
              type:  'number',
              message: t('common.placeholder.select'),
              trigger: 'blur'
          }
      ],
      remark: [
          {
              required: false,
              type:  'string',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      gameUid: [
          {
              required: true,
              type:  'string',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      creditAmount: [
          {
              required: true,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      currencyCode: [
          {
              required: true,
              type:  'string',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      language: [
          {
              required: true,
              type:  'string',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      categoryWalletId: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      gameWalletId: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      cashAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      categoryAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      gameAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      beforeAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      afterAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      beforeCashAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      beforeCategoryAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      beforeGameAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      afterCashAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      afterCategoryAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
              trigger: 'blur'
          }
      ],
      afterGameAmount: [
          {
              required: false,
              type:  'number',
              message: t('common.placeholder.input'),
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
        const saveOrUpdate = isUpdate.value ?updateCompanyTransferOrder : addCompanyTransferOrder;;
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
