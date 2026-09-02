import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import permission from './utils/permission';
import DictData from '@/components/DictData/index.vue';
import i18n from './i18n';
import installer from './as-needed';
import 'element-plus/theme-chalk/display.css';
import 'ele-admin-plus/es/style/nprogress.scss';
import './styles/themes/rounded.scss';
import './styles/themes/dark.scss';
import './styles/index.scss';

const app = createApp(App);

// 全局错误捕获（兜底处理 chunk 加载失败等未预期的运行时错误）
app.config.errorHandler = (err, _instance, _info) => {
  console.error('全局错误:', err);
  if (err instanceof TypeError && err.message?.includes('Failed to fetch dynamically imported module')) {
    const now = Date.now();
    const lastReload = sessionStorage.getItem('chunk_reload_time');
    if (lastReload && now - parseInt(lastReload, 10) < 30000) {
      return;
    }
    sessionStorage.setItem('chunk_reload_time', String(now));
    window.location.reload();
  }
};

app.use(store);
app.use(router);
app.use(permission);
app.use(i18n);
app.use(installer);
app.component('DictData', DictData);

app.mount('#app');
