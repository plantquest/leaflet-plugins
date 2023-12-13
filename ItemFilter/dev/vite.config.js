import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/item-filter': path.resolve(__dirname, '../'),
    },
  },
  plugins: []
})
