<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="880" v-model="visible" :title="isUpdate ? '修改活动' : '新建活动'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
      <el-row :gutter="16">
        <!-- <el-col :sm="12" :xs="12">
          <el-form-item label="跳转类型" prop="jumpType">
            <dict-data code="bannerJumpType" v-model="form.jumpType" valueType="number" placeholder="请输入类型" />
          </el-form-item>
        </el-col> -->
        <el-col :sm="12" :xs="12">
          <el-form-item label="国家代码" prop="countryCode">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="活动名称" prop="name" >
            <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="活动类型" prop="type">
            <dict-data code="bannerJumpType" v-model="form.type" valueType="string" placeholder="请输入类型"
              @change="changeType" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="true" label="true">启用</el-radio>
              <el-radio :value="false" label="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="12">
          <el-form-item label="跳转类型" prop="jumpType">
            <dict-data code="actionType2" v-model="form.jumpType" valueType="number" placeholder="请输入类型"
              :disabled="true" @change="changeType" style="width: 100%" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="12" v-if="form.jumpType === 1">
          <el-form-item label="首页跳转地址" prop="homeUrl" >
            <el-cascader style="width: 100%;" v-model="form.homeUrl" :options="homeUrlOptions" @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12" v-if="form.jumpType === 2">
          <el-form-item label="游戏ID" prop="gameId" :required="true">
            <el-input-number style="width: 100%;" :controls="false" clearable v-model="form.gameId" placeholder="请输入" />
          </el-form-item>
        </el-col> -->
        <el-col :sm="12" :xs="12" v-if="form.jumpType === 3 || form.jumpType === 4">
          <el-form-item label="跳转页面" prop="jumpId" >
            <el-select v-model="form.jumpId" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in jumpIdArr" :key="item.id" :label="item.jumpName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="排序" prop="sortNumber">
            <el-input-number v-model="form.sortNumber" :controls="false" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
        <!-- <el-row :gutter="16">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="缅甸" prop="mm">
            <image-upload :limit="1" v-model="form.mm" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="越南" prop="vn">
            <image-upload :limit="1" v-model="form.vn" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="印尼" prop="indon">
            <image-upload :limit="1" v-model="form.indon" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="马来" prop="my">
            <image-upload :limit="1" v-model="form.my" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="泰语" prop="th">
            <image-upload :limit="1" v-model="form.th" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="繁体中文" prop="uca">
            <image-upload :limit="1" v-model="form.uca" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="中文" prop="zh">
            <image-upload :limit="1" v-model="form.zh" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" :isOBS="true" />
          </el-form-item>
        </el-col> -->
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="图片" prop="imgUrl">
            <image-upload :limit="1" v-model="form.imgUrl" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" fileName="activitys" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="12">
          <el-form-item label="生效时间">
            <el-date-picker v-model="form.time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
              format="YYYY-MM-DD HH:mm:ss" style="width: 100%;" range-separator="至" start-placeholder="开始"
              end-placeholder="结束" />
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
import { addActivitys, updateActivitys } from "@/api/config/activitysApi";
import type { Activitys, ActivitysParam } from "@/api/model/activitys";
import ImageUpload from '@/components/ImageUpload/index.vue';
import { toDateZone } from '@/utils/utils';
import { byTypeGetList, cascaderFaceShot } from "@/api/platform/faceShotApi";
import { useConfigStore } from "@/store/modules/config";
const configStore = useConfigStore();
const props = defineProps<{
  /** 修改回显的数据 */
  data?: Activitys | null;
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
const [form, resetFields, assignFields] = useFormData<Activitys>({
  id: undefined,
  countryCode: undefined,
  name: undefined,
  gameGroup: undefined,
  jumpType: 3,
  jumpExtend: undefined,
  userRange: undefined,
  triggerType: undefined,
  jumpId: undefined,
  sortNumber: undefined,
  status: true,
  startDate: undefined,
  endDate: undefined,
  homeUrl: undefined,
  gameId: undefined,
  imgUrl: undefined,
  type: undefined,
  time: undefined as string[] | undefined,
});
const homeUrlOptions = ref<any[]>([]);
const getCascaderData = async () => {
  let res = await cascaderFaceShot();
  if (res) homeUrlOptions.value = res;
};
// 根据类型获取列表
const changeType = (val: number) => {
  // 清空上次类型遗留的值
  form.homeUrl = undefined;
  form.jumpExtend = undefined;
  form.gameId = undefined;
  form.jumpId = undefined;
  nextTick(() => formRef.value?.clearValidate?.());
  if (val === 1) {
    getCascaderData();
  } else if (val === 3 || val === 4) {
    getList(val);
  }
};
const jumpIdArr = ref<any[]>([]);
// 根据内联，外联类型获取列表
const getList = (val: any) => {
  byTypeGetList(val).then((res) => {
    console.log(res);
    jumpIdArr.value = res;

  });
};
const handleChange = (val: any) => {
  console.log(val);
  // jumpExtend 存储为 JSON 字符串
  form.jumpExtend = val ? { list: val } : undefined;
};
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
  countryCode: [
    {
      required: true,
      type: 'number',
      message: '请选择国家代码',
      trigger: 'blur'
    }
  ],
  jumpType: [
    {
      required: true,
      type: 'number',
      message: '请输入跳转类型',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      type: 'string',
      message: '请输入活动名称',
      trigger: 'blur'
    }
  ],
  type: [
    {
      required: true,
      type: 'string',
      message: '请选择类型',
      trigger: 'blur'
    }
  ],
  jumpId: [
    {
      required: true,
      type: 'number',
      message: '请选择跳转页面',
      trigger: 'blur'
    }
  ],
  imgUrl: [
    {
      required: true,
      type: 'string',
      message: '请选择图片',
      trigger: 'blur'
    }
  ],
  status: [
    {
      required: true,
      type: 'boolean',
      message: '请选择状态',
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
    const saveOrUpdate = isUpdate.value ? updateActivitys : addActivitys;
    const [startDate, endDate] = (form.time as string[]) || [];
    form.startDate = startDate;
    form.endDate = endDate;

    if (form.gameId) form.jumpId = form.gameId;

    const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
    if (form.imgUrl && imgBaseUrl && form.imgUrl.startsWith(imgBaseUrl)) {
      form.imgUrl = form.imgUrl.slice(imgBaseUrl.length);
    }

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
const handleOpen = async () => {
  getList(3);
  if (props.data) {
    assignFields({ ...props.data });
    form.imgUrl = import.meta.env.VITE_APP_IMG_URL + props.data.imgUrl;

    // 回显时间：按目标国家时区转换，与列表展示保持一致
    const tz = props.data.countryCode;
    form.time = [
      toDateZone(props.data.startDate, tz),
      toDateZone(props.data.endDate, tz)
    ];

    // jumpType===2 时游戏ID回显
    if (props.data.jumpId && props.data.jumpType === 2) {
      form.gameId = props.data.jumpId;
    }

    form.jumpExtend = props.data.jumpExtend ?? undefined;
    // getList(form.jumpType);
    // if (props.data.jumpType === 1 && props.data.jumpExtend) {
    //   // await 等 options 加载完再赋 homeUrl，保证 cascader 能匹配回显
    //   await getCascaderData();
    //   try {
    //     const extend = props.data.jumpExtend;
    //     form.homeUrl = extend?.list ?? undefined;
    //   } catch {
    //     form.homeUrl = undefined;
    //   }
    // }

    isUpdate.value = true;
  } else {
    resetFields();
    form.time = undefined;
    isUpdate.value = false;
  }
  nextTick(() => {
    nextTick(() => {
      formRef.value?.clearValidate?.();
    });
  });
};
</script>
<style lang="scss" scoped>
:deep(.el-input-number__inner::placeholder) {
  text-align: left !important;
}
</style>
