<template>
  <div class="login-wrapper">
    <ele-card shadow="always" class="login-card">
      <div class="login-cover">
        <h1 class="login-title">GMS</h1>
        <h4 class="login-subtitle">Management System</h4>
      </div>

      <div class="login-body">
        <ele-text type="heading" style="font-size: 24px; margin-bottom: 18px">
          {{ t('login.title') }}
        </ele-text>
        <!--        <ele-segmented-->
        <!--          v-model="tabActive"-->
        <!--          :items="[-->
        <!--            { label: t('index.passwordType'), value: 1 },-->
        <!--            { label: t('index.qrcodeType'), value: 2 }-->
        <!--          ]"-->
        <!--          style="margin-bottom: 18px"-->
        <!--          @change="handleTabChange"-->
        <!--        />-->
        <el-form v-if="tabActive == 1" ref="formRef" size="large" :model="form" :rules="rules" @keyup.enter="submit"
          @submit.prevent="">
          <el-form-item prop="username">
            <el-input clearable v-model.trim="form.username" :placeholder="t('login.username')"
              :prefix-icon="UserOutlined" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password v-model.trim="form.password" :placeholder="t('login.password')"
              :prefix-icon="LockOutlined" />
          </el-form-item>
          <el-form-item prop="mfaCode">
            <el-input v-model.trim="form.mfaCode" :placeholder="t('login.mfaCode')" :prefix-icon="ProtectOutlined" />
          </el-form-item>
          <!-- <el-form-item prop="code">
            <div class="login-captcha-group">
              <el-input clearable v-model="form.code" :placeholder="t('login.code')" :prefix-icon="ProtectOutlined" />
              <div class="login-captcha" @click="changeCaptcha">
                <img v-if="captcha" :src="captcha" />
              </div>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-checkbox v-model="form.remember">
              {{ t('login.remember') }}
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button size="large" type="primary" :loading="loading" style="width: 100%" @click="submit">
              {{ t('login.login') }}
            </el-button>
          </el-form-item>
        </el-form>
        <!--        <div v-else class="index-qrcode-group">-->
        <!--          <ele-qr-code-svg-->
        <!--            :size="180"-->
        <!--            :margin="2"-->
        <!--            :value="qrcode"-->
        <!--            class="index-qrcode"-->
        <!--          />-->
        <!--          <el-link-->
        <!--            type="primary"-->
        <!--            :underline="false"-->
        <!--            style="margin-top: 16px; sysUser-select: none"-->
        <!--            @click="refreshQrCode"-->
        <!--          >-->
        <!--            <el-icon-->
        <!--              :size="15"-->
        <!--              style="transform: translateY(-1px); margin-right: 6px"-->
        <!--            >-->
        <!--              <ReloadOutlined />-->
        <!--            </el-icon>-->
        <!--            <span>{{ t('index.refreshQrcode') }}</span>-->
        <!--          </el-link>-->
        <!--        </div>-->
        <div class="login-tips" v-if="languages == 'zh_CN'">
          <p>{{ t('common.loginTips') }}</p>
        </div>
      </div>
    </ele-card>
    <!-- <div class="i18n">
      <i18n-icon :icon-style="{ transform: 'scale(2.15)' }" @changeLang="changeLang" />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { EleMessage } from 'ele-admin-plus/es';
import type { FormInstance, FormRules } from 'element-plus';
import { LockOutlined, ProtectOutlined, UserOutlined } from '@/components/icons';
import { getToken } from '@/utils/token-util';
import { usePageTab } from '@/utils/use-page-tab';
import { getCaptcha, loginApi } from '@/api/user/login';
// import i18nIcon from '@/layout/components/i18n-icon.vue';
import { useI18n } from 'vue-i18n';
import { CaptchaResult } from '@/api/model/login';
import { encrypt, decrypt } from '@/utils/crypto-utils';
import { API_BASE_URL } from '@/config/setting';
const { t } = useI18n();
const { currentRoute } = useRouter();
const { goHomeRoute, cleanPageTabs } = usePageTab();

/** 页签选中 */
const tabActive = ref(1);

/** 表单 */
const formRef = ref<FormInstance | null>(null);

/** 加载状态 */
const loading = ref(false);
// 当前切换语言
const languages = ref('');
const changeLang = (val: string) => {
  languages.value = val;
};
/** 表单数据 */
const form = reactive({
  username: '',
  password: '',
  code: '',
  mfaCode: '',
  remember: false
});

