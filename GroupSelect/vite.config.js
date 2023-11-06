

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
        assetFileNames: "group-select.[ext]",
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/group-select.ts'),
      name: 'PlantquestGroupSelect',
      fileName: 'group-select',
    },
  },
  plugins: [dts()],
})
