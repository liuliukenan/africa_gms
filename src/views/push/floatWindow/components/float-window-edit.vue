<!-- 悬浮窗编辑弹窗 -->
<template>
  <ele-modal form :width="900" v-model="visible" :title="title" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="国家代码">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="显示名称" prop="name">
            <el-input clearable :maxlength="50" v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="24">
          <el-form-item label="所属于分组" prop="gameGroup">
            <dict-data code="gameGroup" v-model="form.gameGroup" valueType="number" placeholder="请输入分组" style="width: 100%" />
          </el-form-item>
        </el-col> -->

        <el-col :sm="12" :xs="24">
          <el-form-item label="图片" prop="imgUrl">
            <image-upload
              :limit="1"
              v-model="form.imgUrl"
              accept="image/png"
              :item-style="{
                width: '120px',
                height: '120px',
                background: 'var(--el-fill-color-lighter)',
                '--ele-upload-list-padding': 0
              }"
              :button-style="{ width: '120px', height: '120px' }"
              category="1"
              fileName="floatWindow"
            />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="24">
          <el-form-item label="跳转类型" prop="jumpType">
            <dict-data code="actionType" v-model="form.jumpType" valueType="number" placeholder="请输入类型" @change="changeType" style="width: 100%" />
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="24" v-if="form.jumpType === 1">
          <el-form-item label="首页跳转地址" prop="homeUrl" :required="true">
            <el-cascader style="width: 100%" v-model="form.homeUrl" :options="homeUrlOptions" @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24" v-if="form.jumpType === 2">
          <el-form-item label="游戏ID" prop="gameId" :required="true">
            <el-input-number style="width: 100%" :controls="false" clearable v-model="form.gameId" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24" v-if="form.jumpType === 3 || form.jumpType === 4">
          <el-form-item label="跳转类联ID" prop="jumpId" :required="true">
            <el-select v-model="form.jumpId" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in jumpIdArr" :key="item.id" :label="item.jumpName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="关联活动">
            <el-select v-model="form.actId" placeholder="请选择" style="width: 100%" clearable>
              <el-option v-for="item in activityArr" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="活动完成策略" prop="actCompletePolicy">
            <dict-data code="actCompletePolicy" v-model="form.actCompletePolicy" valueType="number" placeholder="请选择" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="排序" prop="sortNumber">
            <el-input-number :controls="false" style="width: 100%" v-model="form.sortNumber" :min="0" placeholder="请输入" />
          </el-form-item>
        </el-col>

       
        <el-col :sm="18" :xs="18">
          <el-form-item label="生效时间">
            <el-date-picker v-model="form.time" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" style="width: 100%" range-separator="至" start-placeholder="开始" end-placeholder="结束" />
          </el-form-item>
        </el-col>
         <el-col :sm="12" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="true">启用</el-radio>
              <el-radio :value="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { addFloatWindow, updateFloatWindow } from '@/api/platform/floatWindowApi';
import type { FloatWindow } from '@/api/platform/model/floatWindow';
import { useConfigStore } from '@/store/modules/config';
import ImageUpload from '@/components/ImageUpload/index.vue';
import { byTypeGetList, cascaderFaceShot } from '@/api/platform/faceShotApi';
import { CountryAct } from '@/api/platform/model/faceShot';
import { toDateString, toDateZone } from '@/utils/utils';
const configStore = useConfigStore();
const props = defineProps<{
  /** 修改回显的数据 */
  data?: FloatWindow | null;
  isCopy: boolean;
  activityArr: CountryAct[];
}>();

const emit = defineEmits<{
  (e: 'done'): void;
}>();
const title = ref('');
/** 弹窗是否打开 */
const visible = defineModel({ type: Boolean });

/** 是否是修改 */
const isUpdate = ref(false);

/** 提交状态 */
const loading = ref(false);

/** 表单实例 */
const formRef = ref<FormInstance | null>(null);

/** 表单数据 */
const [form, resetFields, assignFields] = useFormData<FloatWindow>({
  id: undefined,
  countryCode: undefined,
  name: undefined,
  gameGroup: undefined,
  jumpType: undefined,
  jumpExtend: undefined,
  userRange: undefined,
  triggerType: undefined,
  jumpId: undefined,
  sortNumber: undefined,
  actId: undefined,
  actCompletePolicy: undefined,
  status: true,
  startDate: undefined,
  endDate: undefined,
  homeUrl: undefined,
  gameId: undefined,
  imgUrl: undefined,
  time: undefined as string[] | undefined
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  countryCode: [
    {
      required: true,
      type: 'number',
      message: '请输入国家代码',
      trigger: 'blur'
    }
  ],
  homeUrl: [
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (form.jumpType === 1 && (!value || value.length === 0)) {
          callback(new Error('请选择首页跳转地址'));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ],
  gameId: [
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (form.jumpType === 2 && (value === undefined || value === null || value === '')) {
          callback(new Error('请输入游戏ID'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      type: 'string',
      message: '请输入显示名称',
      trigger: 'blur'
    }
  ],
  gameGroup: [
    {
      required: true,
      type: 'number',
      message: '请输入所属于分组',
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
  jumpId: [
    {
      required: true,
      type: 'number',
      message: '请输入跳转类联ID',
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
  ],
  startTime: [
    {
      required: true,
      type: 'number',
      message: '请输入开始时间',
      trigger: 'blur'
    }
  ],
  endTime: [
    {
      required: true,
      type: 'number',
      message: '请输入结束时间',
      trigger: 'blur'
    }
  ]
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
    // 从 form.time 拆出 startDate/endDate 提交给后端
    const [startDate, endDate] = (form.time as string[]) || [];
    form.startDate = startDate;
    form.endDate = endDate;
    if (form.gameId) form.jumpId = form.gameId;
    const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
    if (form.imgUrl && imgBaseUrl && form.imgUrl.startsWith(imgBaseUrl)) {
      form.imgUrl = form.imgUrl.slice(imgBaseUrl.length);
    }
    let saveOrUpdate: (data: FloatWindow) => Promise<any>;
    if (isUpdate.value) {
      if (props.isCopy) {
        saveOrUpdate = addFloatWindow;
      } else {
        saveOrUpdate = updateFloatWindow;
      }
    } else {
      saveOrUpdate = addFloatWindow;
    }
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
const handleOpen = async () => {
  if (props.data) {
    assignFields({ ...props.data });
    title.value = '修改悬浮窗';
    if (props.isCopy) title.value = '复制悬浮窗';
    form.imgUrl = import.meta.env.VITE_APP_IMG_URL + props.data.imgUrl;

    form.time = [
      props.data.startDate ? toDateZone(props.data.startDate, props.data.countryCode) : '',
      props.data.endDate ? toDateZone(props.data.endDate, props.data.countryCode) : ''
    ];

    // jumpType===2 时游戏ID回显
    if (props.data.jumpId && props.data.jumpType === 2) {
      form.gameId = props.data.jumpId;
    }

    form.jumpExtend = props.data.jumpExtend ?? undefined;
    getList(form.jumpType);
    if (props.data.jumpType === 1 && props.data.jumpExtend) {
      await getCascaderData();
      try {
        const extend = props.data.jumpExtend;
        form.homeUrl = extend?.list ?? undefined;
      } catch {
        form.homeUrl = undefined;
      }
    }

    isUpdate.value = true;
  } else {
    resetFields();
    title.value = '新增悬浮窗';
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
