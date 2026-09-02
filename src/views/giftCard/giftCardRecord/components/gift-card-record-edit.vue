<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改礼包卡记录' : '新建礼包卡记录'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="主键ID" name="id">
                             <el-input-number style="width: 100%;" :controls="false" clearable    v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="关联系列ID" name="serieId">
                             <el-input-number style="width: 100%;" :controls="false" clearable    v-model="form.serieId"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="关联节点ID" name="nodeId">
                             <el-input-number style="width: 100%;" :controls="false" clearable    v-model="form.nodeId"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="唯一卡号, code_prefix + 12位随机码, 全局唯一" name="cardCode">
                            <el-input clearable :maxlength="50" v-model="form.cardCode"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="核销发放金额(冗余系列面额)" name="amount">
                             <el-input-number style="width: 100%;" :controls="false" clearable    v-model="form.amount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="核销使用人UID" name="userId">
                             <el-input-number style="width: 100%;" :controls="false" clearable    v-model="form.userId"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="卡状态: 0=待使用, 1=已核销, 2=已作废" name="status">
                             <el-input-number style="width: 100%;" :controls="false" clearable    v-model="form.status"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="核销时间" name="useTime">
                            <el-input clearable :maxlength="50" v-model="form.useTime"  placeholder="请输入" />
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

<script lang="ts" setup>
    import { ref, reactive, nextTick } from "vue";
    import type { FormInstance, FormRules } from "element-plus";
    import { EleMessage } from "ele-admin-plus/es";
    import { useFormData } from "@/utils/use-form-data";
    import { addGiftCardRecord, updateGiftCardRecord } from "@/api/giftCard/giftCardRecordApi";
    import type { GiftCardRecord } from "@/api/model/giftCardRecord";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: GiftCardRecord | null;
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
    const [form, resetFields, assignFields] = useFormData<GiftCardRecord>({
          id: undefined,
          serieId: undefined,
          nodeId: undefined,
          cardCode: undefined,
          amount: undefined,
          userId: undefined,
          status: undefined,
          useTime: undefined,
    });

    /** 表单验证规则 */
    const rules = reactive<FormRules>({
      id: [
          {
              required: true,
              type:  'number',
              message: '请输入主键ID',
              trigger: 'blur'
          }
      ],
      serieId: [
          {
              required: true,
              type:  'number',
              message: '请输入关联系列ID',
              trigger: 'blur'
          }
      ],
      nodeId: [
          {
              required: true,
              type:  'number',
              message: '请输入关联节点ID',
              trigger: 'blur'
          }
      ],
      cardCode: [
          {
              required: true,
              type:  'string',
              message: '请输入唯一卡号, code_prefix + 12位随机码, 全局唯一',
              trigger: 'blur'
          }
      ],
      amount: [
          {
              required: true,
              type:  'number',
              message: '请输入核销发放金额(冗余系列面额)',
              trigger: 'blur'
          }
      ],
      userId: [
          {
              required: true,
              type:  'number',
              message: '请输入核销使用人UID',
              trigger: 'blur'
          }
      ],
      status: [
          {
              required: true,
              type:  'number',
              message: '请输入卡状态: 0=待使用, 1=已核销, 2=已作废',
              trigger: 'blur'
          }
      ],
      useTime: [
          {
              required: true,
              type:  'number',
              message: '请输入核销时间',
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
        const saveOrUpdate = isUpdate.value ?updateGiftCardRecord : addGiftCardRecord;;
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
