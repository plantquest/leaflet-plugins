import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/group-select': path.resolve(__dirname, '../'),
    },
  },
  plugins: []
})
