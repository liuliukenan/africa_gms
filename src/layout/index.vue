<template>
  <ele-pro-layout
    :menus="menus"
    :tabs="tabs"
    :collapse="collapse"
    :compact="compact"
    :maximized="maximized"
    :tab-bar="tabBar ? (tabInHeader ? 'header' : true) : false"
    :breadcrumb="layout === 'default' && (!tabBar || !tabInHeader)"
    :layout="layout"
    :sidebar-layout="sidebarLayout"
    :header-style="headerStyle"
    :sidebar-style="sidebarStyle"
    :tab-style="tabStyle"
    :fixed-header="fixedHeader"
    :fixed-sidebar="fixedSidebar"
    :fixed-body="fixedBody"
    :fluid="fluid"
    :logo-in-header="logoInHeader"
    :colorful-icon="colorfulIcon"
    :unique-opened="uniqueOpened"
    :fixed-home="fixedHome"
    :home-path="HOME_PATH"
    :redirectPath="REDIRECT_PATH"
    :locale="locale"
    :i18n="i18n"
    :tab-sortable="!mobileDevice"
    :tab-context-menu="{
      iconProps: { size: 15 },
      popperOptions: {
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
      }
    }"
    :tab-context-menus="tabContext"
    :nav-trigger="layout === 'top' ? void 0 : menuItemTrigger"
    :box-trigger="menuItemTrigger"
    :keep-alive="TAB_KEEP_ALIVE"
    :transition-name="transitionName"
    :ellipsis-props="{ hideTimeout: 800 }"
    :responsive="responsive"
    :style="{
      '--ele-sidebar-width': '240px'
    }"
    :sidebar-menu-props="{
      textEllipsisTooltip: true,
      style: {
        '--ele-menu-item-white-space': 'normal',
        '--ele-menu-item-line-clamp': '2'
      }
    }"
    @update:collapse="updateCollapse"
    @update:maximized="updateMaximized"
    @tabAdd="addPageTab"
    @tabClick="handleTabClick"
    @tabRemove="removePageTab"
    @tabContextMenu="handleTabContextMenu"
    @tabSortChange="setPageTabs"
    @bodySizeChange="handleBodySizeChange"
  >
    <router-layout />
    <!-- logo -->
    <template #logo>
      <img src="@/assets/logo.png" style="width: 30px; height: 30px" />
    </template>
    <template #logoTitle>
      <h1>{{ PROJECT_NAME }}</h1>
    </template>
    <!-- 顶栏左侧按钮 -->
    <template #left="{ sidebar }">
      <!-- 折叠侧栏 -->
      <layout-tool v-if="sidebar" @click="updateCollapse(!collapse)">
        <el-icon style="transform: scale(1.14)">
          <MenuUnfoldOutlined v-if="collapse" />
          <MenuFoldOutlined v-else />
        </el-icon>
      </layout-tool>
      <!-- 刷新 -->
      <layout-tool :class="{ 'hidden-sm-and-down': tabBar && tabInHeader }" @click="reloadPageTab()">
        <el-icon style="transform: scale(1.09)">
          <ReloadOutlined />
        </el-icon>
      </layout-tool>
    </template>
    <!-- 顶栏右侧按钮 -->
    <template #right>
      <!-- 翻译语言切换 -->
      <!-- <layout-tool class="mytool">
        <span id="translate"></span>
      </layout-tool> -->
      <layout-tool :class="{ 'hidden-sm-and-down': tabBar && tabInHeader }" v-if="showIcon" @click="handleNotificationClick">
        <el-icon style="transform: scale(1.17) translateY(1px); cursor: pointer">
          <BellOutlined />
          <!-- 闪烁的红色通知圆点 -->
          <span class="notification-dot"></span>
        </el-icon>
      </layout-tool>
      <!-- 全屏切换 -->
      <layout-tool class="hidden-sm-and-down" @click="toggleFullscreen" style="margin-right: -13px">
        <el-icon style="transform: scale(1.18)">
          <CompressOutlined v-if="isFullscreen" style="stroke-width: 4" />
          <ExpandOutlined v-else style="stroke-width: 4" />
        </el-icon>
      </layout-tool>
      <!-- 语言切换 -->
      <layout-tool :class="{ 'hidden-sm-and-down': tabBar && tabInHeader }">
        <i18n-icon :icon-style="{ transform: 'scale(1.15)' }" />
      </layout-tool>
      <!-- 消息通知 -->
      <!--      <layout-tool :class="{ 'hidden-sm-and-down': tabBar && tabInHeader }">-->
      <!--        <header-notice />-->
      <!--      </layout-tool>-->
      <!-- 用户信息 -->

      <layout-tool>
        <header-user />
      </layout-tool>
      <!-- 主题设置 -->
      <layout-tool @click="openSetting">
        <el-icon>
          <MoreOutlined />
        </el-icon>
      </layout-tool>
    </template>
    <!-- 页签栏右侧下拉菜单 -->
    <template v-if="tabBar && !tabInHeader" #tabExtra="{ active }">
      <tab-dropdown
        :items="tabExtra"
        :dropdown-props="{
          iconProps: { size: 15 },
          popperOptions: {
            strategy: 'fixed',
            modifiers: [{ name: 'offset', options: { offset: [12, 8] } }]
          }
        }"
        @menuClick="(key) => handleTabDropdownMenu(key, active)"
      />
    </template>
    <!-- 折叠双侧栏一级 -->
    <template #boxBottom>
      <div :style="{ flexShrink: 0, padding: roundedTheme ? '4px 8px' : 0 }">
        <layout-tool style="height: 32px" @click="updateCompact(!compact)">
          <el-icon style="transform: scale(1.05)">
            <MenuUnfoldOutlined v-if="compact" />
            <MenuFoldOutlined v-else />
          </el-icon>
        </layout-tool>
      </div>
    </template>
    <!-- 全局页脚 -->
    <template #footer>
      <page-footer />
    </template>
    <!-- 菜单图标 -->
    <template #icon="{ icon, item }">
      <el-icon v-if="icon" v-bind="item.meta?.props?.iconProps || {}">
        <component :is="icon" :style="item.meta?.props?.iconStyle" />
      </el-icon>
    </template>
    <!-- 页签标题 -->
    <!--    <template #tabTitle="{ label, item }">-->
    <!--      <el-icon-->
    <!--        v-if="item.meta?.icon"-->
    <!--        class="ele-tab-icon"-->
    <!--        v-bind="item.meta?.props?.iconProps || {}"-->
    <!--      >-->
    <!--        <component :is="item.meta.icon" :style="item.meta?.props?.iconStyle" />-->
    <!--      </el-icon>-->
    <!--      <span :style="item.meta?.icon ? { paddingLeft:

     '4px' } : {}">-->
    <!--        {{ label }}-->
    <!--      </span>-->
    <!--    </template>-->
  </ele-pro-layout>
  <!-- 主题设置抽屉 -->
  <setting-drawer v-model="settingVisible" />
