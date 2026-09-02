<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="1000" v-model="visible" :title="isUpdate ? '修改邮件文本配置' : '新建邮件文本配置'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="国家代码" prop="countryCode">
            <el-select v-model="form.countryCode" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in configStore.countryArr" :key="item.code" :label="item.name"
                :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="keyId" prop="keyId">
            <el-input-number :controls="false" style="width: 100%" v-model="form.keyId" :min="0" placeholder="请输入"
              :disabled="isUpdate" />
            <div style="line-height: 22px">提示：该ID是程序用来确定邮件模板的唯一依据,一经确认，不要轻易更改</div>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="分类标签" prop="tagType">
            <dict-data code="mailTag" valueType="number" v-model="form.tagType" placeholder="请选择分类标签" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="邮件标题" prop="mailTitle">
            <el-input clearable :maxlength="50" v-model="form.mailTitle" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="图片" prop="imgUrl">
            <image-upload :limit="1" v-model="form.imgUrl" accept="image/png" :item-style="{
              width: '120px',
              height: '120px',
              background: 'var(--el-fill-color-lighter)',
              '--ele-upload-list-padding': 0
            }" :button-style="{ width: '120px', height: '120px' }" category="1" fileName="tips" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="图片位置" prop="imgPos">
            <el-radio-group v-model="form.imgPos">
              <el-radio :value="0">上</el-radio>
              <el-radio :value="1">下</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :sm="24" :xs="24">
          <el-form-item label="内容" prop="mailText">
            <tinymce-editor v-model="form.mailText" :init="{ height: 300 }" category="mail" style="width: 100%" />
          </el-form-item>
        </el-col>


        <!-- <el-col :sm="12" :xs="24">
          <el-form-item label="按钮文本" prop="buttonText">
            <el-input clearable :maxlength="50" v-model="form.buttonText" placeholder="请输入" />
          </el-form-item>
        </el-col> -->

        <el-col :sm="12" :xs="24">
          <el-form-item label="跳转类型" prop="jumpType">
            <dict-data code="actionType2" v-model="form.jumpType" valueType="number" placeholder="请选择跳转类型"
              @change="changeType" style="width: 100%" />
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
          <el-form-item label="参数" prop="paramNameStr">
            <el-input clearable v-model="form.paramNameStr" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <!-- <el-col :sm="12" :xs="24">
          <el-form-item label="扩展信息" prop="jumpExtend">
            <el-input clearable :maxlength="50" v-model="form.jumpExtend" placeholder="请输入" />
          </el-form-item>
        </el-col> -->
        <el-col :sm="12" :xs="24">
          <el-form-item label="状态" prop="state">
            <el-radio-group v-model="form.state">
              <el-radio :value="true">启用</el-radio>
              <el-radio :value="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="备注" prop="remark">
            <el-input clearable type="textarea"  v-model="form.remark" placeholder="请输入" />
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
import { nextTick, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { EleMessage } from 'ele-admin-plus/es';
import { useFormData } from '@/utils/use-form-data';
import { MailTextConf } from '@/api/config/model/mailTextConf';
import { addMailTextConf, updateMailTextConf } from '@/api/config/mailTextConfApi';
import { byTypeGetList, cascaderFaceShot } from '@/api/platform/faceShotApi';
import ImageUpload from '@/components/ImageUpload/index.vue';
import TinymceEditor from '@/components/TinymceEditor/index.vue';
import { useConfigStore } from '@/store/modules/config';

const configStore = useConfigStore();
const props = defineProps<{
  /** 修改回显的数据 */
  data?: MailTextConf | null;
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
const [form, resetFields, assignFields] = useFormData<MailTextConf>({
  id: undefined,
  keyId: undefined,
  countryCode: configStore.countryArr?.[0]?.code || undefined,
  tagType: undefined,
  mailTitle: undefined,
  mailText: undefined,
  imgPos: 0,
  imgUrl: undefined,
  buttonText: undefined,
  jumpType: undefined,
  jumpId: undefined,
  jumpExtend: undefined,
  state: true,
  paramNames: [],
  paramNameStr: '[]',
  homeUrl: undefined,
  gameId: undefined,
  remark: undefined,
  time: undefined as string[] | undefined
});

/** 表单验证规则 */
const rules = reactive<FormRules>({
  countryCode: [
    {
      required: true,
      type: 'number',
      message: '请输入',
      trigger: 'change'
    }
  ],
  tagType: [
    {
      required: true,
      type: 'number',
      message: '请输入',
      trigger: 'change'
    }
  ],
  keyId: [
    {
      required: true,
      type: 'number',
      message: '请输入',
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
  ],
  mailTitle: [
    {
      required: true,
      type: 'string',
      message: '请输入邮件标题',
      trigger: 'blur'
    }
  ],
  // homeUrl: [
  //   {
  //     validator: (_rule: any, value: any, callback: any) => {
  //       if (form.jumpType === 1 && (!value || value.length === 0)) {
  //         callback(new Error('请选择首页跳转地址'));
  //       } else {
  //         callback();
  //       }
  //     },
  //     trigger: 'change'
  //   }
  // ],
  // gameId: [
  //   {
  //     validator: (_rule: any, value: any, callback: any) => {
  //       if (form.jumpType === 2 && (value === undefined || value === null || value === '')) {
  //         callback(new Error('请输入游戏ID'));
  //       } else {
  //         callback();
  //       }
  //     },
  //     trigger: 'blur'
  //   }
  // ],
  // // mailText: [
  // //   {
  // //     required: true,
  // //     type: 'string',
  // //     message: '请输入内容',
  // //     trigger: 'blur'
  // //   }
  // // ],
  // imgPos: [
  //   {
  //     required: true,
  //     type: 'number',
  //     message: '请选择位置',
  //     trigger: 'blur'
  //   }
  // ],
  // imgUrl: [
  //   {
  //     required: true,
  //     type: 'string',
  //     message: '请上传图片',
  //     trigger: 'blur'
  //   }
  // ],
  // buttonText: [
  //   {
  //     required: true,
  //     type: 'string',
  //     message: '请输入按钮文本',
  //     trigger: 'blur'
  //   }
  // ],
  jumpType: [
    {
      required: true,
      type: 'number',
      message: '请选择跳转类型',
      trigger: 'change'
    }
  ],
  jumpId: [
    {
      required: true,
      type: 'number',
      message: '请选择跳转ID',
      trigger: 'blur'
    }
  ],
  // // jumpExtend: [
  // //   {
  // //     required: true,
  // //     type: 'number',
  // //     message: '请输入扩展信息',
  // //     trigger: 'blur'
  // //   }
  // // ],
  // state: [
  //   {
  //     required: true,
  //     type: 'boolean',
  //     message: '请选择状态',
  //     trigger: 'blur'
  //   }
  // ]
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
    if (form.gameId) form.jumpId = form.gameId;
    const imgBaseUrl = import.meta.env.VITE_APP_IMG_URL;
    let params: any = { ...form, imgUrl: [] };
    if (form.imgUrl) {
      const raw = form.imgUrl as string;
      let imgUrlArr: string[];
      try {
        const parsed = JSON.parse(raw);
        imgUrlArr = Array.isArray(parsed) ? parsed : [raw];
      } catch {
        imgUrlArr = [raw];
      }
      imgUrlArr = imgUrlArr.map((url) => (url.startsWith(imgBaseUrl) ? url.slice(imgBaseUrl.length) : url));
      params = { ...form, imgUrl: imgUrlArr };
    }

    params.paramNames = JSON.parse(form.paramNameStr);

    const saveOrUpdate = isUpdate.value ? updateMailTextConf : addMailTextConf;
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

/** 弹窗打开事件 */
const handleOpen = async () => {
  if (props.data) {
    assignFields({ ...props.data });
    // imgUrl 后端可能是 JSON 字符串或逗号分隔字符串或数组，统一解析后加域名前缀，再序列化为 JSON 字符串传给 ImageUpload
    const rawImgUrl = props.data.imgUrl;
    let parsedImgUrl: string[];
    if (Array.isArray(rawImgUrl)) {
      parsedImgUrl = rawImgUrl;
    } else if (typeof rawImgUrl === 'string') {
      try {
        const parsed = JSON.parse(rawImgUrl);
        parsedImgUrl = Array.isArray(parsed) ? parsed : [rawImgUrl];
      } catch {
        parsedImgUrl = rawImgUrl ? [rawImgUrl] : [];
      }
    } else {
      parsedImgUrl = [];
    }
    const withPrefix = parsedImgUrl.map((url) => (url.startsWith(import.meta.env.VITE_APP_IMG_URL) ? url : import.meta.env.VITE_APP_IMG_URL + url));
    // limit=1 时 modelValue 为普通 URL 字符串，limit>1 时为 JSON 数组字符串
    form.imgUrl = withPrefix.length ? withPrefix[0] : '';

    // jumpType===2 时游戏ID回显
    if (props.data.jumpId && props.data.jumpType === 2) {
      form.gameId = props.data.jumpId;
    }

    form.jumpExtend = props.data.jumpExtend ?? undefined;
    if (props.data.paramNames) {
      form.paramNameStr = JSON.stringify(props.data.paramNames);
    } else {
      form.paramNameStr = '[]';
    }
    getList(form.jumpType);
    if (props.data.jumpType === 1 && props.data.jumpExtend) {
      // await 等 options 加载完再赋 homeUrl，保证 cascader 能匹配回显
      await getCascaderData();
      try {
        const extend = props.data.jumpExtend;
        form.homeUrl = extend?.list ?? undefined;
      } catch {
        form.homeUrl = undefined;
      }
    }
    console.log(form);
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
<style lang="scss" scoped></style>
