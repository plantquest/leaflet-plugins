import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/building-display': path.resolve(__dirname, '../'),
    },
  },
  plugins: [],
})
