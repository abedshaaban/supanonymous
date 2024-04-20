import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary-rgb))'
      }
    }
  },
  plugins: []
}
export default config
