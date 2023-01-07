// these APIs are auto-imported from @vueuse/core
import { useToggle, useDark } from '@vueuse/core';

export const isDark = false;
// useDark({
//   onChanged(isDark: boolean) {
//     // document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
//     // document.documentElement.classList.toggle('dark', !isDark);
//     // document.documentElement.classList.toggle('light', isDark);
//   },
// });
export const toggleDark = useToggle(isDark);
