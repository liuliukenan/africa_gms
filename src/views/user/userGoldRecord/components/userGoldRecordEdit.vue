<!-- 用户编辑弹窗 -->
<template>
  <ele-modal
    :width="680"
    v-model="visible"
    :confirm-loading="loading"
    :title="isUpdate ? '修改用户金币' : '新建用户金币'"
    :body-style="{ paddingBottom: '5px' }"
  >
    <el-form ref="formRef" :model="form" :rules="rules" :label-col="{ md: 7, sm: 4, xs: 24 }" :wrapper-col="{ md: 17, sm: 20, xs: 24 }">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="id">
              <el-input-number v-model.trim="form.id"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="uid">
              <el-input-number v-model.trim="form.uid"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="level">
              <el-input-number v-model.trim="form.level"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="type">
              <el-input-number v-model.trim="form.type"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="oldCoins">
              <el-input-number v-model.trim="form.oldCoins"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="currCoins">
              <el-input-number v-model.trim="form.currCoins"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="sid">
              <el-input-number v-model.trim="form.sid"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="gameId">
              <el-input-number v-model.trim="form.gameId"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
            <el-form-item  label="" name="gameName">
               <el-input clearable :maxlength="20" placeholder="请输入" v-model="form.gameName" />
            </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="limitTag">
              <el-input-number v-model.trim="form.limitTag"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="betAmount">
              <el-input-number v-model.trim="form.betAmount"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="winAmount">
              <el-input-number v-model.trim="form.winAmount"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="resultAmount">
              <el-input-number v-model.trim="form.resultAmount"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item  label="" name="refer">
              <el-input-number v-model.trim="form.refer"  placeholder="请输入" clearable style="width: 100%"/>
          </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
            <el-form-item  label="" name="note">
               <el-input clearable :maxlength="20" placeholder="请输入" v-model="form.note" />
            </el-form-item>
         </el-col>
      </el-row>
    </el-form>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
    import { EleMessage } from "ele-admin-plus/es";
  import {useFormData }from '@/utils/use-form-data';
  import { addUserGoldRecord, updateUserGoldRecord} from '@/api/user/userGoldRecord'
import type { FormInstance, FormRules } from 'element-plus';
  const emit = defineEmits<{
  (e: "done"): void;
}>();

/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

  const props = defineProps<{
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object
  }>();

  //
  const formRef = ref<FormInstance | null>(null);

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);

  // 表单数据
  const { form, resetFields, assignFields } = useFormData({
       id: undefined,
       uid: undefined,
       level: undefined,
       type: undefined,
       oldCoins: undefined,
       currCoins: undefined,
       sid: undefined,
       gameId: undefined,
       gameName: undefined,
       limitTag: undefined,
       betAmount: undefined,
       winAmount: undefined,
       resultAmount: undefined,
       refer: undefined,
       note: undefined,
  });

  // 表单验证规则
  const rules = reactive<FormRules>({
      id: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      uid: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      level: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      type: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      oldCoins: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      currCoins: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      sid: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      gameId: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      gameName: [
          {
              required: true,
              type:  'string',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      limitTag: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      betAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      winAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      resultAmount: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      refer: [
          {
              required: true,
              type:  'number',
              message: '请输入',
              trigger: 'blur'
          }
      ],
      note: [
          {
              required: true,
              type:  'string',
              message: '请输入',
              trigger: 'blur'
          }
      ]
  });

  /* 保存编辑 */
  // const save = () => {
  //   if (!formRef.value) {
  //     return;
  //   }
  //   formRef.value
  //     .validate()
  //     .then(() => {
  //       loading.value = true;
  //       const saveOrUpdate = isUpdate.value ? updateUserGoldRecord : addUserGoldRecord;
  //       saveOrUpdate(form)
  //         .then((msg) => {
  //           loading.value = false;
  //           EleMessage.success(msg);
  
  //           emit('done');
  //         })
  //         .catch((e) => {
  //           loading.value = false;
  //           EleMessage.error(e.message);
  //         });
  //     })
  //     .catch(() => {});
  // };
</script>
