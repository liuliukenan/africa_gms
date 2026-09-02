import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Compression from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { EleAdminResolver } from 'ele-admin-plus/es/utils/resolvers';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  const alias = {
    '@/': resolve('src') + '/',
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
  };
  {
    host: '0.0.0.0'; // 允许所有 IP 访问
  }
  const plugins = [vue()];
  if (isBuild) {
    // 组件按需引入
    // plugins.push(
    //   Components({
    //     dts: false,
    //     resolvers: [
    //       ElementPlusResolver({
    //         importStyle: 'sass'
    //       }),
    //       EleAdminResolver({
    //         importStyle: 'sass'
    //       })
    //     ]
    //   })
    // );
    // gzip压缩
    plugins.push(
      Compression({
        disable: !isBuild,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    );
  }
  // } else {
  // 开发环境全局安装
  alias['./as-needed'] = './global-import';
  // }
  return {
    resolve: { alias },
    plugins,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    optimizeDeps: {
      include: ['echarts/core', 'echarts/charts', 'echarts/renderers', 'echarts/components', 'vue-echarts', 'echarts-wordcloud', 'sortablejs', 'vuedraggable']
    },
    build: {
      target: 'chrome63',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            // Vue 核心
            'vendor-vue': ['vue', 'vue-router', 'pinia', 'pinia-plugin-persistedstate'],
            // Element Plus UI 库
            'vendor-element': ['element-plus', '@element-plus/icons-vue'],
            // EleAdminPlus
            'vendor-ele-admin': ['ele-admin-plus'],
            // ECharts 图表
            'vendor-echarts': ['echarts', 'vue-echarts', 'echarts-wordcloud'],
            // Monaco 编辑器（体积最大，单独拆出）
            'vendor-monaco': ['monaco-editor'],
            // ExcelJS（体积较大）
            'vendor-exceljs': ['exceljs'],
            // 国际化
            'vendor-i18n': ['vue-i18n'],
            // 工具库
            'vendor-utils': ['axios', 'dayjs', 'lodash-es', 'crypto-js', 'js-base64', 'nprogress'],
            // 其他三方库
            'vendor-misc': ['bytemd', '@bytemd/plugin-gfm', '@bytemd/plugin-highlight', 'highlight.js', 'github-markdown-css', 'cropperjs', 'qrcode', 'jsbarcode', 'sortablejs', 'vuedraggable', 'countup.js']
          }
        }
      }
    }
  };
});
