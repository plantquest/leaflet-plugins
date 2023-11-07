

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
        assetFileNames: "etage-control.[ext]",
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/etage-control.ts'),
      name: 'PlantquestEtageControl',
      fileName: 'etage-control',
    },
  },
  plugins: [dts()],
})
