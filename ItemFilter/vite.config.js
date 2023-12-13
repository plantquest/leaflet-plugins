

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
        assetFileNames: "item-filter.[ext]",
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/item-filter.ts'),
      name: 'PlantquestItemFilter',
      fileName: 'item-filter',
    },
  },
  plugins: [dts()],
})
