import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: false,
    target: 'es6',
    emptyOutDir: false,
    rollupOptions: {
      treeshake: false,
      output: {
        assetFileNames: 'geofence-display.[ext]',
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/geofence-display.ts'),
      name: 'PlantquestGeofenceDisplay',
      fileName: 'geofence-display',
    },
  },
  plugins: [dts()],
})
