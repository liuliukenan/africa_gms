import type { Router } from 'vue-router';
import { removeToken } from '@/utils/token-util';
import { useUserStore } from '@/store/modules/user';
/**
 * 退出登录
 * @param route 是否使用路由跳转
 * @param from 登录后跳转的地址
 * @param push 路由跳转方法
 */
export function logout(route?: boolean, from?: string, push?: Router['push']) {
  // 关闭SSE连接
  try {
    // 检查是否存在_eventSource实例（与其他地方保持一致）
    const es = (window as any)._eventSource;
    if (es && typeof es.close === 'function') {
      es.close();
      console.log('SSE connection closed');
      // 只删除我们创建的实例变量，不要删除EventSource构造函数
      delete (window as any)._eventSource;
    }
  } catch (error) {
    console.error('Error closing SSE connection:', error);
  }

  removeToken();
  if (route && push) {
    push({
      path: '/login',
      query: from ? { from: encodeURIComponent(from) } : void 0
    });
    return;
  }
  // 这样跳转避免再次登录重复注册动态路由, hash 路由模式使用 location.reload();
  const BASE_URL = import.meta.env.BASE_URL;
  const url = BASE_URL + 'login';
  location.replace(from ? `${url}?from=${encodeURIComponent(from)}` : url);
}

/**
 * 下载文件
 * @param data 二进制数据
 * @param name 文件名
 * @param type 文件类型
 */
export function download(data: Blob | ArrayBuffer | string, name: string, type?: string) {
  const blob = new Blob([data], { type: type || 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 参数转url字符串
 * @param params 参数
 * @param url 需要拼接参数的地址
 */
export function toURLSearch(params?: Record<keyof any, any> | null, url?: string): string {
  if (typeof params !== 'object' || params == null) {
    return '';
  }
  const result = transformParams(params)
    .map((d) => `${encodeURIComponent(d[0])}=${encodeURIComponent(d[1])}`)
    .join('&');
  if (!url) {
    return result;
  }
  return (url.includes('?') ? `${url}&` : `${url}?`) + result;
}

/**
 * 参数转表单数据
 * @param params 参数
 */
export function toFormData(params?: Record<keyof any, any> | null): FormData {
  const formData = new FormData();
  if (typeof params !== 'object' || params == null) {
    return formData;
  }
  transformParams(params).forEach((d) => {
    formData.append(d[0], d[1]);
  });
  return formData;
}

/**
 * get请求处理数组和对象类型参数
 * @param params 参数
 */
export function transformParams(params?: Record<string, any> | null) {
  const result: [string, string][] = [];
  if (params != null && typeof params === 'object') {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value != null && value !== '') {
        if (typeof value === 'object' && !isBlobFile(value)) {
          getObjectParamsArray(value).forEach((item) => {
            result.push([`${key}${item[0]}`, item[1]]);
          });
        } else {
          result.push([key, value]);
        }
      }
    });
  }
  return result;
}

/**
 * 对象转参数数组
 * @param obj 对象
 */
export function getObjectParamsArray(obj: Record<string, any>) {
  const result: [string, string][] = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value != null && value !== '') {
      const name = `[${key}]`;
      if (typeof value === 'object' && !isBlobFile(value)) {
        getObjectParamsArray(value).forEach((item) => {
          result.push([`${name}${item[0]}`, item[1]]);
        });
      } else {
        result.push([name, value]);
      }
    }
  });
  return result;
}

/**
 * 判断是否是文件
 * @param obj 对象
 */
export function isBlobFile(obj: any) {
  return obj != null && (obj instanceof Blob || obj instanceof File);
}

/**
 * 切换主题过渡动画
 * @param callback 执行的方法
 * @param el 过渡动画触发元素
 * @param isOut 是否是退出方向
 * @param isBody 是否在 body 上执行动画
 */
export function doWithTransition(callback: () => Promise<void>, el?: HTMLElement | null, isOut?: boolean, isBody?: boolean) {
  // @ts-ignore
  if (!el || typeof document.startViewTransition !== 'function') {
    callback().then(() => {});
    return;
  }
  document.documentElement.classList.add('disabled-transition');
  el.classList.add('view-transition-trigger');
  el.style.setProperty('view-transition-name', 'view-transition-trigger');
  if (isBody) {
    document.body.style.setProperty('view-transition-name', 'body');
  }
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  // @ts-ignore
  document.startViewTransition(callback).ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    const anim = document.documentElement.animate(
      { clipPath: isOut ? [...clipPath].reverse() : clipPath },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isOut ? `::view-transition-old(${isBody ? 'body' : 'root'})` : `::view-transition-new(${isBody ? 'body' : 'root'})`
      }
    );
    anim.onfinish = () => {
      document.body.style.removeProperty('view-transition-name');
      el.style.removeProperty('view-transition-name');
      el.classList.remove('view-transition-trigger');
      document.documentElement.classList.remove('disabled-transition');
    };
  });
}


/** 需要手机号脱敏的角色ID列表，可在此追加 */
const SECRET_ROLE_IDS = new Set([3,15,85,86]);

/** 手机号脱敏：对指定角色隐藏中间4位 */
export const addSecret = (str: string) => {
  const userStore = useUserStore();
  if (!userStore?.info?.user || !str) return str;
  return SECRET_ROLE_IDS.has(userStore.info.user.roleId)
    ? str.substring(0, 3) + '****' + str.substring(7)
    : str;
};
// 除100并保留2位小数的整数
export const numTo100 = (n?: number) => {
  return n ? Number((n / 100).toFixed(2)) : 0;
};
// 除100并保留2位小数的字符串
export const numTo100s = (n?: number) => {
  return n ? (n / 100).toFixed(2) : '0';
};

// 数值格式化函数：小数位>3时保留2位，否则原样返回（并去除尾随零）
export const formatNumber = (value: number): string => {
  if (isNaN(value) || value === null) return '';
  // 先保留10位小数，再去除末尾多余的零（包括可能的小数点）
  const s = value.toFixed(10).replace(/\.?0+$/, '');
  if (s.includes('.')) {
    const decimalPart = s.split('.')[1];
    if (decimalPart.length > 3) {
      return value.toFixed(2); // 小数部分超过3位，保留2位
    } else {
      return s; // 小数部分 <=3 位，返回原样（已去除尾零）
    }
  } else {
    return s; // 整数
  }
};
