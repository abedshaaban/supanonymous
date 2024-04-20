import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary-rgb))',
        secondary: 'rgb(var(--color-secondary-rgb))'
      }
    }
  },
  plugins: []
}
export default config
