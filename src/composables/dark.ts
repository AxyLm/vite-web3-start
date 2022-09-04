// these APIs are auto-imported from @vueuse/core
import { useToggle, useDark } from '@vueuse/core';
import { nextTick, WritableComputedRef } from 'vue';

export const isDark = useDark();
export const toggleDark = useToggle(isDark);

export function useThemeChang(isDark: WritableComputedRef<boolean>) {
  return {
    isAnimation(): boolean {
      const maskElBefore = document.querySelector('.maskEl');
      return !!maskElBefore;
    },
    themeAni(e: MouseEvent) {
      const maskElBefore = document.querySelector('.maskEl');

      if (maskElBefore) return;
      const bodyBgEl = document.getElementById('body-bg');
      const bodyEl = document.body;
      const maskEl = document.createElement('div');
      const x = Math.abs(e.clientX - bodyEl.offsetWidth / 2) / bodyEl.offsetWidth / 2;
      const y = Math.abs(e.clientY - bodyEl.offsetHeight / 2) / bodyEl.offsetHeight / 2;

      const rate = Math.max(x, y);
      const delp = rate * 6 + 4;
      maskEl.className = `maskEl ${
        isDark.value ? 'bg-base-light' : 'bg-base-dark'
      } transition-colors delay-1000 absolute`;
      maskEl.setAttribute(
        'style',
        `width:50px; height:50px; top:${e.clientY - 25}px; left:${
          e.clientX - 25
        }px; border-radius: 100%;`,
      );
      bodyBgEl?.appendChild(maskEl);
      nextTick(() => {
        maskEl.style.animation = `${delp}s ease-out scale`;
        setTimeout(() => {
          maskEl.remove();
        }, 600);
      });

      toggleDark();
    },
  };
}
