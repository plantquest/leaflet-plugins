import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/data-loader': path.resolve(__dirname, '../'),
    },
  },
  plugins: []
})
