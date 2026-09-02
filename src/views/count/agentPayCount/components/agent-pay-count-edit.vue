<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改代理充值' : '新建代理充值'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="主键" name="id">
                            <el-input-number   v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="代理id" name="ukey">
                            <el-input-number   v-model="form.ukey"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="日期" name="daykey">
                            <el-input-number   v-model="form.daykey"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="发送类型" name="fromType">
                            <el-input-number   v-model="form.fromType"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="接收类型" name="toType">
                            <el-input-number   v-model="form.toType"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="金币金额" name="goldAmount">
                            <el-input-number   v-model="form.goldAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="金币次数" name="goldTimes">
                            <el-input-number   v-model="form.goldTimes"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="钻石金额" name="diamondAmount">
                            <el-input-number   v-model="form.diamondAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="钻石次数" name="diamondTimes">
                            <el-input-number   v-model="form.diamondTimes"  :min="0"  placeholder="请输入" />
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
    import { addAgentPayCount, updateAgentPayCount } from "@/api/count/agentPayCountApi";
    import type { AgentPayCount } from "@/api/model/agentPayCount";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: AgentPayCount | null;
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
    const [form, resetFields, assignFields] = useFormData<AgentPayCount>({
          id: undefined,
          ukey: undefined,
          daykey: undefined,
          fromType: undefined,
          toType: undefined,
          goldAmount: undefined,
          goldTimes: undefined,
          diamondAmount: undefined,
          diamondTimes: undefined,
    });

    /** 表单验证规则 */
    const rules = reactive<FormRules>({
      id: [
          {
              required: true,
              type:  'number',
              message: '请输入主键',
              trigger: 'blur'
          }
      ],
      ukey: [
          {
              required: true,
              type:  'number',
              message: '请输入代理id',
              trigger: 'blur'
          }
      ],
      daykey: [
          {
              required: true,
              type:  'number',
              message: '请输入日期',
              trigger: 'blur'
          }
      ],
      fromType: [
          {
              required: true,
              type:  'number',
              message: '请输入发送类型',
              trigger: 'blur'
          }
      ],
      toType: [
          {
              required: true,
              type:  'number',
              message: '请输入接收类型',
              trigger: 'blur'
          }
      ],
      goldAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入金币金额',
              trigger: 'blur'
          }
      ],
      goldTimes: [
          {
              required: true,
              type:  'number',
              message: '请输入金币次数',
              trigger: 'blur'
          }
      ],
      diamondAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入钻石金额',
              trigger: 'blur'
          }
      ],
      diamondTimes: [
          {
              required: true,
              type:  'number',
              message: '请输入钻石次数',
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
        const saveOrUpdate = isUpdate.value ?updateAgentPayCount : addAgentPayCount;;
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
