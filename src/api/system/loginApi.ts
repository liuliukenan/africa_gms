import request from '@/utils/request';
import { setToken } from '@/utils/token-util';
import type { ApiResult } from '@/api/model';
import type { LoginParam, LoginResult, CaptchaResult } from '@/api/model/login';
import { PostTypeEnum } from '@/api/model';
import { t } from '@/store/modules/i18n';
/**
 * 登录
 */
export async function loginApi(data: LoginParam) {
  const res = await request.Post<ApiResult<LoginResult>>('/acting/ActingLogin', data, {
    meta: {
      postType: PostTypeEnum.FORM
    }
  });
  if (res.code === 0) {
    setToken(res.data?.token, data.remember);
    return t('msg.'+res.message as string);
  }
  return Promise.reject(new Error(t('msg.'+res.message as string)));
}

/**
 * 获取验证码
 */
export async function getCaptcha() {
  const res = await request.Get<ApiResult<CaptchaResult>>('/auth/code-image');
  if (res.code == 0) {
    return res?.data ?? {};
  }
  return Promise.reject(new Error(t('msg.'+res.message as string)));
}
