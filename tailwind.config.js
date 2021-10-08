module.exports = {
  purge: ['./index.html', './src/**/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray_rgb: 'var(--gray)',
        primary: 'var(--primary)',
        lightblue: 'var(--lightblue)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
