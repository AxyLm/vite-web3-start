import { createI18n, useI18n as usei18n } from 'vue-i18n';
import { type App } from 'vue';

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import

// find & load messages
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', { eager: true }),
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml');
    return [key.slice(14, yaml ? -5 : -4), value.default];
  }),
);
// create i18n instance
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

/**
 * Now you can use $t anywhere, just import this
 * {@link src/stores/app.ts#L18}
 * @example
  axios(...).then(e=>{
    alert( `${$t("msg.request",{state: $t("successed")})}` )
  }).catch(e=>{
    alert( `${$t("request")} $t("failed")` )
  })
 */
// export const $t = i18n.global.t;

export const install = (app: App<Element>) => {
  // app.config.globalProperties.$t = $t;
  // app.use(i18n);
};
