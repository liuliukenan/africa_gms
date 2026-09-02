<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改冲提利润表' : '新建冲提利润表'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="时间" name="daykey">
                            <el-input-number   v-model="form.daykey"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="平台毛利" name="totalResult">
                            <el-input-number   v-model="form.totalResult"  :min="0"  placeholder="请输入" />
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
                        <el-form-item label="充值人数" name="payNum">
                            <el-input-number   v-model="form.payNum"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="赠礼金额" name="giftAmount">
                            <el-input-number   v-model="form.giftAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="赠礼数量" name="giftNum">
                            <el-input-number   v-model="form.giftNum"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="提现金额" name="withdrawAmount">
                            <el-input-number   v-model="form.withdrawAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="提现人数" name="withdrawNum">
                            <el-input-number   v-model="form.withdrawNum"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="手续费" name="duty">
                            <el-input-number   v-model="form.duty"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="电子" name="slotsResult">
                            <el-input-number   v-model="form.slotsResult"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="捕鱼" name="fishResult">
                            <el-input-number   v-model="form.fishResult"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="真人" name="liveResult">
                            <el-input-number   v-model="form.liveResult"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="棋牌" name="cardResult">
                            <el-input-number   v-model="form.cardResult"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="运动" name="sportsResult">
                            <el-input-number   v-model="form.sportsResult"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="彩票" name="lotteryResult">
                            <el-input-number   v-model="form.lotteryResult"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="其它" name="otherResult">
                            <el-input-number   v-model="form.otherResult"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="开始余额" name="startAmount">
                            <el-input-number   v-model="form.startAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="结整余额" name="overAmount">
                            <el-input-number   v-model="form.overAmount"  :min="0"  placeholder="请输入" />
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
    import { addAppGameCount, updateAppGameCount } from "@/api/user/appGameCountApi";
    import type { AppGameCount } from "@/api/model/appGameCount";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: AppGameCount | null;
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
    const [form, resetFields, assignFields] = useFormData<AppGameCount>({
          daykey: undefined,
          totalResult: undefined,
          payAmount: undefined,
          payNum: undefined,
          giftAmount: undefined,
          giftNum: undefined,
          withdrawAmount: undefined,
          withdrawNum: undefined,
          duty: undefined,
          slotsResult: undefined,
          fishResult: undefined,
          liveResult: undefined,
          cardResult: undefined,
          sportsResult: undefined,
          lotteryResult: undefined,
          otherResult: undefined,
          startAmount: undefined,
          overAmount: undefined,
    });

    /** 表单验证规则 */
    const rules = reactive<FormRules>({
      daykey: [
          {
              required: true,
              type:  'number',
              message: '请输入时间',
              trigger: 'blur'
          }
      ],
      totalResult: [
          {
              required: true,
              type:  'number',
              message: '请输入平台毛利',
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
      payNum: [
          {
              required: true,
              type:  'number',
              message: '请输入充值人数',
              trigger: 'blur'
          }
      ],
      giftAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入赠礼金额',
              trigger: 'blur'
          }
      ],
      giftNum: [
          {
              required: true,
              type:  'number',
              message: '请输入赠礼数量',
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
      withdrawNum: [
          {
              required: true,
              type:  'number',
              message: '请输入提现人数',
              trigger: 'blur'
          }
      ],
      duty: [
          {
              required: true,
              type:  'number',
              message: '请输入手续费',
              trigger: 'blur'
          }
      ],
      slotsResult: [
          {
              required: true,
              type:  'number',
              message: '请输入电子',
              trigger: 'blur'
          }
      ],
      fishResult: [
          {
              required: true,
              type:  'number',
              message: '请输入捕鱼',
              trigger: 'blur'
          }
      ],
      liveResult: [
          {
              required: true,
              type:  'number',
              message: '请输入真人',
              trigger: 'blur'
          }
      ],
      cardResult: [
          {
              required: true,
              type:  'number',
              message: '请输入棋牌',
              trigger: 'blur'
          }
      ],
      sportsResult: [
          {
              required: true,
              type:  'number',
              message: '请输入运动',
              trigger: 'blur'
          }
      ],
      lotteryResult: [
          {
              required: true,
              type:  'number',
              message: '请输入彩票',
              trigger: 'blur'
          }
      ],
      otherResult: [
          {
              required: true,
              type:  'number',
              message: '请输入其它',
              trigger: 'blur'
          }
      ],
      startAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入开始余额',
              trigger: 'blur'
          }
      ],
      overAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入结整余额',
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
        const saveOrUpdate = isUpdate.value ?updateAppGameCount : addAppGameCount;;
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
