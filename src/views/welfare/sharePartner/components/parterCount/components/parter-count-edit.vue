<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改合伙人奖励报告' : '新建合伙人奖励报告'"  @open="handleOpen">
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
                        <el-form-item label="合伙人等级" name="level">
                            <el-input-number   v-model="form.level"  :min="0"  placeholder="请输入" />
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
                        <el-form-item label="日key" name="daykey">
                            <el-input-number   v-model="form.daykey"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="周key" name="monkey">
                            <el-input-number   v-model="form.monkey"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="直接人数" name="layer1Num">
                            <el-input-number   v-model="form.layer1Num"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="直接结果" name="layer1Result">
                            <el-input-number   v-model="form.layer1Result"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="直接下注" name="layer1Bet">
                            <el-input-number   v-model="form.layer1Bet"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="二级人数" name="layer2Num">
                            <el-input-number   v-model="form.layer2Num"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="二级结果" name="layer2Result">
                            <el-input-number   v-model="form.layer2Result"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="二级下注" name="layer2Bet">
                            <el-input-number   v-model="form.layer2Bet"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="三级人数" name="layer3Num">
                            <el-input-number   v-model="form.layer3Num"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="三级结果" name="layer3Result">
                            <el-input-number   v-model="form.layer3Result"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="三级下注" name="layer3Bet">
                            <el-input-number   v-model="form.layer3Bet"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="奖励金额" name="awardAmount">
                            <el-input-number   v-model="form.awardAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="状态" name="status">
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
    import { addUserParterCount, updateUserParterCount } from "@/api/welfare/parterCountApi";
    import type { UserParterCount } from "@/api/welfare/model/parterCount";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: UserParterCount | null;
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
    const [form, resetFields, assignFields] = useFormData<UserParterCount>({
          id: undefined,
          uid: undefined,
          level: undefined,
          ukey: undefined,
          daykey: undefined,
          monkey: undefined,
          layer1Num: undefined,
          layer1Result: undefined,
          layer1Bet: undefined,
          layer2Num: undefined,
          layer2Result: undefined,
          layer2Bet: undefined,
          layer3Num: undefined,
          layer3Result: undefined,
          layer3Bet: undefined,
          awardAmount: undefined,
          status: undefined,
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
      level: [
          {
              required: true,
              type:  'number',
              message: '请输入合伙人等级',
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
              message: '请输入日key',
              trigger: 'blur'
          }
      ],
      monkey: [
          {
              required: true,
              type:  'number',
              message: '请输入周key',
              trigger: 'blur'
          }
      ],
      layer1Num: [
          {
              required: true,
              type:  'number',
              message: '请输入直接人数',
              trigger: 'blur'
          }
      ],
      layer1Result: [
          {
              required: true,
              type:  'number',
              message: '请输入直接结果',
              trigger: 'blur'
          }
      ],
      layer1Bet: [
          {
              required: true,
              type:  'number',
              message: '请输入直接下注',
              trigger: 'blur'
          }
      ],
      layer2Num: [
          {
              required: true,
              type:  'number',
              message: '请输入二级人数',
              trigger: 'blur'
          }
      ],
      layer2Result: [
          {
              required: true,
              type:  'number',
              message: '请输入二级结果',
              trigger: 'blur'
          }
      ],
      layer2Bet: [
          {
              required: true,
              type:  'number',
              message: '请输入二级下注',
              trigger: 'blur'
          }
      ],
      layer3Num: [
          {
              required: true,
              type:  'number',
              message: '请输入三级人数',
              trigger: 'blur'
          }
      ],
      layer3Result: [
          {
              required: true,
              type:  'number',
              message: '请输入三级结果',
              trigger: 'blur'
          }
      ],
      layer3Bet: [
          {
              required: true,
              type:  'number',
              message: '请输入三级下注',
              trigger: 'blur'
          }
      ],
      awardAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入奖励金额',
              trigger: 'blur'
          }
      ],
      status: [
          {
              required: true,
              type:  'number',
              message: '请输入状态',
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
        const saveOrUpdate = isUpdate.value ?updateUserParterCount : addUserParterCount;;
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
