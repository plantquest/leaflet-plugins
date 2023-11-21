import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/utility': path.resolve(__dirname, '../'),
    },
  },
  plugins: [],
})
