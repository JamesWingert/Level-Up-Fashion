/* eslint-disable global-require */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /./,
    },
  ],
  theme: {
    extend: {},
    fontFamily: {
      Pacifico: ['Pacifico', 'cursive'],
      Lobster: ['Lobster', 'cursive'],
      Flower: ['Indie Flower', 'cursive'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        pastel: {
          ...require('daisyui/src/colors/themes')['[data-theme=pastel]'],
          // info: '#79C0FF',
          // primary: '#334257',
          // warning: '#548CA8',
          'base-100': '#FFFFFF',
          'base-300': '#FBFBFB',
          // neutral: '#222831',
          // info: '#dc6972',
          // success: '#538e65',
          // 'neutral-content': '#dc6972',
        },
        dracula: {
          ...require('daisyui/src/colors/themes')['[data-theme=dracula]'],
          // neutral: '#eeeeee',
          // ,
          // success: '#7BC284',
          // secondary: '#79C0FF',
          // primary: '#f6f8fa',
          // 'neutral-content': '#dc6972',
          // 'base-200': '#242424',
          // 'base-300': '#161c22',
        },
      },
    ],

    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    // darkTheme: 'dark',
  },
};
