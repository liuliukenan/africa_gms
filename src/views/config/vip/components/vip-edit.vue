<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="900" v-model="visible" :title="isUpdate ? '修改VIP' : '新建VIP'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="110px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="vip等级" prop="vipId">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.vipId"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="充值金额" prop="payAmount"  label-width="140px">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.payAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="升级礼包" prop="upAmount">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.upAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="升级所需流水" prop="upWaterFlow"  label-width="140px">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.upWaterFlow"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="每周奖励" prop="weekReward">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.weekReward"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="每周奖励所需流水" prop="weekWaterFlow"  label-width="140px">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.weekWaterFlow"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="每月奖励" prop="monthReward">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.monthReward"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="每月奖励流水" prop="monthWaterFlow"  label-width="140px">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.monthWaterFlow"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="抽现手续折扣" prop="withdrawDiscount">
                            <el-input-number  :controls="false" style="width: 100%;"   v-model="form.withdrawDiscount"  :min="0"  placeholder="请输入" />
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
    import { addVip, updateVip } from "@/api/config/vipApi";
    import type { Vip } from "@/api/model/vip";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: Vip | null;
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
    const [form, resetFields, assignFields] = useFormData<Vip>({
          vipId: undefined,
          payAmount: undefined,
          upAmount: undefined,
          upWaterFlow: undefined,
          weekReward: undefined,
          weekWaterFlow: undefined,
          monthReward: undefined,
          monthWaterFlow: undefined,
          withdrawDiscount: undefined,
    });

    /** 表单验证规则 */
    const rules = reactive<FormRules>({
      vipId: [
          {
              required: true,
              type:  'number',
              message: '请输入vip等级',
              trigger: 'blur'
          }
      ],
      payAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入充值金额',
              trigger: 'blur'
          }
      ],
      upAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入升级礼包',
              trigger: 'blur'
          }
      ],
      upWaterFlow: [
          {
              required: true,
              type:  'number',
              message: '请输入升级所需流水',
              trigger: 'blur'
          }
      ],
      weekReward: [
          {
              required: true,
              type:  'number',
              message: '请输入每周奖励',
              trigger: 'blur'
          }
      ],
      weekWaterFlow: [
          {
              required: true,
              type:  'number',
              message: '请输入每周奖励所需流水',
              trigger: 'blur'
          }
      ],
      monthReward: [
          {
              required: true,
              type:  'number',
              message: '请输入每月奖励',
              trigger: 'blur'
          }
      ],
      monthWaterFlow: [
          {
              required: true,
              type:  'number',
              message: '请输入每月奖励流水',
              trigger: 'blur'
          }
      ],
      withdrawDiscount: [
          {
              required: true,
              type:  'number',
              message: '请输入抽现手续折扣',
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
        const saveOrUpdate = isUpdate.value ?updateVip : addVip;;
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
