<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改分享奖励表' : '新建分享奖励表'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="用户Id" name="uid">
                            <el-input-number   v-model="form.uid"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="一级" name="layer1">
                            <el-input-number   v-model="form.layer1"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="二级" name="layer2">
                            <el-input-number   v-model="form.layer2"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="三级" name="layer3">
                            <el-input-number   v-model="form.layer3"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="注册时间" name="regTime">
                            <el-input-number   v-model="form.regTime"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="充值金额" name="payAmount">
                            <el-input-number   v-model="form.payAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="被邀请者奖励金额" name="inviteeAmount">
                            <el-input-number   v-model="form.inviteeAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="邀请者奖励金额" name="inviterAmount">
                            <el-input-number   v-model="form.inviterAmount"  :min="0"  placeholder="请输入" />
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
    import { addUserInviterRecord, updateUserInviterRecord } from "@/api/welfare/inviterRecordApi";
    import type { UserInviterRecord } from "@/api/welfare/model/inviterRecord";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: UserInviterRecord | null;
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
    const [form, resetFields, assignFields] = useFormData<UserInviterRecord>({
          uid: undefined,
          layer1: undefined,
          layer2: undefined,
          layer3: undefined,
          regTime: undefined,
          payAmount: undefined,
          inviteeAmount: undefined,
          inviterAmount: undefined,
    });

    /** 表单验证规则 */
    const rules = reactive<FormRules>({
      uid: [
          {
              required: true,
              type:  'number',
              message: '请输入用户Id',
              trigger: 'blur'
          }
      ],
      layer1: [
          {
              required: true,
              type:  'number',
              message: '请输入一级',
              trigger: 'blur'
          }
      ],
      layer2: [
          {
              required: true,
              type:  'number',
              message: '请输入二级',
              trigger: 'blur'
          }
      ],
      layer3: [
          {
              required: true,
              type:  'number',
              message: '请输入三级',
              trigger: 'blur'
          }
      ],
      regTime: [
          {
              required: true,
              type:  'number',
              message: '请输入注册时间',
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
      inviteeAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入被邀请者奖励金额',
              trigger: 'blur'
          }
      ],
      inviterAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入邀请者奖励金额',
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
        const saveOrUpdate = isUpdate.value ?updateUserInviterRecord : addUserInviterRecord;;
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
