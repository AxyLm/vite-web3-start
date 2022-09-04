// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // build时删除未使用的类名
  safelist: ['bg-blue-500', 'text-center', 'hover:opacity-100', 'lg:text-right'], // 将特定类列入安全列表 （no delete）
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: ['dark'],
    },
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      base: {
        DEFAULT: '#fafafa',
        light: '#fafafa',
        dark: '#141414',
        1: '#ffffff',
        2: '#fafafa',
        3: '#f5f5f5',
        4: '#f0f0f0',
        5: '#d9d9d9',
        6: '#bfbfbf',
        7: '#8c8c8c',
        8: '#595959',
        9: '#434343',
        10: '#262626',
        11: '#1f1f1f',
        12: '#141414',
        13: '#000000',
      },
      skin: colors.blue,
      gray: colors.gray,
      trueGray: colors.neutral,
      red: colors.red,
      sky: colors.sky,
      blue: {
        DEFAULT: '#2f54eb',
        light: '#2f54eb',
        dark: '#597ef7',
        1: '#f0f5ff',
        2: '#d6e4ff',
        3: '#adc6ff',
        4: '#85a5ff',
        5: '#597ef7',
        6: '#2f54eb',
        7: '#1d39c4',
        8: '#10239e',
        9: '#061178',
      },
      yellow: colors.amber,
      c: {
        SHAYUHUI: '#34333b',
        ANLANZI: '#131124',
      },
    },
    boxShadowDark: {
      sm: '0 1px 2px 0 rgba(255,255,255 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(255,255,255 0.1), 0 1px 2px 0 rgba(255,255,255 0.06)',
      md: '0 4px 6px -1px rgba(255,255,255 0.1), 0 2px 4px -1px rgba(255,255,255 0.06)',
      lg: '0 10px 15px -3px rgba(255,255,255 0.1), 0 4px 6px -2px rgba(255,255,255 0.05)',
      xl: '0 20px 25px -5px rgba(255,255,255 0.1), 0 10px 10px -5px rgba(255,255,255 0.04)',
      '2xl': '0 25px 50px -12px rgba(255,255,255 0.25)',
      '3xl': '0 35px 60px -15px rgba(255,255,255 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(255,255,255 0.06)',
      none: 'none',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
