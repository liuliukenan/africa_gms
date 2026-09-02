<!-- 用户编辑弹窗 -->
<template>
    <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改返利记录' : '新建返利记录'"  @open="handleOpen">
       <el-form  ref="formRef" :model="form" :rules="rules"        label-width="80px"  @submit.prevent="">
            <!-- <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="id" name="id">
                            <el-input-number :controls="false"   v-model="form.id"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="时间key" name="daykey">
                            <el-input-number :controls="false"   v-model="form.daykey"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row> -->
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="用户Id" name="uid">
                            <el-input-number :controls="false"   v-model="form.uid"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="总下注" name="totalBet">
                            <el-input-number :controls="false"   v-model="form.totalBet"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="总赢取" name="totalWin">
                            <el-input-number :controls="false"   v-model="form.totalWin"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="slots下注" name="slotsBet">
                            <el-input-number :controls="false"   v-model="form.slotsBet"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="slots赢取" name="slotsWin">
                            <el-input-number :controls="false"   v-model="form.slotsWin"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="cards下注" name="cardsBet">
                            <el-input-number :controls="false"   v-model="form.cardsBet"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="cards赢取" name="cardsWin">
                            <el-input-number :controls="false"   v-model="form.cardsWin"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="捕鱼下注" name="fishBet">
                            <el-input-number :controls="false"   v-model="form.fishBet"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="捕鱼赢取" name="fishWin">
                            <el-input-number :controls="false"   v-model="form.fishWin"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="真人下注" name="liveBet">
                            <el-input-number :controls="false"   v-model="form.liveBet"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="真人赢取" name="liveWin">
                            <el-input-number :controls="false"   v-model="form.liveWin"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="体育下注" name="sportsBet">
                            <el-input-number :controls="false"   v-model="form.sportsBet"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="体育赢取" name="sportsWin">
                            <el-input-number :controls="false"   v-model="form.sportsWin"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="彩票下注" name="lotteryBet">
                            <el-input-number :controls="false"   v-model="form.lotteryBet"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="彩票赢取" name="lotteryWin">
                            <el-input-number :controls="false"   v-model="form.lotteryWin"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="其它下注" name="otherBet">
                            <el-input-number :controls="false"   v-model="form.otherBet"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row :gutter="16">
                <el-col :sm="12" :xs="12">
                        <el-form-item label="其它赢取" name="otherWin">
                            <el-input-number :controls="false"   v-model="form.otherWin"  :min="0"  placeholder="请输入" style="width:100%" />
                        </el-form-item>
                    </el-col>
                <el-col :sm="12" :xs="12">
                        <el-form-item label="返利金额" name="rebateAmount">
                            <el-input-number :controls="false"   v-model="form.rebateAmount"  :min="0"  placeholder="请输入" style="width:100%" />
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
    import { addRebateList, updateRebateList } from "@/api/welfare/rebateListApi";
    import type { RebateList } from "@/api/welfare/model/rebateList";;

    const props = defineProps<{
      /** 修改回显的数据 */
      data?: RebateList | null;
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
    const [form, resetFields, assignFields] = useFormData<RebateList>({
          id: undefined,
          daykey: undefined,
          uid: undefined,
          totalBet: undefined,
          totalWin: undefined,
          slotsBet: undefined,
          slotsWin: undefined,
          cardsBet: undefined,
          cardsWin: undefined,
          fishBet: undefined,
          fishWin: undefined,
          liveBet: undefined,
          liveWin: undefined,
          sportsBet: undefined,
          sportsWin: undefined,
          lotteryBet: undefined,
          lotteryWin: undefined,
          otherBet: undefined,
          otherWin: undefined,
          rebateAmount: undefined,
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
      daykey: [
          {
              required: true,
              type:  'number',
              message: '请输入时间key',
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
      slotsBet: [
          {
              required: true,
              type:  'number',
              message: '请输入slots下注',
              trigger: 'blur'
          }
      ],
      slotsWin: [
          {
              required: true,
              type:  'number',
              message: '请输入slots赢取',
              trigger: 'blur'
          }
      ],
      cardsBet: [
          {
              required: true,
              type:  'number',
              message: '请输入cards下注',
              trigger: 'blur'
          }
      ],
      cardsWin: [
          {
              required: true,
              type:  'number',
              message: '请输入cards赢取',
              trigger: 'blur'
          }
      ],
      fishBet: [
          {
              required: true,
              type:  'number',
              message: '请输入捕鱼下注',
              trigger: 'blur'
          }
      ],
      fishWin: [
          {
              required: true,
              type:  'number',
              message: '请输入捕鱼赢取',
              trigger: 'blur'
          }
      ],
      liveBet: [
          {
              required: true,
              type:  'number',
              message: '请输入真人下注',
              trigger: 'blur'
          }
      ],
      liveWin: [
          {
              required: true,
              type:  'number',
              message: '请输入真人赢取',
              trigger: 'blur'
          }
      ],
      sportsBet: [
          {
              required: true,
              type:  'number',
              message: '请输入体育下注',
              trigger: 'blur'
          }
      ],
      sportsWin: [
          {
              required: true,
              type:  'number',
              message: '请输入体育赢取',
              trigger: 'blur'
          }
      ],
      lotteryBet: [
          {
              required: true,
              type:  'number',
              message: '请输入彩票下注',
              trigger: 'blur'
          }
      ],
      lotteryWin: [
          {
              required: true,
              type:  'number',
              message: '请输入彩票赢取',
              trigger: 'blur'
          }
      ],
      otherBet: [
          {
              required: true,
              type:  'number',
              message: '请输入其它下注',
              trigger: 'blur'
          }
      ],
      otherWin: [
          {
              required: true,
              type:  'number',
              message: '请输入其它赢取',
              trigger: 'blur'
          }
      ],
      rebateAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入返利金额',
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
        const saveOrUpdate = isUpdate.value ?updateRebateList : addRebateList;;
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