/** 表单验证规则 */
const rules = computed<FormRules>(() => {
  return {
    username: [
      {
        required: true,
        message: t('login.username'),
        type: 'string',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: t('login.password'),
        type: 'string',
        trigger: 'blur'
      }
    ],
    mfaCode: [
      {
        required: true,
        message: t('login.mfaCode'),
        type: 'string',
        trigger: 'blur'
      }
    ]
  };
});
onMounted(() => {
  const storedAccount = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');
  if (storedAccount && storedPassword) {
    form.username = storedAccount;
    form.password = decrypt(storedPassword); //解密
    form.remember = true;
  }
});
/** 图形验证码 */
const captcha = ref('');

/** 验证码内容, 实际项目去掉 */
const text = ref('');

// /** 二维码 */
const qrcode = ref('');

/** 提交 */
const submit = () => {
  formRef.value?.validate?.((valid) => {
    if (!valid) {
      return;
    }
    // if (form.code.toLowerCase() !== text.value) {
    //   EleMessage.error('验证码错误');
    //   return;
    // }
    if (form.remember) {
      localStorage.setItem('username', form.username);
      localStorage.setItem('password', encrypt(form.password)); // 加密
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }

    loading.value = true;
    loginApi(form)
      .then((msg) => {
        EleMessage.success(msg);
        cleanPageTabs();
        goHome();
        //   window.location.reload();
      })
      .catch((e: Error) => {
        loading.value = false;
        EleMessage.error(e.message);
        // changeCaptcha();
      });
  });
};

/** 获取图形验证码 */
const changeCaptcha = () => {
  getCaptcha()
    .then((data: CaptchaResult) => {
      captcha.value = 'data:image/gif;base64,' + data?.image;
      text.value = data?.code;
      // 自动回填验证码, 实际项目去掉
      form.code = data?.code;
      formRef.value?.clearValidate?.();
    })
    .catch((e) => {
      EleMessage.error(e.message);
    });
};

/** 刷新二维码 */
const refreshQrCode = () => {
  qrcode.value = `https://api.eleadmin.com/v2/auth/login?code=${Date.now()}`;
};

/** 选项卡切换事件 */
const handleTabChange = (active: number) => {
  if (active === 2) {
    refreshQrCode();
  }
};

/** 跳转到首页 */
const goHome = () => {
  const { query } = unref(currentRoute);
  goHomeRoute(query.from as string);
};

// 如果已登录直接进入首页
if (getToken()) {
  goHome();
} else {
  // changeCaptcha();
}
</script>

<style lang="scss" scoped>
.i18n {
  position: absolute;
  right: 40px;
  top: 40px;
}

.login-wrapper {
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/login-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .login-card {
    width: 920px;
    max-width: 100%;
    overflow: hidden;

    :deep(.ele-card-body) {
      display: flex;
      padding: 0;
      height: 462px;
    }
  }
}

.login-cover {
  flex: 1;
  padding: 32px 8px;
  box-sizing: border-box;
  background-color: #1681fd;
  background-image: url('@/assets/login-img.png');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
  text-align: center;
}

.login-body {
  width: 400px;
  flex-shrink: 0;
  padding: 32px 48px 0 48px;
  box-sizing: border-box;

  :deep(.el-checkbox) {
    height: auto;

    .el-checkbox__label {
      color: inherit;
    }
  }

  :deep(.el-input__prefix-inner > .el-icon) {
    margin-right: 12px;
    transform: scale(1.16);
  }
}

/* 验证码 */
.login-captcha-group {
  width: 100%;
  display: flex;
  align-items: center;

  :deep(.el-input) {
    flex: 1;
  }

  .login-captcha {
    flex-shrink: 0;
    width: 108px;
    height: 40px;
    margin-left: 8px;
    border-radius: var(--el-border-radius-base);
    border: 1px solid var(--el-border-color);
    transition: border 0.2s;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}

/* 标题 */
.login-title {
  color: rgba(255, 255, 255, 0.98);
  font-size: 28px;
  margin: 0 0 6px 0;
  font-weight: normal;
  letter-spacing: 1.2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin: 0;
  font-weight: normal;
  letter-spacing: 4px;
}

/* 二维码 */
.login-qrcode-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
}

.login-qrcode {
  font-size: 0;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: var(--el-border-radius-base);
  overflow: hidden;
}

/* 小屏幕适应 */
@media screen and (max-width: 680px) {
  .login-wrapper {
    padding: 0;
    display: block;
    background: #fff;

    .login-card {
      width: 100%;
      background: none;
      box-shadow: none;
      border-radius: 0;

      :deep(.ele-card-body) {
        display: block;
        height: auto;
      }
    }
  }

  .login-cover {
    padding: 20px 12px 100px 12px;
    background-size: auto 100px;
  }

  .login-body {
    width: 100%;
  }
}
</style>

<style lang="scss">
html.dark .login-wrapper {
  background: #000;
}
</style>

