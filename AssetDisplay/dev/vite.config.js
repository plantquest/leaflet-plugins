import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/asset-display': path.resolve(__dirname, '../'),
    },
  },
  plugins: []
})
