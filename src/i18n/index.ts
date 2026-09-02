/**
 * 国际化配置
 */
import { createI18n } from 'vue-i18n';
import { getCacheLang } from './use-locale';
import { zh_CN } from './lang/zh_CN';
import { zh_TW } from './lang/zh_TW';
import { en } from './lang/en';
import { sw_KE } from './lang/sw_KE';

const messages = { zh_CN, zh_TW, en, sw_KE };

const i18n = createI18n({
  messages,
  legacy: false,
  silentTranslationWarn: true,
  locale: getCacheLang()
});

export default i18n;
