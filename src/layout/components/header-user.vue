<!-- 用户信息 -->
<template>
  <ele-dropdown :items="dropdownItems" :icon-props="{ size: 15 }" :popper-options="{
      modifiers: [{ name: 'offset', options: { offset: [0, 5] } }]
    }" @command="handleUserDropClick">
    <div class="header-avatar">
      <el-avatar :size="28" :src="loginUser.avatar" :icon="loginUser.avatar ? void 0 : UserOutlined"
        style="transform: translateY(-1px)" />
      <div class="hidden-sm-and-down" style="margin-left: 4px; line-height: 1.5">
        {{ loginUser.user.username }}
      </div>
      <el-icon :size="13" style="margin: 0 -4px 0 2px">
        <ArrowDown />
      </el-icon>
    </div>
  </ele-dropdown>
  <!-- 修改密码弹窗 -->
  <password-modal v-model="passwordVisible" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElMessageBox } from 'element-plus/es';
import {
  ArrowDown,
  UserOutlined,
  LockOutlined,
  LogoutOutlined
} from '@/components/icons';
import { useUserStore } from '@/store/modules/user';
import { logout } from '@/utils/common';
import PasswordModal from './password-modal.vue';
import { usePermission } from '@/utils/use-permission';

const { t } = useI18n();
const { push } = useRouter();
const userStore = useUserStore();
const { hasPermission } = usePermission();

/** 是否显示修改密码弹窗 */
const passwordVisible = ref(false);

/** 当前用户信息 */
const loginUser = computed(() => userStore.info ?? {});

/** 原始菜单项配置 */
const menuItems = [
  // {
  //   title: t('layout.header.profile'),
  //   command: 'profile',
  //   icon: UserOutlined
  // },
  {
    title: t('layout.header.password'),
    command: 'password',
    icon: LockOutlined,
    iconStyle: { transform: 'translateY(-1px)' },
    permission: 'system:user:updatePwd'
  },
  {
    title: t('layout.header.logout'),
    command: 'logout',
    icon: LogoutOutlined,
    divided: true
  }
];

/** 根据权限过滤后的下拉菜单项 */
const dropdownItems = computed(() => {
  return menuItems.filter(item => {
    // 如果项定义了权限，则检查权限；否则默认显示
    if (item.permission) {
      return hasPermission(item.permission);
    }
    return true;
  });
});

/** 用户信息下拉点击 */
const handleUserDropClick = (command: string) => {
  if (command === 'password') {
    passwordVisible.value = true;
  } else if (command === 'profile') {
    push('/sysUser/profile');
  } else if (command === 'logout') {
    // 退出登录
    ElMessageBox.confirm(
      t('layout.logout.message'),
      t('layout.logout.title'),
      { type: 'warning', draggable: true }
    )
      .then(() => {
        logout(false);
        localStorage.removeItem('isFirstLogin')
      })
      .catch(() => { });
  }
};
</script>

<style lang="scss" scoped>
.header-avatar {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  outline: none;
}
</style>
