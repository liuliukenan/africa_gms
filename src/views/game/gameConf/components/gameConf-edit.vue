<!-- 用户编辑弹窗 -->
<template>
  <ele-modal :width="800" v-model="visible" :confirm-loading="loading" :title="isUpdate ? '修改游戏配置' : '新建游戏配置'" :body-style="{ paddingBottom: '5px' }" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="游戏ID" prop="gameId">
            <el-input-number clearable placeholder="" v-model="form.gameId" controls-position="right" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="原游戏ID" prop="orgGameId">
            <el-input clearable placeholder="" v-model="form.orgGameId" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="en" prop="en">
            <el-input clearable placeholder="请输入" v-model="form.en" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="游戏标签" prop="gameTag">
            <!-- <dict-data code="gameType" v-model="form.gameTag" valueType="number" placeholder="请选择游戏标签" /> -->
            <el-select v-model="form.gameTag" placeholder="请选择游戏标签">
              <el-option v-for="item in tagArr" :key="item.tagId" :label="item.tagName" :value="item.tagId" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="游戏类型" prop="gameType">
            <dict-data code="myGameType" v-model="form.gameType" valueType="number" placeholder="请选择分组类型" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="分组类型" prop="gameGroup">
            <dict-data code="gameGroup" v-model="form.gameGroup" valueType="number" placeholder="请选择分组类型" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="状态" prop="state">
            <dict-data code="gameConfState" v-model="form.state" valueType="number" type="select" placeholder="请选择状态" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="版本号" prop="version">
            <el-input clearable placeholder="请输入版本号" v-model="form.version" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="排序" prop="sortNumber">
            <el-input-number v-model="form.sortNumber" :min="0" controls-position="right" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="公司ID" prop="companyId">
            <el-input-number v-model="form.companyId" :min="0" :controls="false" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="factoryCode" prop="factoryCode">
            <el-input v-model="form.factoryCode" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="RTP" prop="rtp">
            <el-input v-model="form.rtp" placeholder="请输入RTP" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="波动率" prop="wave">
            <el-input v-model="form.wave" placeholder="请输入波动率" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="最大倍数" prop="muti">
            <el-input v-model="form.muti" placeholder="请输入最大倍数" style="width: 100%" />
          </el-form-item>
        </el-col>
         <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="流水超时结算等待秒数" prop="flowSettleDelaySeconds">
            <el-input-number v-model="form.flowSettleDelaySeconds" :min="0" :controls="false" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="流水计算类型" prop="muti">
            <el-radio-group v-model="form.flowCalcType">
              <el-radio :value="1">按下注金额</el-radio>
              <el-radio :value="2">按单局净差</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="流水结算方式" prop="muti">
            <el-radio-group v-model="form.flowSettleType">
              <el-radio :value="1">实时结算</el-radio>
              <el-radio :value="2">结束事件结算</el-radio>
              <el-radio :value="3">超时结算</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="方向" prop="direct">
            <el-radio-group v-model="form.direct">
              <el-radio :value="1">竖屏</el-radio>
              <el-radio :value="0">横屏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="试玩模式" prop="haveDemo">
            <el-radio-group v-model="form.haveDemo">
              <el-radio :value="1">开启</el-radio>
              <el-radio :value="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="图标" prop="iconType">
            <el-radio-group v-model="form.iconType">
              <el-radio :value="0">小图标</el-radio>
              <el-radio :value="1">大图标</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :md="12" :sm="24" :xs="24">
          <el-form-item label="入口图片" prop="icon">
            <image-upload
              :limit="1"
              v-model="form.icon"
              accept="image/png"
              :item-style="{
                width: '143px',
                height: '143px',
                background: 'var(--el-fill-color-lighter)',
                '--ele-upload-list-padding': 0
              }"
              :button-style="{ width: '143px', height: '143px' }"
              category="1"
              :isOBS="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, nextTick } from 'vue';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addGameConf, updateGameConf } from '@/api/game/gameConf/index';
  import type { GameConf } from '@/api/game/model/index';
  import { FormInstance, FormRules } from 'element-plus';
  import ImageUpload from '@/components/ImageUpload/index.vue';

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: GameConf | null;
    tagArr: any[];
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });
  const formRef = ref<FormInstance | null>(null);

  // 是否是修改
  const isUpdate = ref(false);

  // 提交状态
  const loading = ref(false);

  // 表单数据
  const { form, resetFields, assignFields } = useFormData<GameConf>({
    gameId: undefined,
    orgGameId: undefined,
    gameGroup: undefined,
    companyId: undefined,
    factoryCode: undefined,
    flowCalcType: undefined,
    flowSettleType: undefined,
    flowSettleDelaySeconds: undefined,
    direct: 0,
    tag: 0,
    gameTag: undefined,
    gameType: undefined,
    state: undefined,
    sid: undefined,
    icon: '',
    version: undefined,
    muti: undefined,
    rtp: undefined,
    wave: undefined,
    iconType: 0,
    haveDemo: 0,
    hot: 0,
    sortNumber: undefined,
    en: undefined
  });

  // 表单验证规则
  const rules = reactive<FormRules>({
    gameId: [
      {
        required: true,
        type: 'number',
        message: '请输入游戏ID',
        trigger: 'blur'
      }
    ],
    orgGameId: [
      {
        required: true,
        type: 'string',
        message: '请输入原始游戏Id',
        trigger: 'blur'
      }
    ],
    en: [
      {
        required: true,
        type: 'string',
        message: '请输入英文',
        trigger: 'blur'
      }
    ],
    sid: [
      {
        required: true,
        type: 'number',
        message: '请输入服务ID',
        trigger: 'blur'
      }
    ],
    gameTag: [
      {
        required: true,
        type: 'number',
        message: '请选择游戏类型',
        trigger: 'blur'
      }
    ],
    state: [
      {
        required: true,
        type: 'number',
        message: '请选择状态',
        trigger: 'blur'
      }
    ],
    sortNumber: [
      {
        required: true,
        type: 'number',
        message: '请输入排序',
        trigger: 'blur'
      }
    ]
  });

  /* 保存编辑 */
  const save = () => {
    console.log(form);

    if (!formRef.value) {
      return;
    }
    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      let params = { ...form };
      loading.value = true;
      const saveOrUpdate = isUpdate.value ? updateGameConf : addGameConf;
      saveOrUpdate(params)
        .then((msg) => {
          loading.value = false;
          EleMessage.success(msg);
          handleCancel();
          emit('done');
        })
        .catch((e) => {
          loading.value = false;
          EleMessage.error(e.message);
        });
    });
  };
  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
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
