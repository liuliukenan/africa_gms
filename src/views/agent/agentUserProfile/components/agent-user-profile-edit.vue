<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改代理用户列表' : '新建代理用户列表'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="主键ID" name="id">
                            <el-input-number   v-model="form.id"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="上级代理ID" name="inviterAgentId">
                            <el-input-number   v-model="form.inviterAgentId"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="玩家ID" name="uid">
                            <el-input-number   v-model="form.uid"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="国家代码" name="countryCode">
                            <el-input-number   v-model="form.countryCode"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="渠道" name="channel">
                            <el-input-number   v-model="form.channel"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计投注金额" name="totalBet">
                            <el-input-number   v-model="form.totalBet"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计赢利金额" name="totalReward">
                            <el-input-number   v-model="form.totalReward"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计投注次数" name="totalBetCnt">
                            <el-input-number   v-model="form.totalBetCnt"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计获奖次数" name="totalRewardCnt">
                            <el-input-number   v-model="form.totalRewardCnt"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计充值申请金额" name="totalPayApplyAmount">
                            <el-input-number   v-model="form.totalPayApplyAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计充值申请次数" name="totalPayApplyCnt">
                            <el-input-number   v-model="form.totalPayApplyCnt"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计充值成功金额" name="totalPaySuccessAmount">
                            <el-input-number   v-model="form.totalPaySuccessAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计充值成功次数" name="totalPaySuccessCnt">
                            <el-input-number   v-model="form.totalPaySuccessCnt"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="首次充值时间" name="firstPayTime">
                            <el-input clearable :maxlength="50" v-model="form.firstPayTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="首次充值金额" name="firstPayAmount">
                            <el-input-number   v-model="form.firstPayAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="最近充值时间" name="lastPayTime">
                            <el-input clearable :maxlength="50" v-model="form.lastPayTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="最近充值金额" name="lastPayAmount">
                            <el-input-number   v-model="form.lastPayAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计提现申请金额" name="totalWithdrawApplyAmount">
                            <el-input-number   v-model="form.totalWithdrawApplyAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计提现申请次数" name="totalWithdrawApplyCnt">
                            <el-input-number   v-model="form.totalWithdrawApplyCnt"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计提现成功金额" name="totalWithdrawSuccessAmount">
                            <el-input-number   v-model="form.totalWithdrawSuccessAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计提现成功次数" name="totalWithdrawSuccessCnt">
                            <el-input-number   v-model="form.totalWithdrawSuccessCnt"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="首次提现时间" name="firstWithdrawTime">
                            <el-input clearable :maxlength="50" v-model="form.firstWithdrawTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="首次提现金额" name="firstWithdrawAmount">
                            <el-input-number   v-model="form.firstWithdrawAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="最近提现时间" name="lastWithdrawTime">
                            <el-input clearable :maxlength="50" v-model="form.lastWithdrawTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="最近提现金额" name="lastWithdrawAmount">
                            <el-input-number   v-model="form.lastWithdrawAmount"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="累计登录天数" name="totalLoginDays">
                            <el-input-number   v-model="form.totalLoginDays"  :min="0"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="首次游戏时间" name="firstGameTime">
                            <el-input clearable :maxlength="50" v-model="form.firstGameTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="最近游戏时间" name="lastGameTime">
                            <el-input clearable :maxlength="50" v-model="form.lastGameTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="首次登录时间" name="firstLoginTime">
                            <el-input clearable :maxlength="50" v-model="form.firstLoginTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="最近登录时间" name="lastLoginTime">
                            <el-input clearable :maxlength="50" v-model="form.lastLoginTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="绑定时间" name="bindTime">
                            <el-input clearable :maxlength="50" v-model="form.bindTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="注册时间" name="registerTime">
                            <el-input clearable :maxlength="50" v-model="form.registerTime"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="手机号" name="phone">
                            <el-input clearable :maxlength="50" v-model="form.phone"  placeholder="请输入" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="贡献" name="totalContribution">
                            <el-input-number   v-model="form.totalContribution"  :min="0"  placeholder="请输入" />
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
    import { addAgentUserProfile, updateAgentUserProfile } from "@/api/agent/agentUserProfileApi";
    import type { AgentUserProfile } from "@/api/agent/model/agentUserProfile";

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: AgentUserProfile | null;
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
    const [form, resetFields, assignFields] = useFormData<AgentUserProfile>({
          id: undefined,
          inviterAgentId: undefined,
          uid: undefined,
          countryCode: undefined,
          channel: undefined,
          totalBet: undefined,
          totalReward: undefined,
          totalBetCnt: undefined,
          totalRewardCnt: undefined,
          totalPayApplyAmount: undefined,
          totalPayApplyCnt: undefined,
          totalPaySuccessAmount: undefined,
          totalPaySuccessCnt: undefined,
          firstPayTime: undefined,
          firstPayAmount: undefined,
          lastPayTime: undefined,
          lastPayAmount: undefined,
          totalWithdrawApplyAmount: undefined,
          totalWithdrawApplyCnt: undefined,
          totalWithdrawSuccessAmount: undefined,
          totalWithdrawSuccessCnt: undefined,
          firstWithdrawTime: undefined,
          firstWithdrawAmount: undefined,
          lastWithdrawTime: undefined,
          lastWithdrawAmount: undefined,
          totalLoginDays: undefined,
          firstGameTime: undefined,
          lastGameTime: undefined,
          firstLoginTime: undefined,
          lastLoginTime: undefined,
          bindTime: undefined,
          registerTime: undefined,
          phone: undefined,
          totalContribution: undefined,
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
      inviterAgentId: [
          {
              required: true,
              type:  'number',
              message: '请输入上级代理ID',
              trigger: 'blur'
          }
      ],
      uid: [
          {
              required: true,
              type:  'number',
              message: '请输入玩家ID',
              trigger: 'blur'
          }
      ],
      countryCode: [
          {
              required: true,
              type:  'number',
              message: '请输入国家代码',
              trigger: 'blur'
          }
      ],
      channel: [
          {
              required: true,
              type:  'number',
              message: '请输入渠道',
              trigger: 'blur'
          }
      ],
      totalBet: [
          {
              required: true,
              type:  'number',
              message: '请输入累计投注金额',
              trigger: 'blur'
          }
      ],
      totalReward: [
          {
              required: true,
              type:  'number',
              message: '请输入累计赢利金额',
              trigger: 'blur'
          }
      ],
      totalBetCnt: [
          {
              required: true,
              type:  'number',
              message: '请输入累计投注次数',
              trigger: 'blur'
          }
      ],
      totalRewardCnt: [
          {
              required: true,
              type:  'number',
              message: '请输入累计获奖次数',
              trigger: 'blur'
          }
      ],
      totalPayApplyAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入累计充值申请金额',
              trigger: 'blur'
          }
      ],
      totalPayApplyCnt: [
          {
              required: true,
              type:  'number',
              message: '请输入累计充值申请次数',
              trigger: 'blur'
          }
      ],
      totalPaySuccessAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入累计充值成功金额',
              trigger: 'blur'
          }
      ],
      totalPaySuccessCnt: [
          {
              required: true,
              type:  'number',
              message: '请输入累计充值成功次数',
              trigger: 'blur'
          }
      ],
      firstPayTime: [
          {
              required: true,
              type:  'number',
              message: '请输入首次充值时间',
              trigger: 'blur'
          }
      ],
      firstPayAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入首次充值金额',
              trigger: 'blur'
          }
      ],
      lastPayTime: [
          {
              required: true,
              type:  'number',
              message: '请输入最近充值时间',
              trigger: 'blur'
          }
      ],
      lastPayAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入最近充值金额',
              trigger: 'blur'
          }
      ],
      totalWithdrawApplyAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入累计提现申请金额',
              trigger: 'blur'
          }
      ],
      totalWithdrawApplyCnt: [
          {
              required: true,
              type:  'number',
              message: '请输入累计提现申请次数',
              trigger: 'blur'
          }
      ],
      totalWithdrawSuccessAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入累计提现成功金额',
              trigger: 'blur'
          }
      ],
      totalWithdrawSuccessCnt: [
          {
              required: true,
              type:  'number',
              message: '请输入累计提现成功次数',
              trigger: 'blur'
          }
      ],
      firstWithdrawTime: [
          {
              required: true,
              type:  'number',
              message: '请输入首次提现时间',
              trigger: 'blur'
          }
      ],
      firstWithdrawAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入首次提现金额',
              trigger: 'blur'
          }
      ],
      lastWithdrawTime: [
          {
              required: true,
              type:  'number',
              message: '请输入最近提现时间',
              trigger: 'blur'
          }
      ],
      lastWithdrawAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入最近提现金额',
              trigger: 'blur'
          }
      ],
      totalLoginDays: [
          {
              required: true,
              type:  'number',
              message: '请输入累计登录天数',
              trigger: 'blur'
          }
      ],
      firstGameTime: [
          {
              required: true,
              type:  'number',
              message: '请输入首次游戏时间',
              trigger: 'blur'
          }
      ],
      lastGameTime: [
          {
              required: true,
              type:  'number',
              message: '请输入最近游戏时间',
              trigger: 'blur'
          }
      ],
      firstLoginTime: [
          {
              required: true,
              type:  'number',
              message: '请输入首次登录时间',
              trigger: 'blur'
          }
      ],
      lastLoginTime: [
          {
              required: true,
              type:  'number',
              message: '请输入最近登录时间',
              trigger: 'blur'
          }
      ],
      bindTime: [
          {
              required: true,
              type:  'number',
              message: '请输入绑定时间',
              trigger: 'blur'
          }
      ],
      registerTime: [
          {
              required: true,
              type:  'number',
              message: '请输入注册时间',
              trigger: 'blur'
          }
      ],
      phone: [
          {
              required: true,
              type:  'string',
              message: '请输入手机号',
              trigger: 'blur'
          }
      ],
      totalContribution: [
          {
              required: true,
              type:  'number',
              message: '请输入贡献',
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
        const saveOrUpdate = isUpdate.value ?updateAgentUserProfile : addAgentUserProfile;;
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
