<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改跳转行为表' : '新建跳转行为表'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="id" name="id">
                            <el-input-number :controls="false" style="width: 100%;" v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="跳转名称" name="jumpName">
                            <el-input clearable :maxlength="50" v-model="form.jumpName"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="跳转类型" name="jumpType">
                            <!-- <el-input-number   :controls="false" style="width: 100%;" v-model="form.jumpType"  :min="0"  placeholder="请输入" /> -->
                             <el-select v-model="form.jumpType" placeholder="请选择">
                                <el-option  label="内联连接" :value="3" />
                                <el-option  label="外联连接" :value="4" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="跳转地址" name="jumpAddress">
                            <el-input v-model="form.jumpAddress"  :min="0"  placeholder="请输入" />
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
    import { addJumpAction, updateJumpAction } from "@/api/platform/jumpActionApi";
    import type { JumpAction } from "@/api/platform/model/jumpAction";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: JumpAction | null;
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
    const [form, resetFields, assignFields] = useFormData<JumpAction>({
          id: undefined,
          jumpName: undefined,
          jumpType: undefined,
          jumpAddress: undefined,
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
      jumpName: [
          {
              required: true,
              type:  'string',
              message: '请输入跳转名称',
              trigger: 'blur'
          }
      ],
      jumpType: [
          {
              required: true,
              type:  'number',
              message: '请输入跳转类型',
              trigger: 'blur'
          }
      ],
      jumpAddress: [
          {
              required: true,
              type:  'number',
              message: '请输入跳转地址',
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
        const saveOrUpdate = isUpdate.value ?updateJumpAction : addJumpAction;;
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
