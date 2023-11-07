import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/etage-control': path.resolve(__dirname, '../'),
    },
  },
  plugins: []
})
