<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="1200" v-model="visible" :title="isUpdate ? '修改游戏版本号' : '新建游戏版本号'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="ID: " name="id" v-if="isUpdate">
            {{ form.id }}
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="基础域名" name="name">
            <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="客户端" name="clientType">
            <el-radio-group v-model.trim="form.clientType">
              <el-radio-button :value="0" label="否" />
              <el-radio-button :value="1" label="是" />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="测试" name="type">
            <el-radio-group v-model.trim="form.type">
              <el-radio-button :value="0" label="否" />
              <el-radio-button :value="1" label="是" />
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16" v-if="form.clientType == 1">
        <el-col :sm="12" :xs="12">
          <el-form-item label="下载地址" name="packageUrl">
            <el-input clearable v-model="form.gameVerItem.packageUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="remoteManifestUrl" name="remoteManifestUrl">
            <el-input clearable v-model="form.gameVerItem.remoteManifestUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16" v-if="form.clientType == 1">
        <el-col :sm="12" :xs="12">
          <el-form-item label="remoteVersionUrl" name="remoteVersionUrl">
            <el-input clearable v-model="form.gameVerItem.remoteVersionUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="基地址" name="baseUrl">
            <el-input clearable v-model="form.gameVerItem.baseUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="cdn地址" name="sourceUrl">
            <el-input clearable v-model="form.gameVerItem.sourceUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="聊天地址" name="chatUrl">
            <el-input clearable v-model="form.gameVerItem.chatUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="payTableUrl" name="payTableUrl">
            <el-input clearable v-model="form.gameVerItem.payTableUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="大厅" name="lobbyUrl">
            <el-input clearable v-model="form.gameVerItem.lobbyUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="slotsUrl" name="slotsUrl">
            <el-input clearable v-model="form.gameVerItem.slotsUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="客户端版本" name="version">
            <el-input clearable v-model="form.gameVerItem.version" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="fishUrl" name="fishUrl">
            <el-input clearable v-model="form.gameVerItem.fishUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="轮盘版本" name="rouletteUrl">
            <el-input clearable v-model="form.gameVerItem.rouletteUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="12" :xs="12">
          <el-form-item label="多语言版本(服)" name="serLangVersion">
            <el-input clearable v-model="form.gameVerItem.serLangVersion" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="logUrl" name="logUrl">
            <el-input clearable v-model="form.gameVerItem.logUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="状态" name="state">
            <el-radio-group v-model.trim="form.state">
              <el-radio-button :value="1" label="启用" />
              <el-radio-button :value="0" label="禁用" />
            </el-radio-group>
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

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addGameVersion, updateGameVersion } from '@/api/config/gameVersionApi';
  import type { GameVersion } from '@/api/model/gameVersion';

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: GameVersion | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
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
  const [form, resetFields, assignFields] = useFormData<GameVersion>({
    id: undefined,
    name: undefined,
    clientType: 0,
    type: 0,
    gameVerItem: {
      jsonType: 'GameVerItem',
      packageUrl: '',
      remoteManifestUrl: '',
      remoteVersionUrl: '',
      sourceUrl: '',
      baseUrl: '',
      chatUrl: '',
      payTableUrl: '',
      lobbyUrl: '',
      slotsUrl: '',
      fishUrl: '',
      rouletteUrl: ''
    },
    state: 1
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    id: [
      {
        required: true,
        type: 'number',
        message: '请输入id',
        trigger: 'blur'
      }
    ],
    name: [
      {
        required: true,
        type: 'string',
        message: '请输入基础域名',
        trigger: 'blur'
      }
    ],
    clientType: [
      {
        required: true,
        type: 'number',
        message: '请输入客户端类型',
        trigger: 'blur'
      }
    ],
    type: [
      {
        required: true,
        type: 'number',
        message: '请输入测试类型',
        trigger: 'blur'
      }
    ],
    state: [
      {
        required: true,
        type: 'number',
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
      const saveOrUpdate = isUpdate.value ? updateGameVersion : addGameVersion;
      saveOrUpdate(form)
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
