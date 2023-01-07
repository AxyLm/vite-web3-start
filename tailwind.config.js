// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx, less}', './src/style/themes/*.less'],
  safelist: [
    'bg-blue-500',
    'text-center',
    'hover:opacity-100',
    'lg:text-right',
    'align-text-bottom',
    'inline',
    'w-*',
    'h-6',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: ['dark'],
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        64: '64px',
      },
      lineHeight: {
        48: '48px',
      },
    },
    spacing: {
      // 1 * 0.25 / * 4
      1.25: '.3125rem', // 5px
      2: '.5rem', // 8px
      2.5: '.625rem', // 10px
      3: '0.75rem', // 12px
      4: '1rem', // 16px
      4.5: '1.125rem', // 18px
      5: '1.25rem', // 20px
      5.5: '1.375rem', // 22px
      6: '1.5rem', // 24px
      6.5: '1.625rem', // 26px
      7: '1.75rem', // 28px
      7.5: '1.875rem', // 30px
      8: '2rem', // 30px
      9: '2.25rem', // 36px
      10: '2.5rem', // 40px
      12: '3rem', // 48px
      12.5: '3.125rem', // 50px
      13: '3.25rem', // 52px
      14: '3.5rem', // 56px
      15: '3.75rem',
      17.5: '4.375rem', // 70px
      18: '4.5rem', // 72px
      25: '6.25rem', // 100px
      27: '6.75rem', // 108px
      37.5: '9.375rem', // 150px
      50: '12.5rem', // 200px
      55: '13.75rem', // 220px
      55.5: '13.875rem', // 222px
      85: '21.25rem', // 340px
      0: '0px',
    },
    colors: {
      green: colors.green,
      red: colors.red,
      indigo: colors.indigo,
      black: '#000000',
      white: '#FFFFFF',
      base: {
        DEFAULT: '#8c8c8c',
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
      dark: {
        900: '#0A0A0A',
        800: '#161616',
        700: '#1C2025',
        600: '#1D1D1D',
        500: '#1F2328',
        400: '#202329',
        300: '#282C34',
        200: '#3E444E',
        100: '#404A55',
      },
      gray: {
        900: '#D2D2D2',
        800: '#CBCBCB',
        700: '#BFBFBF',
        600: '#B9B9B9',
        500: '#A4A4A4',
        400: '#949494',
        300: '#777777',
        200: '#707070',
        100: '#434F5B',
        90: '#686868',
      },
    },
  },
  variants: {},
  daisyui: {
    themes: [
      'light',
      {
        light: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          // 'base-100': '#faf5fa',

          primary: '#7cdf91',
          'primary-content': '#F8FAFC',
          '--rounded-btn': '.5rem',
        },
        dark: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require('daisyui/src/colors/themes')['[data-theme=night]'],
          primary: '#7cdf91',
          'primary-content': '#F8FAFC',
          '--rounded-btn': '.5rem',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
