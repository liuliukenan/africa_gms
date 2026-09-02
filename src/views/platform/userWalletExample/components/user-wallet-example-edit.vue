<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="680" v-model="visible" :title="isUpdate ? '修改钱包模板' : '新建钱包模板'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <!-- <el-row :gutter="16">
        <el-col :sm="24" :xs="24" v-if="isUpdate">
          <el-form-item label="id" prop="id">
            <el-input-number v-model="form.id" :min="0" placeholder="请输入" :controls="false" style="width: 100%;" />
          </el-form-item>
        </el-col>

      </el-row> -->
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="钱包名称" prop="name">
            <el-input clearable v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="公司ID" prop="companyId">
            <dict-data v-model="form.companyId" code="serverType" value-type="number" placeholder="请选择" :disabled="true"
              style="width: 100%;" @change="handleCompanyChange" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="游戏分组" prop="gameGroupId">
            <!-- <el-select v-model="form.gameGroupId" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in configStore.gameGroupArr" :key="item.groupId" :label="item.groupName"
                :value="item.groupId || ''" />
            </el-select> -->
            <dict-data v-model="form.gameGroupId" code="gameGroup" value-type="number" placeholder="请选择"
              style="width: 100%;" @change="handleGameGroupChange" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="游戏ID" prop="gameId">
            <el-input-number v-model="form.gameId" :min="0" placeholder="请输入" :controls="false" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="图片" prop="iconUrl">
            <image-upload :limit="1" v-model="form.iconUrl" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" fileName="wallet" />
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
import { addUserWalletExample, updateUserWalletExample } from "@/api/platform/userWalletExampleApi";
import type { UserWalletExample } from "@/api/platform/model/userWalletExample";
// import { useConfigStore } from '@/store/modules/config';
import { useDictData } from '@/utils/use-dict-data';
import ImageUpload from '@/components/ImageUpload/index.vue';
const props = defineProps<{
  /** 修改回显的数据 */
  data?: UserWalletExample | null;
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
const [form, resetFields, assignFields] = useFormData<UserWalletExample>({
  id: undefined,
  name: undefined,
  companyId: 1,
  gameGroupId: undefined,
  gameId: undefined,
  iconUrl: undefined,
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
      message: '请输入名称',
      trigger: 'blur'
    }
  ],
  companyId: [
    {
      required: true,
      type: 'number',
      message: '请输入公司ID',
      trigger: 'blur'
    }
  ],
  gameGroupId: [
    {
      required: true,
      type: 'number',
      message: '请输入游戏分组',
      trigger: 'blur'
    }
  ],
  gameId: [
    {
      required: true,
      type: 'number',
      message: '请输入游戏ID',
      trigger: 'blur'
    }
  ]
});
/** 关闭弹窗 */
const handleCancel = () => {
  visible.value = false;
};

// 获取字典数据
const [gameGroupData, companyIdData] = useDictData(['gameGroup', 'serverType'], 'number');

const gameGroupName = ref('');
const companyIdName = ref('');
// 处理公司ID变化
const handleCompanyChange = (value: number) => {
  const item = companyIdData.value.find(d => Number(d.dictDataCode) === value);
  const name = item?.dictDataName;
  companyIdName.value = name || '';
};

// 处理游戏分组变化
const handleGameGroupChange = (value: number) => {
  const item = gameGroupData.value.find(d => Number(d.dictDataCode) === value);
  const name = item?.dictDataName;
  gameGroupName.value = name || '';
};
/** 保存编辑 */
const save = () => {
  formRef.value?.validate?.((valid) => {
    if (!valid) {
      return;
    }
    loading.value = true;
    let name = '';
    // if (!form.name) {
    //   name = companyIdName.value + gameGroupName.value + form.gameId
    // }
    const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
    if (form.iconUrl && imgBaseUrl && form.iconUrl.startsWith(imgBaseUrl)) {
      form.iconUrl = form.iconUrl.slice(imgBaseUrl.length);
    }
    const saveOrUpdate = isUpdate.value ? updateUserWalletExample : addUserWalletExample;;
    const formData = {
      ...form,
      gameId: form.gameId || 0,
      // name: form.name || name || ''
    };
    saveOrUpdate(formData)
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
      form.iconUrl = import.meta.env.VITE_APP_IMG_URL + props.data.iconUrl;
    // companyIdName.value = companyIdData.value.find(d => Number(d.dictDataCode) === form.companyId)?.dictDataName || '';
    // gameGroupName.value = gameGroupData.value.find(d => Number(d.dictDataCode) === form.gameGroupId)?.dictDataName || '';

    form.companyId = 1;
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
