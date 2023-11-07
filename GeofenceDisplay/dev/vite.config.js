import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@plantquest/geofence-display': path.resolve(__dirname, '../'),
    },
  },
  plugins: [],
})
