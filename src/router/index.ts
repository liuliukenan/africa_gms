/**
 * 路由配置
 */
import NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';
import { LAYOUT_PATH, REDIRECT_PATH, WHITE_LIST } from '@/config/setting';
import { useUserStore } from '@/store/modules/user';
import { getToken, removeToken } from '@/utils/token-util';
import { setPageTitle } from '@/utils/page-title-util';
import { getRouteTitle } from '@/i18n/use-locale';
import { getMenuRoutes, routes } from './routes';
import { useConfigStore } from '@/store/modules/config';

NProgress.configure({
  speed: 200,
  minimum: 0.02,
  trickleSpeed: 200,
  showSpinner: false
});

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: () => {
    return { top: 0 };
  }
});

/**
 * 路由守卫
 */
router.beforeEach(async (to) => {
  try {
    if (!to.path.includes(REDIRECT_PATH)) {
      NProgress.start();
      setPageTitle(getRouteTitle(to));
    }
    if (!getToken()) {
      // 未登录跳转登录界面
      if (!WHITE_LIST.includes(to.path)) {
        const query = { from: encodeURIComponent(to.fullPath) };
        return { path: '/login', query: to.path === LAYOUT_PATH ? {} : query };
      }
      return;
    }
    // 注册动态路由（仅在menus为空时执行）
    const userStore = useUserStore();
    if (!userStore.menus?.length) {
      const { menus, homePath } = await userStore.fetchUserInfo();
      if (menus?.length) {
        getMenuRoutes(menus, homePath).forEach((r) => {
          router.addRoute(r);
        });
        // 获取所有国家（移出导航关键路径，避免阻塞或异常影响路由跳转）
        getAllCountry().catch((e) => console.error('获取国家列表失败:', e));
        return { path: to.path, query: to.query, hash: to.hash, replace: true };
      }
      // 菜单为空（接口失败或返回空数据），清除token并跳转登录
      console.warn('获取用户菜单失败，token可能已过期，跳转登录页');
      removeToken();
      NProgress.done(true);
      return { path: '/login', query: { from: encodeURIComponent(to.fullPath) }, replace: true };
    }
  } catch (error) {
    console.error('路由守卫出错:', error);
    NProgress.done(true);
    return false;
  }
});

// 获取所有国家
const getAllCountry = async () => {
  const configStore = useConfigStore();
  await configStore.getCountryCode();
};

router.afterEach((to, _from, failure) => {
  // Vue Router 4.x 第三个参数 failure：导航失败时为 Error，成功时为 undefined
  if (failure) {
    // "Avoided redundant navigation" 是正常的 Vue Router 行为，不需要处理
    // 例如用户点击当前已在的页面菜单，或浏览器挂起恢复导致路由状态不一致
    if (failure.message?.includes('Avoided redundant navigation')) {
      if (NProgress.isStarted()) {
        NProgress.done(true);
      }
      return;
    }
    console.error('路由导航失败:', failure);
    if (NProgress.isStarted()) {
      NProgress.done(true);
    }
    return;
  }
  if (!to.path.includes(REDIRECT_PATH) && NProgress.isStarted()) {
    setTimeout(() => {
      NProgress.done(true);
    }, 200);
  }
});

/**
 * 检测是否为 chunk 动态加载失败（浏览器缓存了旧版本 HTML，服务器已更新导致旧 chunk 文件不存在）
 */
function isChunkLoadFailed(error: unknown): boolean {
  return (
    error instanceof TypeError &&
    !!error.message?.includes('Failed to fetch dynamically imported module')
  );
}

// 全局路由错误处理（防止懒加载失败或其他路由异常导致页面卡死）
router.onError((error) => {
  console.error('路由错误:', error);
  NProgress.done(true);

  // 检测 chunk 加载失败（用户长时间停留页面后，服务器部署了新版本，旧 chunk 文件已删除）
  if (isChunkLoadFailed(error)) {
    const now = Date.now();
    const lastReload = sessionStorage.getItem('chunk_reload_time');
    // 30 秒内最多自动刷新一次，避免死循环
    if (lastReload && now - parseInt(lastReload, 10) < 30000) {
      console.warn('chunk 加载失败，但已在 30 秒内刷新过，不再自动刷新');
      return;
    }
    sessionStorage.setItem('chunk_reload_time', String(now));
    window.location.reload();
  }
});

export default router;
