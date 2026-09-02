<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改分享流水奖励' : '新建分享流水奖励'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="id" name="id">
                            <el-input-number   v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="用户Id" name="uid">
                            <el-input-number   v-model="form.uid"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="ukey" name="ukey">
                            <el-input clearable :maxlength="50" v-model="form.ukey"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="daykey" name="daykey">
                            <el-input-number   v-model="form.daykey"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="总下注" name="totalBet">
                            <el-input-number   v-model="form.totalBet"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="返利人数" name="totalNum">
                            <el-input-number   v-model="form.totalNum"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="总金额" name="amount">
                            <el-input-number   v-model="form.amount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="是否发送" name="send">
                            <el-input clearable :maxlength="50" v-model="form.send"  placeholder="请输入" />
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
    import { addUserInviterRebeat, updateUserInviterRebeat } from "@/api/welfare/inviterRebeatApi";
    import type { UserInviterRebeat } from "@/api/welfare/model/inviterRebeat";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: UserInviterRebeat | null;
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
    const [form, resetFields, assignFields] = useFormData<UserInviterRebeat>({
          id: undefined,
          uid: undefined,
          ukey: undefined,
          daykey: undefined,
          totalBet: undefined,
          totalNum: undefined,
          amount: undefined,
          send: undefined,
    });

    /** 表单验证规则 */
    const rules = reactive<FormRules>({
      id: [
          {
              required: true,
              type:  'number',
              message: '请输入id',
              trigger: 'blur'
          }
      ],
      uid: [
          {
              required: true,
              type:  'number',
              message: '请输入用户Id',
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
      daykey: [
          {
              required: true,
              type:  'number',
              message: '请输入daykey',
              trigger: 'blur'
          }
      ],
      totalBet: [
          {
              required: true,
              type:  'number',
              message: '请输入总下注',
              trigger: 'blur'
          }
      ],
      totalNum: [
          {
              required: true,
              type:  'number',
              message: '请输入返利人数',
              trigger: 'blur'
          }
      ],
      amount: [
          {
              required: true,
              type:  'number',
              message: '请输入总金额',
              trigger: 'blur'
          }
      ],
      send: [
          {
              required: true,
              type:  'string',
              message: '请输入是否发送',
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
        const saveOrUpdate = isUpdate.value ?updateUserInviterRebeat : addUserInviterRebeat;;
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
