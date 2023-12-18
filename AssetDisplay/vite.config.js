

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
        assetFileNames: "asset-display.[ext]",
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/asset-display.ts'),
      name: 'PlantquestAssetDisplay',
      fileName: 'asset-display',
    },
  },
  plugins: [dts()],
})
