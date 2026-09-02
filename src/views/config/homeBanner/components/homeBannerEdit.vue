<!-- 轮播图编辑弹窗 -->
<template>
  <ele-modal form :width="1024" v-model="visible" :title="isUpdate ? '修改首页轮播' : '新建首页轮播'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="轮播图名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入轮播图名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="优先级" prop="priority">
            <el-input-number v-model="form.priority" :min="0" placeholder="请输入优先级" style="width: 100%"
              controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="所属导航" prop="navId">
            <dict-data code="bannerJumpType" v-model="form.navId" valueType="number" placeholder="请选择所属导航"
              style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="24" :xs="24">
          <el-form-item label="推送详情" prop="pushDetail">
            <el-input v-model="form.pushDetail" type="textarea" :rows="3" placeholder="请输入推送详情，如指定玩家ID列表" clearable />
          </el-form-item>
        </el-col> -->
        <el-col :sm="12" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="点击属性" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">可点击</el-radio>
              <el-radio :value="0">不可点击</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24" v-if="form.status === 1">
          <el-form-item label="跳转类型" prop="jumpType">
            <dict-data code="bannerJumpType" v-model="form.jumpType" valueType="number" placeholder="请输入类型"
              style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24" v-if="form.status === 1">
          <el-form-item label="跳转目标" prop="jumpType">
            <dict-data code="bannerJumpType" v-model="form.jumpType" valueType="number" placeholder="请输入跳转目标"
              style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="间隔时间(秒)" prop="intervalTime">
            <el-input-number v-model="form.intervalTime" placeholder="请输入间隔秒数" style="width: 100%" :min="1" :max="10"
              controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="推送范围" prop="pushRange">
            <el-radio-group v-model="form.pushRange">
              <el-radio :value="1">全服推送</el-radio>
              <el-radio :value="2">指定用户</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="18" :xs="24" v-if="form.pushRange === 2">
          <el-form-item label="UID列表" prop="list">
            <el-input v-model="form.list" type="textarea" :rows="3" placeholder="请输入UID列表" clearable />
          </el-form-item>
        </el-col>
        <el-col :sm="6" :xs="24" v-if="form.pushRange === 2">
          <ele-upload-list :limit="1" :sortable="false" v-model="file" accept=".xls,.xlsx"
            :button-style="{ width: '100px', height: '30px' }" @upload="(item) => handleUpload(0, item)">
            <template #icon>
              <el-button type="warning">
                <el-icon size="20">
                  <Upload />
                </el-icon>点击上传
              </el-button>
            </template>
          </ele-upload-list>
          <!-- </el-form-item> -->
        </el-col>
        <!-- <el-col :sm="12" :xs="24">
          <el-form-item label="国家列表" prop="countryCodes">
            <el-select v-model="form.countryCodes" multiple placeholder="请选择" style="width:100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                :value="item.code || ''" />
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row :gutter="16">
        <el-col :md="6" :sm="6" :xs="24">
          <el-form-item label="缅甸" prop="mm">
            <image-upload :limit="1" v-model="form.mm" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :xs="24">
          <el-form-item label="越南" prop="vn">
            <image-upload :limit="1" v-model="form.vn" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :xs="24">
          <el-form-item label="印尼" prop="indon">
            <image-upload :limit="1" v-model="form.indon" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :xs="24">
          <el-form-item label="马来" prop="my">
            <image-upload :limit="1" v-model="form.my" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :xs="24">
          <el-form-item label="泰语" prop="th">
            <image-upload :limit="1" v-model="form.th" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :xs="24">
          <el-form-item label="繁体中文" prop="uca">
            <image-upload :limit="1" v-model="form.uca" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :xs="24">
          <el-form-item label="中文" prop="zh">
            <image-upload :limit="1" v-model="form.zh" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :xs="24">
          <el-form-item label="English" prop="en">
            <image-upload :limit="1" v-model="form.en" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
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
import { Upload } from '@element-plus/icons-vue';
import { useFormData } from "@/utils/use-form-data";
import { addBanner, updateBanner } from "@/api/config/homeBannerApi";
import type { Banner } from "@/api/model/homeBanner";
import ImageUpload from '@/components/ImageUpload/index.vue';
import { useConfigStore } from "@/store/modules/config";

const configStore = useConfigStore();

const props = defineProps<{
  /** 修改回显的数据 */
  data?: Banner | null;
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
const [form, resetFields, assignFields] = useFormData<Banner>({
  id: undefined,
  name: '',
  priority: undefined,
  navId: undefined,
  jumpType: undefined,
  countryCodes: undefined,
  status: 1,
  pushRange: undefined,
  pushDetail: '',
  intervalTime: undefined,
  zh: '',
  en: '',
  th: '',
  mm: '',
  my: '',
  vn: '',
  indon: '',
  uca: '',
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  jumpType: [
    {
      required: true,
      type: 'number',
      message: '请输入跳转类型',
      trigger: 'blur'
    }
  ],
  status: [
    {
      required: true,
      type: 'number',
      message: '请选择状态',
      trigger: 'blur'
    }
  ],
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
    const saveOrUpdate = isUpdate.value ? updateBanner : addBanner;
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
let file = ref<any>();
/** 上传事件 */
const handleUpload = (_: number, data: any) => {
  if (!data.file) {
    EleMessage.error('请选择文件');
    return;
  }
  const formData = new FormData();
  formData.append('file', data.file);
  console.log('formData:', formData);
  // uploadMutiLang(formData)
  //   .then((message) => {
  //     EleMessage.success(message);
  //     emit('done');
  //     handleCancel();
  //   })
  //   .catch((e) => {
  //     EleMessage.error(e.message);
  //   });
};
</script>
<style lang="scss" scoped>
:deep(.el-input-number__inner::placeholder) {
  text-align: left !important;
}
</style>
