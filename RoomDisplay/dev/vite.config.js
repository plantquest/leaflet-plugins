import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/room-display': path.resolve(__dirname, '../'),
    },
  },
  plugins: [],
})