</template>

<script lang="ts" setup>
  import { computed, markRaw, nextTick, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useI18n } from 'vue-i18n';
  import i18nModule from '@/i18n';
  import { checkFullscreen, EleMessage, exitFullscreen, LayoutTool, requestFullscreen, TabDropdown } from 'ele-admin-plus/es';
  import type { BodySizeChangeOption, MenuI18n, TabItemEventOption } from 'ele-admin-plus/es/ele-pro-layout/types';
  import type { DropdownItem } from 'ele-admin-plus/es/ele-dropdown/types';
  import { ArrowLeftOutlined, ArrowRightOutlined, CloseCircleOutlined, CloseOutlined, CompressOutlined, ExpandOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MinusCircleOutlined, MoreOutlined, ReloadOutlined } from '@/components/icons';
  import { API_BASE_URL, HOME_PATH, PROJECT_NAME, REDIRECT_PATH, TAB_KEEP_ALIVE } from '@/config/setting';
  import { useUserStore } from '@/store/modules/user';
  import { useThemeStore } from '@/store/modules/theme';
  import { useMobileDevice } from '@/utils/use-mobile';
  import { usePageTab } from '@/utils/use-page-tab';
  import RouterLayout from '@/components/RouterLayout/index.vue';
  import HeaderUser from './components/header-user.vue';
  import I18nIcon from './components/i18n-icon.vue';
  import PageFooter from './components/page-footer.vue';
  import SettingDrawer from './components/setting-drawer.vue';
  import * as MenuIcons from './menu-icons';
  import { getToken } from '@/utils/token-util';
  import router from '@/router';
  import dingAudio from '@/assets/ding.mp3';
  // import { getCacheLang } from '@/i18n/use-locale';
  defineOptions({
    name: 'Layout',
    components: MenuIcons
  });

  const { push } = useRouter();
  const { t, locale } = useI18n();
  const { addPageTab, removePageTab, removeAllPageTab, removeLeftPageTab, removeRightPageTab, removeOtherPageTab, reloadPageTab, setPageTabs } = usePageTab();
  const { mobileDevice } = useMobileDevice();
  const userStore = useUserStore();
  const themeStore = useThemeStore();

  /** 菜单数据 */
  const { menus } = storeToRefs(userStore);

  /** 布局风格 */
  const { tabs, collapse, compact, maximized, tabBar, layout, sidebarLayout, headerStyle, sidebarStyle, tabStyle, fixedHeader, fixedSidebar, fixedBody, fluid, logoInHeader, colorfulIcon, transitionName, uniqueOpened, fixedHome, tabInHeader, roundedTheme, menuItemTrigger, responsive } = storeToRefs(themeStore);

  /** 是否全屏 */
  const isFullscreen = ref(false);

  /** 是否显示主题设置抽屉 */
  const settingVisible = ref(false);

  /** 页签右键菜单 */
  const tabContext = computed<DropdownItem[]>(() => {
    return [
      {
        title: t('layout.tabs.reload'),
        command: 'reload',
        icon: markRaw(ReloadOutlined),
        iconStyle: { transform: 'scale(0.98)' }
      },
      {
        title: t('layout.tabs.close'),
        command: 'close',
        icon: markRaw(CloseOutlined)
      },
      {
        title: t('layout.tabs.closeLeft'),
        command: 'left',
        icon: markRaw(ArrowLeftOutlined),
        divided: true
      },
      {
        title: t('layout.tabs.closeRight'),
        command: 'right',
        icon: markRaw(ArrowRightOutlined)
      },
      {
        title: t('layout.tabs.closeOther'),
        command: 'other',
        icon: markRaw(MinusCircleOutlined),
        divided: true
      },
      {
        title: t('layout.tabs.closeAll'),
        command: 'all',
        icon: markRaw(CloseCircleOutlined)
      }
    ];
  });

  /** 页签栏右侧下拉菜单 */
  const tabExtra = computed<DropdownItem[]>(() => {
    const isMax = maximized.value;
    return [
      {
        title: t(`layout.tabs.${isMax ? 'fullscreenExit' : 'fullscreen'}`),
        command: 'fullscreen',
        icon: isMax ? markRaw(CompressOutlined) : markRaw(ExpandOutlined)
      },
      ...tabContext.value
    ];
  });

  /** 侧栏折叠切换 */
  const updateCollapse = (value: boolean) => {
    themeStore.setCollapse(value);
  };

  /** 双侧栏一级折叠切换 */
  const updateCompact = (value: boolean) => {
    themeStore.setCompact(value);
  };

  /** 内容区全屏切换 */
  const updateMaximized = (value: boolean) => {
    themeStore.setMaximized(value);
  };

  /** 页签点击事件 */
  const handleTabClick = (option: TabItemEventOption) => {
    const { key, active, item } = option;
    const path = item?.fullPath || key;
    if (key !== active && path) {
      push(path);
    }
  };

  /** 内容区尺寸改变事件 */
  const handleBodySizeChange = ({ width }: BodySizeChangeOption) => {
    themeStore.setContentWidth(width ?? null);
    isFullscreen.value = checkFullscreen();
  };

  /** 全屏切换 */
  const toggleFullscreen = () => {
    if (isFullscreen.value) {
      exitFullscreen();
      isFullscreen.value = false;
      return;
    }
    try {
      requestFullscreen();
      isFullscreen.value = true;
    } catch (e) {
      console.error(e);
      EleMessage.error('您的浏览器不支持全屏模式');
    }
  };

  /** 页签右键菜单点击事件 */
  const handleTabContextMenu = (option: TabItemEventOption) => {
    const { command, key, item, active } = option;
    if (command === 'reload') {
      reloadPageTab({ fullPath: item?.fullPath || key });
    } else if (command === 'close') {
      removePageTab({ key, active });
    } else if (command === 'left') {
      removeLeftPageTab({ key, active });
    } else if (command === 'right') {
      removeRightPageTab({ key, active });
    } else if (command === 'other') {
      removeOtherPageTab({ key, active });
    } else if (command === 'all') {
      removeAllPageTab({ key, active });
    }
  };

  /** 页签栏右侧下拉菜单点击事件 */
  const handleTabDropdownMenu = (command: string, active: string) => {
    if (command === 'reload') {
      reloadPageTab();
    } else if (command === 'fullscreen') {
      updateMaximized(!maximized.value);
    } else {
      handleTabContextMenu({ command, key: active, active });
    }
  };

  /** 菜单标题国际化 */
  const i18n: MenuI18n = ({ menu, locale }) => {
    // 优先使用meta.lang中的多语言配置
    if (locale && menu?.meta?.lang && menu.meta.lang[locale]) {
      return menu.meta.lang[locale];
    }
    // 如果有permissionKey，使用permission模块进行国际化
    if (menu?.meta?.permissionKey) {
      const i18nT = i18nModule.global.t;
      const key = `permission.${menu.meta.permissionKey}`;
      const translatedTitle = i18nT(key);
      // 如果翻译结果与key相同，说明没有配置，返回原title
      if (translatedTitle === key) {
        return menu?.meta?.title;
      }
      return translatedTitle;
    }
    // 否则直接使用meta.title
    return menu?.component ? void 0 : menu?.meta?.title;
  };

  /** 打开主题设置抽屉 */
  const openSetting = () => {
    settingVisible.value = true;
  };
  const showIcon = ref(false);
  const latestMsgType = ref('');

  // type -> 路由映射
  const typeRouteMap: Record<string, string> = {
    AGENT_APPLY: '/agent/applyRecords',
    WITHDRAWL: '/user/payWithdraw'
  };

  const handleNotificationClick = () => {
    const targetPath = typeRouteMap[latestMsgType.value] || '/user/payWithdraw';
    showIcon.value = false;
    // 使用 replace 跳转后强制刷新，避免 keep-alive 缓存或组件复用导致页面不更新
    router.push(targetPath).finally(() => {
      nextTick(() => router.go(0));
    });
  };
  onMounted(() => {
    // 添加SSE连接逻辑
    const createSSEConnection = () => {
      // 如果已有连接，先关闭
      if ((window as any)._eventSource) {
        try {
          (window as any)._eventSource.close();
        } catch (error) {
          console.error('Error closing existing SSE connection:', error);
        }
      }

      const eventSource = new EventSource(API_BASE_URL + '/sse/connect?clientId=' + getToken());

      eventSource.addEventListener('CONNECT', function (event) {
        console.log('SSE 连接:', event.data);
      });

      // 兜底监听：所有未指定事件类型的消息（如 heartbeat，直接忽略）
      eventSource.onmessage = function () {};

      // 根据 type 映射，动态监听对应事件类型
      const listenTypes = ['AGENT_APPLY', 'WITHDRAW'];
      listenTypes.forEach((type) => {
        eventSource.addEventListener(type, function (event) {
          try {
            const data = JSON.parse(event.data);
            // console.log('收到新消息:', data);
            handleMessage(data);
          } catch (parseError) {
            console.error('Error parsing message:', parseError);
          }
        });
      });

      // 消息处理函数
      const handleMessage = (data: any) => {
        // id 为 0 不做任何操作
        if (!data.id || data.id === 0) return;
        // id 不为 0，显示红色通知圆点，记录消息类型
        showIcon.value = true;
        latestMsgType.value = data.type || '';
        // 播放提示音
        const audio = new Audio(dingAudio);
        audio.play().catch((error) => {
          console.error('播放提示音失败:', error);
        });
      };

      eventSource.onerror = function (err) {
        console.error('SSE Error:', err);
        // 设置重连机制
        setTimeout(() => {
          console.log('Attempting to reconnect SSE...');
          createSSEConnection();
        }, 5000); // 5秒后尝试重连
      };

      // 保存eventSource到全局，便于后续管理
      (window as any)._eventSource = eventSource;
    };

    // 创建SSE连接
    createSSEConnection();
  });
</script>
<style setup lang="scss">
  // 如果要刷新浏览器：就打开div标签注释，并且去dashboard下面打开注释的刷新代码
  .translateSelectLanguage {
    display: none;
    // width: 90px;
    //  position: absolute;
    //  top: 18px;
    //  right: 250px;
    //  z-index: 2000;
    //  margin-right: 50px;
    //  @media screen and (max-width: 678px) {
    //   right: 60px;
    //  }
  }

  .el-icon {
    position: relative;
  }

  .notification-dot {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff0000;
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }

    51%,
    100% {
      opacity: 0;
    }
  }
</style>
