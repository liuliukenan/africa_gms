<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改合伙人利润表' : '新建合伙人利润表'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="主键" name="id">
                            <el-input-number   v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="ukey" name="ukey">
                            <el-input clearable :maxlength="50" v-model="form.ukey"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="用户ID" name="uid">
                            <el-input-number   v-model="form.uid"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="日期" name="daykey">
                            <el-input-number   v-model="form.daykey"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="充值次数" name="payTimes">
                            <el-input-number   v-model="form.payTimes"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="充值人数" name="payNums">
                            <el-input-number   v-model="form.payNums"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="充值金额" name="payAmount">
                            <el-input-number   v-model="form.payAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="提现人数" name="withdrawNums">
                            <el-input-number   v-model="form.withdrawNums"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="提现次数" name="withdrawTimes">
                            <el-input-number   v-model="form.withdrawTimes"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="提现金额" name="withdrawAmount">
                            <el-input-number   v-model="form.withdrawAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="上一日净利" name="lastDayProfit">
                            <el-input-number   v-model="form.lastDayProfit"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="发放状态" name="status">
                            <el-input-number   v-model="form.status"  :min="0"  placeholder="请输入" />
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
    import { addAgentProfit, updateAgentProfit } from "@/api/welfare/agentProfitApi";
    import type { AgentProfit } from "@/api/welfare/model/agentProfit";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: AgentProfit | null;
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
    const [form, resetFields, assignFields] = useFormData<AgentProfit>({
          id: undefined,
          ukey: undefined,
          uid: undefined,
          daykey: undefined,
          payTimes: undefined,
          payNums: undefined,
          payAmount: undefined,
          withdrawNums: undefined,
          withdrawTimes: undefined,
          withdrawAmount: undefined,
          lastDayProfit: undefined,
          status: undefined,
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
              type:  'string',
              message: '请输入ukey',
              trigger: 'blur'
          }
      ],
      uid: [
          {
              required: true,
              type:  'number',
              message: '请输入用户ID',
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
      payTimes: [
          {
              required: true,
              type:  'number',
              message: '请输入充值次数',
              trigger: 'blur'
          }
      ],
      payNums: [
          {
              required: true,
              type:  'number',
              message: '请输入充值人数',
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
      withdrawNums: [
          {
              required: true,
              type:  'number',
              message: '请输入提现人数',
              trigger: 'blur'
          }
      ],
      withdrawTimes: [
          {
              required: true,
              type:  'number',
              message: '请输入提现次数',
              trigger: 'blur'
          }
      ],
      withdrawAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入提现金额',
              trigger: 'blur'
          }
      ],
      lastDayProfit: [
          {
              required: true,
              type:  'number',
              message: '请输入上一日净利',
              trigger: 'blur'
          }
      ],
      status: [
          {
              required: true,
              type:  'number',
              message: '请输入发放状态',
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
        const saveOrUpdate = isUpdate.value ?updateAgentProfit : addAgentProfit;;
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
