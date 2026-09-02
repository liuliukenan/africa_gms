// i18n.ts
import { createI18n } from 'vue-i18n';
import { getCacheLang } from '@/i18n/use-locale';
import { zh_CN } from '@/i18n/lang/zh_CN';
import { zh_TW } from '@/i18n/lang/zh_TW';
import { en } from '@/i18n/lang/en';

const messages = { zh_CN, zh_TW, en };

const i18n = createI18n({
  messages,
  legacy: false,
  silentTranslationWarn: true,
  locale: getCacheLang()
});

export default i18n;

// 导出 t 函数
export const t = i18n.global.t;