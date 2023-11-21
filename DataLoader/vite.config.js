

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
        assetFileNames: "data-loader.[ext]",
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/data-loader.ts'),
      name: 'PlantquestDataLoader',
      fileName: 'data-loader',
    },
  },
  plugins: [dts()],
})
