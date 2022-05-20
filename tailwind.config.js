module.exports = {
  purge: {
    enabled: true,
    content: ['./views/**/*.{vue,js,ts,jsx,tsx,hbs}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '4/5': '95%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
};
