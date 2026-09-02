<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改合伙人奖励详情' : '新建合伙人奖励详情'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="id" name="id">
                            <el-input-number   v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="uid" name="uid">
                            <el-input-number   v-model="form.uid"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="时间" name="daykey">
                            <el-input-number   v-model="form.daykey"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="总下注" name="totalBet">
                            <el-input-number   v-model="form.totalBet"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="总赢取" name="totalWin">
                            <el-input-number   v-model="form.totalWin"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="净利" name="totalResult">
                            <el-input-number   v-model="form.totalResult"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="一级" name="layer1">
                            <el-input-number   v-model="form.layer1"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="二级" name="layer2">
                            <el-input-number   v-model="form.layer2"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="三级" name="layer3">
                            <el-input-number   v-model="form.layer3"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="一级利润" name="layer1Result">
                            <el-input-number   v-model="form.layer1Result"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="二级利润" name="layer2Result">
                            <el-input-number   v-model="form.layer2Result"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="三级利润" name="layer3Result">
                            <el-input-number   v-model="form.layer3Result"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="注册时间" name="regTime">
                            <el-input-number   v-model="form.regTime"  :min="0"  placeholder="请输入" />
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
    import { addUserParterRecord, updateUserParterRecord } from "@/api/welfare/parterRecordApi";
    import type { UserParterRecord } from "@/api/welfare/model/parterRecord";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: UserParterRecord | null;
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
    const [form, resetFields, assignFields] = useFormData<UserParterRecord>({
          id: undefined,
          uid: undefined,
          daykey: undefined,
          totalBet: undefined,
          totalWin: undefined,
          totalResult: undefined,
          layer1: undefined,
          layer2: undefined,
          layer3: undefined,
          layer1Result: undefined,
          layer2Result: undefined,
          layer3Result: undefined,
          regTime: undefined,
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
              message: '请输入uid',
              trigger: 'blur'
          }
      ],
      daykey: [
          {
              required: true,
              type:  'number',
              message: '请输入时间',
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
      totalWin: [
          {
              required: true,
              type:  'number',
              message: '请输入总赢取',
              trigger: 'blur'
          }
      ],
      totalResult: [
          {
              required: true,
              type:  'number',
              message: '请输入净利',
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
      layer1Result: [
          {
              required: true,
              type:  'number',
              message: '请输入一级利润',
              trigger: 'blur'
          }
      ],
      layer2Result: [
          {
              required: true,
              type:  'number',
              message: '请输入二级利润',
              trigger: 'blur'
          }
      ],
      layer3Result: [
          {
              required: true,
              type:  'number',
              message: '请输入三级利润',
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
        const saveOrUpdate = isUpdate.value ?updateUserParterRecord : addUserParterRecord;;
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
