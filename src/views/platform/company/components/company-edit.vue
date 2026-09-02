<!-- 用户编辑弹窗 -->
<template>
  <ele-modal form :width="1000" v-model="visible" :title="isUpdate ? t('platform.company.editCompany') : t('platform.company.addCompany')" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="id" prop="id">
            {{ form.id }}
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="companyType" prop="companyId">
            <dict-data v-model="form.companyId" code="companyType" value-type="number" :placeholder="t('common.pleaseSelect')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('platform.company.name')" prop="name">
            <el-input clearable v-model="form.name" :placeholder="t('common.pleaseInput')" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item :label="t('platform.company.appkey')" prop="appkey">
            <el-input clearable :maxlength="50" v-model="form.appkey" :placeholder="t('common.pleaseInput')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item label="appsecrect" prop="appsecrect">
            <el-input clearable :maxlength="50" v-model="form.appsecrect" :placeholder="t('common.pleaseInput')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('platform.company.userPrefix')" prop="userPrefix">
            <el-input v-model="form.userPrefix" :placeholder="t('common.pleaseInput')" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('platform.company.exend')" prop="exend">
            <el-input type="textarea" :rows="3" clearable :maxlength="50" v-model="form.exend" :placeholder="t('common.pleaseInput')" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item :label="t('platform.company.appUrl')" prop="appUrl">
            <el-table :data="form.appUrl" stripe style="width: 100%; margin-top: 20px">
              <el-table-column prop="url" :label="t('platform.company.url')">
                <template #default="{ row, $index }">
                  <el-form-item style="width: 400px" :prop="'appUrl.' + $index + '.url'" :rules="infoRules.url">
                    <el-input clearable :placeholder="t('common.pleaseInput')" v-model.trim="row.url" style="width: 100%" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="status" :label="t('platform.company.status')">
                <template #default="{ row, $index }">
                  <el-form-item :prop="'appUrl.' + $index + '.status'" :rules="infoRules.status">
                    <!-- <el-input clearable placeholder="请输入" v-model.trim="row.status"
                        style="width: 100%" /> -->
                    <el-radio-group v-model="row.status" :placeholder="t('common.pleaseSelect')" style="width: 100%">
                      <el-radio :label="t('platform.company.enable')" :value="1" />
                      <el-radio :label="t('platform.company.disable')" :value="0" />
                    </el-radio-group>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="t('action.action')" width="140" align="center">
                <template #default="{ row, $index }">
                  <el-popconfirm :title="t('common.sureDelete')" @confirm="baseRemove(row, $index)">
                    <template #reference>
                      <el-button link type="danger" size="small">{{ t('action.delete') }}</el-button>
                    </template>
                  </el-popconfirm>
                  <el-button link type="primary" @click="baseAdd" size="small" v-show="form.appUrl!.length - 1 == $index"> {{ t('action.add') }} </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel"> {{ t('action.cancel') }} </el-button>
      <el-button type="primary" :loading="loading" @click="save"> {{ t('action.save') }} </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EleMessage, uuid } from 'ele-admin-plus/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addCompany, updateCompany } from '@/api/platform/companyApi';
  import type { Company } from '@/api/platform/model/company';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Company | null;
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
  const infoRules = {
    status: [{ required: true, message: '请输入状态', trigger: 'blur' }],
    url: [{ required: true, message: '请输入url', trigger: 'blur' }]
  };
  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<Company>({
    id: undefined,
    name: undefined,
    companyId: undefined,
    appkey: undefined,
    appsecrect: undefined,
    appUrl: [
      {
        status: 1,
        url: undefined
      }
    ],
    userPrefix: undefined,
    exend: '{}'
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    id: [
      {
        required: true,
        type: 'number',
        message: '请选择id',
        trigger: 'blur'
      }
    ],
    appkey: [
      {
        required: true,
        type: 'string',
        message: '请输入appkey',
        trigger: 'blur'
      }
    ],
    appsecrect: [
      {
        required: true,
        type: 'string',
        message: '请输入appsecrect',
        trigger: 'blur'
      }
    ],
    appUrl: [
      {
        required: true,
        type: 'array',
        message: '请输入请求地址列表',
        trigger: 'blur'
      }
    ],
    userPrefix: [
      {
        required: true,
        type: 'string',
        message: '请输入用户前缀地址',
        trigger: 'blur'
      }
    ],
    exend: [
      {
        required: true,
        type: 'string',
        message: '请输入附加信息',
        trigger: 'blur'
      }
    ]
  });

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };
  const baseAdd = () => {
    form.appUrl!.push({
      key: uuid(8),
      status: undefined,
      url: undefined
    });
  };
  // 删除
  const baseRemove = (_row, index) => {
    form.appUrl!.splice(index, 1);
  };
  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      const saveOrUpdate = isUpdate.value ? updateCompany : addCompany;
      let exend = {};
      try {
        exend = JSON.parse(form.exend || '{}');
      } catch (e) {
        EleMessage.error('exend字段不是正确的json字符串，请检查！');
        loading.value = false;
        return;
      }

      // 解析exend字符串为对象
      const formData = {
        ...form,
        exend: exend as any
      };

      saveOrUpdate(formData)
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
      // 解析exend字符串为对象
      form.exend = JSON.stringify(props.data.exend || '');
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
