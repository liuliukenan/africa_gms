import type { AxiosError, AxiosResponse } from 'axios';
import { unref } from 'vue';
import type { Action } from 'element-plus';
import { ElMessageBox } from 'element-plus/es';
import { API_BASE_URL, LAYOUT_PATH } from '@/config/setting';
import router from '@/router';
import { getToken, setToken } from './token-util';
import { logout } from './common';
import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import { ApiResult, ContentTypeEnum, PostTypeEnum } from '@/api/model';
// 在 TypeScript 中声明 `translate` 为全局变量
declare global {
  var translate: any; // 这会告诉 TypeScript `translate` 是一个全局变量，并且是动态的
}
// 引入script
const loadScript = (src, callback) => {
  var script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
};

const service = createAlova({
  baseURL: API_BASE_URL,
  cacheFor: null,
  requestAdapter: axiosRequestAdapter(),
  timeout: 50000,

  beforeRequest: (method) => {
    const { config } = method;
    const postType = config.meta?.postType;
    if (postType) {
      if (postType == PostTypeEnum.FORM) {
        config.headers['Content-Type'] = ContentTypeEnum.FORM_URLENCODED;
      } else if (postType == PostTypeEnum.FORM_DATA) {
        config.headers['Content-Type'] = ContentTypeEnum.FORM_DATA;
      } else {
        config.headers['Content-Type'] = ContentTypeEnum.JSON;
      }
    } else {
      config.headers['Content-Type'] = ContentTypeEnum.JSON;
    }
    const ignoreAuth = !config.meta?.ignoreAuth;
    const authorization = ignoreAuth ? getToken() : null;
    if (authorization) {
      config.headers['Authorization'] = authorization;
    }
  },
  responded: {
    onSuccess(response: AxiosResponse<ApiResult<unknown>>) {
      if (response.data?.code === 401) {
        const { path, fullPath } = unref(router.currentRoute);
        if (path == LAYOUT_PATH) {
          logout(true, void 0, router.push);
        } else if (path !== '/login') {
          ElMessageBox.close();
          ElMessageBox.alert('登录状态已过期, 请退出重新登录!', '系统提示', {
            confirmButtonText: '重新登录',
            callback: (action: Action) => {
              if (action === 'confirm') {
                logout(false, fullPath);
              }
            },
            type: 'warning',
            draggable: true
          });
          localStorage.removeItem('isFirstLogin')
        }
        return Promise.reject(new Error(response.data.message));
      }
      // 续期token
      const newToken = response.headers['authorization'];
      if (newToken) {
        setToken(newToken);
      }
      if (response.headers['content-disposition'] != null) {
        return response;
      }
      // // 响应数据之前翻译语言
      // loadScript('https://cdn.staticfile.net/translate.js/3.2.1/translate.js', () => {
      //   translate.selectLanguageTag.languages = 'chinese_simplified,english,thai'; // 支持的语种
      //   // translate.language.setLocal('thai');
      //   translate.setAutoDiscriminateLocalLanguage(); // 自动判断语言
      //   // //设置翻译通道
      //   translate.service.use('client.edge');
      //   translate.execute();
      // });
      return response.data;
    },
    onError(err: AxiosError) {
      //  removeToken();//----
      return Promise.reject(new Error(err.message));
    }
  }
});

export default service;
