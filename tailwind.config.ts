import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './src/{app,error}.vue',
    './src/{components,layouts,pages}/**/*.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5670c3',
          light: '#8fa0d7',
          dark: '#173083'
        },
        action: {
          DEFAULT: '#38a760',
          light: '#9cd3b0',
          dark: '#1c5430'
        },
        danger: {
          DEFAULT: '#ba5555',
          light: '#ddaaaa',
          dark: '#5d2b2b'
        }
      }
    }
  }
}
