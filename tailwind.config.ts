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
        }
      }
    }
  }
}
