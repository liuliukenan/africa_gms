<template>
  <el-descriptions :border="true" :column="mobile ? 2 : 4" class="form-table" direction="vertical">
    <el-descriptions-item :label="t('user.userList.kyc.uid')" :min-width="mobile ? 5 : 90">
      <div>{{ form.uid }}</div>
    </el-descriptions-item>
    <!-- <el-descriptions-item :label="t('user.userList.kyc.kycLevel')" :min-width="mobile ? 5 : 90">
            <div>{{ form.kycLevel }}</div>
        </el-descriptions-item> -->
    <el-descriptions-item :label="t('user.userList.kyc.kycStatus')" :min-width="mobile ? 5 : 90">
      <!-- <div>{{ form.kycStatus }}</div> -->
      <dict-data code="kycStatus" v-model="form.kycStatus" value-type="number" type="tag" />
    </el-descriptions-item>
    <el-descriptions-item :label="t('user.userList.kyc.phone')" :min-width="mobile ? 5 : 90">
      <div>{{ form.phone }}</div>
    </el-descriptions-item>
    <el-descriptions-item :label="t('user.userList.kyc.username')" :min-width="mobile ? 5 : 90">
      <div>{{ form.realName }}</div>
    </el-descriptions-item>
    <el-descriptions-item :label="t('user.userList.kyc.countryCode')" :min-width="mobile ? 5 : 90">
      <div>{{ getCurCountryCode(form.countryCode) }}</div>
    </el-descriptions-item>
    <el-descriptions-item :label="t('user.userList.kyc.nationalId')" :min-width="mobile ? 5 : 90">
      <div>{{ form.nationalId }}</div>
    </el-descriptions-item>
    <!-- <el-descriptions-item :label="t('user.userList.kyc.idPhoto')" :min-width="mobile ? 5 : 90">
      <div>{{ form.idPhoto }}</div>
    </el-descriptions-item> -->
    <el-descriptions-item :label="t('user.userList.kyc.remark')" :min-width="mobile ? 5 : 90">
      <div>{{ form.remark ??'--'}}</div>
    </el-descriptions-item>
    <!-- <el-descriptions-item :label="t('user.userList.kyc.birthday')" :min-width="mobile ? 5 : 90">
            <div>{{ form.birthday }}</div>
        </el-descriptions-item> -->
    <!-- <el-descriptions-item :label="t('user.userList.kyc.residenceAddress')" :min-width="mobile ? 5 : 90">
            <div>{{ form.residenceAddress }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.kyc.residencePhoto')" :min-width="mobile ? 5 : 90">
            <div>{{ form.residencePhoto }}</div>
        </el-descriptions-item>
        <el-descriptions-item :label="t('user.userList.kyc.sourceFunds')" :min-width="mobile ? 5 : 90">
            <div>{{ form.sourceFunds }}</div>
        </el-descriptions-item> -->
    <!-- 证件照片 -->
  </el-descriptions>
  <div class="id-card-section">
    <div class="section-title">{{ t('user.userList.kyc.idPhoto') }}</div>
    <el-row :gutter="12">
      <el-col :span="8">
        <div class="id-card-image">
          <div class="image-label">{{ t('user.userList.kyc.idCardFrontUrl') }}</div>
          <el-image v-if="form.idCardFrontUrl" :src="form.idCardFrontUrl" style="width: 100%;" :preview-src-list="[form.idCardFrontUrl]" :preview-teleported="true" fit="cover" />
          <span v-else class="no-image">--</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="id-card-image">
          <div class="image-label">{{ t('user.userList.kyc.idCardBackUrl') }}</div>
          <el-image v-if="form.idCardBackUrl" :src="form.idCardBackUrl" style="width: 100%; " :preview-src-list="[form.idCardBackUrl]" :preview-teleported="true" fit="cover" />
          <span v-else class="no-image">--</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="id-card-image">
          <div class="image-label">{{ t('user.userList.kyc.selfieUrl') }}</div>
          <el-image v-if="form.selfieUrl" :src="form.selfieUrl" style="width: 100%;" :preview-src-list="[form.selfieUrl]" :preview-teleported="true" fit="cover" />
          <span v-else class="no-image">--</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data';
  import { getUserKyc } from '@/api/user/userApi';
  import type { UserKYC } from '@/api/model/user';
  import { useMobile } from '@/utils/use-mobile';
  import { EleMessage } from 'ele-admin-plus';
  import { useConfigStore } from '@/store/modules/config';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps<{
    /** 修改回显的数据 */
    uid: number | null;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();
  /** 是否是移动端 */
  const { mobile } = useMobile();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });
  const configStore = useConfigStore();
  const getCurCountryCode = (code?: number) => {
    const countryCode = configStore.countryArr?.find((item) => item.code === code);
    return countryCode?.name;
  };
  /** 表单数据 */
  const [form, _, assignFields] = useFormData<UserKYC>({
    uid: undefined,
    kycLevel: undefined,
    kycStatus: undefined,
    phone: undefined,
    realName: undefined,
    countryCode: undefined,
    nationalId: undefined,
    idPhoto: undefined,
    idCardFrontUrl: undefined,
    idCardBackUrl: undefined,
    selfieUrl: undefined
  });
  const getKyc = () => {
    if (props.uid) {
      getUserKyc(props.uid)
        .then((data) => {
          assignFields({ ...data });
        })
        .catch((e) => {
          EleMessage.error(e.message);
        });
    }
  };
  getKyc();
</script>
<style lang="scss" scoped>
  .id-card-section {
    margin-top: 20px;
  }
  .section-title {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 12px;
  }
  .id-card-image {
    text-align: center;
  }
  .image-label {
    font-size: 12px;
    color: #909399;
    margin-bottom: 4px;
  }
  .no-image {
    display: inline-block;
    width: 100%;
    height: 140px;
    line-height: 140px;
    color: #c0c4cc;
    background: #f5f7fa;
    border-radius: 4px;
    font-size: 13px;
  }
  :deep(.el-descriptions__header) {
    margin: 10px 0;
  }

  :deep(.el-descriptions__content.el-descriptions__cell.is-bordered-content) {
    text-align: center;
  }

  .form-table :deep(.el-descriptions__label) {
    width: 120px;
    text-align: center;
    font-weight: normal;
  }

  .form-table :deep(.el-descriptions__content > div) {
    max-height: 100%;
  }

  :deep(.el-descriptions .el-descriptions__label.el-descriptions__cell.is-bordered-label) {
    width: 121px;
  }

  :deep(.bet .el-descriptions .el-descriptions__label.el-descriptions__cell.is-bordered-label) {
    width: 120px;
  }
</style>
